const router = require("express").Router();
const path = require("path");

const express = require("express");
const fileUpload = require("express-fileupload");

router.use(fileUpload());

const FileUploadController = require('../controllers/FileUploadController');

router.get("/ifcloud/home", (req, res)=>{
    res.render('home');
});

router.get("/ifcloud/file_upload", (req, res)=>{
    res.render('file_upload');
});

router.get("/ifcloud/json_form", (req, res)=>{
    res.render('json_form');
});

router.get("/ifcloud/about", (req, res)=>{
    res.render('about');
});

router.post("/ifcloud/uploader", FileUploadController.scriptUploader);

module.exports = router;

/*_old

/*router.get("/ifcloud/home", (req, res)=>{
    res.sendFile("/html_src/home.html", { root: process.cwd() });
});*/

/*router.get("/ifcloud/file_uploader", (req, res)=>{
    res.sendFile("/html_src/fileUploader.html", { root: process.cwd() });
});*/

/*router.get("/ifcloud/json_form", (req, res)=>{
    res.sendFile("/html_src/jsonForm.html", { root: process.cwd() });
});*/