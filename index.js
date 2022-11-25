const express = require('express');
const app = express();

app.use(express.json());

const alumnos = [];

const profesores = [];


//creación de endpoints de alumnos

app.get('/alumnos', (req, res) => {
    return res.status(200).send(alumnos);
});


app.get('/alumnos/:id', (req, res) => {
    const alumno = alumnos.find(c => c.id == parseInt(req.params.id));
    if (!alumno) return res.status(404);
    else res.status(200).send(alumno);
});


app.post('/alumnos', (req, res) => {

    if (!(Boolean(req.body.nombres))) return res.status(400);
    if (!(Boolean(req.body.apellidos))) return res.status(400);


    //Validar que el promedio sea mayor a 0 y menor o igual a 100
    if (!(req.body.promedio>0 && req.body.promedio<=100)) return res.status(400);

    //validar que el id sea mayor a 0
    if (req.body.id<0) return res.status(400);

    const alumno = {
        id: parseInt(req.body.id),
        nombres: req.body.nombres,
        apellidos: req.body.apellidos,
        matricula: req.body.matricula,
        promedio: parseInt(req.body.promedio)
    };

    alumnos.push(alumno);
    res.status(201);
});


app.put('/alumnos/:id', (req, res) => {
    const buscarAlumno = alumnos.find(c => c.id == parseInt(req.params.id));
    if (!buscarAlumno) return res.status(400);

    const id = req.params.id;
    const index = alumnos.indexOf(buscarAlumno);
    alumnos.splice(index, 1);

    //validar que los nombres y apellidos  no estén vacíos o null
    if (!(Boolean(req.body.nombres))) return res.status(400);
    if (!(Boolean(req.body.apellidos))) return res.status(400);

    //Validar que el promedio sea mayor a 0 y menor o igual a 100
    if (!(req.body.promedio>0 && req.body.promedio<=100)) return res.status(400);

    const alumno = {
        id: parseInt(id),
        nombres: req.body.nombres,
        apellidos: req.body.apellidos,
        matricula: parseInt(req.body.matricula),
        promedio: parseInt(req.body.promedio)
    };

    alumnos.push(alumno);
    res.status(200);


});


app.delete('/alumnos/:id', (req, res) => {
    const alumno = alumnos.find(c => c.id == parseInt(req.params.id));
    if (!alumno) return res.status(404);

    const index = alumnos.indexOf(alumno);
    alumnos.splice(index, 1);
    res.sendStatus(200);
});


//creación de endpoints de profesores

app.get('/profesores', (req, res) => {
    return res.status(200).send(profesores);
});

app.get('/profesores/:id', (req, res) => {
    const profesor = profesores.find(c => c.id == parseInt(req.params.id));
    if (!profesor) return res.status(404);
    else res.status(200).send(profesor);
});

app.post('/profesores', (req, res) => {

    //validar que los nombres y apellidos no estén vacios
    if (!(Boolean(req.body.nombres))) return res.status(400);
    if (!(Boolean(req.body.apellidos))) return res.status(400);

    //validar que el id sea mayor a 0
    if (req.body.id<1) return res.status(400);

    //validar que el numeroEmpleado sea mayor a 0
    if (req.body.numeroEmpleado<1) return res.status(400);

    //Validar que las horas clase sean mayor a 0
    if (req.body.horasClase<1) return res.status(400);

    const profesor = {
        id: parseInt(req.body.id),
        numeroEmpleado: parseInt(req.body.numeroEmpleado),
        nombres: req.body.nombres,
        apellidos: req.body.apellidos,
        horasClase: parseInt(req.body.horasClase),
    };

    profesores.push(profesor);
    res.status(201);
});


app.put('/profesores/:id', (req, res) => {
    const buscarProfesor = profesores.find(c => c.id == parseInt(req.params.id));
    if (!buscarProfesor) return res.status(404);

    const id = req.params.id;
    const index = profesores.indexOf(buscarProfesor);
    profesores.splice(index, 1);

    //validar que los nombres y apellidos  no estén vacíos o null
    if (!(Boolean(req.body.nombres))) return res.status(400);
    if (!(Boolean(req.body.apellidos))) return res.status(400);

    //validar que el numeroEmpleado sea mayor a 0
    if (req.body.numeroEmpleado<1) return res.status(400);

    //Validar que las horas clase sean mayor a 0
    if (req.body.horasClase<1) return res.status(400);

    const profesor = {
        id: parseInt(id),
        numeroEmpleado: parseInt(req.body.numeroEmpleado),
        nombres: req.body.nombres,
        apellidos: req.body.apellidos,
        horasClase: parseInt(req.body.horasClase),
    };

    profesores.push(profesor);
    res.status(200);

});


app.delete('/profesores/:id', (req, res) => {
    const profesor = profesores.find(c => c.id == parseInt(req.params.id));
    if (!profesor) return res.status(404);

    const index = profesores.indexOf(profesor);
    profesores.splice(index, 1);
    res.sendStatus(200);
});





//Configuración del puerto
const port = 8080;
app.listen(port , () => console.log(`Escuchando en puerto ${port}...`));