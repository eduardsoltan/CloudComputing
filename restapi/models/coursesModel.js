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
    const sqlQuery = 'SELECT * FROM courses';

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
    const sqlQuery = `SELECT * FROM courses WHERE id = ${id}`;

    return new Promise((resolve, reject) => {
        db.query(sqlQuery, (err, result) => {
            if(err) {
                reject(err);
            }
            
            resolve(result);
        });
    });
}

function postCourseProfesor(courseId, profesorId) {
    const sqlQuery = `insert into course_professors(course_id, profesor_id) values (${courseId}, ${profesorId})`;

    return new Promise((resolve, reject) => {
        db.query(sqlQuery, (err, result) => {
            if(err) {
                reject(err);
            }

            const newSqlQuery = `select * from course_professors where id = ${result.insertId}`;

            db.query(newSqlQuery, (err, result) => {
                if(err) {
                    reject(err);
                }

                resolve(result);
            });
        });
    });
}

function getCourseProfesors(id) {
    const sqlQuery = `select name, grade from (select * from course_professors s1 where s1.course_id = ${id}) s join profesors n on s.profesor_id = n.id`;

    return new Promise((resolve, reject) => {
        db.query(sqlQuery, (err, result) => {
            if(err) {
                reject(err);
            }

            resolve(result);
        });
    });
}

function createCourse(course) {
    return new Promise((resolve, reject) => {
        if (course.name === undefined) {
            resolve("Course should have a name");
            return;
        }
        else if(course.description === undefined) {
            resolve("Course should nave a description");
            return;
        }
        else if (course.credits === undefined) {
            resolve("Course should nave a credits");
            return;
        }
        let number = parseInt(course.credits)

        if(number === NaN) {
            resolve("Credits field should be a number");
            return;
        }

        const sqlQuery = `insert into courses (name, description, credits) values ('${course.name}', '${course.description}', ${course.credits})`;

        db.query(sqlQuery, (err, result) => {
            if(err) {
                reject(err);
            }

            const newSqlQuery = `select * from courses where id = ${result.insertId}`;

            db.query(newSqlQuery, (err, result) => {
                if(err) {
                    reject(err);
                }

                resolve(result);
            });
        });
    });
}

function updateCourse(id, course) {
    return new Promise((resolve, reject) => {
        const keys = Object.keys(course);
        
        let sql = `update courses set `;
        let first = 0;

        keys.forEach((key) => { 
            if(key === "name" || key === "description" || key === "credits") {
                if (first === 0) 
                {
                    first ++;
                }
                else {
                    sql = sql + ", "
                }

                if(typeof course[key] === 'string') {
                    sql = sql + `${key}='${course[key]}'`;
                }
                else {
                    sql = sql + `${key}=${course[key]}`;
                }
            }
        });

        sql = sql + ` where id = ${id}`;

        db.query(sql, (err, result) => {
            if(err) {
                reject(err);
            }

            const newQuery = `select * from courses where id = ${id}`;
            db.query(newQuery, (err, result) => {
                if(err) {
                    reject(err);
                }

                resolve(result);
            });
        });
    });
}

function deleteCourse(id) {

    return new Promise((resolve, reject) => {
        const sql = `delete from courses where id=${id}`;

        db.query(sql, (err, result) => {
            if(err) {
                reject(err);
            }

            resolve('Course deleted');
        });
    });
}

function deleteCourseProfesor(courseId, profesorId) {
    const sqlQuery = `delete from course_professors where course_id = ${courseId} and profesor_id = ${profesorId}`;

    return new Promise((resolve, reject) => {
        db.query(sqlQuery, (err, result) => {
            if(err) {
                reject(err);
            }

            resolve(true);
        });
    });
}

module.exports = {
    findAll,
    findById,
    getCourseProfesors,
    postCourseProfesor,
    createCourse,
    updateCourse,
    deleteCourse,
    deleteCourseProfesor
}