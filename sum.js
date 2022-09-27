const sum = (a,b) => a + b;

console.log(process.argv);

const [, ,num1,num2] = process.argv;

console.log(sum(+num1, +num2));