const router = require("express").Router();

const AlumnosController = require("./app/controllers/alumnosController");
const ProfesoresController = require("./app/controllers/profesoresController");
const alumnoValidator = require("./app/validators/alumnoValidator");
const profesorValidator = require("./app/validators/profesorValidator");

router.get("/alumnos", AlumnosController.alumnos);

router.get("/alumnos/:id", AlumnosController.mostrarAlumno);
router.post("/alumnos", alumnoValidator.check, AlumnosController.crearAlumno);
router.post("/alumnos/:id/fotoPerfil", AlumnosController.alumnoFotoPerfil)

router.put("/alumnos/:id", alumnoValidator.check,AlumnosController.actualizarAlumno);
router.delete("/alumnos/:id", AlumnosController.eliminarAlumno);

router.get("/profesores", ProfesoresController.profesores);

router.get("/profesores/:id", ProfesoresController.mostrarProfesor);
router.post("/profesores", profesorValidator.check, ProfesoresController.crearProfesor);

router.put("/profesores/:id", profesorValidator.check, ProfesoresController.actualizarProfesor);
router.delete("/profesores/:id", ProfesoresController.eliminarProfesor);
router.all("/profesores", (req, res, next) => {
  return res.status(405).json({message: 'unsupported method'})
});
router.all("/alumnos", (req, res, next) => {
    return res.status(405).json({message: 'unsupported method'})
});

module.exports = router;