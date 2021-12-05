window._documentOnloadCallbackFunctions = [];
function registerDocumentOnloadCallbackFunc(func,...args){
    window._documentOnloadCallbackFunctions.push({func:func,args:args});
};
onload = function(){
    for (var i = 0; i < window._documentOnloadCallbackFunctions.length;i++){
        _documentOnloadCallbackFunctions[i].func(..._documentOnloadCallbackFunctions[i].args);
    };
};