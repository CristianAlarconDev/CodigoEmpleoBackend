import CursoModel from '../models/cursos.model.js'

const obtenerCursos= async()=>{
    try {
        const cursos = await CursoModel.find();
        return cursos;
    } catch (error) {
        throw error;
    }

}

const obtenerCursoPorID = async (id) => {
    try {
        const curso = await CursoModel.findById(id);
        return curso;
    } catch (error) {
        throw error;
    }
};

const borrarCursoPorId = async(id)=>{
    try {
        const cursoBorrado =await CursoModel.findByIdAndDelete(id);
        console.log(cursoBorrado)
        return cursoBorrado;
    } catch (error) {
        throw error;
    }
}

const crearCurso = async (cursoData) => {
    try {
        const curso = await CursoModel.create(cursoData);
        return curso;
    } catch (error) {
        throw error;
    }
};

const actualizarCurso = async (id, cursoData) => {
    try {
        const cursoActualizado = await CursoModel.findByIdAndUpdate(id, cursoData, { new: true });
        return cursoActualizado;
    } catch (error) {
        throw error;
    }
};

export default {crearCurso, actualizarCurso, borrarCursoPorId, obtenerCursoPorID, obtenerCursos}