const mongoose = require("mongoose");
const dotenv = require("dotenv");
const users = require("./data/users");
const products = require("./data/products");
const User = require("./models/User");
const Product = require("./models/Product");
const Order = require("./models/Order");

dotenv.config();

const importData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/mern_ecommerce");

    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProducts);

    console.log("\x1b[32m✔ Data Imported Successfully!\x1b[0m");
    process.exit();
  } catch (error) {
    console.error(`\x1b[31m✖ Error with data import: ${error.message}\x1b[0m`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/mern_ecommerce");

    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("\x1b[31m✔ Data Destroyed Successfully!\x1b[0m");
    process.exit();
  } catch (error) {
    console.error(`\x1b[31m✖ Error with data destroy: ${error.message}\x1b[0m`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
