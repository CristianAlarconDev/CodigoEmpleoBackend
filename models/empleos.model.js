import mongoose from "mongoose";

const EsquemaEmpleo = new mongoose.Schema({
    titulo: { 
        type: String, 
        required: true 
    },
    empresa: { 
        type: String, 
        required: true 
    },
    ubicacion: { type: String }, 
    salario: { type: String },   
    descripcion: { type: String },
    
    modalidad: { 
        type: String
    },
    seniority: { type: String }, 
    tipo_contrato: { type: String }, 

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

const ModeloEmpleo = mongoose.model("empleo", EsquemaEmpleo);

export default ModeloEmpleo;