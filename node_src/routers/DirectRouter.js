const router = require("express").Router();
const path = require("path");

const DirectController = require('../controllers/DirectController');

router.get("/run_script/direct/:script_name", DirectController.runScriptByScriptName);

module.exports = router;