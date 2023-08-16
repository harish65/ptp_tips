var express = require('express');
var router = express.Router();

const auth = require('../../util/auth');
const oddsapi = require('../controllers/oddsUpdateController')

//Update ODDS API
router.get('/OddsSUpdate/:id', oddsapi.updateOdds);

module.exports = router