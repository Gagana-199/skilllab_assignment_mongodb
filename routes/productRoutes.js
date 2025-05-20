const express = require('express');
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  restockProduct,
  getLowStock
} = require('../controllers/productController');

router.post('/', createProduct);
router.get('/', getAllProducts);
router.get('/low-stock', getLowStock); // Optional
router.get('/:id', getProductById);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);
router.put('/:id/restock', restockProduct); // Restocking endpoint

module.exports = router;
