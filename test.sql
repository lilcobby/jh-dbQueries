select * from employee
asdasd
asdasdasd
asdasdasdasda
asdasdasd
asdasdasd
asdasd


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