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

const actualizarEmpleo = async (id, empleoData) => {
    try {
        const empleoActualizado = await EmpleoModel.findByIdAndUpdate(id, empleoData, { new: true });
        return empleoActualizado;
    } catch (error) {
        throw error;
    }
};
const obtenerEmpleosConFiltros = async (filtros = {}, pagina = 1, limite = 10, busqueda = "") => {
    try {
        const queryMongo = {};
        //normalizo el campo porque no recuerdo como se escribio en el front 'i' para eso
        if (filtros.modalidad) {
            queryMongo.modalidad = { $regex: filtros.modalidad, $options: "i" };        }
        if (filtros.seniority) {
            queryMongo.seniority = { $regex: `^${filtros.seniority}$`, $options: "i" };
        }
        /*caso de que venga una palabra en el campo busqueda */
        if (busqueda) {
            queryMongo.$or = [{ titulo: { $regex: busqueda, $options: "i" } }, { empresa: { $regex: busqueda, $options: "i" } }];
        }
        const paginaActual = parseInt(pagina) || 1;
        const limiteParseado = parseInt(limite) || 10;
        const skip = (paginaActual - 1) * limiteParseado;
        //para usar en collation y que haga comparacion sin case sensitive y sin tomar en cuenta tildes
        const opcionesIdioma = { locale: 'es', strength: 1 };
        const [empleos, total] = await Promise.all([
            EmpleoModel.find(queryMongo).collation(opcionesIdioma).skip(skip).limit(limiteParseado),
            EmpleoModel.countDocuments(queryMongo).collation(opcionesIdioma) 
        ]);

        return {
            data: empleos,
            meta: {
                total,
                page: paginaActual,
                limit: limiteParseado,
                totalPages: Math.ceil(total / limiteParseado)
            }
        };

    } catch (error) {
        throw error;
    }
}


export default {
    crearEmpleo, actualizarEmpleo,
    borrarEmpleoPorId,
    obtenerEmpleoPorID,
    obtenerEmpleos,obtenerEmpleosConFiltros
}