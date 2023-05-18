const express = require('express');
const bodyParser = require('body-parser');



const cors = require('cors');

const app = express();
app.use(bodyParser());

app.use(cors({
    origin: '*'
}));

app.use(bodyParser());

const userRoute = require("./src/route/users/users.route");
const topicsRoute = require("./src/route/topics/topics.route");
const themesRoute = require("./src/route/themes/themes.route");
const themesPropertiesRoute = require('./src/route/themes_properties/themes.properties.route');

 
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
topicsRoute(app);
themesRoute(app);
themesPropertiesRoute(app);




app.listen(3000);
