# JavaScriptGallery

[![current version](https://img.shields.io/badge/current%20version-0.1.3-green.svg)](https://github.com/marcelbohland/JavaScriptGallery/releases/tag/0.1.3)
[![last version](https://img.shields.io/badge/last%20version-0.1.2-blue.svg)](https://github.com/marcelbohland/JavaScriptGallery/releases/tag/0.1.2)
[![license](https://img.shields.io/badge/license-Apache%20License%202.0-red.svg)](https://github.com/marcelbohland/JavaScriptGallery/blob/main/LICENSE)

# Implementation
### Step 1 - include JS/CSS File:
JQuery and JQuery UI is required!
```
<script src="{your URL}/gallery.js"></script>
<link rel="stylesheet" type="text/css" href="{your URL}/gallery.css" media="screen" />
```
### Step 2 - include HTML Tag:
```
<div class="Gallery"></div>
```
### Step 3 - include Gallery Script:
```javascript
json = '{ "Entry": { "Title": "Gallery Demo", '+
'"Image": ["{your URL}/f.jpg",'+
'"{your URL}/g.jpg",'+
'"{your URL}/f.jpg",'+
'"{your URL}/g.jpg",'+
'"{your URL}/f.jpg",'+
'"{your URL}/g.jpg" ] } }';
addGallery(json);
json = '{ "Entry": { "Title": "Gallery 2", "Image": ["{your URL}/f.jpg", "{your URL}/g.jpg" ] } }';
addGallery(json);
```
### Step 4 - include settings (optional):
All settings parameters must be inserted before the addGallery() function


Transitions:


```javascript
setGalleryTransition("opacity");
setGalleryTransition("zoomin");
setGalleryTransition("slide");
setGalleryTransition("slideAndZoom");
setGalleryTransition("slideZoom");
setGalleryTransition("ZoominFast");
setGalleryTransition("bounce");
setGalleryTransition("puffzoom");
```
Enable optional buttons like share
```javascript
enableExtraButtons();
```
Change backgroundcolor
```javascript
backgroundColor("#000000f7");
```
Change Gallery Style
```javascript
setGalleryStyle("tiles");
setGalleryStyle("center");
setGalleryStyle("Circles");
setGalleryStyle("full");
setGalleryStyle("mosaic");
```
# Image viewer
Add "galleryJS" to img tags!
For a full Viewer add "addToGallery" too

# Add preview Images
1. Add #preview to the end of the Image url.
2. Add a smaller preview Image to the same path ({original_name}-preview.{original_file_extension})

.jpeg; .png; .jpg and .webp are supported

# License
Copyright 2021 Marcel Bohland - https://github.com/marcelbohland/JavaScriptGallery/

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
