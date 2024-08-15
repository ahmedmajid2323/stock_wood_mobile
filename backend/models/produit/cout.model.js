const mongoose = require('mongoose');

const prixSchema = new mongoose.Schema({
    produit: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Produit',
        required: true
    },
    prix_achat: {
        type: Number,
        required: true
    },
    PU_HT: {
        type: Number,
        required: true
    },
    TVA:{
        type: Number,
        default: 19
    }
});

const Cout = mongoose.model('Cout', prixSchema);
module.exports = Cout;
