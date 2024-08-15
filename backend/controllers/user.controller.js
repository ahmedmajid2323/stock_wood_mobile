const User = require('../models/user/users.model') 
const Tache = require ('../models/user/tache.model')
const Commande = require ('../models/commande/commande.model')
const BonLivraison = require('../models/commande/bonLivraison.model')
const Client = require('../models/client.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookie = require('cookie-parser')

const createToken = (id)=>{
    return jwt.sign({id} , process.env.SECRET_ACCESS_TOKEN_MOBILE )
}

module.exports.register = async (req , res)=>{
    try {
        const { email , password , name } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ email, password: hashedPassword , name });
        await user.save();
        res.status(201).json({ message: 'registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Registration failed' });
    }   
}

module.exports.login = async (req , res)=>{
    const { email , password } = req.body ;
    const user = await User.findOne({email});
    if(user){
        const auth = await bcrypt.compare(password, user.password)
        if(auth){
            const token = createToken(user._id)
            res.status(200).json({user : user , token : token})
        }
        else{
            res.status(500).json({message: 'incorrect password !'})
        }
    }
    else{
        res.status(500).json({message: 'incorrect email !'})
    }
}

module.exports.get_users = async (req , res)=>{
    try {
        const user = await User.find()
        res.status(200).json({users : user})
    } catch (error) {
        res.status(500).json({error : error})
    }
}


//**************************************** tâches *******************************************/

module.exports.get_tache = async (req, res)=>{
    const user = req.params.user_id ;
    try {
        const user_taches = await Tache.find({user_id: user})
        res.status(200).json({taches_user : user_taches})
    } catch (error) {
        res.status(500).json({error_fetching_user_tache: error})
    }
}

module.exports.store_tache = async (req,res)=>{
    const user_id = req.params.user_id
    try {
       const {titre, description, time, date} = req.body 
       const new_tache = new Tache({user_id , titre , description , date , heure: time})
       await new_tache.save()
       res.status(200).json({message: 'stored successfully'})
    } catch (error) {
       console.log('error storing tache for user_id',user_id,' with error:',error);
    }
}

module.exports.toggle_tache = async (req , res)=>{
    const tache_id = req.params.tache_id
    const {commentaire} = req.body
    try {
        const tache = await Tache.findById(tache_id)
        if(tache){
            if(commentaire){
                await Tache.updateOne({ _id: tache_id }, { $set: { tache_faite: true , commentaire: commentaire}  })
                res.status(200).json({message:'updated with commentaire !'})
            }
            else{
                await Tache.updateOne({ _id: tache_id }, { $set: { tache_faite: true } })
                res.status(200).json({message:'updated without commentaire !'})
            }
        }
        else{
            res.status(404).json({error_404: 'tache was not found !!'})
        }
    } catch (error) {
        console.log('error toggling tache ', error);
    }
}

//********************************* commandes & livraison ***********************************/

async function getNextCommandeNumero() {
    const lastCommande = await Commande.findOne().sort({ numero_commande: -1 }).exec(); //cherche la derniere commande ajoutee
    if (lastCommande) {
        return lastCommande.numero_commande + 1; //retourne (num_last_cmd + 1) pour la storer dans la cmd suivante
    } else {
        return 1; // Si aucune commande n'existe, commence à 1
    }
}

async function getNextLivraisonNumero() {
    const lastBonLivraison = await BonLivraison.findOne().sort({ numero_livraison: -1 }).exec(); 
    if (lastBonLivraison) {
        return lastBonLivraison.numero_livraison + 1; 
    } else {
        return 1; 
    }
}

module.exports.store_commande = async (req , res)=>{
    const { information_client , Inf_produit_commande, selectedDate, currentUser_id } = req.body ;
    try {
        const numero_commande = await getNextCommandeNumero()
        const new_commande = new Commande({date_creation: selectedDate , information_client , produit: Inf_produit_commande , numero_commande, user_id: currentUser_id})
        await new_commande.save()
        res.status(200).json({cmd_id : new_commande._id})
    } catch (error) {
        console.log('error storing new command', error);   
    }
}

module.exports.store_BonLivraison = async (req, res)=>{ 
    const {information_livreur , information_client , information_livraison , produit, file_path } = req.body ;
    const commande_id = req.params.commande_id
    try {
        const numero_livraison = await getNextLivraisonNumero()
        const new_livraison = new BonLivraison({commande_id ,information_livreur , file_path, information_client , information_livraison , produit, numero_livraison})
        await new_livraison.save()
        
        //********* SET COMMANDE TO TRAITEE **********/
        const id = new_livraison.commande_id
        await Commande.updateOne({ _id: id }, { $set: { status: true}  })

        res.status(200).json({message : `bon de livraison ${new_livraison._id} est crée avec succes`})
    } catch (error) {
        console.log('error storing bon de livraison', error);
    }
}

module.exports.get_commande = async (req,res)=>{
    const id_commande = req.params.id_commande
    try {
        const commande = await Commande.findById(id_commande)
        const bon_livraison = await BonLivraison.findOne().sort({ numero_livraison: -1 }).exec()
        const client_id = await Client.find({email :commande.information_client.email})
        res.status(200).json({
            commande: commande,
            client_id: client_id,
            num_livraison: bon_livraison ? bon_livraison.numero_livraison + 1 : 1
        })
    } catch (error) {
        console.log('error finding the commande', error);
        res.status(500).json({error})
    }
}

module.exports.get_user_commande = async (req , res)=>{
    const user = req.params.id_user
    try {
        const commande_details = await Commande.aggregate([
            {
                $lookup: {
                    from: 'bonlivraisons', //doit etre le nom de la collesction dans mongoDB
                    localField: '_id',
                    foreignField: 'commande_id',
                    as: 'bon_livraison'
                }
            },
        ]);
        
        const commandes = commande_details.filter((commande)=>{
            return commande.user_id.toString() === user
        })
        res.status(200).json({commande: commandes})  
    } catch (error) {
        console.log( `error fetching commande user ${user} : `, error);   
    }
}

module.exports.update_status = async (req , res)=>{
    try {
        const { status_update , id_bon} = req.body
        await BonLivraison.updateOne({_id : id_bon} , {$set: {status: status_update} })
        res.status(200).json({message: 'updated successfully !'})
    } catch (error) {
        console.log('error updating status for bon de livraison',error);
    }
}