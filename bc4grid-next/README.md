# BC4GRID Distributed Blockchain App

## Description

BC4GRID is a smart-grid power trading application that uses Ethereum smart contracts. The project consists of a trading app built with Next.js and a smart-meter data collector that interacts with nodes of smart-meters. The application allows for efficient and secure power trading within a smart grid environment.

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

## Contributing

This project is sponsored by SMART4ALL EU grant.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.