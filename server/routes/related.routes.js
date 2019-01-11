const RelatedController = require('../controllers/related.controller');
const router = require('express').Router();

router.get('/', RelatedController.GetAll);
router.get('/:id', RelatedController.GetById);
router.post('/', RelatedController.Create);
router.patch('/:id', RelatedController.Update);
router.delete('/:id', RelatedController.Delete);

module.exports = router;
