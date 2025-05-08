function addNumbers(array){
    let sum = 0;
    for (let i = 0; i < array.length; i++){
        sum = sum + array[i];
    }
    document.getElementById("addNumbersOutput").innerHTML = sum;
}
function findMaxNumber(){
    let max = -Infinity;
    for (let i = 0; i < arguments.length; i++){
        max = Math.max(arguments[i]);
        
        document.getElementById("maxNumberOutput").innerHTML = max;
    }
}
function addOnlyNumbers(array){ //parseFloat only looks for numbers at the beginning of the string therefore it will not convert "birds2" to a number or true to a number
    let sum = 0;
    for (let i = 0 ; i <array.length ; i++){
        if (typeof array[i] === "number"){
            sum = sum + array[i];
        }
        else
        if (!isNaN(parseFloat(array[i]))){ //isNaN() is a function that checks if the argument is not a number therefore !isNaN() checks if the argument is a number so when used with parseFloat it will only convert the converted numbers in the array to numbers
            sum = sum + parseFloat(array[i]);
        }
    }
    document.getElementById("addOnlyNumbersOutput").innerHTML = sum;
}
function getDigits(String){
    let digits = "";
    for (let i = 0; i < String.length; i++){
        if (!isNaN(parseInt(String.charAt(i)))){
            digits = digits.concat(String[i]);
        }
    }
    document.getElementById("getDigitsOutput").innerHTML = digits;
}
function reverseString(String){
    let reversedString ="";
    for (let i = String.length - 1; i>=0 ; i--){
        reversedString = reversedString.concat(String.charAt(i));
    }
    document.getElementById("reverseStringOutput").innerHTML = reversedString;
}
function getCurrentDate(){
    const date = new Date();
    date.toLocaleString();
    document.getElementById("getCurrentDateOutput").innerHTML = date;
}
