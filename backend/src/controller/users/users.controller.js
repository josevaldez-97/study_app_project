const { sequelize } = require("../../connection");
const { UserModel } = require("../../model/users/user.model");
const UserService = require('../../service/users/users.service');
const listar = async function (req, res) {
    console.log("listar usuarios controller");

    try {
       // 
       const users = await UserService.listar(req.query.filtro || '');

        if (users) {
            // En users[0] se encuentra el listado de lo que se recupera desde el SQL
            res.json({
                success: true,
                usuarios: users
            });
        } else {
            res.json({
                success: true,
                usuarios: []
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            error: error.message
        });
    }
};

const consultarPorCodigo = async function (req, res) {
    console.log("consultar usuarios");

    try {
        // Buscar en la base de datos por codigo
        const userModelResult = await  UserModel.findByPk(req.params.id);

        if (userModelResult) {
            res.json({
                success: true,
                usuario: userModelResult
            });
        } else {
            res.json({
                success: true,
                usuario: null
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            error: error.message
        });
    }
};

const actualizar = async function (req, res) {
    console.log("actualizar usuarios controller");

    // variables
    let usuarioRetorno = null; // guarda el usuario que se va incluir o editar
    //const data = req.body; // se optiene los datos del cuerpo de la peticion 
   // const id = req.body.id;

    try {   
    usuarioRetorno = await UserService.actualizar(
                                                     req.body.id, 
                                                     req.body.name, 
                                                     req.body.last_name,
                                                     req.body.avatar,
                                                     req.body.email,
                                                     req.body.password,
                                                     req.body.deleted);

        res.json({
            success:true,
            user: usuarioRetorno
        })

    } catch (error) {
        console.log(error);
         res.json({
        success: false,
        error: error.message
    });
};
}


const eliminar = async function(req, res) {
    console.log("eliminar usuarios");
    //res.send("eliminar de usuarios");

    //Borrado fisico
    //UserModel.destroy(req.params.id);
    try {
        await sequelize.query("UPDATE users SET deleted=true WHERE id = " + req.params.id);
            
        res.json({
            success : true
        });
    } catch (error) {
        console.log(error);
        res.json({
            success : false, 
            error : error.message
        });
    }
};


module.exports = {
    listar, busquedaPorCodigo: consultarPorCodigo, actualizar, eliminar
};