// importing different modules
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const hbs = require('express-handlebars');
const {mongoDBUrl,PORT} = require('./config/configuration');
const app = new express();
const {globalVariables} = require('./config/configuration');
const flash = require('connect-flash');
const session = require('express-session');
const methodOverride = require('method-override');


var Handlebars = require('handlebars');

Handlebars.registerHelper("inc", function(value, options)
{
    return parseInt(value) + 1;
});

//method override middleware
app.use(methodOverride('newMethod'));

//configure mongoose to connect MongoDB

mongoose.connect(mongoDBUrl,{useNewUrlParser:true})
        .then(response=>{
            console.log("MongoDB connected successfully ");
        }).catch(err=>{
            console.log('connection to MongoDB failed '+err);
        });


//configure express
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//public asset folder setup
app.use(express.static(path.join(__dirname,'public')));


// flash and sesssion
app.use(session({
    secret:'anysecret',
    saveUninitialized:true,
    resave: true
}));

app.use(flash());
app.use(globalVariables);



// set up view engine to use handlebars
/*
app.set('views',path.join(__dirname,'/views/'));
app.engine('hbs', exphbs({extname:'hbs', defaultLayout: 'default',layoutsDir:__dirname+'/views/layouts/'}));
app.set('view engine','hbs');

*/
//set up second method with the default extension name
app.engine('handlebars', hbs({defaultLayout: 'default'}));
app.set('view engine','handlebars');


//


//routes
const defaultRoute = require('./routes/defaultRoutes');
app.use('/',defaultRoute);

const adminRoute = require('./routes/adminRoutes')
app.use('/admin',adminRoute);



// server started
app.listen(PORT,()=>{
    console.log(`server is running on ports ${PORT}`);
});