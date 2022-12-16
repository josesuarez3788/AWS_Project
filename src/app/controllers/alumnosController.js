const upload = require("../../config/s3")
const singleUpload = upload.single("foto")
const Alumno = require('../models/alumno')

class alumnosController {
  async alumnos(req, res) {
    const alumnos = await Alumno.findAll()
    return res.status(200).json(alumnos);
  }

  async crearAlumno(req, res) {
    const { nombres, apellidos, matricula, promedio } = req.body;
    const alumno = { nombres, apellidos, matricula, promedio };
    const createdUser = await Alumno.create(alumno)
    return res.status(201).json(createdUser);
  }

  async alumnoFotoPerfil(req, res){
    const { id } = req.params;
    const alumnoEncontrado = await Alumno.findByPk(parseInt(id))
    if (!alumnoEncontrado) {
      return res.status(404).json({ message: "alumno no existe" });
    }
    singleUpload(req, res, async function(err){
      if(err){
        return res.status(400).json({message: 'There was an error', error: err})
      }

      const fotoPerfil = { fotoPerfilUrl: req.file.location }
      await Alumno.update(fotoPerfil, { where: { id }})
      const alumnoEncontrado = await Alumno.findByPk(parseInt(id))
      return res.status(200).json(alumnoEncontrado);
    })
  }

  async mostrarAlumno(req, res) {
    const { id } = req.params;
    const alumnoEncontrado = await Alumno.findByPk(parseInt(id))
    if (!alumnoEncontrado) {
      return res.status(404).json({ message: "alumno no existe" });
    }

    return res.status(200).json(alumnoEncontrado);
  }

  async actualizarAlumno(req, res) {
    const { id } = req.params;
    const { nombres, apellidos, matricula, promedio } = req.body;

    const alumnoEncontrado = await Alumno.findByPk(id)
    const alumno = { nombres, apellidos, matricula, promedio }
    if (!alumnoEncontrado) {
      return res.status(404).json({ message: "alumno no existe" });
    }
    await Alumno.update(alumno, { where: { id } })
    return res.status(200).json({message: 'alumno actualizado'});
  }

  async eliminarAlumno(req, res) {
    const { id } = req.params;
    const alumnoEncontrado = await Alumno.findByPk(id)
    if (!alumnoEncontrado) {
      return res.status(404).json({ message: "alumno no existe" });
    }

    await alumnoEncontrado.destroy()
    return res.status(200).json({ message: "alumno eliminado" });
  }
}

module.exports = new alumnosController();
