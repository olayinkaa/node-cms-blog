const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({

            surname:{
                type: String,
                required: true
            },

            firstname:{
                type: String,
                required: true
            },

            email:{
                type: String,
                required: true
            },

            password:{
                type: String,
                required: true
            }
         

});

// module.exports = {User: mongoose.model('user',UserSchema)};
module.exports = mongoose.model('User',UserSchema);



