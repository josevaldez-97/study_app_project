const userController = require('../../controller/users/users.controller');
const authMiddleware = require ('../../middleware/auth.controller');

module.exports = function(app) {

    app.get("/users/list",  authMiddleware.auth, userController.listar);

app.get("/user/:id",  authMiddleware.auth, userController.busquedaPorCodigo);

 app.post("/users/update",authMiddleware.auth, userController.actualizar);


app.delete("/users/delete/:id", authMiddleware.auth,userController.eliminar);

 app.post("/user/login",authMiddleware.auth,  userController.login);

app.post("/user/logout",authMiddleware.auth,userController.logout);
}


