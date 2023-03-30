let { execSync } = require('child_process');

module.exports = class RunPythonScript{

    runPythonScript(scriptName, params){
        return execSync(
            "python ./uploads_src/"+scriptName+" "+params,
            {encoding: "utf8" }
        );
    }

    runPythonScriptNotParams(scriptName){
        return execSync(
            "python ./uploads_src/"+scriptName,
            {encoding: "utf8" }
        );
    }
}