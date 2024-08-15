const mongoose = require('mongoose');
const { Schema } = mongoose;

const TacheSchema = mongoose.Schema(
    {
        user_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        titre:{
            type: String,
            required: [ true ]
        },
        description:{
            type: String,
            required:  [true ]
        },
        date:{
            type: String,
            required: [ true ]
        },
        heure:{
            type: String,
            required: [ true ]
        },
        commentaire:{
            type: String,
            required: [ false ]
        },
        tache_faite:{
            type: Boolean,
            default: false
        },
    }
)

const Tache = mongoose.model('Tache', TacheSchema)
module.exports = Tache