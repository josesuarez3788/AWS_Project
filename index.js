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
    if (!alumno) return res.status(404).send('Alumno no encontrado');
    else res.status(200).send(alumno);
});


app.post('/alumnos', (req, res) => {

    //validar que los nombres y apellidos  no estén vacíos o null
    // if (req.body.nombres == null) return res.status(404).send('Los nombres no pueden estar null');
    // if (req.body.apellidos == null) return res.status(404).send('Los apellidos no pueden estar null');

    if (!(Boolean(req.body.nombres))) return res.status(404).send('Los nombres no pueden estar null o vacios');
    if (!(Boolean(req.body.apellidos))) return res.status(404).send('Los apellidos no pueden estar null o vacios');


    //Validar que el promedio sea mayor a 0 y menor o igual a 100
    if (!(req.body.promedio>0 && req.body.promedio<=100)) return res.status(404).send('El promedio debe ser mayor a 0 y menor o igual a 100');

    //validar que el id sea mayor a 0
    if (req.body.id<0) return res.status(404).send('El ID debe ser mayor a 0');


    var numeros = "0123456789";
    //Validar que los nombres no contenga numeros
    for(i=0;i<req.body.nombres.length;i++){
        if (numeros.indexOf(req.body.nombres.charAt(i),0)!=-1){
            return res.status(404).send('Los nombres no pueden tener numeros');
        }
    }

    //Validar que los apellidos no contengan números
    for(i=0;i<req.body.apellidos.length;i++){
        if (numeros.indexOf(req.body.apellidos.charAt(i),0)!=-1){
            return res.status(404).send('Los apellidos no pueden tener numeros');
        }
    }


    const alumno = {
        id: parseInt(req.body.id),
        nombres: req.body.nombres,
        apellidos: req.body.apellidos,
        matricula: req.body.matricula,
        promedio: parseInt(req.body.promedio)
    };

    alumnos.push(alumno);
    res.status(201).send('Alumno añadido');
});


app.put('/alumnos/:id', (req, res) => {
    const buscarAlumno = alumnos.find(c => c.id == parseInt(req.params.id));
    if (!buscarAlumno) return res.status(404).send('Estudiante no encontrado');

    const id = req.params.id;
    const index = alumnos.indexOf(buscarAlumno);
    alumnos.splice(index, 1);

    var numeros = "0123456789";
    //Validar que los nombres no contenga numeros
    for(i=0;i<req.body.nombres.length;i++){
        if (numeros.indexOf(req.body.nombres.charAt(i),0)!=-1){
            return res.status(404).send('Los nombres no pueden tener numeros');
        }
    }

    //Validar que los apellidos no contengan números
    for(i=0;i<req.body.apellidos.length;i++){
        if (numeros.indexOf(req.body.apellidos.charAt(i),0)!=-1){
            return res.status(404).send('Los apellidos no pueden tener numeros');
        }
    }

    //validar que los nombres y apellidos  no estén vacíos o null
    if (!(Boolean(req.body.nombres))) return res.status(404).send('Los nombres no pueden estar null o vacios');
    if (!(Boolean(req.body.apellidos))) return res.status(404).send('Los apellidos no pueden estar null o vacios');

    //Validar que el promedio sea mayor a 0 y menor o igual a 100
    if (!(req.body.promedio>0 && req.body.promedio<=100)) return res.status(404).send('El promedio debe ser mayor a 0 y menor o igual a 100');

    const alumno = {
        id: parseInt(id),
        nombres: req.body.nombres,
        apellidos: req.body.apellidos,
        matricula: parseInt(req.body.matricula),
        promedio: parseInt(req.body.promedio)
    };

    alumnos.push(alumno);
    res.status(200).send('Alumno actualizado');


});


app.delete('/alumnos/:id', (req, res) => {
    const alumno = alumnos.find(c => c.id == parseInt(req.params.id));
    if (!alumno) return res.status(404).send('Estudiante no encontrado');

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
    if (!profesor) return res.status(404).send('Profesor no encontrado');
    else res.status(200).send(profesor);
});

