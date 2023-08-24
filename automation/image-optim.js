var imageOptim = require('imageoptim');
var fs = require('fs');
 
var args = process.argv.slice(2);
var path = "../htdocs/" + args[0] + "/img/";

fs.readdir(path, function(err, items) {
    var files = [];
    for (var i=0; i<items.length; i++) {
        let file = path + items[i];
        files.push(file);
        console.log(file);

    }
    imageOptim.optim(files, { reporters: ['flat'] })
    .then(function (res) {
        console.log(res);
    })
    .done();
});
