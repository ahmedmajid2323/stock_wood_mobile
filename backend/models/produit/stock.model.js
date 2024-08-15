const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
    produit: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Produit',
        required: true
    },
    quantite_en_stock: {
        type: Number,
        required: true
    },
    reorder_point: {
        type: Number,
        required: true
    },
    quantite_maximum: {
        type: Number,
        required: true
    },
    emplacement: {
        type: String
    }
});

const Stock = mongoose.model('Stock', stockSchema);
module.exports = Stock;
