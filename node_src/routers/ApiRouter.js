const router = require("express").Router();

const DirectController = require('../controllers/DirectController');
const ExtensionController = require('../controllers/ExtensionController');
const OperationController = require('../controllers/OperationController');

router.get("/ifcloud/test", OperationController.test);

router.get("/ifcloud/run_script/script_name/:script_name", DirectController.runScriptByScriptName);

router.get("/ifcloud/run_script/patient_id/:id", ExtensionController.runScriptByPatientId);

router.get("/ifcloud/run_script/observation_id/:id", ExtensionController.runScriptByObservationId);

//router.get("/ifcloud/run_script/operation/test", OperationController.test);

module.exports = router;