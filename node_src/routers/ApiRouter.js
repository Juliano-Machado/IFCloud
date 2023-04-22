const router = require("express").Router();
const path = require("path");

const express = require("express");
const fileUpload = require("express-fileupload");

router.use(fileUpload());

const DirectController = require('../controllers/DirectController');
const ExtensionController = require('../controllers/ExtensionController');
const OperationController = require('../controllers/OperationController');
const FileUploadController = require('../controllers/FileUploadController');

//router.get("/if_loud/home", OperationController.test);

router.get("/if_cloud/run_script/script_name/:script_name", DirectController.runScriptByScriptName);

router.get("/if_cloud/run_script/patient_id/:id", ExtensionController.runScriptByPatientId);

router.get("/if_cloud/run_script/observation_id/:id", ExtensionController.runScriptByObservationId);

router.post("/if_cloud/run_script/operation", OperationController.operationStarter);

router.post("/if_cloud/run_script/operation/json", OperationController.formJson);

router.get("/if_cloud/file_uploader", (req, res)=>{
    res.sendFile("/html_src/fileUploader.html", { root: process.cwd() });
});

router.get("/if_cloud/json_form", (req, res)=>{
    res.sendFile("/html_src/jsonForm.html", { root: process.cwd() });
});

router.get("/if_cloud/home", (req, res)=>{
    res.sendFile("/html_src/home.html", { root: process.cwd() });
});

router.post("/if_cloud/upload", FileUploadController.scriptUploader);

module.exports = router;