const mongoose = require('mongoose');
const { Schema } = mongoose;

const CommandeSchema = mongoose.Schema(
    {
        user_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        date_creation:{
            type: Date,
            required: [ true ]
        },
        information_client:{
            type: Schema.Types.Mixed,
            required:  [true ]
        },
        numero_commande:{
            type: Number,
        },
        status:{
            type: Boolean,
            default: false,
        },
        produit:{
            type: Schema.Types.Mixed,
            required: [ true ]
        },
    }
)

const Commande = mongoose.model('Commande', CommandeSchema)
module.exports = Commande