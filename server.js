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
        console.log("Cya Later");
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
      inquire_prompt();
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
      inquire_prompt();
    }
  );
};
// need to join all and show the big table here
viewEmployees = () => {
  console.log("viewing employees");
  db.query(
    "SELECT employee.id, employee.first_name, employee.last_name,  manager_id, title, salary, department.department_name FROM employee LEFT JOIN role ON role.id = employee.role_id LEFT JOIN department on department.id = employee.role_id",
    (err, empl) => {
      console.table(empl);
      inquire_prompt();
    }
  );
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

  db.query(
    "SELECT department.id, department.department_name FROM department",
    (err, dept) => {
      // console.log(dept);
      // let choices = dept.map((index) => {
      //   return index.id;
      // });

      inquirer
        .prompt([
          // add role
          {
            type: "input",
            name: "role_name",
            message: "Create a role to add ",

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
        .then((answers) => {
          // array to hold previous answers
          const temp = [answers.role_name, answers.role_salary];
          // query to department table so that we can use the department name and give it a value of department id
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
              //  new prompt using department name/ choice 2 and has a value of id
              inquirer
                .prompt([
                  {
                    type: "list",
                    name: "role_department_id",
                    message: "select a department for the role",
                    choices: choice2,
                  },
                ])
                //
                .then((answerChoice) => {
                  //  pushes the value of choice2 to the temp array holding our other answers
                  temp.push(answerChoice.role_department_id);
                  // new query to insert those three values from the temp array into the roles table
                  db.query(
                    `INSERT INTO role (title, salary, department_id) VALUES ("${temp[0]}", "${temp[1]}", ${temp[2]})`
                  );

                  viewRoles();
                  inquire_prompt();
                });
            }
          );
        });
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
    ])
    .then((answers) => {
      const temp = [answers.first_name, answers.last_name];

      db.query("SELECT id, title FROM role", (err, table) => {
        if (err) {
          console.log(err);
        }
        const choice3 = table.map(({ id, title }) => ({
          name: title,
          value: id,
        }));
        console.log(choice3);
        inquirer
          .prompt([
            {
              type: "list",
              name: "employee_role",
              message: "select a role for the employee",
              choices: choice3,
            },
          ])
          .then((employee_role) => {
            temp.push(employee_role.employee_role);
            db.query(
              "SELECT first_name, last_name, role_id, manager_id FROM employee",
              (err, employee_data) => {
                if (err) {
                  console.log(err);
                }
                const employeeManager = employee_data.map(
                  ({ role_id, first_name, last_name }) => ({
                    name: first_name + " " + last_name,
                    value: role_id,
                  })
                );
                console.log(employeeManager);
                inquirer
                  .prompt([
                    {
                      type: "list",
                      name: "employee_manager",
                      message: "select a manager for the employee to belong to",
                      choices: employeeManager,
                    },
                  ])
                  .then((answers) => {
                    temp.push(answers.employee_manager);
                    console.log(temp);
                    db.query(
                      `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${temp[0]}", "${temp[1]}", ${temp[2]}, ${temp[3]})`,
                      (err, newEmployee) => {
                        if (err) {
                          console.log(err);
                        }
                        viewEmployees();
                      }
                    );
                  });
              }
            );
          });
      });
    });
};

updateEmployee = () => {
  console.log("updating employee data");
  db.query("SELECT id, first_name, last_name FROM employee", (err, data) => {
    if (err) {
      console.log(err);
    }
    const choice4 = data.map(({ id, first_name, last_name }) => ({
      name: first_name + " " + last_name,
      value: id,
    }));
    console.log(choice4);
    inquirer
      .prompt([
        {
          type: "list",
          name: "employee_name",
          message: "select an employee to update",
          choices: choice4,
        },
      ])
      .then((chosen) => {
        db.query("SELECT * FROM role", (err, data) => {
          if (err) {
            console.log(err);
          }
          inquirer
            .prompt([
              {
                type: "list",
                name: "roles",
                message: "select a new role for the employee",
                choices: data.map(({ id, title }) => ({
                  name: title,
                  value: id,
                })),
              },
            ])
            .then((roles) => {
              console.log(roles.roles);
              console.log(chosen.employee_name);
              db.query(
                `UPDATE employee SET role_id=${chosen.employee_name} WHERE id= ${roles.roles}`,
                (err,
                (final) => {
                  if (err) {
                    console.log(err);
                  }
                  viewEmployees();
                })
              );
            });
        });
      });
  });
};

quitPrompt = () => {
  process.exit();
};
