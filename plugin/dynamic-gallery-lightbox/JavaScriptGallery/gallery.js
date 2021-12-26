/*
*
* A Gallery and Imageviewer library
* Author: Marcel Bohland Copyright 2021
* Version: 0.1.1
* url: https://github.com/marcelbohland
* License: Apache License 2.0:
*
*
* Copyright 2021 Marcel Bohland
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*
*/

//Variablen
added = 0;
ImageIndex = 0;
viewerPosition = 0;
transition = "opacity";
enableViewOriginalPictureVal = 0;
zoomVal = 0;
share= 0;
monoImageView = 0;
monoImageViewURL="";
eachID=0;
backgroundcolor = "#000000e8";
galleryStyle = "normal";
AutoWidth = 0;
//Masaic
topVar = 0;
leftVar = 0;
array = [30];
className="";

$(document).ready(function(){

  for(i=0;i<=30;i++){
    array[i] = 0;
} 
     


    $(".ViewerImage").dblclick(function(){
        zoom();
          });
   
    $('.addToGallery').each(function() {
        $( this ).attr('id', ImageIndex);
        ImageIndex++;
      });

    $(".galleryJS").click(function(){
      url = $(this).attr('src');
      addImageViewer();
      $(".ViewerImage").attr("src",url);
      $('.GalleryViewer').show();
      $('.Arrowright').hide();
      $('.ArrowLeft').hide();
      monoImageView = 1;
      monoImageViewURL=url;
    });
  });

  function enableDoubleClick(){
    $(".ViewerImage").dblclick(function(){
      zoom();
        });
  }

function backgroundColor(color){
    backgroundcolor = color;
}

function enableAutoWidth(){
  AutoWidth = 1;
}

function mosaic(){
  row = 0;
  column = 0;
  x = 5;
  y = 3;
  xminus = 4;
  yminus = 4;


    valeCounter = 0;

    GalleryWidth =  $( ".Gallery" ).width();
    for(i=0;i<ImageIndex;i++){

      if(GalleryWidth>1500){
        x = 6;
        y = 4;
      }

      
      if(GalleryWidth>2000){
        x = 7;
        y = 5;
      }

      if(GalleryWidth<700){
        x = 4;
        y = 2;
      }
      if(GalleryWidth<500){
        x = 2;
        y = 1;
      }


    if(row%2==0){
     
        imageWidth = GalleryWidth/x-xminus;
        $("#"+i).css("max-width",imageWidth+"px");
        $("#"+i).css("min-width",imageWidth+"px");
        $("#"+i).css("width",imageWidth+"px");
        $("#"+i).css("max-height","175px");
        $("#"+i).css("min-height","175px");
        if(column==x-1){
          row++;
          column=-1;
        }
        column++;

    }else{
        imageWidth = GalleryWidth/y-yminus;
        $("#"+i).css("max-width",imageWidth+"px");
        $("#"+i).css("min-width",imageWidth+"px");
        $("#"+i).css("width",imageWidth+"px");
        $("#"+i).css("max-height","200px");
        $("#"+i).css("min-height","200px");
        if(column==y-1){
          row++;
          column=-1;
        }
        column++;
      }
  
    
     $('.Gallery').show();
 }
}

$(window).on('resize', function(){
  if(AutoWidth == 1){
    galleryWidth = $(".Gallery").width();

  
    if(galleryWidth>1920){
      galleryWidth4 = 300;
    }
    if(galleryWidth<1920){
      galleryWidth4 = galleryWidth/5-20;
    }
    if(galleryWidth<1400){
      galleryWidth4 = galleryWidth/4-20;
    }
    if(galleryWidth<1024){
      galleryWidth4 = galleryWidth/3-20;
    }
    if(galleryWidth<786){
      galleryWidth4 = galleryWidth/2-20;
    }if(galleryWidth<450){
      galleryWidth4 = galleryWidth/1-20;
    }

    $(".Gallery img").width(galleryWidth4);
  }

  if(className=="mosaic"){
    mosaic();
  }

});

