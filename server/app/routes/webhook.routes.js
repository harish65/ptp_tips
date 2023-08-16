// /////////////////////////////////////////////////////
//              HANDLE ROUTES RELATED TO STRIPE       //
// /////////////////////////////////////////////////////
var express = require('express');
var router = express.Router();

const api = require('../controllers/webhook.controller');

// RECORD AND MONITOR WEBHOOK EVENT
router.post('/record', api.webhookStripe);

module.exports = router