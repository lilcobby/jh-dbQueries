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
  console.log("yep");
  db.query(
    "SELECT department.id, department.department_name FROM department",
    (err, dept) => {
      console.log(dept);
      let choices = dept.map((index) => {
        return index.id;
      });
      console.log(choices);

      inquirer
        .prompt([
          // add role
          {
            type: "input",
            name: "role_name",
            message: "Create a role to add",

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
          {
            type: "list",
            name: "role_department_id",
            message: "select a department id for the role",
            choices: choices,
          },
        ])
        .then((data) => {
          db.query(
            `INSERT INTO role(title, salary, department_id) VALUES ("${data.role_name}", ("${data.role_salary}"), ("${data.role_department_id}"))`,
            (err, roles) => {
              if (err) {
                console.log(err);
              }
              console.log("role added successfully");
              viewRoles();
            }
          );

          inquire_prompt();
        });
    }
  );
};
addEmployee = () => {
  console.log("asdasdasd");
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
        message: "select a manager for the employee",
        choices: [1, 2],
      },
    ])
    .then(() => {
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
