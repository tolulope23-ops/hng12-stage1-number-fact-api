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
    if(Number.isInteger(number)){
        return res.status(StatusCodes.BAD_REQUEST).json({
            number: number,
            error:"true"
        })
    }
    try {
        const response = await fetch(`http://numbersapi.com/${number}/math?json`);
        const data = await response.json();

        res.status(StatusCodes.OK).json({
            number: number,
            is_Perfect: isPerfect(number),
            is_Prime: isPrime(number),
            properties: isArmStrong(number),
            digit_sum: isDigitSum(number),
            fun_fact: data.text
        })
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ 
            error: "Error fetching number fact" 
        });
    }
});

app.listen(PORT, ()=>{
    console.log(`Server is listening on port ${PORT}`);
});
