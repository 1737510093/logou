const express = require('express');
const router = express.Router();
const captcha = require('../services/captcha.js');

/* 生成验证码 */
router.get('/gencode', captcha.genCaptcha);

//校验验证码
router.get('/verify',captcha.verifyCaptcha);

module.exports = router;
