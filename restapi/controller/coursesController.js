const Course = require('../models/coursesModel');

async function getCourses(req, res) {
    res.writeHead(200, {'Content-Type': 'application/json'});

    try {
        const courses = await Course.findAll();

        res.write(JSON.stringify(courses));
        res.end();
    } catch(error) {
        const response = {
            message: "Error at getting courses."
        };

        res.writeHead(500, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(response));
        res.end();
    }
}

async function getCourse(req, res, id) {
    const response = {
        message: 'Mesaj de Eroare'
    };

    try {
        const course = await Course.findById(id);

        if(course.length === 0) {
            response.message = 'Course not found';
            res.writeHead(404, {'Content-Type': 'application/json'});
            res.write(JSON.stringify(response));
            res.end();
            
            return;
        }

        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(course[0]));
        res.end();
    }
    catch(error) {
        response.message = 'Internal Sever Error';
        
        res.writeHead(500, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(response));
        res.end();
    }
}

async function postCourse(req, res) {
    const response = {
        message: 'Error message'
    };

    try {
        body = '';
        req.on('data', (chunk) => {
            body += chunk.toString();
        });
        
        req.on('end', async () => {
            const course = JSON.parse(body);
            
            const newCourse = await Course.createCourse(course);

            if (typeof newCourse === 'string') {
                response.message = newCourse;

                res.writeHead(400, {'Content-Type': 'application/json'});
                res.write(JSON.stringify(response));
                res.end();

                return;
            }
            
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.write(JSON.stringify(newCourse));
            res.end();
        });
    }
    catch(error) {
        response.message = 'Internal Server Error';

        res.writeHead(500, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(response));
        res.end();
    }
}

async function updateCourse(req, res, id) {
    const response = {
        message: 'Error message'
    };
    
    try {
        const course = await Course.findById(id);

        if(course.length === 0) {
            response.message = 'Course not found';

            res.writeHead(404, {'Content-Type': 'application/json'});
            res.write(JSON.stringify(response));
            res.end();

            return;
        }
    
        body = '';
        req.on('data', (chunk) => {
            body += chunk.toString();
        });
    
        req.on('end', async () => {
            const parsedProduct = JSON.parse(body);
    
            const resultProduct = await Course.updateCourse(id, parsedProduct);
    
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.write(JSON.stringify(resultProduct));
            res.end();
        });
    }
    catch(error) {
        response.message = 'Internal server error';

        res.writeHead(500, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(response));
        res.end();
    }
}

async function deleteCourse(req, res, id) {
    const response = {
        message: 'Error message'
    };

    try {
        const exsitCourse = await Course.findById(id);

        if(exsitCourse.length === 0) {
            response.message = 'Course not found';

            res.writeHead(404, {'Content-Type': 'application/json'});
            res.write(JSON.stringify(response));
            res.end();

            return;
        }

        const courses = await Course.deleteCourse(id);

        response.message = courses;

        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(response));
        res.end();            
    }
    catch(error) {
        response.message = 'Internal server error';

        res.writeHead(500, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(response));
        res.end();
    }
}

module.exports = {
    getCourses,
    getCourse,
    postCourse,
    updateCourse,
    deleteCourse
}