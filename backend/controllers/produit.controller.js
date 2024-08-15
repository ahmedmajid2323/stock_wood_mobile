const Produit = require('../models/produit/produit.model')
const Cout = require('../models/produit/cout.model')
const Stock = require('../models/produit/stock.model')
const BonLivraison = require('../models/commande/bonLivraison.model')

module.exports.add_product = async (req , res)=>{
    try {
        const {nom , description , categorie , reference} = req.body ;
        const newProduct = new Produit({nom , description , categorie , reference})
        await newProduct.save();
        res.status(201).json({ message: 'product added succefully !' });
    } catch (error) {
        res.status(500).json({ error: 'failed adding product !' });
    }
}

module.exports.add_stock = async (req , res)=>{
    const product_id = req.params.id ;
    const {quantite_en_stock , reorder_point , quantite_maximum, emplacement } = req.body

    try {
        const produit = await Produit.findById( product_id )
        if(!produit){
            res.status(404).json({error :'product not found !'})
        }
        const stock = new Stock
        ({produit: product_id, quantite_en_stock ,quantite_maximum , emplacement , reorder_point})
        await stock.save()
        res.status(200)
        .json({
            message : 'stock information stored succesfully !' , 
            stock : stock
        })
    } catch (error) {
        res.status(500).json({error : error})
    }

}

module.exports.add_cout = async (req , res)=>{
    const product_id = req.params.id ;
    const {prix_achat , PU_HT } = req.body
    try {
        const produit = await Produit.findById(product_id)
        if(!produit){
            res.status(404).json({error : 'product not found !'})
        }
        const cout = new Cout({produit: product_id , prix_achat , PU_HT})
        await cout.save()
        res.status(200).json({
            message: 'cout information stored sucefully !',
            cout : cout
        })
    } catch (error) {
        res.status(500).json({error :error})
    }
}

module.exports.all_stock_inf = async (req , res)=>{

    try {
        const produitsWithDetails = await Produit.aggregate([
            {
                $lookup: {
                    from: 'stocks', //doit etre le nom de la collesction dans mongoDB
                    localField: '_id',
                    foreignField: 'produit',
                    as: 'stockDetails'
                }
            },
            {
                $lookup: {
                    from: 'couts', 
                    localField: '_id',
                    foreignField: 'produit',
                    as: 'priceDetails'
                }
            },
            {
                $unwind: { path: '$stockDetails', preserveNullAndEmptyArrays: true } 
            },
            {
                $unwind: { path: '$priceDetails', preserveNullAndEmptyArrays: true } 
            }
        ]);
        res.status(200).json({products : produitsWithDetails})
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des données', error });
    }
    
}
