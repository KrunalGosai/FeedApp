"use strict";

const express = require('express'),
      router = express.Router(),
      posts = require('./apis/posts');

router.all('/api/feed/*',posts);

module.exports = router;