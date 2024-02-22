const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch'); 
const app = express();
const port = 4000;

app.use(cors());
app.use(express.json()); 

app.get('/', (req, res) => {
    res.send('Server listening!');
});

app.post('/api/graphql', async (req, res) => { 
    const query = req.body;

    try {
        const response = await fetch('https://graphql.bitquery.io/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': 'BQYtiasVJ7cAiyh2ZUOBhJYeLA2KeRya',
            },
            body: JSON.stringify(query),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error forwarding the GraphQL request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});

