const Product = require('../models/Product');

// Create Product
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, quantity } = req.body;
    const product = new Product({ name, description, price, quantity });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get All Products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Product
exports.updateProduct = async (req, res) => {
  try {
    const { name, description, price, quantity } = req.body;
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, price, quantity },
      { new: true }
    );
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Restock Product
exports.restockProduct = async (req, res) => {
  try {
    const { quantity } = req.body;
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    product.quantity += quantity;
    await product.save();
    res.json({ message: 'Product restocked', product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Low Stock Alert
exports.getLowStock = async (req, res) => {
  try {
    const threshold = req.query.threshold || 5;
    const products = await Product.find({ quantity: { $lt: threshold } });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
