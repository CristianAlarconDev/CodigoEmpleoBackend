import mongoose from "mongoose";

const EsquemaCurso = new mongoose.Schema({
    titulo: { 
        type: String, 
        required: true 
    },
    autor: { 
        type: String, 
        required: true 
    },
    duracion: { type: String },
    imagen: { type: String },  
    tecnologias_csv: { type: String }, 
    categoria: { type: String }, 
    seniority: { type: String }, 
    descripcion: { type: String },
    modalidad: { 
        type: String
    },
    
    precio: { type: Number, default: 0 },
    calificacion: { type: Number, default: 0 },

    
    plataforma: { type: String, default: "CodigoEmpleo" },
    es_externo: { type: Boolean, default: false },
    url_destino: { type: String },

    
    fecha_creacion: { 
        type: Date, 
        default: Date.now 
    }
}, {
    versionKey: false 
});

const ModeloCurso = mongoose.model("curso", EsquemaCurso);

export default ModeloCurso;