"use strict";

const express = require('express'),
      router = express.Router(),
      mongo = require('./apis/mongo');

router.all('/api/feed/*',mongo);

module.exports = router;