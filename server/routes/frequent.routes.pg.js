const FrequentController = require('../controllers/frequent.controller');
const router = require('express').Router();

router.get('/', FrequentController.GetAll_PG);
router.get('/:id', FrequentController.GetById_PG);
router.post('/', FrequentController.Create_PG);
router.patch('/:id', FrequentController.Update_PG);
router.delete('/:id', FrequentController.Delete_PG);

module.exports = router;
