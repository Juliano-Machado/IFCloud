const runScript = require("../RunPythonScript");

class DirectController{

    async runScriptByScriptName(req, res){
        try {
            const run = new runScript();
            const scriptName = req.params.script_name;
            res.send(run.runPythonScriptNotParams(scriptName));
        } catch (e) {
            console.log(e);
            res.status(e.statusCode || 500).json(e.message);
        }
    }
}

module.exports = new DirectController();