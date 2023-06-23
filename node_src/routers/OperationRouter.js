const router = require("express").Router();
const path = require("path");

const OperationController = require('../controllers/OperationController');

router.post("/run_script/operation", OperationController.operationStarter);

router.post("/run_script/operation/json", OperationController.formJson);

module.exports = router;