const http = require('http')
const mysql = require('mysql')
const coursesController = require('./controller/coursesController')
const profesorsController = require('./controller/profesorsController')
const course_professorsController = require('./controller/profesor_courseController')

const server = http.createServer((req, res) => {
    
    if(req.url === '/api/courses' && req.method === 'GET') {
        coursesController.getCourses(req, res)
    }
    else if(req.url === '/api/profesors' && req.method === 'GET') {
       profesorsController.getProfesors(req, res);
    }
    else if(req.url.match(/\/api\/courses\/([1-9][0-9]*)\/profesors/) && req.method === 'GET') {
        const id = req.url.split('/')[3];
        
        course_professorsController.getCourseProfesors(req, res, id);
    }
    else if(req.url.match(/\/api\/profesors\/([1-9][0-9]*)\/courses/) && req.method === 'GET') {
        const id = req.url.split('/')[3];
        
        course_professorsController.getProfesorCourses(req, res, id);
    }
    else if(req.url.match(/\/api\/profesors\/([1-9][0-9]*)/) && req.method === 'GET') {
        const id = req.url.split('/')[3];
        profesorsController.getProfesor(req, res, id); 
    }
    else if(req.url.match(/\/api\/courses\/([1-9][0-9]*)/) && req.method === 'GET') {
        const id = req.url.split('/')[3];
        coursesController.getCourse(req, res, id);
    }
    else if(req.url === '/api/courses' && req.method === 'POST') {
        coursesController.postCourse(req, res);
    }
    else if(req.url === '/api/profesors' && req.method === 'POST') {
        profesorsController.postProfesor(req, res);
    }
    else if(req.url.match(/\/api\/profesors\/([1-9][0-9]*)\/courses\/([1-9][0-9]*)/) && req.method === 'POST') {
        const profesorId = req.url.split('/')[3];
        const courseId = req.url.split('/')[5];

        course_professorsController.postCourseProfesor(req, res, courseId, profesorId);
    }
    else if(req.url.match(/\/api\/courses\/([1-9][0-9]*)\/profesors\/([1-9][0-9]*)/) && req.method === 'POST') {
        const courseId = req.url.split('/')[3];
        const profesorId = req.url.split('/')[5];

        course_professorsController.postCourseProfesor(req, res, courseId, profesorId);
    }
    else if(req.url.match(/\/api\/courses\/([1-9][0-9]*)/) && req.method === 'PUT') {
        const id = req.url.split('/')[3];
        coursesController.updateCourse(req, res, id);
    }
    else if(req.url.match(/\/api\/profesors\/([1-9][0-9]*)/) && req.method === 'PUT') {
        const id = req.url.split('/')[3];
        profesorsController.updateProfesor(req, res, id);
    }
    else if(req.url.match(/\/api\/profesors\/([1-9][0-9]*)\/courses\/([1-9][0-9]*)/) && req.method === 'DELETE') {
        const profesorId = req.url.split('/')[3];
        const courseId = req.url.split('/')[5];

        course_professorsController.deleteCourseProfesor(req, res, courseId, profesorId);
    }
    else if(req.url.match(/\/api\/courses\/([1-9][0-9]*)\/profesors\/([1-9][0-9]*)/) && req.method === 'DELETE') {
        const courseId = req.url.split('/')[3];
        const profesorId = req.url.split('/')[5];

        course_professorsController.deleteCourseProfesor(req, res, courseId, profesorId);
    }
    else if(req.url.match(/\/api\/courses\/([1-9][0-9]*)/) && req.method === 'DELETE') {
        const id = req.url.split('/')[3];
        coursesController.deleteCourse(req, res, id);
    }
    else if(req.url.match(/\/api\/profesors\/([1-9][0-9]*)/) && req.method === 'DELETE') {
        const id = req.url.split('/')[3];
        profesorsController.deleteProfesor(req, res, id);
    }
    else {
        const response = {
            message: 'Route not found'
        };

        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify(response));
        res.end();
    }
});

server.listen(5000, () => console.log("Server running on port 5000"));