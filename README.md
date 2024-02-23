# block-lists


This project is designed to fetch and display a list of Bitcoin blocks from the Bitquery GraphQL API. The aim is to achieve a functionality similar to the Blocks list in this website: [BTC website](https://explorer.btc.com/btc/blocks). 

## Features

- Fetch and display block related information related to height,block size, transaction count, fee value and timestamp for a list of blocks within a particular time range.
- Pagination support for block lists.


## Technologies

- React for the frontend interface.
- Apollo Client for GraphQL integration.
- Node.js and Express for the backend server.
- CORS for handling cross-origin requests.
- The api used is [Bitquery API](https://graphql.bitquery.io/)

## Installation

To set up the project locally, follow these steps:

1. Clone the repository: git clone [URL](https://github.com/neu-info7500-spring-04/block-lists.git)
2. Navigate to the project directory
3. Install dependencies for both client and server using npm install.
4. Start the backend server by navigating to server folder and using this command: node index.js
5. Start the frontend application in another terminal using npm start
6. After starting the server and client navigate to `http://localhost:3000` in your web browser to view the application.


