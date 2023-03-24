const topicsController = require('../../controller/topics/topics.controller');
const userController = require('../../controller/users/users.controller');

module.exports = function(app) {

    app.get("/topics/list", topicsController.listar);
    app.get("/topic/id", topicsController.busquedaPorCodigo);
    app.post("/topics/update", topicsController.actualizar);
    app.delete("/topics/delete/:id", topicsController.eliminar);

    
}