const mysql = require('mysql')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'noderest'
});

db.connect((err) => {
    if(err) {
        console.log(err);
    }

    console.log('Database connected');
});

function findAll() {
    const sqlQuery = 'SELECT * FROM profesors';

    return new Promise((resolve, reject) =>  {
        db.query(sqlQuery, (err, result) => {
            if(err) {
                reject(err);
            }
    
            resolve(result);
        });
    });
}

function findById(id) {
    const sqlQuery = `SELECT * FROM profesors WHERE id = ${id}`;
    
    return new Promise((resolve, reject) => {
        db.query(sqlQuery, (err, result) => {
            if(err) {
                reject(err);
            }

            resolve(result);
        });
    });
}

function getCourseProfesors(id) {
    const sqlQuery = `select name, description, credits from (select * from course_professors s1 where s1.profesor_id = ${id}) s join courses n on s.course_id = n.id`;

    return new Promise((resolve, reject) => {
        db.query(sqlQuery, (err, result) => {
            if(err) {
                reject(err);
            }

            resolve(result);
        });
    });
}

function createProfesor(profesor) {
    return new Promise((resolve, reject) => {
        if (profesor.name === undefined) {
            resolve("Profesor should have a name");
        }
        else if(profesor.grade === undefined) {
            resolve("Profesor should nave a description");
        }

        const sqlQuery = `insert into profesors (name, grade) values ('${profesor.name}', '${profesor.grade}')`;
        
        db.query(sqlQuery, (err, result) => {
            if(err) {
                reject(err);
            }

            const newSqlQuery = `select * from profesors where id = ${result.insertId}`;

            db.query(newSqlQuery, (err, result) => {
                if(err) {
                    reject(err);
                }

                resolve(result);
            });
        });
    });
}

function updateProfesor(id, profesor) {
    return new Promise((resolve, reject) => {
        const keys = Object.keys(profesor);
        
        let sql = `update profesors set `;
        let first = 0;

        keys.forEach((key) => { 
            if(key === 'name' || key === 'grade') {
                if (first === 0) 
                {
                    first ++;
                }
                else {
                    sql = sql + ", "
                }

                if(typeof profesor[key] === 'string') {
                    sql = sql + `${key}='${profesor[key]}'`;
                }
                else {
                    sql = sql + `${key}=${profesor[key]}`;
                }
            }
        });

        sql = sql + ` where id = ${id}`;

        db.query(sql, (err, result) => {
            if(err) {
                reject(err);
            }

            const newQuery = `select * from profesors where id = ${id}`;
            db.query(newQuery, (err, result) => {
                if(err) {
                    reject(err);
                }

                resolve(result);
            });
        });
    });
}

function deleteProfesor(id) {
    return new Promise((resolve, reject) => {
        const sql = `delete from profesors where id=${id}`;

        db.query(sql, (err, result) => {
            if(err) {
                reject(err);
            }

            resolve("Profesor deleted");
        });
    });
}

module.exports = {
    findAll,
    findById,
    getCourseProfesors,
    createProfesor,
    updateProfesor,
    deleteProfesor
}