const Router = require('express')
const StationController = require('../controllers/StationController')

const router = new Router()

router.get('/Station', StationController.getAll)

module.exports = router