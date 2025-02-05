const express = require('express');
const { StatusCodes } = require('http-status-codes');
const cors = require('cors');

const app = express();
require('dotenv').config();

app.use(express.json())
app.use(cors());

const {isPrime, isPerfect, isDigitSum, isArmStrong} = require('./utils/numberFunction');

const PORT = process.env.PORT;

app.get('/api/classify-number/', async (req, res) => {
    const number = (req.query.num);    
    if (!number || isNaN(number) || !Number.isInteger(Number(number))) {
        return res.status(400).json({
            number,
            error: true
        });
    }

    const num = Number(number);
    try {
        const response = await fetch(`http://numbersapi.com/${number}/math?json`);
        const data = await response.json();
        const result = {
            number: num,
            is_Perfect: isPerfect(num),
            is_Prime: isPrime(num),
            properties: isArmStrong(num),
            digit_sum: isDigitSum(num),
            fun_fact: data.text
        }
        res.status(StatusCodes.OK).json(result)
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ 
            error: "Error fetching number fact" 
        });
    }
});

app.listen(PORT, ()=>{
    console.log(`Server is listening on port ${PORT}`);
});
