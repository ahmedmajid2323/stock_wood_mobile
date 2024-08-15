const mongoose = require('mongoose');
const { Schema } = mongoose;

const BonLivraisonSchema = mongoose.Schema(
    {
        commande_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Commande',
            required: true
        },
        status:{
            type: String,
            default: 'en cours..'
        },
        numero_livraison:{
            type: Number
        },
        file_path:{
            type: String
        },
        information_livreur:{
            type: Schema.Types.Mixed,
            required: [ true ]
        },
        information_client:{
            type: Schema.Types.Mixed,
            required:  [true ]
        },
        information_livraison:{
            type: Schema.Types.Mixed,
            required: [ true ]
        },
        produit:{
            type: Schema.Types.Mixed,
            required: [ true ]
        },
    }
)

const BonLivraison = mongoose.model('BonLivraison', BonLivraisonSchema)
module.exports = BonLivraison