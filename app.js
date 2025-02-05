const express = require('express');
const { StatusCodes } = require('http-status-codes');
const cors = require('cors');

const app = express();
require('dotenv').config();

app.use(express.json())
app.use(cors());


// Helper function to cehck if a number is prime
const isPrime = (number) =>{
    if (number < 2) return false;

    for(let i = 2; i <= Math.sqrt(number); i++){
        if (number % i === 0) return false;
    }
    return true;
}

// Helper function to cehck if a number is Armstrong
const isArmStrong = (number) =>{
    let num = Math.abs(number);
    let numArray = num.toString().split('');
    let numLength = numArray.length;

    const is_Armstrong = numArray.map(num => parseInt(num)).reduce((acc, num) => acc + num**numLength, 0);
    if(num == is_Armstrong){
        if(num % 2 === 0){
            return ["isarmstrong", "even"];
        }
        else{
            return ["isarmstrong", "odd"];
        }
    }
    else{
        if(num % 2 === 0){
            return ["even"];
        }
        else{
            return ["odd"];
        }
    } 
}

// Helper function to cehck if a number is perfect
const isPerfect = (number) => {
    if(number <= 1) return false;
    let sum = 0;
    
    for(let i = 1; i <= number / 2; i++){
        if(number % i === 0){
            sum += i;
        }
    }
    return sum == number;
}

// Helper function to cehck if a number is digitSum
const isDigitSum = (number) => {
    let removeIndex;
    let digitSum;
    let digitArray = number.toString().split('');
    if(digitArray[0] === '-'){
        removeIndex = digitArray.slice(1);
        digitSum = removeIndex.map(num => parseInt(num)).reduce((acc, num) => acc + num, 0)
        const add = parseInt("-" + digitSum);
        return add;
    }
    else{
        digitSum = digitArray.map(num => parseInt(num)).reduce((acc, num) => acc + num, 0)
        return digitSum;
    }
}

// return number.toString().split('').reduce((acc, digit) => acc + Number(digit), 0);

const PORT = process.env.PORT;

app.get('/api/classify-number/', async (req, res) => {
    const cache = new Map();
    const number = (req.query.num);  
    if (!number || isNaN(number)) {
        return res.status(400).json({
            error: true,
            number: number
        });
    }

    const num = parseInt(number, 10);
    try {
        // optimizing external Api call
        if(cache.has(number))  return res.status(200).json(cache.get(number));

        const response = await fetch(`https://numbersapi.com/${number}/math?json`);
        const data = await response.json().text;

        const result = {
            num,
            is_perfect: isPerfect(num),
            is_prime: isPrime(num),
            properties: isArmStrong(num),
            digit_sum: isDigitSum(num),
            fun_fact: data
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
