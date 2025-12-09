import services from '../services/cursos.service.js';

/* MANEJO DE REQUEST Y RESPONSE */

const getAllCourses = async (req, res) => {
    try {
        const cursos = await services.obtenerCursos();
        return res.json(cursos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener cursos" });
    }
};

const getCourseById = async (req, res) => {
    try {
        const { id } = req.params;
        const curso = await services.obtenerCursoPorID(id);
        if (!curso) {
            return res.status(404).json({ message: "Curso no encontrado" });
        }
        res.json(curso);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al buscar el curso" });
    }
};

const deleteCourseById = async (req, res) => {
    const { id } = req.params;
    try {
        const cursoBorrado = await services.borrarCursoPorId(id);
        if (!cursoBorrado) {
            return res.status(404).json({ message: "No existe un curso con ese ID para borrar" });
        }
        res.json({
            message: "Curso borrado correctamente",
            curso: cursoBorrado
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al borrar curso" });
    }
};

const createCourse = async (req, res) => {
    const cursoData = req.body;
    try {
        const nuevoCurso = await services.crearCurso(cursoData);
        res.status(201).json({
            message: "Curso creado con éxito",
            curso: nuevoCurso
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Error al crear el curso. Verifica los datos." });
    }
};

const updateCourse = async (req, res) => {
    const { id } = req.params;
    const dataToUpdate = req.body;
    try {
        const cursoActualizado = await services.actualizarCurso(id, dataToUpdate);
        if (!cursoActualizado) {
            return res.status(404).json({ message: "No se encontró el curso para actualizar" });
        }
        res.json({
            message: "Curso actualizado correctamente",
            curso: cursoActualizado
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al actualizar el curso" });
    }
};

const getCoursesByFilters = async (req, res) => {
    try {
        const { pagina, limite, busqueda, ...filtros } = req.query;

        const resultado = await services.obtenerCursosConFiltros(filtros, pagina, limite, busqueda);
        
        res.json(resultado);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener cursos" });
    }
};

export default { createCourse, updateCourse, deleteCourseById, getCourseById, getAllCourses, getCoursesByFilters };