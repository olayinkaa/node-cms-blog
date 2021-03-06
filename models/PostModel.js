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
            },

            user: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
            category: {
                type:Schema.Types.ObjectId,
                ref: 'Category'
            },
            comments: [
                        {
                            type:Schema.Types.ObjectId,
                            ref: 'Comment'
                        }
            ],

            allowComments: {
                type:Boolean,
                default: false
            },

            file: {
                type: String,
                default: ''
            }

});




// module.exports = {Post: mongoose.model('Post',PostSchema)};
module.exports = mongoose.model('Post',PostSchema);



