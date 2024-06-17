
# MXAgro Frontend

This repository is a responsive and dynamic interface/boilerplate for an agriculture multivendor e-commerce store. Built with Next.js and React, it provides a seamless and intuitive user experience for browsing products, managing orders, and interacting with vendors.

## Features

- **Responsive Design**: Ensures a seamless experience across devices.
- **User Authentication and Authorization**: Secure login and registration for users and vendors.
- **Product Browsing and Searching**: Advanced search and filtering options for products.
- **Vendor Management**: Dedicated dashboards for vendors to manage their products and orders.
- **Order Management**: Easy tracking and management of customer orders.
- **Cart and Checkout**: Smooth and secure cart and checkout process.
- **Payment Integration**: Stripe(Paystack) multi-channel payment methods.

## Technologies Used

- **Next.js**: Framework for server-rendered React applications.
- **React**: JavaScript library for building user interfaces.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Axios**: Promise-based HTTP client for the browser and Node.js.
- **Framer Motion**: Library for animations.
- **Zod**: TypeScript-first schema declaration and validation library.
- **React Toastify**: Notification library.

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository:**

    ```bash
    git clone https://github.com/AbdulBima/Mx_Agro.git
    cd mxagro_frontend
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Set up environment variables:**

    Create a `.env.local` file in the root directory and add any necessary environment variables. Typically, for a Next.js application, you might need:

    ```env
    NEXT_PUBLIC_API_URL=http://yourbackendurl.com/api
    ```

4. **Start the development server:**

    ```bash
    npm run dev
    ```

    - For production:

        ```bash
        npm run build
        npm start
        ```

## Usage

Once the development server is running, you can access the application at `http://localhost:3000`.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

