// const cheerio = require("cheerio");
// async function isVaildCity(city) {
//     let response = await fetch(
//         `https://www.code.go.kr/stdcode/regCodeL.do?cPage=1&regionCd_pk=&chkWantCnt=0&reqSggCd=*&reqUmdCd=*&reqRiCd=*&searchOk=0&codeseId=00002&pageSize=10&regionCd=&locataddNm=${encodeURIComponent(
//             city
//         )}&sidoCd=*&sggCd=*&umdCd=*&riCd=*&disuseAt=0&stdate=&enddate=`,
//         {
//             method: "POST",
//         }
//     );
//     let $ = cheerio.load(await response.text());

//     let regs = $(
//         "form > table > tbody > tr:nth-child(3) > td > table > tbody > tr"
//     );
//     return regs.text().trim() != "조회된 자료가 없습니다.";
// }
const citys = require("../citypos.json");

function isVaildCity(city) {
    return Object.keys(citys).includes(city);
}

module.exports = isVaildCity;
