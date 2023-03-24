const express = require('express');
const bodyParser = require('body-parser');


const app = express();
app.use(bodyParser());

const userRoute = require("./src/route/users/users.route");
const topicsRoute = require("./src/route/topics/topics.route");
const themesRoute = require("./src/route/themes/themes.route");
 
//Ruta raiz
app.get('/', function (req, res) {
    //Logica.
    res.send('Hello World');
});

app.get('/pagina2', function (req, res) {
    //Logica de negocios
    //esta aqui -Controller

    res.json({application: 'Study APP', version: '1.0.0'});
});

//Llamadas a los routes de los UCs
userRoute(app);

app.listen(3000);
