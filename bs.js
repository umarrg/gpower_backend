var numeral = require('numeral');


function toPercenage(num) {
    return `${Math.round(num * 100)}%`;
  }
  
  console.log(toPercenage(0.866));
  console.log(toPercenage(1.0));

function convertToDecimal(percent) {
    let newarr = []
    for (i = 0; i < percent.length; i++) {
        const parsed = parseFloat(percent[i]);
        if (!Number.isNaN(parsed[i])) {
            let newval = parseFloat(percent[i]) / 100;
            //return newval;
            newarr.push(newval)
        } else {
            return 0;
        }
    } return newarr;
}


function convert(percent) {
    const parsed = parseFloat(percent);
    if (!Number.isNaN(parsed)) {
        let newval = parseFloat(percent) / 100;
        return newval;

    } else {
        return 0;
    }
} 




