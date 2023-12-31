# BC4GRID

Repository for power-grid energy trading via blockchain

## Ethereum DApp Interface

This project provides a user interface for interacting with the Ethereum blockchain. It allows users to interact with smart contracts, monitor blockchain events, and view network status information.

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

## Main Files

- `index.html`: The main page of the application. It includes Bootstrap for styling and the Web3.js library for interacting with Ethereum nodes.
- `scripts/bc4grid.js`: This script file defines classes and functions for interacting with the Ethereum blockchain using Web3.js.

## How to Use

1. Open `index.html` in your web browser.
2. Connect to your Ethereum node and input your wallet credentials.
3. Use the interface to interact with your smart contracts and monitor blockchain events.

## Dependencies

- [Bootstrap](https://getbootstrap.com/): Used for styling the application.
- [Web3.js](https://web3js.readthedocs.io/): A collection of libraries that allow you to interact with a local or remote Ethereum node using HTTP, IPC or WebSocket.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

Not sure what licence should be here :-) 