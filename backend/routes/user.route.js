const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller')

router.post('/register_user' , userController.register)
router.post('/login_user' , userController.login)

router.get('/get_users',userController.get_users)
router.get('/taches/:user_id',userController.get_tache)
router.post('/store_taches/:user_id',userController.store_tache)
router.post('/toggle_tache/:tache_id',userController.toggle_tache)

/********************************** COMMANDE & LIVRAISON ********************************/
router.post('/store_commande',userController.store_commande)
router.get('/get_commande/:id_commande', userController.get_commande)
router.get('/get_user_commande/:id_user', userController.get_user_commande)

router.post('/bon_de_livraison/:commande_id', userController.store_BonLivraison )
router.post('/update_status', userController.update_status )


module.exports = router 