app.post('/profesores', (req, res) => {

    //validar que los nombres y apellidos no estén vacios
    if (!(Boolean(req.body.nombres))) return res.status(404).send('Los nombres no pueden estar null o vacios');
    if (!(Boolean(req.body.apellidos))) return res.status(404).send('Los apellidos no pueden estar null o vacios');

    //validar que el id sea mayor a 0
    if (req.body.id<1) return res.status(404).send('El ID debe ser mayor a 0');

    //validar que el numeroEmpleado sea mayor a 0
    if (req.body.numeroEmpleado<1) return res.status(404).send('El numero de empleado debe ser mayor a 0');

    //Validar que las horas clase sean mayor a 0
    if (req.body.horasClase<1) return res.status(404).send('Las horas de clase deben ser mayor a 0');

    var numeros = "0123456789";
    //Validar que los nombres no contenga numeros
    for(i=0;i<req.body.nombres.length;i++){
        if (numeros.indexOf(req.body.nombres.charAt(i),0)!=-1){
            return res.status(404).send('Los nombres no pueden tener numeros');
        }
    }

    //Validar que los apellidos no contengan números
    for(i=0;i<req.body.apellidos.length;i++){
        if (numeros.indexOf(req.body.apellidos.charAt(i),0)!=-1){
            return res.status(404).send('Los apellidos no pueden tener numeros');
        }
    }

    const profesor = {
        id: parseInt(req.body.id),
        numeroEmpleado: parseInt(req.body.numeroEmpleado),
        nombres: req.body.nombres,
        apellidos: req.body.apellidos,
        horasClase: parseInt(req.body.horasClase),
    };

    profesores.push(profesor);
    res.status(201).send('Profesor añadido');
});


app.put('/profesores/:id', (req, res) => {
    const buscarProfesor = profesores.find(c => c.id == parseInt(req.params.id));
    if (!buscarProfesor) return res.status(404).send('Profesor no encontrado');

    const id = req.params.id;
    const index = profesores.indexOf(buscarProfesor);
    profesores.splice(index, 1);

    var numeros = "0123456789";
    //Validar que los nombres no contenga numeros
    for(i=0;i<req.body.nombres.length;i++){
        if (numeros.indexOf(req.body.nombres.charAt(i),0)!=-1){
            return res.status(404).send('Los nombres no pueden tener numeros');
        }
    }

    //Validar que los apellidos no contengan números
    for(i=0;i<req.body.apellidos.length;i++){
        if (numeros.indexOf(req.body.apellidos.charAt(i),0)!=-1){
            return res.status(404).send('Los apellidos no pueden tener numeros');
        }
    }

    //validar que los nombres y apellidos  no estén vacíos o null
    if (!(Boolean(req.body.nombres))) return res.status(404).send('Los nombres no pueden estar null o vacios');
    if (!(Boolean(req.body.apellidos))) return res.status(404).send('Los apellidos no pueden estar null o vacios');

    //validar que el numeroEmpleado sea mayor a 0
    if (req.body.numeroEmpleado<1) return res.status(404).send('El numero de empleado debe ser mayor a 0');

    //Validar que las horas clase sean mayor a 0
    if (req.body.horasClase<1) return res.status(404).send('Las horas de clase deben ser mayor a 0');

    const profesor = {
        id: parseInt(id),
        numeroEmpleado: parseInt(req.body.numeroEmpleado),
        nombres: req.body.nombres,
        apellidos: req.body.apellidos,
        horasClase: parseInt(req.body.horasClase),
    };

    profesores.push(profesor);
    res.status(200).send('Profesor actualizado');

});


app.delete('/profesores/:id', (req, res) => {
    const profesor = profesores.find(c => c.id == parseInt(req.params.id));
    if (!profesor) return res.status(404).send('Profesor no encontrado');

    const index = profesores.indexOf(profesor);
    profesores.splice(index, 1);
    res.sendStatus(200);
});





//Configuración del puerto
const port = 8080;
app.listen(port , () => console.log(`Escuchando en puerto ${port}...`));