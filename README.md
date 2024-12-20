﻿# Rule Engine Application

## Overview
This project implements a dynamic rule engine designed to evaluate complex logical expressions using an Abstract Syntax Tree (AST). The engine allows users to create, combine, and evaluate rules based on various data inputs. It is particularly useful for scenarios requiring conditional checks and automated decision-making processes.

- **Rule Creation**: Users can define rules using a simple string syntax.
- **Rule Combination**: Multiple rules can be combined using logical operators (AND, OR).
- **AST Evaluation**: The system evaluates rules based on provided data structures.
- **User Interface**: A user-friendly interface for rule management and data input.

![App Screenshot](./readmeAsset/homePage.png)

## Demo
- Video Demo of Application: https://www.youtube.com/watch?v=b2zBL22n8B0
- Live Demo of Application: https://rule-engine-three.vercel.app/

## Tech Stack

- **Backend**: Node.js, Express.js
- **Frontend**: React.js for managing rules and data visualization
- **Database**: MongoDB
- **API**: Custom API for rule management and evaluation

## Design Choices

### Node.js:
- **Asynchronous Processing**: Efficient handling of multiple requests, enabling real-time rule evaluation.
- **JavaScript Full Stack**: Simplifies development by allowing the use of JavaScript across both server and client sides.
- **Modular Architecture**: Promotes clean code and easy maintenance through separation of concerns.

### React:
- **Component-Based Architecture**: Facilitates the development of reusable components for the rule management interface.
- **Dynamic State Management**: Allows real-time updates to rules and evaluations based on user input.
- **Rich Ecosystem**: Integrates seamlessly with libraries like Tailwind CSS for styling and charting libraries for visualization.

### MongoDB:
- **Document-Based Storage**: Efficiently stores complex rule structures and data without a predefined schema.
- **Scalable and Flexible**: Adaptable to changing requirements and capable of handling large datasets.
- **Aggregation Framework**: Simplifies data analysis and extraction for rule evaluations.

## Setup Instructions

### Prerequisites
- **Node.js**: Ensure you have Node.js (version >= 14.x) installed.
- **MongoDB**: MongoDB should be installed locally or accessible via a cloud instance (e.g., MongoDB Atlas).
- **Git**: For version control.

### Steps to Run the Application

1. **Clone the repository**:

    ```bash
    git clone https://github.com/shubham691438/rule-engine.git
    cd rule-engine
    ```

2. **Add environment variables in the backend folder with the filename `.env`**:

    - **Backend `.env`**:

      ```bash
        MONGO_URI=mongodb+srv://ss691438:1234@weatherapp.4mrf0.mongodb.net/weatherApp
      ```
    - **Frontend `.env`**:
        ```bash
        VITE_BACKEND_URL=http://localhost:3080
        ```  

3. **Install Dependencies**:

    ```bash
    npm run install-all
    ```
4. **Start Application**    
    ```bash
    npm start
    ```
