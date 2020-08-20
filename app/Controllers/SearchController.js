const express = require('express')
var router = express.Router()
const helpers = require('../Utils/Helpers')
const { validationResult } = require('express-validator')
const SearchService = require('../Services/SearchService')

router.get('/:query', async (req, res, next) => {

	try{

        let results = await SearchService.search(req.params.query)

        return res.json({

            status: true, 
            message: `Search results delivered like a new born baby`, 
            data: results 

        })

    }catch(ex){

        next(ex)
    }
	
})


module.exports = router