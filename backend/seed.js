const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const connectDB = require('./config/db');
const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');
const Review = require('./models/Review');

const seedDatabase = async () => {
  try {
    // Connect to database
    await connectDB();
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    await Order.deleteMany({});
    await Review.deleteMany({});
    console.log('Cleared existing data');

    // Create Users
    const hashedPassword1 = await bcrypt.hash('password123', 10);
    const hashedPassword2 = await bcrypt.hash('password456', 10);
    const hashedPassword3 = await bcrypt.hash('adminpass123', 10);

    const users = await User.insertMany([
      {
        username: 'john_doe',
        email: 'john@example.com',
        password: hashedPassword1,
        role: 'user',
        verified: true
      },
      {
        username: 'jane_smith',
        email: 'jane@example.com',
        password: hashedPassword2,
        role: 'user',
        verified: true
      },
      {
        username: 'admin_user',
        email: 'admin@example.com',
        password: hashedPassword3,
        role: 'admin',
        verified: true
      },
      {
        username: 'aman',
        email: 'aman@example.com',
        password: 'amansh',
        role: 'admin',
        verified: true
      }
    ]);
    console.log(`${users.length} users created`);

    // Create Products
    const products = await Product.insertMany([
      {
        name: "Sony WH-1000XM5 Headphones",
        description: "Premium wireless noise-cancelling headphones with crystal clear audio.",
        price: 349.99,
        category: "Electronics",
        stock: 40,
        imageUrl: [
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
        ],
        rating: 4.8,
        numReviews: 120
      },
      {
        name: "Apple USB-C Charging Cable",
        description: "Fast charging USB-C cable with durable braided design.",
        price: 19.99,
        category: "Accessories",
        stock: 150,
        imageUrl: [
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVaYp_qrEB1tmcAgj_ef_MwUQk2Z4i8NzcMcc-RI6oirXWTQeQjk3NeBQ&s=10"
        ],
        rating: 4.5,
        numReviews: 65
      },
      {
        name: "Logitech MX Master 3S Mouse",
        description: "Ergonomic wireless mouse for productivity and precision.",
        price: 99.99,
        category: "Electronics",
        stock: 60,
        imageUrl: [
          "https://images.unsplash.com/photo-1527814050087-3793815479db"
        ],
        rating: 4.9,
        numReviews: 210
      },
      {
        name: "Rain Design Laptop Stand",
        description: "Premium aluminum laptop stand for better posture.",
        price: 49.99,
        category: "Office",
        stock: 35,
        imageUrl: [
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQewWMeTfOCNs6BI5NBogVV7QCU9ck1yTtp492v1XdfaQ&s=10"
        ],
        rating: 4.6,
        numReviews: 78
      },
      {
        name: "Logitech Brio 4K Webcam",
        description: "Ultra HD webcam with autofocus and noise reduction.",
        price: 159.99,
        category: "Electronics",
        stock: 25,
        imageUrl: [
          "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04"
        ],
        rating: 4.7,
        numReviews: 90
      },
      {
        name: "Keychron K2 Mechanical Keyboard",
        description: "Wireless RGB mechanical keyboard with hot-swappable switches.",
        price: 89.99,
        category: "Electronics",
        stock: 70,
        imageUrl: [
          "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef"
        ],
        rating: 4.8,
        numReviews: 145
      },
      {
        name: "Anker 7-in-1 USB Hub",
        description: "USB-C hub with HDMI, USB ports, and SD card reader.",
        price: 39.99,
        category: "Accessories",
        stock: 90,
        imageUrl: [
          "https://images.unsplash.com/photo-1625842268584-8f3296236761"
        ],
        rating: 4.5,
        numReviews: 54
      },
      {
        name: "Samsung T7 Portable SSD 1TB",
        description: "High-speed portable SSD with USB-C connectivity.",
        price: 109.99,
        category: "Storage",
        stock: 45,
        imageUrl: [
          "https://images.unsplash.com/photo-1591488320449-011701bb6704"
        ],
        rating: 4.9,
        numReviews: 187
      }
    ]);
    console.log(`${products.length} products created`);

    // Create Orders
    const orders = await Order.insertMany([
      {
        userId: users[0]._id,
        items: [
          {
            productId: products[0]._id,
            qty: 1,
            price: products[0].price
          },
          {
            productId: products[1]._id,
            qty: 2,
            price: products[1].price
          }
        ],
        totalAmount: products[0].price + (products[1].price * 2),
        address: {
          fullName: 'John Doe',
          street: '123 Main Street',
          city: 'New York',
          postalCode: '10001',
          country: 'USA'
        },
        status: 'Delivered'
      },
      {
        userId: users[1]._id,
        items: [
          {
            productId: products[2]._id,
            qty: 1,
            price: products[2].price
          }
        ],
        totalAmount: products[2].price,
        address: {
          fullName: 'Jane Smith',
          street: '456 Oak Avenue',
          city: 'Los Angeles',
          postalCode: '90001',
          country: 'USA'
        },
        status: 'Shipped'
      },
      {
        userId: users[0]._id,
        items: [
          {
            productId: products[3]._id,
            qty: 1,
            price: products[3].price
          },
          {
            productId: products[4]._id,
            qty: 1,
            price: products[4].price
          }
        ],
        totalAmount: products[3].price + products[4].price,
        address: {
          fullName: 'John Doe',
          street: '123 Main Street',
          city: 'New York',
          postalCode: '10001',
          country: 'USA'
        },
        status: 'Pending'
      }
    ]);
    console.log(`${orders.length} orders created`);

    // Create Reviews
    const reviews = await Review.insertMany([
      {
        productId: products[0]._id,
        userId: users[0]._id,
        name: 'John Doe',
        rating: 5,
        comment: 'Excellent headphones! Great sound quality and very comfortable to wear for long hours.'
      },
      {
        productId: products[0]._id,
        userId: users[1]._id,
        name: 'Jane Smith',
        rating: 4,
        comment: 'Good quality but a bit pricey. Noise cancellation works great though.'
      },
      {
        productId: products[2]._id,
        userId: users[0]._id,
        name: 'John Doe',
        rating: 4,
        comment: 'Very accurate and responsive. Perfect for work.'
      },
      {
        productId: products[3]._id,
        userId: users[1]._id,
        name: 'Jane Smith',
        rating: 5,
        comment: 'Sturdy build quality. Works great for my MacBook Pro.'
      },
      {
        productId: products[4]._id,
        userId: users[0]._id,
        name: 'John Doe',
        rating: 5,
        comment: 'Crystal clear 4K video. Great for video calls and streaming.'
      },
      {
        productId: products[1]._id,
        userId: users[1]._id,
        name: 'Jane Smith',
        rating: 5,
        comment: 'Durable and fast charging. Highly recommended!'
      }
    ]);
    console.log(`${reviews.length} reviews created`);

    console.log('\n✅ Database seeding completed successfully!');
    console.log(`✅ Created ${users.length} users`);
    console.log(`✅ Created ${products.length} products`);
    console.log(`✅ Created ${orders.length} orders`);
    console.log(`✅ Created ${reviews.length} reviews`);

    // Close database connection
    await mongoose.connection.close();
    console.log('\nDatabase connection closed');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seed
seedDatabase();
