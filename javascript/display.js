registerDocumentOnloadCallbackFunc(function() {
    function setPageLayout() {
        var pageWidth = document.body.clientWidth || window.screen.availHeight || 0;
        var boxWidth = (pageWidth * 0.3 < 300) ? "300px" : "30%";
        document.querySelector("#container").style.width = boxWidth;
        //Width is at least 300px
        document.querySelector("#container").style["text-align"] = "left";
        //Text-Align:center
        if (boxWidth == "30%") {
            boxWidth = pageWidth * 0.3;
            //Calc the value
        } else {
            boxWidth = parseInt(boxWidth);
            //String -> integer
        };
        var space_width = (pageWidth - boxWidth) / 2;
        //Calc the width of the space (2 areas)
        document.querySelector("#container").style["left"] = space_width + "px";
        document.querySelector("#container").style["position"] = "relative";
        //Box-Align:center

        document.querySelector("#copyright").style.width = boxWidth + "px";
        //Set the page width to the copyright width
    };
    setPageLayout();
    setInterval(function() {
        setPageLayout();
    }, 500);
    //Reset the layout in real time.

    function setCopyrightBackgroundImage(autoLoadFromWeb = true) {
        document.querySelector("#copyright").style.background = "#ffefd5";
        document.querySelector("#copyright").style.color = "black";
        setTimeout(function() {
            localforage.getItem("ESO-STAR-IMAGE", function(v1, dat) {
                if (dat == null && autoLoadFromWeb) {
                    if (window.XMLHttpRequest) {
                        var xhr = new XMLHttpRequest();
                    } else var xhr = new ActiveXObject("Microsoft.XMLHTTP");
                    xhr.open("GET", "https://cdn.jsdelivr.net/gh/pig-cmd/pig-cmd.github.io/eso1242a/eso1242a-screen.jpg", true);
                    xhr.responseType = "blob";
                    xhr.send();
                    xhr.onload = function() {
                        if (xhr.status >= 200 && xhr.status < 400 && xhr.response) {
                            localforage.setItem("ESO-STAR-IMAGE", xhr.response, function() {
                                setCopyrightBackgroundImage(false);
                            });
                        };
                    };
                };
                if (typeof dat != "undefined") {
                    var blob_url = window.URL.createObjectURL(dat);
                    document.querySelector("#copyright").style["background-image"] = "url(" + blob_url + ")";
                    document.querySelector("#copyright").style.color = "yellow";
                };
            });
        }, 500);
    };
    setCopyrightBackgroundImage();

});