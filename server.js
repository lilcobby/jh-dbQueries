
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
  console.log(`Connected to the classlist_db database.`)
);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
