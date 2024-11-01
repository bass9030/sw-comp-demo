const asdf = require("./csvjson.json");
const fs = require("fs");
let autocomplete = [];

asdf.forEach((e) => {
    let text = `${e["시도"]} ${e["시군구"]}`;
    if (!autocomplete.includes(text)) autocomplete.push(text);
});

fs.writeFileSync("./autocomplete.json", JSON.stringify(autocomplete));
