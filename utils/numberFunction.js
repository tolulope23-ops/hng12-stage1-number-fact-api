const isPrime = (number) =>{
    if (number <= 2) return false;

    for(let i = 2; i <= Math.sqrt(number); i++){
        if (number % i === 0) return false;
    }
    return true;
}

const isArmStrong = (number) =>{
    let numArray = number.toString().split('');
    let numLength = numArray.length;

    const is_Armstrong = numArray.map(num => parseInt(num)).reduce((acc, num) => acc + num**numLength, 0);
    
    if(number == is_Armstrong){
        if(number % 2 === 0){
            return ["isarmstrong", "even"];
        }
        else{
            return ["isarmstrong", "odd"];
        }
    }
    else{
        if(number % 2 === 0){
            return ["even"];
        }
        else{
            return ["odd"];
        }
    } 
}

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

const isDigitSum = (number) => {
    let digitArray = number.toString().split('');

    return digitArray.map(num => parseInt(num)).reduce((acc, num) => acc + num, 0)
}


module.exports = {isPrime, isPerfect, isArmStrong, isDigitSum};