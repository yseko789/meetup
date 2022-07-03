const express = require('express')
const router = express.Router()

router.route('/:eventId/:vendorId').get()
router.route('/:eventId').get()
router.route('/').get()