const{sequelize} = require("../../connection");
const {ThemesModel} = require("../../model/themes/themes.model");

const listar = async function(textoBuscar){

    console.log("Listar temas");

    try {
        const themes = await sequelize.query(`SELECT * 
        FROM themes
        WHERE 1=1
       AND UPPER(name) LIKE UPPER ('%${textoBuscar}%')
        AND deleted IS false
        ORDER BY id`);

        if(themes && themes[0]){

            return themes[0];

        } else{
            return[];
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const consultarPorCodigo = async function (id) {
    console.log("consultar temas por codigo");

    try {
        // Buscar en la base de datos por codigo
        const themesModelResult = await ThemesModel.findByPk(id);

        if (themesModelResult) {
           return themesModelResult
            }
     else {
            return null;
            }
        }
    catch (error) {
        console.log(error);
        throw error;
        }
};

const actualizar = async function (create_date, name, descripcion, keywords, owner_user_id, deleted) {
    console.log("actualizar temas");


    // res.send("actualiza los usuarios")
    // variables
    let themesRetorno = null; // guarda el usuario que se va incluir o editar
   const data = {create_date, name, descripcion, keywords, owner_user_id, deleted};
   // const id = req.body.id;

    try {
        
    let themeExiste = null;
    if (id) {
        themeExiste = await ThemesModel.findByPk(id);

    }
    if (themeExiste) {
        // asegurar que el usuario existe, entonces actualizar
        themesRetorno = await ThemesModel.update(data, { where : {id:id}});
        themesRetorno = data;

    } else { // incluir
        themesRetorno = await ThemesModel.create(data);

    }
    return themesRetorno;

    } catch (error) {
        console.log(error);
        throw error;
};
}


const eliminar = async function (id) {
    console.log("eliminar temas");

    // borrado fisico
   //  UserModel.destroy(req.params.id);
   try {
    ThemesModel.destroy ({ where : { id: codigo } }, { truncate: false });
} catch (error) {
        console.log(error);
        throw error;
        }
};


module.exports = {
    listar, busquedaPorCodigo: consultarPorCodigo, actualizar, eliminar
};