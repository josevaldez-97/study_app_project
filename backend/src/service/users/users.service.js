const{sequelize} = require("../../connection");
const {UserModel} = require("../../model/users/user.model");

const listar = async function(textoBuscar){

    console.log("Listar usuarios");

    try {
        const users = await sequelize.query(`SELECT * 
        FROM users
        WHERE 1=1
       AND UPPER(name) LIKE UPPER ('%${textoBuscar}%')
        AND deleted IS false
        ORDER BY id`);

        if(users && users[0]){

            return users[0];

        } else{
            return[];
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const consultarPorCodigo = async function (id) {
    console.log("consultar usuario por codigo");

    try {
        // Buscar en la base de datos por codigo
        const userModelResult = await UserModel.findByPk(id);

        if (userModelResult) {
           return userModelResult;
        } else {
            return null;
        }
    } catch (error) {
        console.log(error);
       throw error;
    }
};

const actualizar = async function (id, name, last_name, avatar, email, password, deleted) {
    console.log("actualizar usuarios");


    // res.send("actualiza los usuarios")
    // variables
    let usuarioRetorno = null; // guarda el usuario que se va incluir o editar
   const data = {id, name, last_name, avatar, email, password, deleted};
   // const id = req.body.id;

    try {
        
    let usrExiste = null;
    if (id) {
        usrExiste = await UserModel.findByPk(id);

    }
    if (usrExiste) {
        // asegurar que el usuario existe, entonces actualizar
        usuarioRetorno = await UserModel.update(data, { where : {id:id}});
        usuarioRetorno = data;

    } else { // incluir
        usuarioRetorno = await UserModel.create(data);

    }
    return usuarioRetorno;

    } catch (error) {
        console.log(error);
        throw error;
};
}


const eliminar = async function (id) {
    console.log("eliminar usuarios");

    // borrado fisico
   //  UserModel.destroy(req.params.id);
    try {

        await sequelize.query("UPDATE users SET deleted = true WHERE id=  " + id);
        return;
    } catch (error) {
        console.log(error);
        throw error;
    }
};


module.exports = {
    listar, busquedaPorCodigo: consultarPorCodigo, actualizar, eliminar
};