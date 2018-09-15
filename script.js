
        var globalImgURL;

        function getImages() {
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.onreadystatechange = function() {
                if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                    var imagesUrls = JSON.parse(xmlHttp.responseText).data;
                    globalImgURL = imagesUrls
                    renderImages(imagesUrls);
                }
            }
            xmlHttp.open("GET", "http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=dc6zaTOxFJmzC   ", true); // true for asynchronous 
            xmlHttp.send(null);
        }
        getImages();

        function renderImages(imagesUrls) {
            var col1 = document.getElementById("col1");
            var col2 = document.getElementById("col2");

            for (let i = 0; i < 12; i++) {
                let imgCol = document.createElement("img")
                imgCol.addEventListener("click",function(e){
                    openImage(e)
                })
                if (screen.width <= 375) {
                    imgCol.setAttribute("src", imagesUrls[i].images.fixed_height_still.url)
                } else if (screen.width <= 768) {
                    imgCol.setAttribute("src", imagesUrls[i].images.original_still.url)
                } else {
                    imgCol.setAttribute("src", imagesUrls[i].images.fixed_width.url)
                }
                imgCol.style.width = "98%"
                col1.appendChild(imgCol)
            }

            for (let i = 12; i < 24; i++) {
                let imgCol = document.createElement("img")
                imgCol.style.width = "98%"
                imgCol.addEventListener("click",function(e){
                    openImage(e)
                })
                if (screen.width <= 375) {
                    imgCol.setAttribute("src", imagesUrls[i].images.fixed_height_still.url)
                } else if (screen.width <= 768) {
                    imgCol.setAttribute("src", imagesUrls[i].images.original_still.url)
                } else {
                    imgCol.setAttribute("src", imagesUrls[i].images.fixed_width.url)
                }
                col2.appendChild(imgCol)
            }
            setTimeout(function(){
                document.getElementById("loaderDiv").style.display = "none";
               }, 1000);
           
        };

        document.addEventListener("scroll", function() {
            renderImages(globalImgURL)
        })


        function openImage(event){

            let nextUrl = "";
            let prevUrl = "";

            if(event.srcElement.nextElementSibling != null  && event.srcElement.nextElementSibling != undefined 
                && event.srcElement.nextElementSibling.currentSrc != null && event.srcElement.nextElementSibling.currentSrc != undefined){
                    nextUrl = event.srcElement.nextElementSibling.currentSrc;
            }else{
                nextUrl = vent.srcElement.currentSrc;
            }
            

            if(event.srcElement.previousElementSibling != null  && event.srcElement.previousElementSibling != undefined 
                && event.srcElement.previousElementSibling.currentSrc != null && event.srcElement.previousElementSibling.currentSrc != undefined){
                    prevUrl = event.srcElement.previousElementSibling.currentSrc;
            }else{
                prevUrl = event.srcElement.currentSrc;
            }
            


            document.getElementById("loaderDiv").style.display = "block";

            setTimeout(function(){
                document.getElementById("loaderDiv").style.display = "none";
                document.getElementById("imageGrid").style.display = "none"
                document.getElementById("showDiv").style.display = "block"

                let clickedImgDiv = document.getElementById("clickedImg");

                if (clickedImgDiv.hasChildNodes()) {
                    clickedImgDiv.removeChild(clickedImgDiv.childNodes[0]);
                }
                clickedImgDiv.appendChild(event.srcElement)


                if(nextUrl != "" &&  nextUrl !=undefined){
                    let imgCol = document.createElement("img")
                    imgCol.style.width = "50%"
                    imgCol.setAttribute("src", nextUrl)
                    imgCol.className= " pull-right"
                    
                    let nextDiv = document.getElementById("nextImg");

                    if (nextDiv.hasChildNodes()) {
                        nextDiv.removeChild(nextDiv.childNodes[0]);
                    }
                    nextDiv.appendChild(imgCol)
                }

                if(prevUrl != "" && prevUrl != undefined){
                    let imgCol = document.createElement("img")
                    imgCol.style.width = "50%"
                    imgCol.setAttribute("src", prevUrl)   
                    
                    let prevDiv = document.getElementById("prevImg");

                    if (prevDiv.hasChildNodes()) {
                        prevDiv.removeChild(prevDiv.childNodes[0]);
                    }
                    prevDiv.appendChild(imgCol)
                }
               }, 1000);
        }

        function goToFullScreen(){
            document.getElementById("loaderDiv").style.display = "block";
            setTimeout(function(){
                document.getElementById("loaderDiv").style.display = "none";
               }, 999);
            setTimeout(function(){
                document.getElementById("imageGrid").style.display = "block"
                document.getElementById("showDiv").style.display = "none"
               }, 1000);
        }