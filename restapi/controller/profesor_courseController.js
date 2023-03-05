const Course = require('../models/coursesModel')
const Profesor = require('../models/profesorsModel')

async function getCourseProfesors(req, res, id) {
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

        const profesors = await Course.getCourseProfesors(id);

        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(profesors));
        res.end();
    }
    catch(error) {
        response.message = 'Internal server error';

        res.writeHead(500, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(response));
        res.end();
    }
}

async function getProfesorCourses(req, res, id) {
    const response = {
        message: 'Error message'
    };

    try {
        const profesor = await Profesor.findById(id);
        
        if(profesor.length === 0) {
            response.message = 'Profesor not found';

            res.writeHead(404, {'Content-Type': 'application/json'});
            res.write(JSON.stringify(response));
            res.end();
            
            return; 
        }

        const courses = await Profesor.getCourseProfesors(id);

        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(courses));
        res.end();
    }
    catch(error) {
        response.message = 'Internal server error';

        res.writeHead(500, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(response));
        res.end();
    }
}

async function postCourseProfesor(req, res, courseId, profesorId) {
    const response = {
        message: 'Error message'
    };
    
    try {
        const course = await Course.findById(courseId);
        const profesor = await Profesor.findById(profesorId);

        if(course.length === 0) {
            response.message = 'Course not found';

            res.writeHead(404, {'Content-Type': 'application/json'});
            res.write(JSON.stringify(response));
            res.end();
                
            return;
        }

        if(profesor.length === 0) {
            response.message = 'Profesor not found';

            res.writeHead(404, {'Content-Type': 'application/json'});
            res.write(JSON.stringify(response));
            res.end();
                
            return;
        }

        const courseProf = await Course.postCourseProfesor(courseId, profesorId);
        
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(courseProf));
        res.end();
    }
    catch(error) {
        response.message = 'Internal Server Error';

        res.writeHead(500, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(response));
        res.end();
    }
}

async function deleteCourseProfesor(req, res, courseId, profesorId) {
    const response = {
        message: 'Error response'
    };

    try {
        const course = await Course.findById(courseId);
        const profesor = await Profesor.findById(profesorId);

        if(course.length === 0) {
            response.message = 'Course not found';

            res.writeHead(404, {'Content-Type': 'application/json'});
            res.write(JSON.stringify(response));
            res.end();
                
            return;
        }

        if(profesor.length === 0) {
            response.message = 'Profesor not found';

            res.writeHead(404, {'Content-Type': 'application/json'});
            res.write(JSON.stringify(response));
            res.end();
                
            return;
        }

        const courseProf = await Course.deleteCourseProfesor(courseId, profesorId);
        
        if(courseProf === true) {
            const response = {
                message: "Successfully deleted"
            }

            res.writeHead(200, {'Content-Type': 'application/json'});
            res.write(JSON.stringify(response));
            res.end();
        }
    }
    catch(error) {
        response.message = 'Internal server error';

        res.writeHead(500, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(response));
        res.end();
    }
}

module.exports = {
    getCourseProfesors,
    getProfesorCourses,
    postCourseProfesor,
    deleteCourseProfesor
}