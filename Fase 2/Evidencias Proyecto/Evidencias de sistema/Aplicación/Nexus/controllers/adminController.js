import News from "../models/mNews.js";
import Courses from "../models/mCursos.js";
import moment from "moment/moment.js";
import { Sequelize, Op } from "sequelize"; // Asegúrate de importar `Op` desde Sequelize

const cAdmin = {
    panelAdmin: async (req, res) => {
        // Obtener la fecha actual formateada
        const fechaActual = moment().startOf('day').add(1, 'day').toDate(); // Añade un día para excluir hoy


        // Consultas
        const consultas = [];
        consultas.push(News.findAll({ where: { usuarioId: req.user.id } }));
        consultas.push(Courses.findAll({
            where: {
                usuarioId: req.user.id,
                // Aquí se usa la fecha formateada para comparar
                fecha: { [Op.gte]: fechaActual } // Comparación con la fecha formateada
            }
        }));
        consultas.push(Courses.findAll({
            where: {
                usuarioId: req.user.id,
                // Aquí se usa la fecha formateada para comparar
                fecha: { [Op.lt]: fechaActual } // Comparación con la fecha formateada
            }
        }));

        const [news, courses,previous] = await Promise.all(consultas);

        courses.forEach(course => {
            console.log("Fecha del curso:", course.fecha);
        });


        res.render('administracion', {
            nombrePagina: 'Panel de Administración',
            news,
            courses,
            moment,
            previous 
        });
    }
}

export default cAdmin;
