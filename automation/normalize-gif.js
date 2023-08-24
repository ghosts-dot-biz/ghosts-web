var Jimp = require('jimp');
var fs = require('fs');
const {execFile} = require('child_process');
const gifsicle = require('gifsicle');

var args = process.argv.slice(2);
var path = "../htdocs/" + args[0] + "/img/";

fs.readdir(path, function(err, items) {
    console.log(items);
 
    for (var i=0; i<items.length; i++) {
        
        let file = items[i] + "";
        if(file.includes(".gif"))
        {
            let originalPath = path+file;
            let newname = path+file.replace(".gif", "-normalized.gif");
            let newnameForOriginal = path+file.replace(".gif", "-original.gif");

            execFile(gifsicle, ['-i', originalPath, '-o', newname, "--resize-fit","300x300"], err => {
                if(err)
                    console.log("ERROR: " + err)
                else
                {
                    

                    fs.rename(originalPath, newnameForOriginal, err => {
                        if(err) console.log("ERROR: " + err)
                        else
                        {
                            fs.rename(newname, originalPath, err => {if(err) console.log("ERROR: " + err)});
                            console.log(file + " normalized!");
                        }
                    });
                    
                }
            });
        }
        
    }
});
