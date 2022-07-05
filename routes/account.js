const express = require('express')
const router = express.Router();
const {getUser, updateUser, getMyVendors, createMyVendor} = require('../controllers/account')

router.route('/vendor').get(getMyVendors).post(createMyVendor)
router.route('/').get(getUser).patch(updateUser)

module.exports = router;