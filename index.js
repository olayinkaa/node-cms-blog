// importing different modules
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const hbs = require('express-handlebars');
const {mongoDBUrl,PORT} = require('./config/configuration');
const app = new express();


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
const defaultRoutes = require('./routes/defaultRoutes');
app.use('/',defaultRoutes);

const adminRoutes = require('./routes/adminRoutes')
app.use('/admin',adminRoutes);



// server started
app.listen(PORT,()=>{
    console.log(`server is running on ports sample-branch ${PORT}`);
});