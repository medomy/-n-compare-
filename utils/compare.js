
const fs = require('fs');
const _ = require('lodash');
const file_dir = __dirname;
// function to get the verses different from each other
// function getDifferencies(req, res, next) {
//     try {
//         const real_quraan = fs.readFileSync(`${file_dir}/real_hafs.json`);
//         const quraan_hafs = fs.readFileSync(`${file_dir}/quran_hafs_2.json`);
//         const verses = JSON.parse(quraan_hafs.toString()); // array of modified \n verses
//         const real_verses = JSON.parse(real_quraan.toString()); // array of real verses
//         // to get verses with no \n
//         const text_verses = verses.map((verse) => {
//             verse.aya_text = verse.aya_text.replace(/(\r\n|\n|\r)/gm, " ")
//             return verse
//         }); // array of the modified without \n
//         console.log(text_verses);
//         // to filter the verses different from real
//         const _potentially_wrong = text_verses.filter((ve,i)=> ve.aya_text !== real_verses[i].aya_text);
//         res.json({potential_wrong:_potentially_wrong , len : _potentially_wrong.length});
//     } catch (err) {
//         res.json(err);
//         console.log(err);
//     }
// }
// function to return the status of comparasion
function compare(req, res, next) {
    try {
        const real_quraan = fs.readFileSync(`${file_dir}/real_hafs.json`);
        const quraan_hafs = fs.readFileSync(`${file_dir}/quran_hafs_2.json`);
        res.json({isSame : _.isEqual(JSON.parse(real_quraan.toString()), JSON.parse(quraan_hafs.toString())) , same_lenght : JSON.parse(real_quraan.toString()).length===JSON.parse(quraan_hafs.toString()).length});
    } catch (err) {
        res.json(err);
        console.log(err);
    }
}

function getDifferencieswithoutSpaces(req, res, next){
    try {
        const real_quraan = fs.readFileSync(`${file_dir}/real_hafs.json`);
        const quraan_hafs = fs.readFileSync(`${file_dir}/quran_hafs_2.json`);
        const verses = JSON.parse(quraan_hafs.toString()); // array of modified \n verses
        const real_verses = JSON.parse(real_quraan.toString()); // array of real verses
        // to get verses with no \n
        const text_verses = verses.map((verse) => {
            verse.aya_text = verse.aya_text.replaceAll("\n", " ")
            verse.aya_text = verse.aya_text.trim();
            return verse
        }); // array of the modified without \n
        //console.log(text_verses);
        const real_verses_text = real_verses.map((verse)=>{
            verse.aya_text = verse.aya_text.trim();
            return verse
        })
        // to filter the verses different from real
        const _potentially_wrong = text_verses.filter((ve,i)=> ve.aya_text !== real_verses_text[i].aya_text);
        res.json({potential_wrong:_potentially_wrong , len : _potentially_wrong.length});
    } catch (err) {
        res.json(err);
        console.log(err);
    }
}

// function getDifferenciesInWords(req, res, next){
//     try {
//         const real_quraan = fs.readFileSync(`${file_dir}/real_hafs.json`);
//         const quraan_hafs = fs.readFileSync(`${file_dir}/quran_hafs_2.json`);
//         const verses = JSON.parse(quraan_hafs.toString()); // array of modified \n verses
//         const real_verses = JSON.parse(real_quraan.toString()); // array of real verses
//         // to get verses with no \n
//         const mapped_verses = verses.filter((verse) => {
//             verse.aya_text = verse.aya_text.split(' ');
//             verse.aya_text.forEach((word)=>{
//                 word.includes("\n");
//             })
//             return verse;
//         }); // array of the modified without \n
//         console.log(mapped_verses);
//         const real_verses_text = real_verses.map((verse)=>{
//             verse.aya_text = verse.aya_text.replace(/\s+/g, '');
//             return verse
//         })
//         // to filter the verses different from real
//         // const _potentially_wrong = text_verses.filter((ve,i)=> ve.aya_text !== real_verses_text[i].aya_text);
//         // res.json({potential_wrong:_potentially_wrong , len : _potentially_wrong.length});
//         res.json({contained:mapped_verses , length : mapped_verses.length});
//     } catch (err) {
//         res.json(err);
//         console.log(err);
//     }
// }

module.exports = {
    compare,
    getDifferencieswithoutSpaces,
}