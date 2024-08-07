# 🚀 ERP.AERO Technical task 

This is a REST API service for erp_aero, allowing users to upload, retrieve, update, and delete files from a MySQL database.

## Installation

If Node.js is not already installed on your system, you can download and install it from the [official website](https://nodejs.org/).

To run this application locally, follow these steps:

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/robsahakyan/erp_aero_test_task

2. Navigate to the project directory:

   ```bash
    cd erp_aero_test_task

3. Install dependencies.

   ```bash
    npm install

### 📋 Usage

1. After installing the dependencies, you can start the application using the following command:

   ```bash
    npm run dev

This will start the application and begin monitoring the websites specified in the config.json file.

### ⚙️ Configuration

1. Look at the test.env file for environment configurations.

2. Create a .env file in the root directory and configure your environment variables based on the settings provided in test.env.

   ```bash
    cp test.env .env

Edit .env file to match your local configuration.

### 📄 Swagger Documentation

After starting the application, you can explore the API documentation using Swagger UI:

    {serverhost}:{port}/documentation

For example, if running locally:

    http://localhost:3000/documentation

Swagger UI provides a user-friendly interface to interact with and test the API endpoints.