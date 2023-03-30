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
}

module.exports = new OperationController();