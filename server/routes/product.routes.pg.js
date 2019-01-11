const ProductController = require('../controllers/product.controller');
const router = require('express').Router();

router.get('/pg/', ProductController.GetAll_PG);
router.get('/pg/id/:id', ProductController.GetById_PG);
router.get('/pg/name/:name', ProductController.GetByName_PG);
router.post('/pg/', ProductController.Create_PG);
router.patch('/pg/:id', ProductController.Update_PG);
router.delete('/pg/:id', ProductController.Delete_PG);

router.get('/m/', ProductController.GetAll_M);
router.get('/m/id/:id', ProductController.GetById_M);
router.get('/m/name/:name', ProductController.GetByName_M);
router.post('/m/', ProductController.Create_M);
router.patch('/m/:id', ProductController.Update_M);
router.delete('/m/:id', ProductController.Delete_M);

module.exports = router;
