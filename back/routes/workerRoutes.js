const express = require('express')
const router = express.Router()
const workersController = require('../controllers/workersController')


router.route('/')
    .get(workersController.getAllWorkers)
    .post(workersController.createNewWorker)
    .patch(workersController.updateWorker)
    .delete(workersController.deleteWorker)

module.exports = router