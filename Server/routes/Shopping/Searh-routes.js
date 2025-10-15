const express = require('express')
const { searchController } = require('../../Controllers/Shopping/Search-Controller')

const router = express.Router()

router.get('/:keyword',searchController)


module.exports = router