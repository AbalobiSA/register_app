var fs = require('fs');
var prompt = require('prompt');

console.log("==============================================");
console.log("  Starting variable adder!");
console.log("==============================================");

var english = JSON.parse(fs.readFileSync("../locale-en.json"));
var afrikaans = JSON.parse(fs.readFileSync("../locale-afr.json"));

// addWithTranslations(keysArr);
console.log("Adding variables. On the 'end' question, send 'y' to exit and write.");
readFromKb();
// addVariables(newVariables);
// removeVariables(newVariables);



function addVariables(variables){
  console.log("Adding new variables...");
  var count = 0;
  for (var i = 0; i < variables.length; i++){
      english[variables[i]] = "CHANGE_MY_TEXT_PLEASE";
      afrikaans[variables[i]] = "CHANGE_MY_TEXT_PLEASE";
      count++;
  }
  console.log(count + " new variables added.");
}

function removeVariables(variables){
  var count = 0;
  for (var i = 0; i < variables.length; i++){
      delete english[variables[i]];
      delete afrikaans[variables[i]];
      count++;
  }
  console.log(count + " variables were removed.");
}

function addWithTranslations(data){

    // data[i][]

    // var count = 0;
    // for (var i = 0; i < data.length; i++){
        english[data.key] = data.eng;
        afrikaans[data.key] = data.afr;
        // count++;
        console.log("Added: " + data.key);
    // }

}

var kbinput = "";
var kbcount = 0;

function readFromKb(){
  var stdin = process.openStdin();

  prompt.start();

  prompt.get(['key', 'eng', 'afr', 'end'], function (err, result) {
    if (err)
    {
      return onErr(err);
    }
    // console.log('Command-line input received:');
    // console.log('  Key: ' + result.key);
    // console.log('  English: ' + result.eng);
    // console.log('  Afrikaans: ' + result.afr);
    addWithTranslations(result);
    if (result.end === 'y'){
      writeFiles();
    }
    else{
      readFromKb();
    }
    // writeFiles();
  });

  function onErr(err) {
    console.log(err);
    return 1;
  }

  //My stuff here
}

function writeFiles(){
  console.log("Writing files...");
  fs.writeFileSync("../locale-en.json", JSON.stringify(english, null, 4));
  fs.writeFileSync("../locale-afr.json", JSON.stringify(afrikaans, null, 4));
  console.log("Success!");
}
