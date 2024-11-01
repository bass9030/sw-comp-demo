var express = require("express");
const isVaildCity = require("../../utils/getVaildCity");
var router = express.Router();

/* GET users listing. */
router.get("/", async (req, res, next) => {
    // https://openapi.naver.com/v1/search/news.json?query=검색어
    try {
        let city = req.query?.city;
        // if (!(await isVaildCity(city))) {
        //     res.status(400);
        //     res.json({
        //         message: "올바르지 않은 도시명",
        //     });
        //     return;
        // }
        let response = await fetch(
            `https://openapi.naver.com/v1/search/news.json?query=${encodeURIComponent(
                city
            )}%20환경`,
            {
                method: "GET",
                headers: {
                    "X-Naver-Client-Id": "EDobgl5427_8KGiUqlSc",
                    "X-Naver-Client-Secret": "wQWLQUvCn3",
                },
            }
        );
        res.json({ data: await response.json() });
    } catch (e) {
        console.error(e);
        res.status(500);
        res.json({ err: req.app.get("env") == "development" ? e : undefined });
    }
});

module.exports = router;
