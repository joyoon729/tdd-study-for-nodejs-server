// 라우팅 설정

const express = require('express');
const router = express.Router();
const ctrl = require('./user.ctrl')

// url 경로 '/' 루트인 이유는 index.js 에서 이미 '/users' 경로를 명시해놨기 때문
router.get('/', ctrl.index)
router.get('/:id', ctrl.show)
router.delete('/:id', ctrl.destroy)
router.post('/', ctrl.create)
router.put('/:id', ctrl.update)

module.exports = router;  // 라우트 객체를 export.