$(document).ready(function() { 

  if(AutoWidth == 1){
    galleryWidth = $(".Gallery").width();

    if(galleryWidth>1920){
      galleryWidth4 = 300;
    }
    if(galleryWidth<1920){
      galleryWidth4 = galleryWidth/5-20;
    }
    if(galleryWidth<1400){
      galleryWidth4 = galleryWidth/4-20;
    }
    if(galleryWidth<1024){
      galleryWidth4 = galleryWidth/3-20;
    }
    if(galleryWidth<786){
      galleryWidth4 = galleryWidth/2-20;
    }if(galleryWidth<450){
      galleryWidth4 = galleryWidth/1-20;
    }

    $(".Gallery img").width(galleryWidth4);
  }

  if(className=="mosaic"){
    mosaic();
  }

});

 function addGallery(Data){

    // Adds images and a headline to the Gallery

    var obj = jQuery.parseJSON(Data);
  $.each(obj, function(i, item) {

    if(galleryStyle=="tiles"){
       className="tiles";
    }
    if(galleryStyle=="full"){
       className="full";
    }  
    if(galleryStyle=="center"){
       className="center";
    }
    if(galleryStyle=="Circles"){
       className="Circles";
    }
    if(galleryStyle=="mosaic"){
     className="mosaic";
    }

    if(className!="mosaic"){
      $('.Gallery').append('<p>'+obj.Entry.Title+'</p>');
    }else{
      $('.Gallery').hide();
    }
     length = Object.keys(obj.Entry.Image).length;


     for(i=0;i<length;i++){

      // Check if preview Image exsits
         x = AjaxCall(obj,i);
          if(x==1){
            $('.Gallery').append('<img loading="lazy" class="'+className+'" alt="Image'+ImageIndex+'" width="300px" height="169px" class="fadein" id="'+ImageIndex+'" onClick="openViewer(this.id)" src="'+obj.Entry.Image[i]+'"/>');   
            ImageIndex++;
          }else{
            if(obj.Entry.Image[i].includes(".jpeg")){
              split  = obj.Entry.Image[i].split(".jpeg");
            newURL = split[0]+'-preview.jpeg#preview';
            }else  if(obj.Entry.Image[i].includes(".jpg")){
              split  = obj.Entry.Image[i].split(".jpg");
              newURL = split[0]+'-preview.jpg#preview';
              }else  if(obj.Entry.Image[i].includes(".png")){
                split  = obj.Entry.Image[i].split(".png");
                newURL = split[0]+'-preview.png#preview';
                }else  if(obj.Entry.Image[i].includes(".webp")){
                  split  = obj.Entry.Image[i].split(".webp");
                  newURL = split[0]+'-preview.webp#preview';
                  }
            $('.Gallery').append('<img loading="lazy" class="'+className+'" alt="Image'+ImageIndex+'" width="300px" height="169px" class="fadein" id="'+ImageIndex+'" onClick="openViewer(this.id)" src="'+newURL+'"/>');   
            ImageIndex++;
          }
     }
});
addPlayer();
}

//Check if preview Image Exsists
 function AjaxCall(obj,i){
  if(obj.Entry.Image[i].includes(".jpeg#preview")){
      return 2; 

  }else if(obj.Entry.Image[i].includes(".jpg#preview")){
        return 2; 

  }else if(obj.Entry.Image[i].includes(".png#preview")){
        return 2; 
 
  }else if(obj.Entry.Image[i].includes(".webp#preview")){
     
        return 2; 
  }else{
    return 1;
  }
}

