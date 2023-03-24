const { sequelize } = require("../../connection");
const { UserModel } = require("../../model/users/user.model");
const  UserService  = require("../../service/users/users.service")

const listar = async function (req, res) {
    console.log("listar usuarios");
    try {
        const users = await UserService.listar(req.query.filtro || '');

        if (users) {
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
    console.log("consultar 1 usuario por codigo");
    try {
        const userModelResult = await UserService.consultarPorCodigo(req.params.id);
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
    console.log("actualizar usuarios");
    let usuarioRetorno = null; // guarda el usuario que se va incluir o editar

    try {
        usuarioRetorno = await UserService.actualizar( req.body.id, req.body.name, req.body.lastname,
                                                       req.body.avatar, req.body.email, 
                                                       req.body.password, req.body.deleted);
        res.json({
        success: true,
        user: usuarioRetorno
    });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            error: error.message
        });
    };
}


const eliminar = async function (req, res) {
    console.log("eliminar usuarios");
    //BorradoFisico
    //UserModel.destroy(req.params.id);
    try {
        await UserService.eliminar(req.params.id);
        res.json({
            success: true
        });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            error: error.message
        });
    }
};


module.exports = {
    listar, consultarPorCodigo, actualizar, eliminar
};