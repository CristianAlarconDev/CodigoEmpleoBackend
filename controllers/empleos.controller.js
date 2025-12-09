import services from '../services/empleos.service.js'

/*ACA MANEJO LOS REQUEST AND RESPONSE */

const getAllJobs= async(req, res)=>{
    try {
        const empleos = await services.obtenerEmpleos();
        return res.json(empleos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener empleos" });
    }

}

const getJobById = async(req, res) => {
    try {
        const { id } = req.params;
        const job=await services.obtenerEmpleoPorID(id);
        if (!job) {
            return res.status(404).json({ message: "Empleo no encontrado" });
        }
        res.json(job)
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error al buscar el empleo"})
    }

};

const deleteJobById = async(req,res)=>{
    const { id } = req.params;
    try {
        const empleoBorrado = await services.borrarEmpleoPorId(id);
        if (!empleoBorrado) {
            return res.status(404).json({ message: "No hay empleo para ese ID" });
        }
        res.json({
            message: "Empleo borrado correctamente",
            producto: empleoBorrado
        });

    } catch (error) {
        res.status(500).json({ message: "Error al borrar empleo" });
    }

}

const createJob = async(req, res) => {
    const jobData= req.body;
    try {
        const newJob=await services.crearEmpleo(jobData);
        res.json({message: "Empleo creado correctamente" ,empleo:newJob})
    } catch (error) {
        res.status(400).json({message: "Error al agregar el empleo, verificar datos"})
    }
};

export default { createJob, deleteJobById, getJobById, getAllJobs}