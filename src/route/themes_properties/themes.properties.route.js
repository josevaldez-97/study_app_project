
const themesPropertiesController = require('../../controller/themes_properties/themes.properties.controller');

module.exports = function(app){

    
app.get("/themes_properties/list", themesPropertiesController.listar);
app.get("/themes_properties/:id", themesPropertiesController.busquedaPorCodigo);
app.post("/themes_properties/update", themesPropertiesController.actualizar);
app.delete("/themes_properties/delete/id", themesPropertiesController.eliminar);

    
}

