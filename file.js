const fs = require('fs');

const quote = "Live more, Worry less !!"

const[ , ,num] = process.argv;

for(let i=1; i<=num; i++){
fs.writeFile(`./backup/text-${i}.html`, quote, (err)=>{
    console.log("Completed writing");
})
}


