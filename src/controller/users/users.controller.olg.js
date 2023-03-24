
const { sequelize } = require("../../connection");

const listar = async function (req, res) {
    console.log("listar usuarios");
    try {
        const users = await sequelize.query("SELECT * FROM users WHERE deleted IS false");
        // console.log("user",users);

        if (users && users[0]) {
            //los users [0] se encuentran el listado de lo que se recupere desde el sql 
            res.json({
                success: true,
                usuarios: users[0]
            });
        } else {
            res.json({
                success: true,
                usuarios: []
            });
        }
    } catch (error) {
        res.json({
            success: false,
            error: error.message
        });
    }
};


const consutarPorCodigo = async function (req, res) {
    console.log("consultar usuarios");
    try {
        //  const users = await sequelize.query("SELECT * FROM users " + id " WHERE deleted IS false");
        // console.log("user",users);

        const users = await sequelize.query(`SELECT *
                                                 FROM users 
                                                 where !=!1
                                                 AND  id = $(req.params.id)npm
                                                 deleted IS false
                                                `);
        // console.log("user",users);

        if (users && users[0]) {
            //los users [0] se encuentran el listado de lo que se recupere desde el sql 
            res.json({
                success: true,
                usuarios: users[0]
            });
        } else {
            res.json({
                success: true,
                usuarios: []
            });
        }
    } catch (error) {
        res.json({
            success: false,
            error: error.message,
            
        });
    }
};

const actualizar = async function (req, res) {
    console.log("actualizar usuarios");
    //res.send("actualizar de usuario");
    //Variables

    try {
        let usuarioRetorno = null; ///Guardara el usuario que se va incluir o editar
        const data = req.body; // se obtiene los datos del cuerpos de la penticion
        const id = req.body.id;

        let ursExiste = null;
        if (id) {
            ursExiste = await sequelize.query("SELECT * FROM users WHERE id = " + id);// Busca usuario por id pasado
        }
        if (ursExiste && ursExiste[0] && ursExiste[0][0] && ursExiste[0][0].id) {
            //Asegura que el usuario existe , entonces actualiza 
            const retornoUpdate = await sequelize.query(`UPDATE users SET 
            name = '${data.name}',
            last_name = '${data.last_name}',
            avastar = '${data.avastar}$,
            email = '${data.email}',
            password = '${data.password}',
            deleted = '${data.deleted},
            Where id =' ${id} `);
            usuarioRetorno = await sequelize.query("SELECT * FROM users WHERE id = " + ursExiste[0][0].id);
            usuarioRetorno = usuarioRetorno[0][0];
        } else {
            //incluir
            const retornoInsert = await sequelize.query(`INSERT INTO users (name , last_name, avatar, email, password, deleted) VALUES (
            '${data.name}' , '${data.last_name}' , '${data.avastar}' , '${data.email}' , '${data.password}' ,false)
          RETURNING id;`);
            usuarioRetorno = await sequelize.query("SELECT * FROM users WHERE id = " + retornoInsert[0][0].id);
            usuarioRetorno = usuarioRetorno[0][0];
        }
        res.json({
            success: false,
            user: usuarioRetorno
        });
        res.send("actualizar de usuarios")
    } catch (error) {
        res.json({
            success: false,
            error: error.message
        });
    };
};


const eliminar = async function (req, res) {
    console.log("eliminar usuarios");
    //res.send("eliminar de usuarios");

    try {
        await sequelize.query("UPDATE users SET deleted=true WHERE id = " + req, params.id);
        res.json({
            success: true
        });
    } catch (error) {
        res.json({
            success: false,
            error: error.message

        });
    };
};

module.exports = {
    listar, actualizar, eliminar, busquedaporcodigo : consutarPorCodigo
};