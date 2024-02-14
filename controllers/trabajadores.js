const { response } = require('express');
const Trabajador = require('../models/Trabajador');

const getTrabajadores = async (req, res = response) => {
    // Obtener todos los trabajadores o filtrados por algún criterio
    const trabajadores = await Trabajador.find().populate('user');
    res.json({
        ok: true,
        trabajadores
    });
};

const crearTrabajador = async (req, res = response) => {
    const trabajadorData = req.body;
    const trabajador = new Trabajador(trabajadorData);
    try {
        const trabajadorGuardado = await trabajador.save();
        res.status(201).json({
            ok: true,
            trabajadorGuardado
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};

const actualizarTrabajador = async (req, res = response) => {
    const trabajadorId = req.params.id;
    const { uid } = req.uid;
    const { nombre, ci, direccion, docente, categoriaDocente, categoriaCientifica, escolaridad, ocupacion, tiempos, user } = req.body;
    try {
        const trabajador = await Trabajador.findById(trabajadorId);
        if (!trabajador) {
            return res.status(404).json({
                ok: false,
                msg: 'Trabajador no existe'
            });
        }
        // Aquí puedes agregar lógica adicional para verificar permisos si es necesario
        const nuevoTrabajador = {
            nombre,
            ci,
            direccion,
            docente,
            categoriaDocente,
            categoriaCientifica,
            escolaridad,
            ocupacion,
            tiempos,
            user
        };
        const trabajadorActualizado = await Trabajador.findByIdAndUpdate(trabajadorId, nuevoTrabajador, { new: true });
        res.json({
            ok: true,
            msg: 'Trabajador actualizado',
            trabajador: trabajadorActualizado
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};

const eliminarTrabajador = async (req, res = response) => {
    const trabajadorId = req.params.id;
    try {
        const trabajador = await Trabajador.findById(trabajadorId);
        if (!trabajador) {
            return res.status(404).json({
                ok: false,
                msg: 'Trabajador no existe'
            });
        }
        const trabajadorEliminado = await Trabajador.findByIdAndDelete(trabajadorId);
        res.json({
            ok: true,
            msg: 'Trabajador eliminado',
            trabajador: trabajadorEliminado
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};

module.exports = {
    getTrabajadores,
    crearTrabajador,
    actualizarTrabajador,
    eliminarTrabajador
};