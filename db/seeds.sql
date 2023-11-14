INSERT INTO department(department_name)
VALUES  ("dogs"),
        ("cats"),
        ("birds"),
        ("mice"),
        ("rats");

INSERT INTO role (title, salary, department_id)
VALUES  ("head", 50, 1),
        ("shoulder", 40, 2),
        ("knee", 30, 3),
        ("toe", 20, 4),
        ("night_shift", 10, 5);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES  ("john", "hammond", 1, 1),
        ("jacob", "sawyer", 2, 2),
        ("jingle", "bells", 3, 1),
        ("heimer", "dinger", 4, 2),
        ("schmidt", "grandhaus", 5, 3);