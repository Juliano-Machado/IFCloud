const runScript = require("../RunPythonScript");

class DirectController{

    async runScriptByScriptName(req, res){
        try {
            const run = new runScript();
            var scriptName = req.params.script_name;

            if(run.runPythonScriptNotParams(scriptName)){
                return res.send(run.runPythonScriptNotParams(scriptName));
            }else{
                return res.send("ERROR-01 !!! Script \""+scriptName+"\" not found !!!");
            }
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = new DirectController();