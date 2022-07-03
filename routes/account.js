const express = require('express')
const router = express.Router();

router.route('/host').get().post()
router.route('/login').post(login)

module.exports = router;