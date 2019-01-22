const ProductController = require('../controllers/product.controller');
const router = require('express').Router();

router.get('/', ProductController.GetAll_PG);
router.get('/id/:id', ProductController.GetById_PG);
router.get('/name/:name', ProductController.GetByName_PG);
router.post('/', ProductController.Create_PG);
router.patch('/id/:id', ProductController.Update_PG);
router.delete('/id/:id', ProductController.Delete_PG);

router.get('/m/', ProductController.GetAll_M);
router.get('/m/id/:id', ProductController.GetById_M);
router.get('/m/name/:name', ProductController.GetByName_M);
router.post('/m/', ProductController.Create_M);
router.patch('/m/:id', ProductController.Update_M);
router.delete('/m/:id', ProductController.Delete_M);

module.exports = router;
