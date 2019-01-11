const ProductController = require('../controllers/product.controller');
const router = require('express').Router();

router.get('/', ProductController.GetAll_PG);
router.get('/id/:id', ProductController.GetById_PG);
router.get('/name/:name', ProductController.GetByName_PG);
router.post('/', ProductController.Create_PG);
router.patch('/:id', ProductController.Update_PG);
router.delete('/:id', ProductController.Delete_PG);

module.exports = router;
