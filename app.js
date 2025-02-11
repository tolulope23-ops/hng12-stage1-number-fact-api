const express = require('express'); 
const { StatusCodes } = require('http-status-codes'); // Import HTTP status codes for better response handling
const cors = require('cors'); 

// Import utility functions for number classification and facts
const { isPrime, isPerfect, isDigitSum, isArmStrong, get_number_fact } = require('./utils/number_function');

const app = express();

// Load environment variables from a .env file
require('dotenv').config(); 
app.use(express.json()); 

// Enable CORS to allow requests from different origins
app.use(cors()); 

const PORT = process.env.PORT || 3000;

// get route to classify a number and return its properties
app.get('/api/classify-number/', async (req, res) => {
    const number = req.query.number; // Retrieve the 'number' query parameter from the request

    // Check if a number is provided in the request
    if (!number) {
        return res.status(400).json({
            error: null,
            number: number // Returns the provided input (which is missing in this case)
        });
    }

    const num = Number(number); // Convert the input to a number

    // Validate if the input is a valid number
    if (isNaN(num)) {
        return res.status(400).json({
            error: num, 
            number: number // Return the original input for reference
        });
    }

    const properties = []; // Initialize an array to store number properties

    // Check if the number is an Armstrong number
    if (isArmStrong(num)) {
        properties.push("armstrong");
    }

    // Determine if the number is even or odd
    properties.push(num % 2 === 0 ? "even" : "odd");

    try {
        // Fetch a fun fact about the number from the utitlity functions
        const funFact = await get_number_fact(num);

        // Construct the response object with various properties
        const result = {
            number: num, // The parsed number
            is_prime: isPrime(num), 
            is_perfect: isPerfect(num), 
            properties: properties, 
            digit_sum: isDigitSum(num),
            fun_fact: funFact // Retrieves a fun fact about the number
        };

        res.status(StatusCodes.OK).json(result); // Send a successful response with number details
    } catch (error) {
        // Handle errors when fetching number facts
        res.status(StatusCodes.BAD_REQUEST).json({
            error: "Error fetching number fact"
        });
    }
});

// Start the server and listen for incoming requests
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
