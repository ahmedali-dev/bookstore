const express = require('express')
const adminUserCon = require('./../../controllers/admin/admin.users_controller')
const validation = require('../../utilities/validation');
const router = express.Router()

router.get('/', adminUserCon.getUsers);
router.get('/user/:userId',
    [
        adminUserCon.validation.userId
    ],
    validation,
    adminUserCon.getUserById
);
router.get('/search/:search', [adminUserCon.validation.search], validation, adminUserCon.SearchInUsers);
router.put('/user/:userId',
    [
        adminUserCon.validation.userId
    ]
    ,
    validation,
    adminUserCon.updateUser
);

module.exports = router;