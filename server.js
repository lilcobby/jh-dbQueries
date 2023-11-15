// Import and require mysql2
const mysql = require("mysql2");
const inquirer = require("inquirer");
const PORT = 3001;

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // MySQL password
    password: "rootroot",
    database: "ukrops_db",
  },
  console.log(`Connected to the ukrops database.`)
);

console.log(`Server running on port ${PORT}`);
// db.query("SELECT * FROM employee ", (err, result) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(result);
// });
// can pass array into quest array objects
var possible = [];

const quest = {
  type: "list",
  name: "tier1",
  message: "What would you like to do",

  choices: [
    "View all departments",
    "View all roles",
    "View all employees",
    "Add a department",
    "Add a role",
    "Add an employee",
    "Update an employee role",
    "Quit",
  ],
};
inquire_prompt();

function inquire_prompt() {
  inquirer.prompt(quest).then((answers) => {
    switch (answers.tier1) {
      case "View all departments":
        console.log(answers.tier1);
        viewDepartments();
        break;

      case "View all roles":
        viewRoles();
        break;

      case "View all employees":
        viewEmployees();
        break;

      case "Add a department":
        addDepartment();

        break;

      case "Add a role":
        addArole();
        break;

      case "Add an employee":
        addEmployee();
        break;

      case "Update an employee role":
        updateEmployee();
        break;

      case "Quit":
        console.log("NEW PROMPT");
        quitPrompt();
    }
  });
}

// functions
viewDepartments = () => {
  console.log("viewing departments");
  db.query(
    "SELECT department.id, department.department_name FROM department",
    (err, dept) => {
      console.table(dept);
    }
  );
};
viewRoles = () => {
  console.log("viewing roles");
  db.query(
    "SELECT role.id, role.title, role.salary, department.department_name FROM role LEFT JOIN department ON department.id = role.department_id",
    (err, roles) => {
      if (err) {
        console.log(err);
      }
      console.table(roles);
    }
  );
};
viewEmployees = () => {
  console.log("viewing employees");
  db.query("SELECT * FROM employee", (err, empl) => {
    console.table(empl);
  });
};
addDepartment = () => {
  console.log("add a new department");

  // add dpt
  inquirer
    .prompt([
      {
        type: "input",
        name: "dpt",
        message: "Create a department to add.",
        validate: (dpt) => {
          if (dpt != "") {
            return true;
          }
        },
      },
    ])
    .then((data) => {
      console.log(data);
      db.query(
        `INSERT INTO department(department_name) VALUES ("${data.dpt}")`,
        (err) => {
          console.log(err);
        }
      );
      inquire_prompt();
    });
};

addArole = () => {
  console.log("creating a new role");
  viewDepartments();
  db.query(
    "SELECT department.id, department.department_name FROM department",
    (err, dept) => {
      // console.log(dept);
      let choices = dept.map((index) => {
        return index.id;
      });

      inquirer
        .prompt([
          // add role
          {
            type: "input",
            name: "role_name",
            message: "Create a role to add (see above for id:name value)",

            validate: (role_name) => {
              if (role_name != "") {
                return true;
              }
            },
          },
          {
            type: "input",
            name: "role_salary",
            message: "enter a salary for the role",
            validate: (role_salary) => {
              if (role_salary != "") {
                return true;
              }
            },
          },
        ])
        .then(
          (answers) => {
            const temp = [answers.role_name, answers.role_salary];
            console.log(temp);
            db.query(
              "SELECT department_name, id FROM department",
              (err, answers) => {
                if (err) {
                  console.log(err);
                }
                const choice2 = answers.map(({ department_name, id }) => ({
                  name: department_name,
                  value: id,
                }));
                console.log(choice2);
                inquirer
                  .prompt([
                    {
                      type: "list",
                      name: "role_department_id",
                      message: "select a department for the role",
                      choices: choice2,
                    },
                  ])
                  .then((answerChoice) => {
                    console.log(answerChoice);
                    temp.push(answerChoice.role_department_id);
                    console.log(temp[0], temp[1], temp[2]);
                    db.query(
                      `INSERT INTO role (title, salary, department_id) VALUES ("${temp[0]}", "${temp[1]}", ${temp[2]})`
                    );
                    // );
                    viewRoles();
                  });
              }
            );
          }
          //   {
          //     type: "list",
          //     name: "role_department_id",
          //     message: "select a department id for the role",
          //     choices: choices,
          //   },
          // ])
          // .then((data) => {
          //   db.query(
          //     `INSERT INTO role(title, salary, department_id) VALUES ("${data.role_name}", ("${data.role_salary}"), ("${data.role_department_id}"))`,
          //     (err, roles) => {
          //       if (err) {
          //         console.log(err);
          //       }
          //       console.log("role added successfully");
          //       viewRoles();
          //     }
          //   );

          //   inquire_prompt();
          // });
        );
    }
  );
};
addEmployee = () => {
  console.log("begin adding employee");

  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "enter first name",
        validate: (first_name) => {
          if (first_name != "") {
            return true;
          }
        },
      },
      {
        type: "input",
        name: "last_name",
        message: "enter a last name",
        validate: (last_name) => {
          if (last_name != "") {
            return true;
          }
        },
      },

      {
        type: "input",
        name: "employee_role",
        message: "enter a role for the employee",
        validate: (employee_role) => {
          if (employee_role != "") {
            return true;
          }
        },
      },
      {
        type: "list",
        name: "employee_manager",
        message: "select a manage for the employee to belong to",
        choices: ["john", "paul"],
      },
    ])
    .then((data) => {
      if (data.employee_manager === "john") {
        db.query(
          `INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("${data.first_name}", "${data.last_name}", ${data.employee_role}, 1)`,
          (err, empName) => {
            if (err) {
              console.log(err);
            }
            viewEmployees();
          }
        );
      }
      inquire_prompt();
    });
};
updateEmployee = () => {
  console.log("hello worlds");
  inquirer.prompt([
    {
      type: "list",
      name: "employee_name",
      message: "select an employee to edit their role.",
      choices: ["1", "2", "3"],
    },
    {
      type: "list",
      name: "employee_role_updte",
      message: "select a new role for the employee",
      choices: ["cook", "librarian", "ceo"],
    },
  ]);
};
quitPrompt = () => {
  inquire_prompt();
};
