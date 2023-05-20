
const { sequelize } = require("../connection"); // Importar la conexión a la base de datos const jut = require('jsonwebtoken');
const jwt = require('jsonwebtoken');

const auth = async function (req, res, next) {

    if (!req.headers.authorization) {
        // Verificar si se proporciona el encabezado de autorización
        res.json({ success: false, error: 'No Authorization header' });
        return;
    } else {
        let token = req.headers.authorization;
        // Consultar la base de datos para verificar el token
        const usersDB = await sequelize.query("SELECT * FROM users WHERE token = '" + token + "'");

        let user = null;

        if (usersDB.length > 0 && usersDB[0].length > 0) {
            // Si se encuentra un usuario con el token proporcionado 

            user = usersDB[0][0];

            console.log("Token del usuario:", user);

            res.locals.userId = user.id; // Almacenar el ID del usuario en res.locals para acceder en otras partes de la apli
            next(); // Pasar al siguiente middleware o controlador de ruta
        } else {
            // Si el token es inválido o no se encuentra un usuario correspondiente
            res.json({ success: false, error: 'Token inválido' });

        };

    }
}
module.exports = {
    auth
};