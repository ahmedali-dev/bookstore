const express = require('express');
const dashController = require('./../../controllers/admin/admin.dashboard_controller')
const router = express.Router();

router.get('/', dashController.getAllDashboard);


module.exports = router;