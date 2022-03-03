!function(){function a(a,b,c,d,e,f){var g,h=this;h.init=function(){f.getAdds().success(function(b){a.addList=b.addList,h.renderUI(),h.bindUI(),h.syncUI()})},h.renderUI=function(){},h.bindUI=function(){},h.showAdds=function(){a.showAdds=!0,a.$apply()},h.syncUI=function(){var b=_.random(1,a.addList.length-1);a.currentAdd=a.addList[b],g=window.setTimeout(h.showAdds,7e3)},a.showAdds=!1,a.addList=[],a.currentAdd={},a.closeAdds=function(){window.clearTimeout(g),a.showAdds=!1},h.init()}a.$inject=["$scope","$sce","$templateCache","$http","$compile","localAPIRetrieve","$routeParams","animateService"],angular.module("collection").controller("addsController",a)}(),function(){function a(a,b,c,d,e,f,g,h){function i(b){var c,d,e=b.length,g=0;for(g;e>g;g++){c=b[g];for(var h=0;h<c.animationList.length;h++)c.animationList[h].color=j(h),d=f.findModelbyName(a.selectedAnimationList,c.animationList[h].name),d&&(c.animationList[h]=d,c.animationList[h].isSelected=!0)}return b}function j(a){var b,c=["#1F8DD6","#FBB44C","#FC797A","#2ABB9B","#6EB6E5","#FFDA72","#FF9672","#68E9AB","#44A0DC","#FFCE44","#FFA0A0","#3CE292","#FC797A","#FBB44A","#DE8CBA","#D6F499","#AFDFDF","#FFB59B"];return b=_.random(0,8),c[a]}var k=this;k.init=function(){k.populateSelectedAnimationList(),b.getCategories().success(function(b){a.categoryList=i(b)})},k.populateSelectedAnimationList=function(){a.selectedAnimationList=e.get("selectedAnimationList"),a.selectedAnimationList||e.set("selectedAnimationList",[]),a.unbind=e.bind(a,"selectedAnimationList")},a.nameFilter=null,a.categoryList=[],a.selectedAnimationList=[],a.hideSelectedAnimationListPopover=!0,a.hideGlobalOptionsPopover=!0,a.globalOptions={isCssPrefixed:!0},a.searchFilter=function(b){var c=new RegExp(a.nameFilter,"i");return!a.nameFilter||c.test(b.name)},a.toggleSelectedAnimationListPopover=function(){a.hideSelectedAnimationListPopover=a.hideSelectedAnimationListPopover?!1:!0},a.toggleGlobalOptionsPopover=function(){a.hideGlobalOptionsPopover=a.hideGlobalOptionsPopover?!1:!0},a.toggleCssPrefixedCheckbox=function(){a.globalOptions.isCssPrefixed=a.globalOptions.isCssPrefixed?!1:!0,a.$broadcast("change-css-prefixed-options",a.globalOptions.isCssPrefixed)},a.onMouseOverItemSquare=function(a){var b=$(a.currentTarget),c=b.find(".content"),e="animated "+this.animation.name;b.addClass("active"),d.animateItems(c,e)},a.onMouseLeaveItemSquare=function(a){var b=$(a.currentTarget);b.removeClass("active")},a.onMouseOverCaption=function(a){var b=$(a.currentTarget);b.addClass("active")},a.onMouseLeaveCaption=function(a){var b=$(a.currentTarget);b.removeClass("active")},a.goToDetailView=function(b){b.preventDefault(),a.$hideLoading=!1,window.location.hash=b.currentTarget.hash},a.add=function(c,e){var f,h=c;f=_.find(a.selectedAnimationList,function(a){return a.name===h.name?(a.isSelected=!0,!0):!1}),f||(a.selectedAnimationList.push(h),h.isSelected=!0,d.animateItems(".m-button-icon-label .label","bounce animated"),h.cssCode||b.getAnimation(h.name,e.name).success(function(a){$.extend(h,a)})),g.cacheTemplates([h])},a.removeFromSelectedAnimationList=function(b){var c=a.selectedAnimationList;a.selectedAnimationList=_.filter(c,function(a){return a.name!==b.name?!0:(b.isSelected=!1,a.isSelected=!1,!1)})},a.removeAll=function(){var b=a.selectedAnimationList,c=b.length,d=0;for(d;c>d;d++)b[d].isSelected=!1;a.selectedAnimationList=[]},a.addAll=function(){var b,c,d=a.categoryList,e=d.length,f=0;for(f;e>f;f++){b=d[f].animationList,c=b.length;for(var g=0;c>g;g++)a.add(b[g],d[f])}},a.downloadCSSCode=function(){g.getTemplate("cssTemplate.html",{animationList:a.selectedAnimationList,globalOptions:a.globalOptions}).done(function(a){h.download("css",a)})},a.downloadHTMLCode=function(){g.getTemplate("htmlTemplate.html",{animationList:a.selectedAnimationList}).done(function(a){h.download("html",a)})},a.downloadJQueryCode=function(){g.getTemplate("jQueryTemplate.html",{animationList:a.selectedAnimationList}).done(function(a){h.download("jquery",a)})},a.downloadAniJSCode=function(){g.getTemplate("aniJSTemplate.html",{animationList:a.selectedAnimationList}).done(function(a){h.download("anijs",a)})},a.findAnimationModel=function(b,c){var d,e;return d=_.find(a.categoryList,function(a){return a.name===b}),e=_.find(d.animationList,function(a){return a.name===c})},a.$on("afterRepeatDirective",function(){a.$hideLoading=!0}),k.init()}a.$inject=["$scope","localAPIRetrieve","$location","animateService","localStorageService","collectionHelperService","templateService","downloadService"],angular.module("collection").controller("collectionController",a)}(),function(){function a(a,b,c,d,e,f,g,h,i,j){var k,l,m=this;m.init=function(){e.getAnimation(f.id,f.category).success(function(b){a.animation=a.findAnimationModel(a.category,a.id),$.extend(a.animation,b),m.populateAnimationModel(a.animation),m.renderUI(),m.bindUI(),m.syncUI(),l=i.cacheTemplates(a.animation,a.globalOptions)})},m.renderUI=function(){$('[data-toggle="tooltip"]').tooltip(),k=CodeMirror($(".m-code-editor .editor")[0],{mode:"css",lineNumbers:!0,beautify:!0})},m.bindUI=function(){var b=new ZeroClipboard($(".copy-button"));b.on("copy",function(a){var b=a.clipboardData;b.setData("text/plain",k.getValue()),$(".tooltip .tooltip-inner").html("Copied!!"),$(".tooltip").css("left","-10px")}),a.$on("change-css-prefixed-options",function(){a.showCSSCode(),l=i.cacheTemplates(a.animation,a.globalOptions)})},m.syncUI=function(){a.showCSSCode(function(){a.$parent.$hideLoading=!0,a.animateAll()})},a.editorMode="css",a.selectedAnimationList=a.$parent.selectedAnimationList,a.category=f.category,a.id=f.id,a.globalOptions=a.$parent.globalOptions,a.animateAll=function(){h.animateItems(".be-animated",a.animation.className),h.animateItems(".m-code-editor",a.animation.className),h.animateItems(".m-button-bar button",a.animation.className)},a.showCSSCode=function(b){i.getTemplate("cssTemplate.html",{animationList:[a.animation],globalOptions:a.globalOptions}).done(function(c){k.setOption("mode","css"),k.setValue(c),m.autoFormatRange(),a.editorMode="css",b&&b()})},a.showHTMLCode=function(){i.getTemplate("htmlTemplate.html",{animationList:[a.animation]}).done(function(b){k.setOption("mode","xml"),k.setOption("alignCDATA",!1),k.setValue(b),a.editorMode="html"})},a.showJQueryCode=function(){i.getTemplate("jQueryTemplate.html",{animationList:[a.animation]}).done(function(b){k.setOption("mode","javascript"),k.setOption("beautify",!0),k.setValue(b),a.editorMode="jquery"})},a.showAniJSCode=function(){i.getTemplate("aniJSTemplate.html",{animationList:[a.animation]}).done(function(b){k.setOption("mode","xml"),k.setOption("beautify",!0),k.setValue(b),a.editorMode="anijs"})},a.shareTwitter=function(b){b.preventDefault(),a.animation.shareUrl=encodeURIComponent(window.location.href),i.getTemplate("twitterTemplate.html",a.animation).done(function(a){window.open(a)})},a.shareGooglePlus=function(b){b.preventDefault(),a.animation.shareUrl=encodeURIComponent(window.location.href),i.getTemplate("gplusTemplate.html",a.animation).done(function(a){window.open(a)})},a.shareFacebook=function(b){b.preventDefault(),a.animation.shareUrl=encodeURIComponent(window.location.href),i.getTemplate("facebookTemplate.html",a.animation).done(function(a){window.open(a)})},a.localSave=function(){var b="css",c=a.editorMode;"anijs"===c||"html"===c?b="text":"jquery"===c&&(b="plain"),window.open("data:text/"+b+";charset=utf-8,"+encodeURIComponent(k.getValue()))},a.editOnCodepen=function(){"resolved"===l.state()&&(a.codepenEditValue=j.getPostToPrefillData(a.animation))},m.populateAnimationModel=function(b){b.getCSSCode=function(){return a.animation.cssCode},b.getHTMLCode=function(){return a.animation.cssCode}},m.autoFormatRange=function(){var a=k.lineCount();k.autoFormatRange({line:0,ch:0},{line:a}),k.doc.setCursor({line:0,ch:0})},m.init()}a.$inject=["$scope","$templateCache","$http","$compile","localAPIRetrieve","$routeParams","collectionHelperService","animateService","templateService","codepenService"],angular.module("collection").controller("detailController",a)}();