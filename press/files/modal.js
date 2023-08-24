document.addEventListener("DOMContentLoaded", function(event) {
    doModal();
});
 

function doModal()
{
    // add the modal div to the dom
    var modalDivText = "<!-- Trigger the Modal -->" +
        "<div id=\"myModal\" class=\"modal\">" +
        "<!-- The Close Button -->" +
        "<span class=\"close\">&times;</span>" +
        "<!-- Modal Content (The Image) -->" +
        "<img class=\"modal-content\" id=\"img01\">" +
        "</div>";
    var modalDiv = document.createElement("div");
    modalDiv.innerHTML = modalDivText;
    document.body.appendChild(modalDiv);

    // Get the modal
    var modal = document.getElementById('myModal');

    // Get the image and insert it inside the modal - use its "alt" text as a caption
    var modalImg = document.getElementById("img01");
    var imgs = document.getElementsByClassName("popup");

    var i;
    for (i = 0; i < imgs.length; i++) {
      let src = imgs[i].getAttribute("data-src");   // using data-src because lazy-load
      //let alt = imgs[i].alt;
      imgs[i].onclick = function(){
          modal.style.display = "block";
          modalImg.src = src;
      }
    }

    var imgdivs = document.getElementsByClassName("popup-div");

    var i;
    for (i = 0; i < imgdivs.length; i++) {
      let src = imgdivs[i].style["background-image"].replace("url(\"","").replace("\")","");   // using data-src because lazy-load
      //let alt = imgdivs[i].alt;
      imgdivs[i].onclick = function(){
          modal.style.display = "block";
          modalImg.src = src;
      }
    }

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() { 
      modal.style.display = "none";
    }    

    modal.onclick = function() { 
      modal.style.display = "none";
    }    
}