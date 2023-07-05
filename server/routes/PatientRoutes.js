const express = require('express');
const router = express.Router();
const {
  destroy,
  show,
  showAll,
  store,
  update,
} = require('../controllers/Patient/index');

router.post('/', store);

router.get('/', showAll);

router.get('/:id', show);

router.put('/:id', update);

router.delete('/:id', destroy);

module.exports = router;
