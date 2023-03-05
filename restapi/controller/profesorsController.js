const Profesor = require('../models/profesorsModel')

async function getProfesors(req, res) {
    const response = {
        message: 'Error message'
    };

    try {
        const profesors = await Profesor.findAll();

        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(profesors));
        res.end();
    } catch(error) {
        response.message = 'Internal server error';

        res.writeHead(500, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(response));
        res.end();
    }
}

async function getProfesor(req, res, id) {
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

        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(profesor[0]));
        res.end();
    }
    catch(error) {
        response.message = 'Internal server error';

        res.writeHead(500, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(response));
        res.end();
    }
}

async function postProfesor(req, res) {
    const response = {
        message: 'Error message'
    };

    try {
        body = '';
        req.on('data', (chunk) => {
            body += chunk.toString();
        });
        
        req.on('end', async () => {
            const profesor = JSON.parse(body);
            
            const newProfesor = await Profesor.createProfesor(profesor);

            if (typeof newProfesor === "string") {
                response.message = newProfesor;

                res.writeHead(400, {'Content-Type': 'application/json'});
                res.write(JSON.stringify(response));
                res.end();

                return;
            }
            
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.write(JSON.stringify(newProfesor));
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

async function updateProfesor(req, res, id) {
    const response = {
        message: 'Error message'
    };

    try {
        const profesor = await Profesor.findById(id);
    
        if(profesor.length === 0) {
            response.message = 'Profesor not found';

            res.writeHead(200, {'Content-Type': 'application/json'});
            res.write(JSON.stringify(profesor));
            res.end();
        }

        body = '';
        req.on('data', (chunk) => {
            body += chunk.toString();
        });
    
        req.on('end', async () => {
            const parsedProduct = JSON.parse(body);
    
            const resultProduct = await Profesor.updateProfesor(id, parsedProduct);
                
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.write(JSON.stringify(resultProduct));
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

async function deleteProfesor(req, res, id) {
    const response = {
        message: 'Error message'
    };

    try {
        const exitProfesor = await Profesor.findById(id);

        if(exitProfesor.length === 0) {
            response.message = 'Profesor not found';

            res.writeHead(404, {'Content-Type': 'application/json'});
            res.write(JSON.stringify(response));
            res.end();

            return;
        }

        const profesors = await Profesor.deleteProfesor(id);

        response.message = profesors;
        res.writeHead(400, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(response));
        res.end();
                
        return;
    }
    catch(error) {
        response.message = 'Internal server error';

        res.writeHead(500, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(response));
        res.end();
    }
}

module.exports = {
    getProfesors,
    getProfesor,
    postProfesor,
    updateProfesor,
    deleteProfesor
}