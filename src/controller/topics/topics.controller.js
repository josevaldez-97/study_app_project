const { sequelize } = require("../../connection");
const { TopicsModel } = require("../../model/topics/topics.model");

const listar = async function (req, res) {
    console.log("listar topics");

    try {
        const topics = await sequelize.query("SELECT * FROM topics WHERE deleted IS false  ");

        if (topics && topics[0]) {
            // En topics[0] se encuentra el listado de lo que se recupera desde el SQL
            res.json({
                success: true,
                topics: topics[0]
            });
        } else {
            res.json({
                success: true,
                topics: []
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
        // Buscar en la base de datos por codigo
        const topicsControllerResult = await TopicsModel.findByPk(req.params.id);

        if (topicsControllerResult) {
            res.json({
                success: true,
                topics: topicsControllerResult
            });
        } else {
            res.json({
                success: true,
                topics: null
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


    // res.send("actualiza los usuarios")
    // variables
    let topicsRetorno = null; // guarda el usuario que se va incluir o editar
    const data = req.body; // se optiene los datos del cuerpo de la peticion 
    const id = req.body.id;

    try {
        
    let topicsExiste = null;
    if (id) {
        topicsExiste = await TopicsModel.findByPk(id);

    }
    if (topicsExiste) {
        // asegurar que el usuario existe, entonces actualizar
        topicsRetorno = await TopicsModel.update(data, { where : {id:id}});
        topicsRetorno = data;

    } else { // incluir
        topicsRetorno = await TopicsModel.create(data);

    }
    res.json({
        success: true,
        topics: topicsRetorno
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
// borrado fisico
   //  UserModel.destroy(req.params.id);
    try {

        await sequelize.query("UPDATE topics SET deleted = true WHERE id=  " + req.params.id);
        res.json({
            success: true
        });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            error : error.message
        });
    }
};


module.exports = {
    listar, busquedaPorCodigo: consultarPorCodigo, actualizar, eliminar
};