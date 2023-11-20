const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db.js');
const {errorLogger, errorResponder } = require('./errors/middleware.js');
const {InvalidPathError} = require('./errors/errors.js')
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
connectDB();

app.get('/', (req, res) => res.status(200).json({ message: "Welcome to Video streaming API"}));
app.get('*', (req, res, next) => {
    try{
        throw new InvalidPathError()
    }
    catch(error){
        console.log(error)
        next(error)
    }
})

app.use(errorLogger);
app.use(errorResponder);

app.listen(PORT, () => console.log(`App is listening on port ${PORT}`))