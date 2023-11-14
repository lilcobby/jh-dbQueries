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
// add dpt
// {
//   type: "input",
//   name: "dpt",
//   message: "Create a department to add.",
// },
// // add role
// {
//   type: "input",
//   name: "role_name",
//   message: "enter name for the role",
// },
// {
//   type: "input",
//   name: "role_salary",
//   message: "enter a salary for the role",
// },
// // maybe list?
// {
//   type: "input",
//   name: "role_department",
//   message: "enter department for the role",
// },
// // add employee
// {
//   type: "input",
//   name: "first_name",
//   message: "enter first name",
// },
// {
//   type: "input",
//   name: "last_name",
//   message: "enter last name ",
// },
// // list?
// {
//   type: "input",
//   name: "employee_role",
//   message: "enter a role for employee",
// },
// {
//   type: "input",
//   name: "employee_manager",
//   message: "enter a manager",
// },
// // update employee role
// {
//   // make a valide to check name in shit list?
//   type: "input",
//   name: "employee_name",
//   message: "enter name to edit their role.",
// },
// // same with role list?
// {
//   type: "input",
//   name: "employee_role_update",
//   message: "enter a role to change to.",
// },];

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
    // } (answers.tier1 === "View all departments") {
    //   console.log(answers.tier1);
    // }
    inquire_prompt();
  });
}

inquire_prompt();

// functions
viewDepartments = () => {
  console.log("sometimes");
};
viewRoles = () => {
  console.log("sometime2");
};
viewEmployees = () => {
  console.log("bread");
};
addDepartment = () => {
  console.log("yeehaw");
};
addArole = () => {
  console.log("yep");
};
addEmployee = () => {
  console.log("asdasdasd");
};
quitPrompt = () => {
  inquire_prompt();
};
