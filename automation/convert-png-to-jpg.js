var Jimp = require('jimp');
var fs = require('fs');
 
var args = process.argv.slice(2);
var path = "../htdocs/" + args[0] + "/img/";

fs.readdir(path, function(err, items) {
    console.log(items);
 
    for (var i=0; i<items.length; i++) {
        
        let file = items[i] + "";
        if(file.toLowerCase().includes(".png"))
        {
            let originalPath = path+file;
            let newname = path+file.toLowerCase().replace(".png", ".jpg");

            Jimp.read(originalPath)
                .then(image => {
                    console.log(file);
                    image.scaleToFit(1920, 1920); // scale the image to the largest size that fits inside the given width and height
                    image.quality(70) // set JPEG quality
                        .write(newname); // save
                })
                .catch(err => {
                    throw err;
                });
        }
    }
});
