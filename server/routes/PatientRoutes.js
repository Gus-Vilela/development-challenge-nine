const express = require('express');
const router = express.Router();
const PatientController = require('../controllers/PatientController');

router.get('/', PatientController.showAll);

router.post('/', PatientController.store);

router.get('/:id', PatientController.show);

router.put('/:id', PatientController.update);

router.delete('/:id', PatientController.destroy);

module.exports = router;
