var Jimp = require('jimp');
var fs = require('fs');
 
// usage:
// node normalize-png.js nuts.game/img/accolades 600

var args = process.argv.slice(2);
var path = "../htdocs/" + args[0] +"/";
var sizemax = parseInt(args[1]);
 
fs.readdir(path, function(err, items) {
    console.log(items);
 
    // Loop through files
    for (var i=0; i<items.length; i++) {
        
        let file = items[i] + "";

        // Filter pngs
        if(file.includes(".png"))
        {
            let originalPath = path+file;
            let newname = path+file.replace(".png", "-normalized.png");
            let newnameForOriginal = path+file.replace(".png", "-original.png").replace(".jpeg", "-original.png");

            Jimp.read(originalPath)
                .then(image => {
                    image.scaleToFit(sizemax, sizemax); // scale the image to the largest size that fits inside the given width and height
                    image.quality(70) // set JPEG quality
                        .write(newname); // save
                    
                    fs.rename(originalPath, newnameForOriginal, err => {
                        if(err) console.log("ERROR: " + err)
                        else
                        {
                            fs.rename(newname, originalPath, err => {if(err) console.log("ERROR: " + err)});
                            console.log(file + " normalized!");
                        }
                    });
                })
                .catch(err => {
                    throw err;
                });
        }
    }
});
