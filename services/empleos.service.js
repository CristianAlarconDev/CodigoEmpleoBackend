import EmpleoModel from '../models/empleos.model.js'; 

const obtenerEmpleos = async () => {
    try {
        const empleos = await EmpleoModel.find();
        return empleos;
    } catch (error) {
        throw error;
    }
}

const obtenerEmpleoPorID = async (id) => {
    try {
        const empleo = await EmpleoModel.findById(id);
        return empleo;
    } catch (error) {
        throw error;
    }
};

const borrarEmpleoPorId = async (id) => {
    try {
        const empleoBorrado = await EmpleoModel.findByIdAndDelete(id);
        console.log("Empleo borrado:", empleoBorrado);
        return empleoBorrado;
    } catch (error) {
        throw error;
    }
}

const crearEmpleo = async (empleoData) => {
    try {
        const empleo = await EmpleoModel.create(empleoData);
        return empleo;
    } catch (error) {
        throw error;
    }
};

export default {
    crearEmpleo,
    borrarEmpleoPorId,
    obtenerEmpleoPorID,
    obtenerEmpleos
}