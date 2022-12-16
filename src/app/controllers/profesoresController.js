const Profesor = require('../models/profesor')

class profesoresController {
  async profesores(req, res) {
    const profesores = await Profesor.findAll()
    return res.status(200).json(profesores);
  }

  async crearProfesor(req, res) {
    const { nombres, apellidos, numeroEmpleado, horasClase } = req.body;
    const profesor = { nombres, apellidos, numeroEmpleado, horasClase };
    const profesorCreado = await Profesor.create(profesor)
    return res.status(201).json(profesorCreado);
  }

  async mostrarProfesor(req, res) {
    const { id } = req.params;
    const profesorEncontrado = await Profesor.findByPk(parseInt(id))
    if (!profesorEncontrado) {
      return res.status(404).json({ message: "profesor no existe" });
    }

    return res.status(200).json(profesorEncontrado);
  }

  async actualizarProfesor(req, res) {
    const { id } = req.params;
    const { nombres, apellidos, numeroEmpleado, horasClase } = req.body;
    const profesor = { nombres, apellidos, numeroEmpleado, horasClase };
    const profesorEncontrado = await Profesor.findByPk(id)
    if (!profesorEncontrado) {
      return res.status(404).json({ message: "profesor no existe" });
    }
    await Profesor.update(profesor, { where: { id } })
    return res.status(200).json({ message: "Profesor actualizado" });
  }

  async eliminarProfesor(req, res) {
    const { id } = req.params;
    const profesorEncontrado = await Profesor.findByPk(id)
    if (!profesorEncontrado) {
      return res.status(404).json({ message: "profesor no existe" });
    }

    await profesorEncontrado.destroy()
    return res.status(200).json({ message: "profesor eliminado" });
  }
}

module.exports = new profesoresController();
