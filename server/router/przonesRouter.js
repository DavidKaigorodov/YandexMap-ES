const Router = require('express')
const przonesController = require('../controllers/przonesController')


const router = new Router()

router.get('/Zone', przonesController.getAll)

module.exports = router