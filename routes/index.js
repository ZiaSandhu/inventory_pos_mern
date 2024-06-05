const express = require('express');

const router = express.Router();

router.get('/', (_,res)=>{
    res.status(200).json("Inventory management System Server is running")
});
router.use('/users',require('./userRoutes'))

module.exports = router;
