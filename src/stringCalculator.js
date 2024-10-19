"use strict";
class StringCalculator {
    add(numbers) {
        if (numbers === "") {
            return 0;
        }
        // Check for custom delimiter
        let delimiter = ",";
        if (numbers.startsWith("//")) {
            const parts = numbers.split("\n", 2);
            delimiter = parts[0].substring(2); // Extract the custom delimiter
            numbers = parts[1]; // The remaining numbers part
        }
        // Replace newlines with delimiter and split by delimiter
        numbers = numbers.replace(/\n/g, delimiter);
        const numberList = numbers.split(delimiter).map(num => parseInt(num));
        // Check for negative numbers
        const negativeNumbers = numberList.filter(num => num < 0);
        if (negativeNumbers.length > 0) {
            throw new Error(`Negative numbers not allowed: ${negativeNumbers.join(",")}`);
        }
        // Return the sum
        return numberList.reduce((sum, num) => sum + num, 0);
    }
}
// Test cases
const calculator = new StringCalculator();
// Test case for empty string
console.assert(calculator.add("") === 0, "Test case for empty string failed");
// Test case for single number
console.assert(calculator.add("1") === 1, "Test case for single number failed");
// Test case for two numbers
console.assert(calculator.add("1,5") === 6, "Test case for two numbers failed");
// Test case for multiple numbers
console.assert(calculator.add("1,2,3,4") === 10, "Test case for multiple numbers failed");
// Test case for new line delimiter
console.assert(calculator.add("1\n2,3") === 6, "Test case for new line delimiter failed");
// Test case for custom delimiter
console.assert(calculator.add("//;\n1;2") === 3, "Test case for custom delimiter failed");
// Test case for negative numbers
try {
    calculator.add("1,-2,3,-4");
}
catch (e) {
    console.assert(e.message === "Negative numbers not allowed: -2,-4", "Test case for negative numbers failed");
}
console.log("All test cases passed.");
