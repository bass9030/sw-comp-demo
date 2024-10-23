const csv = require("csv-parser");
const fs = require("fs");
const result = {};

fs.createReadStream("citypos.csv")
    .pipe(csv())
    .on(
        "data",
        (data) =>
            (result[data.city] = {
                long: data["longitude"],
                lat: data["latitude"],
            })
    )
    .on("end", () => {
        console.log(result);
        fs.writeFileSync("./citypos.json", JSON.stringify(result));
    });