//Check if a Image is only a Preview
function checkPreviewState(url){
  newURL=url;
  if(url.includes("-preview.jpeg#preview")){
    split  = url.split("-preview.jpeg#preview");
    newURL = split[0]+".jpeg";
   }else   if(url.includes("-preview.jpg#preview")){
    split  = url.split("-preview.jpg#preview");
    newURL = split[0]+".jpg";
   }else   if(url.includes("-preview.png#preview")){
    split  = url.split("-preview.png#preview");
    newURL = split[0]+".png";
   }else   if(url.includes("-preview.webp#preview")){
    split  = url.split("-preview.webp#preview");
    newURL = split[0]+".webp";
   }
   return newURL;
}


function addImageViewer(){
    // Adds player HTML code to GalleryViewer Div container

    if(added==0){
        $('body').append('<div style="background-color:'+backgroundcolor+';" class="GalleryViewer"></div>');
        $('.GalleryViewer').append('<img class="ViewerImage" id="ViewerImage" src="" />');
        $('.GalleryViewer').append('<svg onClick="left()" class="ArrowLeft" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="48px" height="48px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/></svg>');
        $('.GalleryViewer').append('<svg onClick="right()" class="Arrowright"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="48px" height="48px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/></svg>');
       // $('.GalleryViewer').append('<img onClick="closeViewer()" class="GalleryViewerClose" src="https://static.thenounproject.com/png/2341854-200.png" />');
        $('.GalleryViewer').append('<svg onClick="closeViewer()" class="GalleryViewerClose" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="48px" height="48px"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>');
        if(enableViewOriginalPictureVal==1){
            $('.GalleryViewer').append('<svg onClick="openImage()" class="GalleryViewerOpen"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="48px" height="48px"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/></svg>');
            $('.GalleryViewer').append('<svg onClick="zoom()" class="GalleryViewerZoom" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="48px" height="48px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/><path d="M12 10h-2v2H9v-2H7V9h2V7h1v2h2v1z"/></svg>');
        }
        if(share==1){
            $('.GalleryViewer').append('<svg onClick="Share()" class="GalleryViewerShare" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="48px" height="48px"><path d="M0 0h24v24H0z" fill="none"/><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/></svg>');
            $('.GalleryViewer').append('<div class="sharebuttons"></div>');
            $('.sharebuttons').append('<p onClick="shareFacebook()">Facebook</p>');
            $('.sharebuttons').append('<p onClick="shareTwitter()">Twitter</p>');
            $('.sharebuttons').append('<p onClick="shareGertLink()">Get the Link</p>');   
        }
        added=1;
        $('.GalleryViewer').hide();
        enableDoubleClick();
        }
}
function addPlayer(){

    // Adds player HTML code to GalleryViewer Div container

    if(added==0){
    $('body').append('<div class="GalleryViewer"></div>');
    $('.GalleryViewer').append('<img class="ViewerImage" id="ViewerImage" src="" />');
    $('.GalleryViewer').append('<svg onClick="left()" class="ArrowLeft" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="48px" height="48px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/></svg>');
    $('.GalleryViewer').append('<svg onClick="right()" class="Arrowright"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="48px" height="48px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/></svg>');
   // $('.GalleryViewer').append('<img onClick="closeViewer()" class="GalleryViewerClose" src="https://static.thenounproject.com/png/2341854-200.png" />');
    $('.GalleryViewer').append('<svg onClick="closeViewer()" class="GalleryViewerClose" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="48px" height="48px"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>');
    if(enableViewOriginalPictureVal==1){
        $('.GalleryViewer').append('<svg onClick="openImage()" class="GalleryViewerOpen"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="48px" height="48px"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/></svg>');
        $('.GalleryViewer').append('<svg onClick="zoom()" class="GalleryViewerZoom" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="48px" height="48px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/><path d="M12 10h-2v2H9v-2H7V9h2V7h1v2h2v1z"/></svg>');
    }
    if(share==1){
        $('.GalleryViewer').append('<svg onClick="Share()" class="GalleryViewerShare" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="48px" height="48px"><path d="M0 0h24v24H0z" fill="none"/><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/></svg>');
        $('.GalleryViewer').append('<div class="sharebuttons"></div>');
        $('.sharebuttons').append('<p onClick="shareFacebook()">Facebook</p>');
        $('.sharebuttons').append('<p onClick="shareTwitter()">Twitter</p>');
        $('.sharebuttons').append('<p onClick="shareGertLink()">Get the Link</p>');
       
    }
    added=1;
    $('.GalleryViewer').hide();
    enableDoubleClick();
    }
}
function closeViewer(){
  $("body").css("overflow","unset");
    $('.GalleryViewer').hide();
    $('.Arrowright').show();
    $('.ArrowLeft').show();
    $(".sharebuttons").hide();
    $(".ViewerImage").css("object-fit","contain");
    $(".ViewerImage").animate({"height":"55%","max-height":"80%"}, 0);
    $(".ViewerImage").css("height","unset");
    $(".ViewerImage").css({"width":"80%","max-height":"80%","top":"0","right":"0","left":"0"});
    $( ".ViewerImage" ).draggable( { disabled: true });
    zoomVal=0;
    monoImageView = 0;
    monoImageViewURL="";
}

