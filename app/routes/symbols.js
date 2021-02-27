const express = require('express');
const router = express.Router();

router.post('/',
  (req, res, next) => {
    console.log(req.body, 'hi');
    res.json({message: 'success'})
  }
);

module.exports = router;