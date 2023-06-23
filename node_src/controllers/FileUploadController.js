const path = require("path");
const fs = require("fs");
const router = require("express").Router();

class FileUploaderController{
    async scriptUploader(req, res){
        try{
            var script = req.files.script;
            var scriptName = script.name;
            var scriptExtName = path.extname(scriptName.toLowerCase());
            var filetype = /.py/;

            const msg = { text: "|*| Sucessfull Upload |*|" };

            if (!filetype.test(scriptExtName)) {
                msg.text = "Error: File upload only supports the following filetypes - " +filetype;
                return res.render('file_upload', {msg});
            }

            if(fs.existsSync("./uploads_src/"+scriptName)){
                scriptName = Date.now().toString()+""+scriptName;
            }

            script.mv("./uploads_src/"+scriptName);

            return res.render('file_upload', {msg});
        }catch(e){
            console.log(e);
            return res.status(e.statusCode || 500).json(e.message);
        }
    }
}

module.exports = new FileUploaderController();