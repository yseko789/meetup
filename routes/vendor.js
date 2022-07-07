const express = require('express')
const {getAllVendors, updateVendor, getVendor } = require('../controllers/vendor')
const router = express.Router()

router.route('/:id').patch(updateVendor).get(getVendor)
router.route('/').get(getAllVendors)

module.exports = router