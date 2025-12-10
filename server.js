import express from "express";
import "dotenv/config";
import cors from 'cors';
import connectDB from './src/config/db.js';
import cursosRoutes from './routers/cursos.router.js';
import empleosRoutes from './routers/empleos.router.js';
import usuariosRoutes from './routers/usuarios.router.js'

//CONFIG
const app = express();
const PORT = process.env.PORT || 8000;
//MIDDLEWARES
app.use(cors())
app.use(express.json());
//RUTAS
app.use('/api/cursos', cursosRoutes);
app.use('/api/empleos', empleosRoutes);
app.use('/api/usuarios', usuariosRoutes);
/*
app.get('/', (req, res) => {
    res.send('Hello World!')
})*/

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(` Server corriendo en http://localhost:${PORT}`);
    });
});

/*
app.listen(PORT, () => {
    console.log(`Server corriendo en puerto ${PORT}`)
})
    */