# BC4GRID Distributed Blockchain App

## Description

This distributed application represents a Blockchain software solution based on cryptographic technology. It was developed to support the transition of power grids from a centralized to a decentralized model, offering functionalities for prosumers and consumers to monitor their energy production and consumption. It also provides an energy market for users to sell excess energy or buy energy from others in a decentralized manner. The application serves as a starting point for product developers, students, and researchers to develop new products using Blockchain technology. It facilitates learning and experimentation with different consensus protocols and cryptographic algorithms and techniques.

Key components include:
 * Ethereum smart contracts for core functionalities.
 * A user web interface using the Web3.js library and Metamask wallet to communicate with the Ethereum blockchain platform hosting the smart contracts.
 * A smart meter simulator that emulates energy consumption and production based on real-life data.

 ## Features

- **Network status display**: Shows connected status, wallet address, network ID, gas limit, base fee, and priority fee.
- **Wallet input**: Allows input of wallet address and private key.
- **Contract interaction**: Loads and displays smart contract tabs and details.
- **Console output**: Handles console output for transactions, calls, etc.
- **Event loading**: Loads and displays smart contract events.
- **Blockchain interaction**: Provides UI for deploying and calling contracts.
- **Dashboard**: In the current phase dashboard shows a basic API functionalities. The dashboard will be enhanced with the following features:
  - **Real-time updates**: Display real-time updates of blockchain transactions and events.
  - **Contract management**: Provide an interface for managing and interacting with multiple smart contracts.
  - **Data visualization**: Use charts and graphs to visualize blockchain data and smart contract interactions.
  - **Search and filter**: Add functionality to search and filter through blockchain events and transactions.
  - **User management**: If your DApp has user accounts,  a dashboard for managing user information and activity is provided.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js: [![Node.js](https://img.shields.io/badge/Node.js-v14.17.4-green.svg)](https://nodejs.org/)
- npm: [![npm](https://img.shields.io/badge/npm-v6.14.14-blue.svg)](https://www.npmjs.com/)
- Docker: [![Docker](https://img.shields.io/badge/Docker-v20.10.8-blue.svg)](https://www.docker.com/)
  - Docker must be installed and running on your machine. You can verify this by running `docker -v` in your terminal. If Docker is installed, this command will return the version number.
- Docker Compose: [![Docker Compose](https://img.shields.io/badge/Docker%20Compose-v1.29.2-blue.svg)](https://docs.docker.com/compose/)
  - Docker Compose must be installed and working. You can verify this by running `docker-compose -v` in your terminal. If Docker Compose is installed, this command will return the version number.

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/BSolutions/BC4GRID.git
    ```

2. **Navigate to the project directory:**

    ```bash
    cd BC4GRID/
    ```

3. **Build and run the application using Docker Compose:**

    ```bash
    docker-compose up --build
    ```

    This command will build the Docker images for the services defined in your `docker-compose.yml` file and start the containers.

    If you want to run the containers in the background, you can use the `-d` option:

    ```bash
    docker-compose up --build -d
    ```

    To run application, run in browser with **installed Metamask**: `localhost:3000`.

    Admin user is `admin`, password `bc4grid`. All other registered users should be approved by admin. 
    
## Contributing

The development of this application was supported by the **EU H2020 SMART4ALL #3 CTTE BC for creating decentralized smart grid system (BC4GRID) project**

### Particapants
 * [Mathematical Institute of the Serbian Academy of Sciences and Arts (MISANU)](https://www.mi.sanu.ac.rs/): 
Part of the Serbian Academy of Sciences and Arts, specializes in mathematics, mechanics, and computer science research and focuses on advanced research, industry applications, and international collaboration.
 * [INCEPTON](incepton.hr): a Croatian SME developing data-driven models in commercial software projects for smart energy grid solutions, including custom-made software for the industry.
 * [B Solutions doo (BSN)](https://www.b-solutions.me/): 
 A Montenegrin SME with a proven track record in marketing and commercialization, responsible for marketing, commercialization, and expansion to the South-East Europe market.

## License
This project is licensed under the MIT License