function checkPreviewState(url){
  newURL=url;
  if(url.includes("-preview.jpeg#preview")){
    split  = url.split("-preview.jpeg#preview");
    newURL = split[0]+".jpeg";
   }else   if(url.includes("-preview.jpg#preview")){
    split  = url.split("-preview.jpg#preview");
    newURL = split[0]+".jpg";
   }
   return newURL;
}

function openViewer(clicked_id){
    $("body").css("overflow","hidden");
    viewerPosition=parseInt(clicked_id);
    var url = document.getElementById(clicked_id).src;

    url = checkPreviewState(url);

    $(".ViewerImage").attr("src",url);
    const img = new Image();
    img.onload = function() {
      widthValue = this.width;
      heightValue = this.height;
      calc = widthValue/heightValue;
      if(calc<1.25){
  
      }else{
        $(".ViewerImage").css("object-fit","contain");
      }
    }
    var url = $(".ViewerImage").attr('src');
    img.src = url;
    img.onload = function() {
      $('.GalleryViewer').show();
    }
}
function left(){
  $(".ViewerImage").css({"width":"80%","max-height":"80%","top":"0","right":"0","left":"0"});
    $( ".ViewerImage" ).draggable( { disabled: true });
    $(".ViewerImage").css("object-fit","contain");
    $(".ViewerImage").animate({"height":"55%","max-height":"80%"}, 1);
    $(".ViewerImage").css("height","unset");
    zoomVal=0;
    viewerPosition=viewerPosition-1;
    if(viewerPosition>=0){
    var url = document.getElementById(viewerPosition).src;

    url = checkPreviewState(url);

    $(".ViewerImage").attr("src",url);

    const img = new Image();
    img.onload = function() {
      widthValue = this.width;
      heightValue = this.height;
      calc = widthValue/heightValue;
      if(calc<1.25){
       
      }else{
        $(".ViewerImage").css("object-fit","contain");
      }
    }
    var url = $(".ViewerImage").attr('src');
    img.src = url;

    img.onload = function() {
      if(transition=="opacity"){
        $(".ViewerImage").css("opacity","0.4");
        $(".ViewerImage").animate({"opacity":"1"}, 200)
    }
    if(transition=="zoomin"){
        $(".ViewerImage").css("width","40%");
        $(".ViewerImage").animate({width: "80%"}, 'slow');
    }
    if(transition=="slide"){
        $(".ViewerImage").css("left","-500px");
        $(".ViewerImage").animate({left: '0'}, 200);
    }
    if(transition=="slideAndZoom"){
        $(".ViewerImage").css("left","-500px");
        $(".ViewerImage").animate({left: '0'}, 200);
        $(".ViewerImage").css("left","500px");
        $(".ViewerImage").css("opacity","0.4");
        $(".ViewerImage").css("width","150px");
        $(".ViewerImage").animate({
            left: '0',
            opacity: '1',
            width: '80%'
          });
    }
    if(transition=="slideZoom"){
        $(".ViewerImage").css("left","-500px");
        $(".ViewerImage").css("opacity","0.4");
        $(".ViewerImage").css("width","150px");
        $(".ViewerImage").animate({
            left: '0',
            opacity: '1',
            width: '80%'
          });
    }
    if(transition=="ZoominFast"){
        $(".ViewerImage").css("width","0");
        $(".ViewerImage").animate({
            width: '100%'
          });
    }
    if(transition=="bounce"){
        $(".ViewerImage").css("top","-100");
        $(".ViewerImage").animate({top: '100'}, 150);
        $(".ViewerImage").animate({top: '-100'}, 150);
        $(".ViewerImage").animate({top: '100'}, 150);
        $(".ViewerImage").animate({top: '0'}, 150);
    }
    if(transition=="puffzoom"){
        $(".ViewerImage").css("width","10%");
        $(".ViewerImage").css("opacity","0.2");
        $(".ViewerImage").animate({width: '80%'}, 300);
        $(".ViewerImage").animate({opacity: '1'}, 100);
    }
    }
  }else{
    viewerPosition=viewerPosition+1;
}
}

