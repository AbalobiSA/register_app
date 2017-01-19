var fs = require('fs');
console.log("==============================================");
console.log("  Starting variable adder!");
console.log("==============================================");

var english = JSON.parse(fs.readFileSync("../locale-en.json"));
var afrikaans = JSON.parse(fs.readFileSync("../locale-afr.json"));

var newVariables = ["HELLO", "HELLO2", "HELLO3"];
