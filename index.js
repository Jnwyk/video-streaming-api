const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.status(200).json({ message: "Welcome to Video streaming API"}));

app.use('*', (req, res) => res.status(404).json({ message: "Unknown route" }));

app.listen(PORT, () => console.log(`App is listening on port ${PORT}`))