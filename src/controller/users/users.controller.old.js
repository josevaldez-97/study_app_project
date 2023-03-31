const {sequelize} = require("../../connection");
const {sequelize} = require("../../model/user.model");


const listar = async function(req, res) {
    console.log("listar usuarios ");

    try{                                                        
        const users = await sequelize.query("SELECT * FROM users WHERE deleted IS false ");

        if (users && users[0]){
            // En users[0] se encuentra el listado de lo que se recupera desde el SQL
            res.json({
                success : true,
                usuarios : users[0]
            });
        } else {
            res.json({
                success : true,
                usuarios : []
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
    
const consultarPorCodigo = async function(req, res) {
    console.log("consultar usuarios");

    try{
          const users = await sequelize.query(`SELECT * 
        FROM users 
         WHERE 1=1
         AND id = ${req.params.id}
         AND deleted IS false 
         `);
         /*
        users = [1,2]
            registros, metadata
        users =[[{id:1, name:'jose'},{..}],{}]

         */

        if (users && users[0] && users[0][0]){
            // En users[0] se encuentra el listado de lo que se recupera desde el SQL
            res.json({
                success : true,
                usuario : users[0][0]
            });
        } else {
            console.log(error);
            res.json({
                success : true,
                usuario : null
            });
            }
 }  catch(error){
    res.json({
        success : false,
        error : error.message
    });
 }
};
 
const actualizar = async function(req, res) {
    console.log("actualizar usuarios");

    try{ // AÑADO EL TRY CATCH

    // res.send("actualiza los usuarios")
    // variables
    let usuarioRetorno = null; // guarda el usuario que se va incluir o editar
    const data = req.body; // se optiene los datos del cuerpo de la peticion 
    const id = req.body.id; 

    let usrExiste = null;
    if (id){
        usrExiste = await sequelize.query(" SELECT * FROM users WHERE id  =" + id); // busca usuario por id pasado
    }
    if(usrExiste && usrExiste[0] && usrExiste[0][0] && usrExiste[0][0].id){
            // Asegurar que el usuario exista, entonces actualizar
              const retornoUpdate = await sequelize.query(`UPDATE users SET
                                                        name = '${data.name}',
                                                        last_name = '${data.last_name}',
                                                        avatar = '${data.avatar}',
                                                        email = '${data.email}',
                                                        password = '${data.password}',
                                                        deleted = ${data.deleted}
                                                    WHERE id = ${id}`);
            usuarioRetorno = await sequelize.query("SELECT * FROM users WHERE id = " + usrExiste[0][0].id);
            usuarioRetorno = usuarioRetorno[0][0];

    } else {
        // incluir 
        const retornoInsert = await sequelize.query(`INSERT INTO users (name, last_name, avatar, email, password, deleted) VALUES (
            '${data.name}', '${data.last_name}', '${data.avatar}', '${data.email}', '${data.password}', false)
                RETURNING id;`);
            usuarioRetorno = await sequelize.query(" SELECT * FROM users WHERE id= " + retornoInsert[0][0].id);
            usuarioRetorno = usuarioRetorno[0][0];
// verificar esta parte agg
            res.json({
                success : true,
                user : usuarioRetorno
            });
// hasta aca
    } } catch(error){
        res.json({
            success : false,
            error : error.message
        });
     }

    
  

};

const eliminar = async function(req, res) {
    console.log("eliminar usuarios");

    try{

    await sequelize.query("UPDATE users SET deleted = true WHERE id=  "+ req.params.id);
    res.json({
        success:true
    });
} catch(error){

    
    res.json({
        success : true,
        user : usuarioRetorno
    });
}
};


module.exports = {
    listar, busquedaPorCodigo: consultarPorCodigo, actualizar, eliminar
};