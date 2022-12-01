var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/test', function(request, response) {
    return response.status(200).json({ Correto: "Deu certo" });
});

module.exports = router;
