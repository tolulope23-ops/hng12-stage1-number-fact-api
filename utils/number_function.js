
// Function to check if a number is prime
const isPrime = (number) =>{
    if (number < 2) return false;

    for(let i = 2; i <= Math.sqrt(number); i++){
        if (number % i === 0) return false;
    }
    return true;
}

// Function to check if a number is Armstrong
const isArmStrong = (number) =>{
    let num = Math.abs(number);
    let numArray = num.toString().split('');
    const numLength = numArray.length;

    const is_Armstrong = numArray.map(num => parseInt(num)).reduce((acc, num) => acc + num**numLength, 0);
    
    return num == is_Armstrong;
}

// Function to check if a number is perfect
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

// Function to check if a number is digitSum
const isDigitSum = (number) => {
    let digit = Math.abs(number);
    let digitArray = digit.toString().split('');
    const digitSum = digitArray.map(num => parseInt(num)).reduce((acc, num) => acc + num, 0)

    return number < 0 ? -digitSum : digitSum;
    
}

// Function to get the funfact of a number
const get_number_fact = async (number) =>{
    try {
        const response = await fetch(`http://numbersapi.com/${number}/math?json`);
        const number_fact = await response.json();
        
        return number_fact.text;

    } catch (error) {
        res.status(400).json({ error: `Interresting fact about ${number} cannot be fetched`}) 
    }
}


module.exports ={isPrime, isPerfect, isDigitSum, isArmStrong, get_number_fact}