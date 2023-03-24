const userController = require('../../controller/users/users.controller');

module.exports = function(app) {
    app.get("/users/list", userController.listar);
    app.get("/user/id", userController.consultarPorCodigo);
    app.post("/users/update", userController.actualizar);
    app.delete("/users/delete/:id", userController.eliminar);
}