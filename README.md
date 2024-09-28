<div align="center">
  <br />

  <a href="https://hvisual.vercel.app/#GreenGrocery" target="_blank">
    <img src="https://raw.githubusercontent.com/hiteshDhankhar01/Portfolio/main/src/assets/projects/Green_01.png" alt="Project Banner" style="height: 200px; width: auto;">
  </a>
  <br />

  <h1>GreenGrocery</h1>
  <h3>Your Go-To E-Commerce Platform for Fresh Fruits & Vegetables</h3>
  <p>Order fresh produce, pay securely with Stripe, and leave reviews for your purchases.</p>
</div>

---

# GreenGrocery - E-Commerce Website for Fruits & Vegetables 

## Introduction

**GreenGrocery** is an intuitive e-commerce platform tailored for buying fresh fruits and vegetables. Customers can create accounts, browse a wide range of products, add items to the cart, and place orders. The app also supports secure payments via Stripe and allows users to leave reviews and ratings for purchased products. Built with modern technologies like React, MongoDB, and Node.js, **GreenGrocery** offers a smooth and secure shopping experience.

## Key Features

- **Secure Authentication**: Account creation and login secured with JWT.
- **Cart Management**: Easily add or remove fruits and vegetables from your cart, adjust quantities, and proceed to checkout.
- **Stripe Integration**: Process secure payments via Stripe for a seamless checkout experience.
- **Reviews & Ratings**: Customers can rate and review the fruits and vegetables they’ve purchased.

## Technologies Used

- **React.js**: Frontend library for building dynamic, responsive user interfaces.
- **Node.js & Express.js**: Backend framework for handling server-side logic and API routing.
- **MongoDB**: NoSQL database for storing user information, orders, and product details.
- **Stripe**: Payment gateway for processing secure online payments.
- **JWT & bcrypt.js**: Used for user authentication and secure password storage.
- **Mongoose**: MongoDB object modeling for handling database queries.

## ⚙️ Installation

To run **GreenGrocery** locally, follow these steps:

### 1. **Clone the repository**:

```bash
git clone https://github.com/yourusername/greengrocery.git
cd greengrocery
```

### 2. **Install dependencies**:

#### Frontend:
```bash
cd frontend
npm install
```

#### Backend:
```bash
cd ../backend
npm install
```

### 3. **Set up environment variables**:

Create a `.env` file in both the `frontend` and `backend` directories with the following variables:

- **Backend `.env`**:
    ```bash
    PORT=3000
    MONGO_URL=mongodb://localhost:27017/greengrocery
    JWT_SECRET_KEY=your-jwt-secret 
    STRIPE_SECRET_KEY=your-stripe-secret-key
    ```

- **Frontend `.env`**:
    ```bash
    VITE_CLOUD_NAME=your-cloudinary-cloud-name
    VITE_UPLOAD_PRESENT=your-upload-present
    ```

### 4. **Run the servers**:

#### Backend:
```bash
cd backend
npm run dev
```

#### Frontend:
```bash
cd ../frontend
npm run dev
```

### 5. **Access the Application**:

Open your browser and navigate to [http://localhost:5173](http://localhost:5173) to view the app.
---

