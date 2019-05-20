const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PostSchema = new Schema({

            title:{
                type: String,
                required: true
            },

            status:{
                type: String,
                default: 'public'
            },

            description:{
                type: String,
                required: true
            },

            CreationDate:{
                type: Date,
                default: Date.now()
            }


});

// module.exports = {Post: mongoose.model('Post',PostSchema)};
module.exports = mongoose.model('Post',PostSchema);