function right(){
  $(".ViewerImage").css({"width":"80%","max-height":"80%","top":"0","right":"0","left":"0"});
    $( ".ViewerImage" ).draggable( { disabled: true });
    $(".ViewerImage").css("object-fit","contain");
    $(".ViewerImage").animate({"height":"55%","max-height":"80%"}, 1);
    $(".ViewerImage").css("height","unset");
    zoomVal=0;
    viewerPosition=viewerPosition+1;
    if(viewerPosition<ImageIndex){
    var url = document.getElementById(viewerPosition).src;

    url = checkPreviewState(url);

    $(".ViewerImage").attr("src",url);

    const img = new Image();
    img.onload = function() {
      widthValue = this.width;
      heightValue = this.height;
      calc = widthValue/heightValue;
      if(calc<1.25){
   
      }else{
        $(".ViewerImage").css("object-fit","contain");
      }
    }
    var url = $(".ViewerImage").attr('src');
    img.src = url;
    img.onload = function() {
      if(transition=="opacity"){
        $(".ViewerImage").css("opacity","0.4");
        $(".ViewerImage").animate({"opacity":"1"}, 200)
    }
    if(transition=="zoomin"){
        $(".ViewerImage").css("width","40%");
        $(".ViewerImage").animate({width: "80%"}, 'slow');
    }
    if(transition=="slide"){
        $(".ViewerImage").css("left","500px");
        $(".ViewerImage").animate({left: '0'}, 200);
    }
    if(transition=="slideAndZoom"){
        $(".ViewerImage").css("left","500px");
        $(".ViewerImage").animate({left: '0'}, 200);
        $(".ViewerImage").css("left","500px");
        $(".ViewerImage").css("opacity","0.4");
        $(".ViewerImage").css("width","150px");
        $(".ViewerImage").animate({
            left: '0',
            opacity: '1',
            width: '80%'
          });
    }
    if(transition=="slideZoom"){
        $(".ViewerImage").css("left","500px");
        $(".ViewerImage").css("opacity","0.4");
        $(".ViewerImage").css("width","150px");
        $(".ViewerImage").animate({
            left: '0',
            opacity: '1',
            width: '80%'
          });
    }
    if(transition=="ZoominFast"){
        $(".ViewerImage").css("width","0");
        $(".ViewerImage").animate({
            width: '100%'
          });
    }
    if(transition=="bounce"){
        $(".ViewerImage").css("top","-100");
        $(".ViewerImage").animate({top: '100'}, 150);
        $(".ViewerImage").animate({top: '-100'}, 150);
        $(".ViewerImage").animate({top: '100'}, 150);
        $(".ViewerImage").animate({top: '0'}, 150);
    }
    if(transition=="puffzoom"){
        $(".ViewerImage").css("width","10%");
        $(".ViewerImage").css("opacity","0.2");
        $(".ViewerImage").animate({width: '80%'}, 300);
        $(".ViewerImage").animate({opacity: '1'}, 100);
    }
    }

    }else{
        viewerPosition=viewerPosition-1; 
    }
}

