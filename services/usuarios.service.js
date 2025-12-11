import UsuarioModel from '../models/usuarios.model.js'; 

const buscarPorFirebaseUID = async (uid) => {
    try {
        const usuario = await UsuarioModel.findOne({ firebase_uid: uid })
            .populate('cursos_guardados')
            .populate('empleos_guardados')
            .populate('postulaciones.empleo'); 
        return usuario;
    } catch (error) {
        throw error;
    }
};

const crearUsuario = async (datosUsuario) => {
    try {
        const nuevoUsuario = await UsuarioModel.create(datosUsuario);
        return nuevoUsuario;
    } catch (error) {
        throw error;
    }
};

const actualizarUsuario = async (uid, datosAEditar) => {
    try {
        const usuarioEditado = await UsuarioModel.findOneAndUpdate(
            { firebase_uid: uid }, 
            datosAEditar, 
            { new: true }
        );
        return usuarioEditado;
    } catch (error) {
        throw error;
    }
};

const toggleCursoFavorito = async (uid, idCurso) => {
    try {
        const usuario = await UsuarioModel.findOne({ firebase_uid: uid });
        const existe = usuario.cursos_guardados.includes(idCurso);

        if (existe) {
            usuario.cursos_guardados.pull(idCurso);
        } else {
            usuario.cursos_guardados.addToSet(idCurso);
        }

        await usuario.save(); 
        await usuario.populate('cursos_guardados');
        return usuario.cursos_guardados; // se devuelve la lista actualizada

    } catch (error) {
        throw error;
    }
};

const toggleEmpleoFavorito = async (uid, idEmpleo) => {
    try {
        const usuario = await UsuarioModel.findOne({ firebase_uid: uid });
        const existe = usuario.empleos_guardados.includes(idEmpleo);

        if (existe) {
            usuario.empleos_guardados.pull(idEmpleo);
        } else {
            usuario.empleos_guardados.addToSet(idEmpleo);
        }

        await usuario.save();
        await usuario.populate('empleos_guardados');
        return usuario.empleos_guardados;
    } catch (error) {
        throw error;
    }
};

const crearPostulacion = async (uid, idEmpleo) => {
    try {
        const usuario = await UsuarioModel.findOne({ firebase_uid: uid });
        const yaPostulado = usuario.postulaciones.some(p => p.empleo.toString() === idEmpleo);

        if (yaPostulado) {
            throw new Error("Ya te has postulado a este empleo");
        }

        usuario.postulaciones.push({
            empleo: idEmpleo,
            estado: 'Pendiente',
            fecha_postulacion: new Date()
        });

        await usuario.save();
        return usuario.postulaciones;

    } catch (error) {
        throw error;
    }
};

export default {
    buscarPorFirebaseUID,crearUsuario,actualizarUsuario,toggleCursoFavorito,toggleEmpleoFavorito,crearPostulacion
};