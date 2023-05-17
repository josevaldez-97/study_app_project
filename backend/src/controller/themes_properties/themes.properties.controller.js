const { sequelize } = require("../../connection");
const {ThemesPropertiesModel} = require('../../model/themes_properties/themes.properties.model');
const themesPropertiesService = require('../../service/themes_properties/themes.properties.service');

const listar = async function(req, res){
    console.log("Listar Propiedades de los temas");

    try{
        const themes_properties = await themesPropertiesService.listar(req.query.filtro ||'');

        if( themes_properties){
            res.json({
                success : true,
                temasProperties : themes_properties
            });
        } else{
            res.json({
                success : true,
                temasProperties : []
            });
        }
    } catch(error){
        console.log(error);
        res.json({
            success : true,
            temasProperties : error.message
        });
    }
};

const consultarPorCodigo = async function(req, res) {
    console.log("consultar propiedades de temas por codigo");

    try{
          const themesPropertiesModelResult = await ThemesPropertiesModel.findByPk(req.params.id);
       
          if (themesPropertiesModelResult){
            res.json({
                success : true,
               temasProperties : themesPropertiesModelResult
            });
        } else {
            res.json({
                success : true,
                temasProperties : null
            });
            }
 }  catch(error){
    console.log(error);
    res.json({
        success : false,
        error : error.message
    });
 }
};

const actualizar =  async function(req, res){
    console.log("Actualizar propiedades del temas");
    let themesPropertiesRetorno = null;
    try{ 
themesPropertiesRetorno = await themesPropertiesService.actualizar(
                                                                    req.body.id,
                                                                    req.body.themes_id,
                                                                    req.body.property_name,
                                                                    req.body.property_value );
        res.json({
            success: true,
            themesProperties : themesPropertiesRetorno
        });                                                                                                                                                                                                                          
    } catch (error){
        console.log(error);
        res.json({
            success : false,
            error : error.message
        });
    }
};




const eliminar = async function(req, res){
    console.log("Eliminar propiedad del tema");

try{

    await themesPropertiesService.eliminar(req.params.filtro || "");
        res.json({
            success: true
        })
} catch(error){
    console.log(error);
 res.json({
    success : false,
    error : error.message
 });
}


};

module.exports ={
    listar, busquedaPorCodigo: consultarPorCodigo, actualizar, eliminar
};

//funcionando 