function setGalleryTransition(getTransition){
    transition = getTransition;
}
function openImage(){
    if(monoImageView==1){
        window.location = monoImageViewURL;
    }else{
        var url = document.getElementById(viewerPosition).src;
        window.location = url;
    }

}
function zoom(){

  if(zoomVal==0){
    $(".ViewerImage").css({"width":"80%","max-height":"80%","top":"0","right":"0","left":"0"});
    $(".ViewerImage").css("height","unset");
  }

if(zoomVal==1){
    const img = new Image();
    img.onload = function() {
      widthValue = this.width;
      heightValue = this.height;
      calc = widthValue/heightValue;
      $( ".ViewerImage" ).draggable( { disabled: true });
      if(calc<1.25){
        $(".ViewerImage").animate({"max-height":"80%","top":"0","left":"0"}, 'slow');
        zoomVal=0;
      }else{
        $(".ViewerImage").animate({"width":"80%","max-height":"80%","top":"0","right":"0","left":"0"}, 250);
        $(".ViewerImage").css("height","unset");
     
        zoomVal=0;
      }
    }
    var url = $(".ViewerImage").attr('src');
    img.src = url;
}else{
    const img = new Image();
    img.onload = function() {
      widthValue = this.width;
      heightValue = this.height;
      calc = widthValue/heightValue;
      $( ".ViewerImage" ).draggable( { disabled: false, scroll: false });
      $( ".ViewerImage" ).draggable({ cursor: "pointer" });
      if(calc<1.25){
        $(".ViewerImage").animate({height: "130%"}, 'slow');
        $(".ViewerImage").css("max-height","130%");
        zoomVal=1;
      }else{
        $(".ViewerImage").animate({width: "130%","right": "-15%","left":"-15%"}, 250);
        $(".ViewerImage").css("max-height","130%");
        $(".ViewerImage").css("height","unset");
        $(".ViewerImage").css("max-width","unset");
        zoomVal=1;
      }
    }
    var url = $(".ViewerImage").attr('src');
    img.src = url;
}
}
function enableExtraButtons(){
share=1;
enableViewOriginalPictureVal = 1;
}
function Share(){
 $(".sharebuttons").toggle();
 $(".sharebuttons").css("height","0px");
 $(".sharebuttons").animate({height: "60px"}, 'slow');
}
function shareFacebook(){
    if(monoImageView==1){
        var url = document.getElementById(viewerPosition).src;
        window.open("https://www.facebook.com/sharer/sharer.php?u="+monoImageViewURL, '_blank');
    }else{
        var url = document.getElementById(viewerPosition).src;
        window.open("https://www.facebook.com/sharer/sharer.php?u="+url, '_blank');
    }
}
function shareTwitter(){
    if(monoImageView==1){
        var url = document.getElementById(viewerPosition).src;
        window.open("https://twitter.com/intent/tweet?text="+monoImageViewURL, '_blank');
    }else{
        var url = document.getElementById(viewerPosition).src;
        window.open("https://twitter.com/intent/tweet?text="+url, '_blank');
    }
}
function shareGertLink(){
    if(monoImageView==1){
        const el = document.createElement("textarea");
        el.value = monoImageViewURL;
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
    }else{
        var url = document.getElementById(viewerPosition).src;
        const el = document.createElement("textarea");
        el.value = url;
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
    }
}
function setGalleryStyle(style){
    galleryStyle=style;
}