const RelatedController = require('../controllers/related.controller');
const router = require('express').Router();

router.get('/', RelatedController.GetAll_PG);
router.get('/id/:id', RelatedController.GetById_PG);
router.post('/', RelatedController.Create_PG);
router.patch('/:id', RelatedController.Update_PG);
router.delete('/:id', RelatedController.Delete_PG);

module.exports = router;
