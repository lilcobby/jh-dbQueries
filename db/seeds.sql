INSERT INTO department(department_name)
VALUES  ("hammers"),
        ("rocks"),
        ("sticks"),
        ("anvils"),
        ("fire");

INSERT INTO role (title, salary, department_id)
VALUES  ("king", 50, 1),
        ("queen", 40, 2),
        ("knight", 30, 3),
        ("rook", 20, 4),
        ("bishop", 10, 5);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES  ("john", "hammond", 1, 1),
        ("jacob", "sawyer", 2, 2),
        ("jingle", "bells", 3, 1),
        ("heimer", "dinger", 4, 2),
        ("schmidt", "grandhaus", 5, 3);
        