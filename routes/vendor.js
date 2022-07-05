const express = require('express')
const {getAllVendors, updateVendor } = require('../controllers/vendor')
const router = express.Router()

router.route('/:id').patch(updateVendor)
router.route('/').get(getAllVendors)

module.exports = router