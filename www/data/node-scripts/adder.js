var fs = require('fs');
console.log("==============================================");
console.log("  Starting variable adder!");
console.log("==============================================");

var english = JSON.parse(fs.readFileSync("../locale-en.json"));
var afrikaans = JSON.parse(fs.readFileSync("../locale-afr.json"));

var newVariables = [
  "HELLO",
  "HELLO2",
  "HELLO3"
];

for (var i = 0; i < newVariables.length; i++){
    english[newVariables[i]] = "CHANGE_MY_TEXT_PLEASE";
    afrikaans[newVariables[i]] = "CHANGE_MY_TEXT_PLEASE";
}

console.log("Writing files...");
fs.writeFileSync("../locale-en.json", JSON.stringify(english, null, 4));
fs.writeFileSync("../locale-afr.json", JSON.stringify(english, null, 4));
console.log("Success!");
