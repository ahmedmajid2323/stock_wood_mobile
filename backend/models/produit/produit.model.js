const mongoose = require('mongoose');

const produitSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    categorie: {
        type: String
    },
    reference: {
        type: String,
        unique: true
    }
});

const Produit = mongoose.model('Produit', produitSchema);
module.exports = Produit;
