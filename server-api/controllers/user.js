import { dbConnection } from "../db.js";

export const getUsers = (_, res) => {
    // q = query (consulta)
    const q = "SELECT * FROM users";

 /*     
    Use SQL statements to read from (or write to) a MySQL database.
    * Also called "to query" a database (consultar o banco de dados)

    The query method takes an sql statements as a parameter and returns the result
 */    
    dbConnection.query(q, (err, data) => {
        if(err) return res.json('teste de erro:' + err);

        return res.status(200).json(data);
    });

};

export const addUser = (req, res) => {
    const q = 
    `INSERT INTO users(name, email, phone, date_birth) VALUES('${req.body.name}', '${req.body.email}', '${req.body.phone}', '${req.body.date_birth}')`;

    const values = [
        req.body.name,
        req.body.email,
        req.body.phone,
        req.body.date_birth,
    ];

    dbConnection.query(q, [values], (err) => {
        if(err) return res.json(err);

        return res.status(200).json("Usuário criado com sucesso!");
    });
};

export const updateUser = (req, res) => {
    const q =
    `UPDATE users SET name = '${req.body.name}', email = '${req.body.email}', phone = '${req.body.phone}', date_birth = '${req.body.date_birth}' WHERE id = '${req.params.id}'`;

    console.log(q);
    console.log(req.params.id);

    const values = [
        req.body.name,
        req.body.email,
        req.body.phone,
        req.body.date_birth
    ];

    console.log(values);

    dbConnection.query(q, [...values, req.params.id], (err) => {
        if(err) {
            console.log(err);
            return res.status(500).json(err);
        }
        
        console.log(q, ...values, req.params.id);

        return res.status(200).json("Usuário atualizado com sucesso!");
    });
};

export const deleteUser = (req, res) => {
    const q = 
    "DELETE FROM users WHERE id = ?";

    dbConnection.query(q, [req.params.id], (err) => {
        if(err) return res.json(err);

        return res.status(200).json("Usuário deletado com sucesso!");
    });
};

// Example: 
/* 
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Result: " + result);
    }); 
*/