const{sequelize} = require("../../connection");
const {TopicsModel} = require("../../model/topics/topics.model");
const TopicService = require("../../service/topics/topic.service")


const listar = async function(req, res){


        console.log("listar topicos");
    
        try {
            const topics = await TopicService.listar(req.query.filtro || '');

            if (topics) {                // en users[0] se encuentra el listado de lo que se recupera desde el sql
               res.json({
                success: true,
                topico: topics
               });

            } else{
                res.json({
                    success: true,
                    topico: []
            }  );
        } 
        
        } catch (error) {
            console.log(error)
            res.json({
                success:true,
                topico: error.message
            })
            }
    
    };
    
    const consultarPorCodigo = async function (req, res) {
        console.log("consultar topicos por codigo");
    
        try {
            const topicsModelResult = await TopicService.consultarPorCodigo(req.params.filtro || "");

    
            if (topicsModelResult) {
               res.json({
                success:true,
                topico: topicsModelResult
               });
            
            } else {
               res.json({
                success:true,
                topico: null
               });
                }
        } catch (error) {
            console.log(error);
            res.json({
                success:true,
                topico: error.message
               });
            }
    };
    
    const actualizar = async function (req, res) {
        console.log("actualizar topicos");
        //res.send("actualizar de topicos");
        let topicoRetorno = null; 
        //guarda el topico que se va incluir o editar;    
        try {
            topicoRetorno= await TopicService.actualizar(req.body.id,
                req.body.create_date,
                req.body.name,
                req.body.topic_id,
                req.body.order,
                req.body.priority,
                req.body.color,
                req.body.owner_user_id,
                req.body.deleted );
            

           res.json({
            success:true,
            topico: topicoRetorno
           })
        } catch (error) {
            console.log(error);
            res.json({
                success:true,
                topico: error.message
               })
        }
    };
    
    const eliminar = async function (req, res) {
        console.log("eliminar topicos");
    
        try {
            await TopicService.eliminar(req.params.filtro || "");
         res.json({
            success: true
         });
    
        } catch (error) {
    
           console.log(error);
           res.json({
            success: true,
            topico: error.message
         });
            }
    };
    
    module.exports = {
        listar, consultarPorCodigo, actualizar, eliminar
    };