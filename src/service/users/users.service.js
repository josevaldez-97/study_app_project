const { sequelize } = require("../../connection");
const { UserModel } = require("../../model/users/user.model");


const listar = async function (textobuscar) {
    console.log("listar usuarios");

    try {
        
        const users = await sequelize.query(`SELECT * 
                                            FROM users  
                                            WHERE 1=1 
                                            AND UPPER(name) LIKE UPPER ('%${textobuscar}%')
                                            AND deleted IS false 
                                            ORDER BY id `);

        if (users) {
            return users;
            }
        else {
            return[];
            }
        } catch (error) {
        console.log(error);
        throw error;
        }
    }

    const consultarPorCodigo = async function (id) {
        console.log("consultar usuario");
    
        try {
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
    const actualizar = async function (id , name , lastname , avatar , email , password , deleted ) {
        console.log("actualizar usuarios");
    
        let usuarioRetorno = null; // guarda el usuario que se va incluir o editar
        const data =  (id , name , lastname , avatar , email , password , deleted); // se optiene los datos del cuerpo de la peticion 
       
        try {   
        let userModelResult = null;
        if (id) {
            userModelResult = await UserModel.findByPk(id);
    
        }
        if (userModelResult) {
            // asegurar que el usuario existe, entonces actualizar
            usuarioRetorno = await UserModel.update(data, { where : { id : id } });
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
        console.log("eliminar usuario");
        //BorradoFisico
        //UserModel.destroy(req.params.id);
        try {
            const retorno = await sequelize.query(`UPDATE users SET deleted = true WHERE id = ${id}`);
            return retorno;
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    module.exports = {
        listar, actualizar,consultarPorCodigo,eliminar
    };