
const fs = require('fs');
const _ = require('lodash');
const file_dir = __dirname;
// function to get the verses different from each other
function getDifferencies(req, res, next) {
    try {
        const real_quraan = fs.readFileSync(`${file_dir}/real_hafs.json`);
        const quraan_hafs = fs.readFileSync(`${file_dir}/quran_hafs.json`);
        const verses = JSON.parse(quraan_hafs.toString()); // array of modified \n verses
        const real_verses = JSON.parse(real_quraan.toString()); // array of real verses
        // to get verses with no \n
        const text_verses = verses.map((verse) => {
            verse.aya_text = verse.aya_text.replace(/(\r\n|\n|\r)/gm, " ")
            return verse
        }); // array of the modified without \n
        console.log(text_verses);
        // to filter the verses different from real
        const _potentially_wrong = text_verses.filter((ve,i)=> ve.aya_text !== real_verses[i].aya_text);
        res.json({potential_wrong:_potentially_wrong , len : _potentially_wrong.length});
    } catch (err) {
        res.json(err);
        console.log(err);
    }
}
// function to return the status of comparasion
function compare(req, res, next) {
    try {
        const real_quraan = fs.readFileSync(`${file_dir}/real_hafs.json`);
        const quraan_hafs = fs.readFileSync(`${file_dir}/quran_hafs.json`);
        res.json({isSame : _.isEqual(JSON.parse(real_quraan.toString()), JSON.parse(quraan_hafs.toString()))});
    } catch (err) {
        res.json(err);
        console.log(err);
    }
}

module.exports = {
    compare,
    getDifferencies
}