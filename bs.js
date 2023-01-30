const PDFExtract = require('pdf.js-extract').PDFExtract;
const pdfExtract = new PDFExtract();
const options = {}; /* see below */
pdfExtract.extract('./ss.pdf', options, (err, data) => {
    if (err) return console.log(err);

    const ps = data.pages;
    ps.forEach((e) => {
        const data = {
            string: e.content
        }
        console.log(data.string);
    })

});