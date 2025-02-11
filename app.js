const express = require('express');
const { StatusCodes } = require('http-status-codes');
const cors = require('cors');

const{isPrime, isPerfect, isDigitSum, isArmStrong, get_number_fact} = require('./utils/number_function')

const app = express();
require('dotenv').config();

app.use(express.json())
app.use(cors());


const PORT = process.env.PORT;


app.get('/api/classify-number/', async (req, res) => {
    const number = req.query.number;  
    if (!number) {
        return res.status(400).json({
            error: null,
            number: number
        });
    }

    const num = Number(number);
    if(isNaN(num)){
        return res.status(400).json({
            error: num,
            number: number
        });
    }

    const properties = [];

    if (isArmStrong(num)) 
        properties.push("armstrong");
    properties.push(num % 2 === 0 ? "even" : "odd");

    try {
           
        const funFact = await get_number_fact(num);

        const result = {
            number: num,
            is_prime: isPrime(num),
            is_perfect: isPerfect(num),
            properties: properties,
            digit_sum: isDigitSum(num),
            fun_fact: funFact
        }
        res.status(StatusCodes.OK).json(result)
    }
    catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ 
            error: "Error fetching number fact" 
        });
    }
});

app.listen(PORT, ()=>{
    console.log(`Server is listening on port ${PORT}`);
});
