const Client = require('../models/client.model')

module.exports.new_client = async (req , res)=>{
    const { name , address , num , email } = req.body
    try {
        const new_client = new Client ({name , address , num , email})
        await new_client.save()
        res.status(200).json({
            message: 'client stored successfully !', 
            client : new_client
        })
    } catch (error) {
        res.status(500).json({error : error})
    }
}

module.exports.get_all_clients= async (req , res)=>{
    try {
        const all_clients = await Client.find()
        res.status(200).json({clients : all_clients})
    } catch (error) {
        res.status(500).json({
            message : "error fetching client's data !",
            error : error
        })
    }
}