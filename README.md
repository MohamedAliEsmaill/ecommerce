# Swift Cart

This project is an online store web application that allows users to browse products, add them to their cart, make orders, and manage their profiles. The application supports two user roles: Admin and User, each with specific functionalities.

## Features

### Admin Features

- **Authentication and Authorization:**
  - Login with pre-registered credentials.
  - Access the products and orders management pages.
- **Product Management:**
  - View, create, update, and delete products.
  - Search products by name.
- **Order Management:**
  - View all orders and change their states (pending, accepted, rejected).

### User Features

- **General Access:**
  - View home and about pages without logging in.
- **Product Browsing:**
  - View products with promotions on the home page.
  - Search and view all products.
  - Add products to the cart and proceed to checkout.
- **User Profile:**
  - Register and login securely.
  - Edit personal information.
  - View order history and cancel pending orders.

## Technologies Used

- Frontend:

  - Angular (Version 17)
  - HTML/CSS/JavaScript/TypeScript
  - Tailwind CSS

- Backend:
  - Node.js
  - Express.js
  - MongoDB (NoSQL database)

## Getting Started

### Prerequisites

- Node.js and npm should be installed on your machine.
- MongoDB should be installed and running locally or on a remote server.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/MohamedAliEsmaill/ecommerce.git
   ```

2. Install dependencies:

- Client side dependencies:

```bash
cd client
npm install
```

- Server side dependencies:

```bash
cd server
npm install
```

3. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Define the necessary environment variables (e.g., database connection string, secret key for JWT).

### Running the Application

1. Start the backend server:

   ```bash
   npm run start:server
   ```

2. Start the frontend development server:

   ```bash
   npm run start:client
   ```

3. Access the application in your browser:

   ```
   http://localhost:4200
   ```

## License

This project is licensed under the [MIT License](LICENSE).
