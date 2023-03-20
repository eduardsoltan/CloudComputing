const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const cors = require('cors');
const https = require('https');
require('dotenv').config();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let port = process.env.PORT || 5001;

app.use(cors());

app.get('/universities/:countryName', (req, res) => {
    const country = req.params.countryName;
    let universities = [];

    fetch(`http://universities.hipolabs.com/search?country=${country}`)
        .then(response => {
            return response.json(); 
        })
        .then(data => { 
            if(data.length === 0) {
                const response = {
                    msg: 'Universities not found'
                };

                res.status(404).json(response);
                return;
            }

            data.forEach(univer => {
                let university = {};

                university.name = univer.name;
                university.links = univer.web_pages;
                
                universities.push(university);
            });

            
            res.json(universities);
        })
        .catch(err => {
            const response = {
                msg: 'Universities not found'
            };

            res.status(404).json(response);
            return;
        });
});

app.get('/udemyCourses', (req, res) => {
    let courses = [];

    const searchParam = req.query.search;
    const headers = new Headers({
        Accept: "application/json, text/plain, */*",
        Authorization: `Basic ${process.env.API_KEY}`,
        'Content-Type': "application/json"
    });

    const httpsAgent = new https.Agent({
        rejectUnauthorized: false,
    });
  
    fetch(`https://udemy.com/api-2.0/courses/?search=${searchParam}`, {
        method: 'GET',
        headers: headers,
        agent: httpsAgent
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        if(data.results.length === 0) {
            const response = {
                msg: 'Resources not found'
            };

            res.status(404).json(response);    
            return;
        }
        
        data.results.forEach(course => {
            let newCourse = {};
            newCourse.title = course.title;
            newCourse.url = course.url;
            newCourse.image = course.image_125_H;
            
            courses.push(newCourse);
        });
        
        res.json(courses);
    });
});

app.get('/courses', (req, res) => {
    fetch(`http://localhost:5000/api/courses`)
        .then(response => {
            return response.json(); 
        })
        .then(data => {
            if(data.hasOwnProperty('msg')) {
                res.status(404).json(data);
            } 

            res.json(data);
        })
        .catch(err => {
            const response = {
                msg: 'Universities not found'
            };

            res.status(404).json(response);
            return;
        });
    
});

app.post('/courses', (req, res) => {
    let returnStatus;

    fetch(`http://localhost:5000/api/courses`, {
        method: 'POST',
        body: JSON.stringify(req.body)
    })
    .then(response => {
        returnStatus = response.status;

        return response.json(); 
    })
    .then(data => {
        if(returnStatus === 200)
        res.status(returnStatus).json(data[0]);
    })
    .catch(err => {
        const response = {
            msg: 'Could not add new course'
        };

        res.status(500).json(response);
        return;
    });
});

app.delete('/courses/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    let returnStatus;

    fetch(`http://localhost:5000/api/courses/${id}`, {
        method: 'DELETE'
    })
        .then(response => {
            returnStatus = response.status;

            return response.json(); 
        })
        .then(data => {
            res.status(returnStatus).json(data);
        })
        .catch(err => {
            const response = {
                msg: 'Course not found'
            };

            res.status(404).json(response);
            return;
        });
    
});

app.listen(port, () => console.log('Listening on port 5001'));
