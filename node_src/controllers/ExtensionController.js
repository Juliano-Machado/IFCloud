const runScript = require("../RunPythonScript");
const api = require("../ApiRequest");

const run = new runScript();

class ExtensionController{

    async runScriptByPatientId(req, res){
        try{
            const id = req.params.id;
            const { data } = await api.get('Patient/'+id);

            const patientName = data.name[0].given;
            const scriptName = data.extension[0].valueString;

            let response = {
                "id": id,
                "valueString": scriptName
            };

            console.log(response);

            res.send(run.runPythonScript(scriptName));
        }catch(e){
            console.log(e);
            res.status(e.statusCode || 500).json(e.message);
        }
    }

    async runScriptByObservationId(req, res){
        try{
            const id = req.params.id;
            const { data } = await api.get('Observation/'+id);

            //const valueString = data.extension[0].valueString;

            /*var components = data.component;
            console.log(components);
            console.log(components[0].valueSampledData.data);
            components[0].valueSampledData.data = "maria";
            console.log(components[0].valueSampledData.data);

            console.log(JSON.stringify(data, ['status']));*/

            /*let response = {
                "id": id,
                "valueString": valueString,
                "sampledData": samples
            };

            console.log(response);*/

            //res.send(run.runPythonScript(valueString, samples));
            res.json(data);
        }catch(e){
            console.log(e);
            res.status(e.statusCode || 500).json(e.message);
        }
    }
}

module.exports = new ExtensionController();