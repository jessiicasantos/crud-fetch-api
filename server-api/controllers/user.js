import { dbConnection } from "../db.js";

export const getUsers = async (_, res) => {
    // q = query (consulta)
    const q = "SELECT * FROM users";

    try {
        const [ results ] = await dbConnection.query(
            q
        );

        //  /* Use SQL statements to read from (or write to) a MySQL database.
        //     * Also called "to query" a database (consultar o banco de dados)

        //     The query method takes an sql statements as a parameter and returns the result */ 

        return res.status(200).json(results);
    } catch(err) {
        throw res.json('ERROOORR TEST !@#$|%¨Zget error: ' + err);
    }
};

export const addUser = async (req, res) => {
    try {
        const q = 
        `INSERT INTO users(name, email, phone, date_birth) VALUES('${req.body.name}', '${req.body.email}', '${req.body.phone}', '${req.body.date_birth}')`;
    
        const [ result ] = await dbConnection.query(q);
    
        res.status(201).json(result);
    } catch(err) {
        throw res.json('Error on add user: ' + err);
    }
};

export const updateUser = async (req, res) => {
    try {
        const q =
        `UPDATE users SET name = '${req.body.name}', email = '${req.body.email}', phone = '${req.body.phone}', date_birth = '${req.body.date_birth}' WHERE id = '${req.params.id}'`;
    
        const [ result ] = await dbConnection.query(q);

        res.status(200).json(result);
    } catch(err) {
        throw res.json('Error on update user: ' + err);
    }
};

export const deleteUser = async (req, res) => {
    try {
        const q = 
        `DELETE FROM users WHERE id = '${req.params.id}'`;
    
        const [ result ] = await dbConnection.query(q);

        res.status(200).json(result);
    } catch(err) {
        throw res.json('Error on delete user: ' + err);
    }
};

// export const deleteUser = (req, res) => {
//     const q = 
//     "DELETE FROM users WHERE id = ?";

//     dbConnection.query(q, [req.params.id], (err) => {
//         if(err) return res.json(err);

//         return res.status(200).json("Usuário deletado com sucesso!");
//     });
// };

// Example: 
/* 
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Result: " + result);
    }); 
*/