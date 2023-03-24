const { sequelize } = require("../../connection");
const { TopicsModel, ThemesModel } = require("../../model/themes/themes.model");

const listar = async function (req, res) {
    console.log("listar themes");

    try {
        const themes = await sequelize.query("SELECT * FROM themes WHERE deleted IS false  ");

        if (themes && themes[0]) {
            // En themes[0] se encuentra el listado de lo que se recupera desde el SQL
            res.json({
                success: true,
                themes: themes[0]
            });
        } else {
            res.json({
                success: true,
                themes: []
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
        const themesControllerResult = await ThemesModel.findByPk(req.params.id);

        if (themesControllerResult) {
            res.json({
                success: true,
                topics: themesControllerResult
            });
        } else {
            res.json({
                success: true,
                themes: null
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
    let themesRetorno = null; // guarda el usuario que se va incluir o editar
    const data = req.body; // se optiene los datos del cuerpo de la peticion 
    const id = req.body.id;

    try {
        
    let topicsExiste = null;
    if (id) {
        topicsExiste = await TopicsModel.findByPk(id);

    }
    if (topicsExiste) {
        // asegurar que el usuario existe, entonces actualizar
        themesRetorno = await TopicsModel.update(data, { where : {id:id}});
        themesRetorno = data;

    } else { // incluir
        themesRetorno = await TopicsModel.create(data);

    }
    res.json({
        success: true,
        themes: themesRetorno
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

        await sequelize.query("UPDATE themes SET deleted = true WHERE id=  " + req.params.id);
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