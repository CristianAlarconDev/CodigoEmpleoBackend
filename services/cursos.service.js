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

const obtenerCursosConFiltros = async (filtros = {}, pagina = 1, limite = 10, busqueda = "") => {
    try {
        const queryMongo = {};
        if (filtros.modalidad) {
            queryMongo.modalidad = { $regex: `^${filtros.modalidad}$`, $options: "i" }; 
        }
        if (filtros.categoria) {
            queryMongo.categoria = { $regex: `^${filtros.categoria}$`, $options: "i" };
        }

        if (busqueda) {
            queryMongo.$or = [
                { titulo: { $regex: busqueda, $options: "i" } },
                { tecnologias_csv: { $regex: busqueda, $options: "i" } },
                { autor: { $regex: busqueda, $options: "i" } },
                { seniority: { $regex: busqueda, $options: "i" } }
            ];
        }

        // paginacion y collation
        const paginaActual = parseInt(pagina) || 1;
        const limiteParseado = parseInt(limite) || 10;
        const skip = (paginaActual - 1) * limiteParseado;
        const opcionesIdioma = { locale: 'es', strength: 1 };

        const [cursos, total] = await Promise.all([
            CursoModel.find(queryMongo).collation(opcionesIdioma).skip(skip).limit(limiteParseado),
            CursoModel.countDocuments(queryMongo).collation(opcionesIdioma)
        ]);

        return {
            data: cursos,
            meta: {total,page: paginaActual,limit: limiteParseado,totalPages: Math.ceil(total / limiteParseado)

            }
        };

    } catch (error) {
        throw error;
    }
};

export default {crearCurso, actualizarCurso, borrarCursoPorId, obtenerCursoPorID, obtenerCursos, obtenerCursosConFiltros}