const express = require("express");
const router = express.Router();
const foodItems = require('../fetchData')

router.post('/foodData',async (req,res)=>{
    try{
        foodItems()
        .then(data => {
            res.send(data)
            
        })
        .catch(error => {
            res.send(error)
        });



    }
    catch (error) {
        console.log(error)
        res.send("Server error")

    }
})

module.exports = router