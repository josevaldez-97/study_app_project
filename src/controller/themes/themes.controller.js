const { sequelize } = require("../../connection");
const {ThemesModel} = require('../../model/themes/themes.model');
const ThemeService = require('../../service/themes/themes.service');

const listar = async function(req, res){
    console.log("Listar temas");

    try{
        const themes = await ThemeService.listar(req.query.filtro ||'');

        if( themes){
            res.json({
                success : true,
                temas : themes
            });
        } else{
            res.json({
                success : true,
                temas : []
            });
        }
    } catch(error){
        console.log(error);
        res.json({
            success : true,
            temas : error.message
        });
    }
};

const consultarPorCodigo = async function(req, res) {
    console.log("consultar temas por codigo");

    try{
          const themesModelResult = await ThemeService.consultarPorCodigo(req.params.filtro || ""); 
        

        if (themesModelResult){
            res.json({
                success : true,
               temas : themesModelResult
            });
        } else {
            res.json({
                success : true,
                temas : null
            });
            }
 }  catch(error){
    console.log(error);
    res.json({
        success : false,
        temas : error.message
    });
 }
};

const actualizar =  async function(req, res){
    console.log("Actualizar temas");
    let temaRetorno = null;
    try{ 
temaRetorno = await ThemeService.actualizar(req.body.id,
    req.body.create_date,
    req.body.name,
    req.body.descripcion,
    req.body.keywords,
    req.body.owner_user_id,
    req.body.deleted,
    );
        res.json({
            success: true,
            user: temaRetorno
        })
       
                                                                                                                                                                                                                                            

    } catch (error){
        console.log(error);
        res.json({
            success : false,
            usuarios : error.message
        });
    }
};




const eliminar = async function(req, res){
    console.log("Eliminar usuarios");

try{

    await ThemeService.eliminar(req.params.filtro || "");
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

