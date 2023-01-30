const axios = require("axios");
let text = "what is a noun";
reque(text)

async function reque(text) {

    var dataString = {
        "document":text, 
    };

    return await axios.post("https://api.gptzero.me/predict_single_text", dataString, {

    }).then((res) => {
        console.log(res.data)
        return res.data
    }).catch((err) => {
        console.log(err);
        return err
    })



}