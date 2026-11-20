const initialProducts = require("./products");
const initialUsers = require("./users");
const bcrypt = require("bcryptjs");

class MockStore {
  constructor() {
    this.products = initialProducts.map((p, index) => ({
      ...p,
      _id: `prod_${index + 1}`,
      reviews: [
        {
          _id: `rev_${index}_1`,
          name: "Michael Chang",
          rating: 5,
          comment: "Exceptional build quality, exceeded all my expectations. Highly recommend!",
          createdAt: new Date(Date.now() - 86400000 * 5).toISOString()
        },
        {
          _id: `rev_${index}_2`,
          name: "Sarah Jenkins",
          rating: p.rating >= 4.8 ? 5 : 4,
          comment: "Super fast delivery and sleek packaging. Exactly as described.",
          createdAt: new Date(Date.now() - 86400000 * 12).toISOString()
        }
      ],
      createdAt: new Date().toISOString()
    }));

    // Pre-hash user passwords for realistic auth
    const salt = bcrypt.genSaltSync(10);
    this.users = initialUsers.map((u, index) => ({
      ...u,
      _id: `user_${index + 1}`,
      password: bcrypt.hashSync(u.password, salt),
      createdAt: new Date().toISOString()
    }));

    this.orders = [
      {
        _id: "order_101",
        user: "user_2",
        userName: "John Doe",
        orderItems: [
          {
            name: initialProducts[0].name,
            qty: 1,
            image: initialProducts[0].image,
            price: initialProducts[0].price,
            product: "prod_1"
          }
        ],
        shippingAddress: {
          name: "John Doe",
          address: "123 Market Street",
          city: "San Francisco",
          postalCode: "94103",
          country: "United States"
        },
        paymentMethod: "Credit Card",
        itemsPrice: 349.99,
        shippingPrice: 0,
        taxPrice: 28.00,
        totalPrice: 377.99,
        isPaid: true,
        paidAt: new Date(Date.now() - 86400000 * 2).toISOString(),
        isDelivered: false,
        status: "Processing",
        createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
      },
      {
        _id: "order_102",
        user: "user_3",
        userName: "Jane Smith",
        orderItems: [
          {
            name: initialProducts[1].name,
            qty: 1,
            image: initialProducts[1].image,
            price: initialProducts[1].price,
            product: "prod_2"
          }
        ],
        shippingAddress: {
          name: "Jane Smith",
          address: "456 Lexington Ave",
          city: "New York",
          postalCode: "10022",
          country: "United States"
        },
        paymentMethod: "Instant UPI / QR Code",
        itemsPrice: 1299.00,
        shippingPrice: 0,
        taxPrice: 103.92,
        totalPrice: 1402.92,
        isPaid: true,
        paidAt: new Date(Date.now() - 86400000 * 4).toISOString(),
        isDelivered: true,
        deliveredAt: new Date(Date.now() - 86400000 * 1).toISOString(),
        status: "Delivered",
        createdAt: new Date(Date.now() - 86400000 * 4).toISOString()
      }
    ];
  }

  // Products
  getProducts({ keyword, category, sort, minPrice, maxPrice }) {
    let result = [...this.products];

    if (keyword) {
      const q = keyword.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q)
      );
    }

    if (category && category !== "All") {
      result = result.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (minPrice !== undefined && minPrice !== "") {
      result = result.filter((p) => p.price >= Number(minPrice));
    }

    if (maxPrice !== undefined && maxPrice !== "") {
      result = result.filter((p) => p.price <= Number(maxPrice));
    }

    if (sort === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sort === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    } else {
      result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }

    return result;
  }

  getProductById(id) {
    return this.products.find((p) => p._id.toString() === id.toString());
  }

  getCategories() {
    return [...new Set(this.products.map((p) => p.category))];
  }

  addProduct(productData) {
    const newProduct = {
      name: productData.name || "Untitled Product",
      price: Number(productData.price) || 0,
      originalPrice: Number(productData.originalPrice) || Number(productData.price) || 0,
      image: productData.image || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
      brand: productData.brand || "Brand",
      category: productData.category || "General",
      countInStock: Number(productData.countInStock) || 10,
      numReviews: 0,
      rating: 5,
      description: productData.description || "",
      isFeatured: Boolean(productData.isFeatured),
      specs: productData.specs || {},
      reviews: [],
      _id: `prod_${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    this.products.unshift(newProduct);
    return newProduct;
  }

  updateProduct(id, updates) {
    const product = this.getProductById(id);
    if (!product) return null;

    Object.assign(product, updates);
    if (updates.price) product.price = Number(updates.price);
    if (updates.countInStock !== undefined) product.countInStock = Number(updates.countInStock);
    return product;
  }

  deleteProduct(id) {
    const index = this.products.findIndex((p) => p._id.toString() === id.toString());
    if (index !== -1) {
      this.products.splice(index, 1);
      return true;
    }
    return false;
  }

  addProductReview(productId, reviewData, user) {
    const product = this.getProductById(productId);
    if (!product) return null;

    if (!product.reviews) product.reviews = [];

    const review = {
      _id: `rev_${Date.now()}`,
      name: user.name,
      rating: Number(reviewData.rating),
      comment: reviewData.comment,
      user: user._id,
      createdAt: new Date().toISOString()
    };

    product.reviews.unshift(review);
    product.numReviews = product.reviews.length;
    product.rating = Number(
      (
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length
      ).toFixed(1)
    );

    return review;
  }

  // Users
  findUserByEmail(email) {
    return this.users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );
  }

  findUserById(id) {
    return this.users.find((u) => u._id.toString() === id.toString());
  }

  createUser(userData) {
    const salt = bcrypt.genSaltSync(10);
    const newUser = {
      ...userData,
      _id: `user_${Date.now()}`,
      password: bcrypt.hashSync(userData.password, salt),
      isAdmin: false,
      createdAt: new Date().toISOString()
    };
    this.users.push(newUser);
    return newUser;
  }

  updateUser(id, updates) {
    const user = this.findUserById(id);
    if (!user) return null;
    if (updates.name) user.name = updates.name;
    if (updates.email) user.email = updates.email;
    if (updates.password) {
      const salt = bcrypt.genSaltSync(10);
      user.password = bcrypt.hashSync(updates.password, salt);
    }
    return user;
  }

  // Orders
  createOrder(orderData) {
    const newOrder = {
      ...orderData,
      _id: `order_${Date.now()}`,
      status: "Pending",
      isPaid: orderData.paymentMethod === "Cash on Delivery" ? false : true,
      paidAt: orderData.paymentMethod === "Cash on Delivery" ? null : new Date().toISOString(),
      isDelivered: false,
      createdAt: new Date().toISOString()
    };
    this.orders.unshift(newOrder);
    return newOrder;
  }

  getOrderById(id) {
    return this.orders.find((o) => o._id.toString() === id.toString());
  }

  getUserOrders(userId) {
    return this.orders.filter((o) => o.user.toString() === userId.toString());
  }

  getAllOrders() {
    return this.orders;
  }

  updateOrderStatus(orderId, status) {
    const order = this.getOrderById(orderId);
    if (!order) return null;
    order.status = status;
    if (status === "Delivered") {
      order.isDelivered = true;
      order.deliveredAt = new Date().toISOString();
    }
    if (status === "Shipped" || status === "Delivered") {
      order.isPaid = true;
      if (!order.paidAt) order.paidAt = new Date().toISOString();
    }
    return order;
  }
}

const mockStore = new MockStore();
module.exports = mockStore;
