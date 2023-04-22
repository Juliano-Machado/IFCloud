const path = require("path");
const fs = require("fs");

class FileUploaderController{
    async scriptUploader(req, res){
        try{
            var script = req.files.script;
            var scriptName = script.name;
            var scriptExtName = path.extname(scriptName.toLowerCase());
            var filetype = /.py/;

            if (!filetype.test(scriptExtName)) {
                return res.status(500).send(
                    "Error: File upload only supports the following filetypes - " +filetype
                );
            }

            if(fs.existsSync("./uploads_src/"+scriptName)){
                scriptName = Date.now().toString()+""+scriptName;
            }

            script.mv("./uploads_src/"+scriptName);

            return res.status(500).send(
                "Upload feito com sucesso"
            );
        }catch(e){
            console.log(e);
            return res.status(e.statusCode || 500).json(e.message);
        }
    }
}

module.exports = new FileUploaderController();