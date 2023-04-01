const{sequelize} = require("../../connection");
const {ThemesPropertiesModel} = require("../../model/themes_properties/themes.properties.model");

const listar = async function(textoBuscar){

    console.log("Listar propiedades del tema");

    try {
        const themesProperties = await sequelize.query(`SELECT * 
        FROM themes_properties
        WHERE 1=1
       AND UPPER(property_name) LIKE UPPER ('%${textoBuscar}%')
        ORDER BY id`);

        if(themesProperties && themesProperties[0]){

            return themesProperties[0];

        } else{
            return[];
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const consultarPorCodigo = async function (id) {
    console.log("consultar propiedades del temas por codigo");

    try {
        // Buscar en la base de datos por codigo
        const themesPropertiesModelResult= await ThemesPropertiesModel.findByPk(id);

        if (themesPropertiesModelResult) {
           return themesPropertiesModelResult
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

const actualizar = async function (id , theme_id, property_name, property_value) {
    console.log("actualizar propiedades del temas");


    // res.send("actualiza los usuarios")
    // variables
    let themespropertiesRetorno = null; // guarda el usuario que se va incluir o editar
   const data = {id , theme_id, property_name, property_value};
   // const id = req.body.id;

    try {
        
    let themespropertiesExiste = null;
    if (id) {
        themespropertiesExiste = await ThemesPropertiesModel.findByPk(id);

    }
    if (themespropertiesExiste) {
        // asegurar que el usuario existe, entonces actualizar
        themespropertiesRetorno = await ThemesPropertiesModel.update(data, { where : {id:id}});
        themespropertiesRetorno= data;

    } else { // incluir
        themespropertiesRetorno = await ThemesPropertiesModel.create(data);

    }
    return themespropertiesRetorno;

    } catch (error) {
        console.log(error);
        throw error;
};
}


const eliminar = async function (id) {
    console.log("eliminar propiedad del temas");

    // borrado fisico
   //  UserModel.destroy(req.params.id);
    try {

        ThemesPropertiesModel.destroy ({ where : { id: codigo } }, { truncate: false });
    
    } catch (error) {
        console.log(error);
        throw error;
        }
};


module.exports = {
    listar, busquedaPorCodigo: consultarPorCodigo, actualizar, eliminar
};