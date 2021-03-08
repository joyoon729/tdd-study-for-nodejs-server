const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('<p>Server is live</p>');
})

module.exports = router;