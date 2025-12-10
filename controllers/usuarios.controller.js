import services from '../services/usuarios.service.js';

//OBTENER USUARIO (Perfil)
const getUserProfile = async (req, res) => {
    try {
        const { uid } = req.params;
        const usuario = await services.buscarPorFirebaseUID(uid);
        
        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        res.status(200).json(usuario);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener usuario" });
    }
};

//CREAR USUARIO (Registro)
const registerUser = async (req, res) => {
    try {
        const usuarioData = req.body; // { firebase_uid, email, nombre, ... }
        const nuevoUsuario = await services.crearUsuario(usuarioData);
        res.status(201).json(nuevoUsuario);
    } catch (error) {
        // Error de duplicado (E11000 es como trata mongo la duplicacion)
        if (error.code === 11000) {
            return res.status(400).json({ message: "El usuario ya existe" });
        }
        console.error(error);
        res.status(500).json({ message: "Error al registrar usuario" });
    }
};

//ACTUALIZAR (Foto, nombre, etc)
const updateUser = async (req, res) => {
    try {
        const { uid } = req.params;
        const data = req.body;
        const usuario = await services.actualizarUsuario(uid, data);
        if (!usuario) return res.status(404).json({ message: "Usuario no encontrado" });
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar" });
    }
};

// TOGGLES FAVORITOS
const toggleCourseFav = async (req, res) => {
    try {
        const { uid } = req.params;
        const { idCurso } = req.body; 
        
        const listaActualizada = await services.toggleCursoFavorito(uid, idCurso);
        res.status(200).json({ message: "Lista actualizada", cursos_guardados: listaActualizada });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const toggleJobFav = async (req, res) => {
    try {
        const { uid } = req.params;
        const { idEmpleo } = req.body;

        const listaActualizada = await services.toggleEmpleoFavorito(uid, idEmpleo);
        res.status(200).json({ message: "Lista actualizada", empleos_guardados: listaActualizada });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// POSTULARSE
const postulateToJob = async (req, res) => {
    try {
        const { uid } = req.params;
        const { idEmpleo } = req.body;

        const postulaciones = await services.crearPostulacion(uid, idEmpleo);
        res.status(201).json({ message: "Postulación exitosa", postulaciones });
    } catch (error) {
        // Manejo el error "Ya te has postulado" que lance en el service
        if (error.message.includes("Ya te has postulado")) {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: "Error al postularse" });
    }
};

export default {
    getUserProfile,registerUser,updateUser,toggleCourseFav,toggleJobFav,postulateToJob
};