const express = require('express')
const router = express.Router()
const ClientController = require ('../controllers/client.controller')

router.post('/new_client' , ClientController.new_client )
router.get('/all_clients' , ClientController.get_all_clients )

module.exports = router