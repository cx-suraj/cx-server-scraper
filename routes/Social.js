var express = require('express');
var router = express.Router();
const social = require("../controllers/Social");
const rateLimitMiddleware = require("../middleware/rateLimitMiddleware");

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Social' });
});
router.post("/fetch/IGdata", rateLimitMiddleware, social.fetchIGdata);
router.post("/fetch/YTdata", rateLimitMiddleware, social.fetchYTdata);
router.post("/fetch/YTdata/ID", rateLimitMiddleware, social.fetchYtDataById);
// router.post("/fetch/test", rateLimitMiddleware, (req, res, next) => {
//     return res.send("HELLO");
// });


module.exports = router;
