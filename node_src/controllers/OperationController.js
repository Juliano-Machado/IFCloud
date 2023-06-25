const apiRequest = require("../ApiRequest");
const runScript = require("../RunPythonScript");
const operationTest = require("../operations/Test");

class OperationController{

    async test(req, res){
        try{
            const myOperation = new operationTest();
            res.json(myOperation.generateResponse());
        }catch(e){
            console.log(e);
            res.status(e.statusCode || 500).json(e.message);
        }
    }

    async operationStarter(req, res){
        try{
            const run = new runScript();

            var resourceType = req.body.resourceType;
            var id = req.body.id;
            var scriptName = req.body.scriptName;
            var componentIndex = req.body.component.index;
            var changeField = req.body.component.changeField;
            var haveInputParams = req.body.haveInputParams;
            var inputParams = req.body.inputParams;
            var returnOnlyFieldComponent = req.body.component.returnOnlyFieldsComponent;

            const { data } = await apiRequest.get('Observation/'+id);

            var components = data.component;

            if(haveInputParams){
                if(run.runPythonScriptNotParams(scriptName) && inputParams){
                    var scriptReturned = run.runPythonScript(scriptName, inputParams);
                }else{
                    return res.send("ERROR-01 !!! Script \""+scriptName+"\" not found !!!");
                }
            }else{
                if(run.runPythonScriptNotParams(scriptName)){
                    var scriptReturned = run.runPythonScriptNotParams(scriptName);
                }else{
                    return res.send("ERROR-01 !!! Script \""+scriptName+"\" not found !!!");
                }
            }

            if(scriptReturned){
                scriptReturned = scriptReturned.replace(/(\r\n|\n|\r)/gm, "");
            }else{
                return res.send("ERROR-02 !!! python script return error !!!")
            }

            if(componentIndex && changeField){
                if(components[componentIndex]){
                    var componentChange = components[componentIndex]['valueSampledData'];
                }else{
                    return res.send("ERROR-03 !!! \"Index\" does not exist !!!");
                }

                if(componentChange[changeField]){
                    componentChange[changeField] = scriptReturned;
                }else{
                    return res.send("ERROR-04 !!! \"ChangeField\" does not exist !!!");
                }
            }else{
                return res.send("ERROR-04 !!! Empty \"Index\" or \"ChangeField\" field !!!");
            }

            if(returnOnlyFieldComponent){
                return res.json(components[componentIndex]);
            }

            return res.json(data);
        }catch(e){
            return res.status(e.statusCode || 500).json(e);
        }
    }

    async myForm(req, res){
        try{
            const run = new runScript();

            var resourceType = req.body.resourceType;
            var id = req.body.resourceId;
            var scriptName = req.body.scriptName;
            if(req.body.haveParams == '0'){
                var haveInputParams = false;
            }else{
                var haveInputParams = true;
            }
            var inputParams = req.body.inputParams;
            var componentIndex = req.body.componentIndex;
            var changeField = req.body.changeField;
            if(req.body.onlyComponent == '0'){
                var returnOnlyFieldComponent = false;
            }else{
                var returnOnlyFieldComponent = true;
            }

            var response = {
                "resourceType": resourceType,
                 "id": ""+id,
                 "scriptName": scriptName,
                 "haveInputParams": haveInputParams,
                 "inputParams": [

                 ],
                 "component": {
                   "index": ""+componentIndex,
                   "changeField": changeField,
                   "returnOnlyFieldsComponent": returnOnlyFieldComponent
                 }
            }

            const { data } = await apiRequest.get('Observation/'+id);

            var components = data.component;

            if(haveInputParams){
                if(run.runPythonScriptNotParams(scriptName) && inputParams){
                    var scriptReturned = run.runPythonScript(scriptName, inputParams);
                }else{
                    return res.send("ERROR-01 !!! Script \""+scriptName+"\" not found !!!");
                }
            }else{
                if(run.runPythonScriptNotParams(scriptName)){
                    var scriptReturned = run.runPythonScriptNotParams(scriptName);
                }else{
                    return res.send("ERROR-01 !!! Script \""+scriptName+"\" not found !!!");
                }
            }

            if(scriptReturned){
                scriptReturned = scriptReturned.replace(/(\r\n|\n|\r)/gm, "");
            }else{
                return res.send("ERROR-02 !!! python script return error !!!")
            }

            if(componentIndex && changeField){
                if(components[componentIndex]){
                    var componentChange = components[componentIndex]['valueSampledData'];
                }else{
                    return res.send("ERROR-03 !!! \"Index\" does not exist !!!");
                }

                if(componentChange[changeField]){
                    componentChange[changeField] = scriptReturned;
                }else{
                    return res.send("ERROR-04 !!! \"ChangeField\" does not exist !!!");
                }
            }else{
                return res.send("ERROR-04 !!! Empty \"Index\" or \"ChangeField\" field !!!");
            }

            if(returnOnlyFieldComponent){
                return res.render('form_example', {data: components[componentIndex], response});
            }

            console.log(data);
            return res.render('form_example', {data, response});
        }catch(e){
            return res.status(e.statusCode || 500).json(e);
        }
    }
}

module.exports = new OperationController();