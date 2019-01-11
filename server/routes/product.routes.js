const ProductController = require('../controllers/product.controller');
const router = require('express').Router();

router.get('/', ProductController.GetAll);
router.get('/id/:id', ProductController.GetById);
router.get('/name/:name', ProductController.GetByName);
router.post('/', ProductController.Create);
router.patch('/:id', ProductController.Update);
router.delete('/:id', ProductController.Delete);

module.exports = router;
