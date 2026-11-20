const Product = require("../models/Product");
const mockStore = require("../data/mockStore");
const { getMongoStatus } = require("../config/db");

// @desc    Fetch all products with search, category filter, sorting
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const { keyword, category, sort, minPrice, maxPrice } = req.query;

    if (!getMongoStatus()) {
      const products = mockStore.getProducts({
        keyword,
        category,
        sort,
        minPrice,
        maxPrice
      });
      return res.json({ products, count: products.length, source: "mockStore" });
    }

    // MongoDB query
    let query = {};

    if (keyword) {
      query.name = { $regex: keyword, $options: "i" };
    }

    if (category && category !== "All") {
      query.category = { $regex: new RegExp(`^${category}$`, "i") };
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    let sortOption = {};
    if (sort === "price-asc") {
      sortOption = { price: 1 };
    } else if (sort === "price-desc") {
      sortOption = { price: -1 };
    } else if (sort === "rating") {
      sortOption = { rating: -1 };
    } else {
      sortOption = { isFeatured: -1, createdAt: -1 };
    }

    const products = await Product.find(query).sort(sortOption);
    res.json({ products, count: products.length, source: "mongodb" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Fetch single product by id
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!getMongoStatus()) {
      const product = mockStore.getProductById(id);
      if (product) {
        return res.json(product);
      }
      return res.status(404).json({ message: "Product not found" });
    }

    const product = await Product.findById(id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    const product = mockStore.getProductById(req.params.id);
    if (product) {
      return res.json(product);
    }
    res.status(404).json({ message: "Product not found" });
  }
};

// @desc    Get all distinct categories
// @route   GET /api/products/categories/list
// @access  Public
const getCategories = async (req, res) => {
  try {
    if (!getMongoStatus()) {
      const categories = mockStore.getCategories();
      return res.json(categories);
    }

    const categories = await Product.distinct("category");
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a product (admin)
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {
  try {
    if (!getMongoStatus()) {
      const newProduct = mockStore.addProduct(req.body);
      return res.status(201).json(newProduct);
    }

    const product = new Product(req.body);
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a product (admin)
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
  try {
    if (!getMongoStatus()) {
      const updated = mockStore.updateProduct(req.params.id, req.body);
      if (updated) {
        return res.json(updated);
      }
      return res.status(404).json({ message: "Product not found" });
    }

    const product = await Product.findById(req.params.id);
    if (product) {
      Object.assign(product, req.body);
      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a product (admin)
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
  try {
    if (!getMongoStatus()) {
      const deleted = mockStore.deleteProduct(req.params.id);
      if (deleted) {
        return res.json({ message: "Product removed successfully" });
      }
      return res.status(404).json({ message: "Product not found" });
    }

    const product = await Product.findById(req.params.id);
    if (product) {
      await product.deleteOne();
      res.json({ message: "Product removed successfully" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new review for product
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = async (req, res) => {
  const { rating, comment } = req.body;

  if (!rating || !comment) {
    return res.status(400).json({ message: "Please provide both a rating and comment" });
  }

  try {
    if (!getMongoStatus()) {
      const review = mockStore.addProductReview(
        req.params.id,
        { rating, comment },
        req.user
      );
      if (review) {
        return res.status(201).json({ message: "Review added successfully", review });
      }
      return res.status(404).json({ message: "Product not found" });
    }

    const product = await Product.findById(req.params.id);
    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );

      if (alreadyReviewed) {
        return res.status(400).json({ message: "You have already reviewed this product" });
      }

      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id
      };

      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

      await product.save();
      res.status(201).json({ message: "Review added successfully", review });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  getCategories,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview
};
