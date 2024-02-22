# block-lists


This project is designed to fetch and display a list of Bitcoin blocks from the Bitquery GraphQL API. The aim is to achieve a functionality similar to the Blocks list in this website: [BTC website](https://explorer.btc.com/btc/blocks). The block lists in this project displays height,block size, transaction count, fee value and timestamp for a list of blocks within a particular time range.

## Features

- Fetch and display blocks and transactions for the last 8 hours.
- Pagination support for block lists.
- Client-side date selection for fetching blocks.

## Technologies

- React for the frontend interface.
- Apollo Client for GraphQL integration.
- Node.js and Express for the backend server.
- CORS for handling cross-origin requests.

## Installation

To set up the project locally, follow these steps:

1. Clone the repository: git clone [URL](https://github.com/neu-info7500-spring-04/block-lists.git)
2. Navigate to the project directory
3. Install dependencies for both client and server
4. Start the backend server by navigating to server folder and using this command: node index.js
5. Start the frontend application in another terminal using npm start
6. After starting the server and client navigate to `http://localhost:3000` in your web browser to view the application.


