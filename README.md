# Driver Monitoring System

This project implements a Driver Monitoring System that analyzes driving events and generates alerts based on specified rules.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Project Structure](#project-structure)
- [Usage](#usage)
  - [Endpoints](#endpoints)
  - [Rule Evaluation](#rule-evaluation)
- [Security Considerations](#security-considerations)

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/)

### Installation

1.  Clone the repository:

    ```bash
    git clone https://github.com/om205/Driver-Monitoring-system.git
    ```

1.  Navigate to the project directory:

    ```bash
    cd driver-monitoring-system
    ```

1.  Install dependencies:

    ```bash
    npm install
    ```

1.  Run the server:

    ```bash
    npm start
    ```

## Project Structure

The project follows a modular structure for better organization:

- **src/controllers**: Handles HTTP request handling.
- **src/database**: Manages database interactions.
- **src/routes**: Defines API routes.
- **src/services**: Contains business logic.
- **src/utils**: Utility functions.

## Usage

### Endpoints

- **POST** `/event`: Accepts driving events from the IoT device.
- **GET** `/alert/{alert_id}`: Retrieves an alert by its ID.
- **GET** `/alert`: Retrieves all the alerts from database.

### Rule Evaluation

The system evaluates rules every 5 minutes to generate alerts based on predefined conditions. Rule thresholds are dynamically fetched from the database.

## Security Considerations

Input validation and parameterized queries are used to prevent SQL injection attacks.
Regularly update dependencies to address security vulnerabilities.
