import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema({
    firebase_uid: {
        type: String,
        required: true,
        unique: true 
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    nombre: {
        type: String,
        default: "Usuario Nuevo"
    },
    imagen: {
        type: String 
    },
    rol: {
        type: String,
        enum: ['user', 'admin'], 
        default: 'user'
    },

    cursos_guardados: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'curso' // deberia coincidir con el modelo
        }
    ],
    empleos_guardados: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'empleo' // deberia coincidir con el modelo
        }
    ],

    postulaciones: [
        {
            empleo: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'empleo',
                required: true
            },
            fecha_postulacion: {
                type: Date,
                default: Date.now
            },
            estado: {
                type: String,
                enum: ['Pendiente', 'Visto', 'En Proceso', 'Rechazado', 'Finalizado'],
                default: 'Pendiente'
            }
        }
    ],

    fecha_creacion: {
        type: Date,
        default: Date.now
    }
}, {
    versionKey: false 
});

const UsuarioModel = mongoose.model('usuario', usuarioSchema);

export default UsuarioModel;