const { sequelize } = require("../../connection");
const { TopicsModel } = require("../../model/topics/topics.model");


///cuando se trata de listar es mejor usar SQL puro por cuestion de tiempo
const listar = async function (textoBuscar) {

    console.log("listar topicos");

    try {
        const topics = await sequelize.query(`SELECT * clea
        FROM topics
        WHERE 1=1
        AND UPPER(name) LIKE UPPER('%${textoBuscar}%')
        ORDER BY id`);

        if (topics && topics[0]) {
            // en users[0] se encuentra el listado de lo que se recupera desde el sql
            return topics[0];
            } else{
                return [0];
            }
    
    } catch (error) {
        console.log(error)
        throw error;
        }

};

const consultarPorCodigo = async function (id) {
    console.log("consultar topicos por codigo");

    try {
        const topicsModelResult = await TopicsModel.findByPk(id);

        if (topicsModelResult) {
            return topicsModelResult;
        
        } else {
           return null;
            }
    } catch (error) {
        console.log(error);
        throw error;
        }
};

const actualizar = async function (id, create_date, name, topic_id, order, priority, color, owner_user_id) {
    console.log("actualizar topicos");
    //res.send("actualizar de topicos");
    let topicoRetorno = null; //guarda el topico que se va incluir o editar;
    const data = {id, create_date, name, topic_id, order, priority, color, owner_user_id}; //se obtiene los datos del cuerpo de la peticion

    try {
        let topicoExiste = null;
        if (id) {
            topicoExiste = await TopicsModel.findByPk(id);
        }
        if (topicoExiste) {
            topicoRetorno = await TopicsModel.update(data, { where: { id: id } });
            topicoRetorno = data;
        } else {
            topicoRetorno = await TopicsModel.create(data);

        }
       return topicoRetorno;
    } catch (error) {
        console.log(error);
       throw error;
    }
};

const eliminar = async function (id) {
    console.log("eliminar topicos");

    try {
        TopicsModel.destroy( { where: { id: codigo, topic_id: codigo }}, { truncate: false });
    } catch (error) {
        console.log(error);
        throw error;
    }

   /* try {
        await sequelize.query("UPDATE topics SET deleted=true WHERE id = " + id);
      return;

    } catch (error) {

       console.log(error);
       throw error;
        }*/
};

module.exports = {
    listar, consultarPorCodigo, actualizar, eliminar
};