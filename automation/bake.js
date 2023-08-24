var showdown  = require('showdown');
var fs  = require("fs");
const opn = require('opn');

// Replace All
String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

// showdown hack to set up custom classes
const classMap = {
    //img: '',   
}

const bindings = Object.keys(classMap)
  .map(key => ({
    type: 'output',
    regex: new RegExp(`<${key}(.*)>`, 'g'),
    replace: `<${key} class="${classMap[key]}" $1>`
  }));

const conv = new showdown.Converter({
  extensions: [...bindings]
});

converter = new showdown.Converter();


// Get path
var args = process.argv.slice(2);
var path_md = "../" + args[0] + "/index.md";
var path_rawhtml = "../" + args[0] + "/files/index_raw.html";
var path_bakedhtml = "../" + args[0] + "/index.html";
var file_md = fs.readFileSync(path_md).toString();
var file_html = fs.readFileSync(path_rawhtml).toString();


// fix shortcodes
var lines = file_md.split("\n");
var output = "";
var tempOutputForIntermediateMarkdown = "";
var shouldSaveInTempOutput = false;
var title = "(untitled)";
for (var line of lines)
{
    if(line.substr(0,1) == "$")
    {
        var terms = line.split(" ");
        
        if(terms[0] == "$img-start")
        {
            line = "<div class='imgrow'>";
        }
        else if(terms[0] == "$img-end")
        {
            line = "</div>";
        }
        else if(terms[0] == "$imgrow")
        {
            line = "<div class='imgrow'>";

            if(terms.length == 2) {
                line += "<div class='twelve columns square-1 popup-div' style='background-image:url(\"img/"+terms[1]+"\");'></div>";
            } else if(terms.length == 3) {
                line += "<div class='six columns square-2 popup-div' style='background-image:url(\"img/"+terms[1]+"\");'></div>";
                line += "<div class='six columns square-2 popup-div' style='background-image:url(\"img/"+terms[2]+"\");'></div>";
            } else if(terms.length == 4) {
                line += "<div class='four columns square-3 popup-div' style='background-image:url(\"img/"+terms[1]+"\");'></div>";
                line += "<div class='four columns square-3 popup-div' style='background-image:url(\"img/"+terms[2]+"\");'></div>";
                line += "<div class='four columns square-3 popup-div' style='background-image:url(\"img/"+terms[3]+"\");'></div>";
            }
            line += "</div>" +
            "<div class='space-10'>&nbsp</div>";
        }

        else if(terms[0] == "$imgsmall")
        {
            line = "<div class='four columns square-3 popup-div' style='background-image:url(\"img/"+terms[1]+"\");'></div>";

        }
        else if(terms[0] == "$imgsmallraw")
        {
            // line = "<div class='imgrow'>";
            line = "<img class='popup' style='max-height:200px; width:auto;' data-src='img/"+terms[1]+"' src='img/"+terms[1]+"'></img>";
            // line += "</div>";
        }
        else if(terms[0] == "$imgmedium")
        {
            line = "<div class='six columns square-2 popup-div' style='background-image:url(\"img/"+terms[1]+"\");'></div>";
        }
        else if(terms[0] == "$imgbig")
        {
            line = "<div class='imgrow'>";
            line += "<div class='twelve columns square-1 popup-div' style='background-image:url(\"img/"+terms[1]+"\");'></div>";
            line += "</div>";
        }
        else if(terms[0] == "$imgraw")
        {
            // line = "<img class='popup' data-src='img/"+terms[1]+"'></img>";
            line = "<img class='popup' data-src='img/"+terms[1]+"' src='img/"+terms[1]+"'></img>";
        }
        else if(terms[0] == "$youtube")
        {
            line = "<div class='twelve columns video-container'>" +
                    "<iframe src='https://www.youtube.com/embed/" + terms[1] + "?vq=hd720' frameborder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>" +
                "</div>";
        }
        else if(terms[0] == "$vimeo")
        {
            line = "<div class='twelve columns video-container'>" +
                    "<iframe src='https://player.vimeo.com/video/" + terms[1] + "' width='640' height='360' frameborder='0' webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>" +
                    "</div>";
        }
        else if(terms[0] == "$video")
        {
            line = "<video controls preload='none'>" +
                    "<source src='img/"+terms[1]+"' type='video/mp4'>" +
                    "</video>"+
                    "<div class='space-10'>&nbsp</div>";
        }
        
        else if(terms[0] == "$space")
        {
            line = "<div class='space-" + terms[1] + "'>&nbsp</div>";
        }
        else if(terms[0] == "$title")
        {
            title = line.replace("$title ","");
            line = "";
        }
        else if(terms[0] == "$accordion")
        {
            line = line.replace("$accordion ","");            
            line =  "<div class='accs'>" +
                        "<a class='accordion'>" +
                            "<p>"+line+"<span class='accordionarrow'>⇣</span></p>" +
                        "</a>" +
                        "<div class='accordionpanel'><p class='markdown'>";
            shouldSaveInTempOutput = true;
            tempOutputForIntermediateMarkdown = "";
        }
        else if(terms[0] == "$accordion-end")
        {
            shouldSaveInTempOutput = false;
            tempOutputForIntermediateMarkdown = conv.makeHtml(tempOutputForIntermediateMarkdown); 
            line = tempOutputForIntermediateMarkdown + "</p></div></div>";
        }
    }   


    if(shouldSaveInTempOutput)
    {
        tempOutputForIntermediateMarkdown += line + "\n";
    }
    else
    {
        output += line + "\n";
    }
}
file_md = output;

html = conv.makeHtml(file_md);

//html = html.replaceAll("img src=", "img data-src="); // <-- fucks up youtube

file_html = file_html.replace("#MARKDOWN#", html);
file_html = file_html.replaceAll("#TITLE#", title);
fs.writeFileSync(path_bakedhtml, file_html);

opn(path_bakedhtml, {wait: false});


