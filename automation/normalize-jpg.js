var Jimp = require('jimp');
var fs = require('fs');
 
var args = process.argv.slice(2);
var path = "../htdocs/" + args[0] + "/img/";

fs.readdir(path, function(err, items) {
    console.log(items);
 
    for (var i=0; i<items.length; i++) {
        
        let file = items[i] + "";
        if(file.includes(".jpg") || file.includes(".jpeg"))
        {
            let originalPath = path+file;
            let newname = path+file.replace(".jpg", "-normalized.jpg").replace(".jpeg", "-normalized.jpg");
            let newnameForOriginal = path+file.replace(".jpg", "-original.jpg").replace(".jpeg", "-original.jpg");

            Jimp.read(originalPath)
                .then(image => {
                    image.scaleToFit(1600, 1600); // scale the image to the largest size that fits inside the given width and height
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
