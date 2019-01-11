const FrequentController = require('../controllers/frequent.controller');
const router = require('express').Router();

router.get('/', FrequentController.GetAll);
router.get('/:id', FrequentController.GetById);
router.post('/', FrequentController.Create);
router.patch('/:id', FrequentController.Update);
router.delete('/:id', FrequentController.Delete);

module.exports = router;
