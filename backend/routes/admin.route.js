const express = require('express')
const router = express.Router()
const adminController = require('../controllers/admin.controller')
const adminAuth = require('../Middlewares/authmiddleware')

router.post('/register_admin' , adminController.register)
router.post('/login_admin' , adminController.login)
router.get('/current_user_data/:admin_id', adminAuth ,adminController.get_user)

module.exports = router 