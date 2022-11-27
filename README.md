# Tiny-Tour.js
> A lightweight javascript library for step-by-step product tours and user onboarding guides

[![Version](https://img.shields.io/npm/v/tiny-tour.js.svg)](https://www.npmjs.com/package/tiny-tour.js) 
[![Gzip Size](https://img.shields.io/bundlephobia/minzip/tiny-tour.js.svg)](https://unpkg.com/tinyview.js@1.0.3/tiny-tour.min.js)

## Features Demo
<img src="https://github.com/jacksonCV1114/TinyView/blob/main/demo.gif" width="300"/>


## Features
* Next Step
* Previous Step
* Image

## Main Files and Descriptions
```
src/
├── tiny-tour.css       (uncompressed)
├── tiny-tour.css   (compressed)
├── tiny-tour.js        (uncompressed)
└── tiny-tour.js    (compressed)
```

## Getting Started

### Installation

NPM
```
npm install tiny-tour.js
```
In browser:
```
<link  href="/path/to/tiny-tour.min.css" rel="stylesheet">
<script src="/path/to/tiny-tour.min.js"></script>
```
### Example
```
<html>
     <body>
        <div id="target1" style="position:absolute;top:1000px;">
            <p> I am the long long long long long long long long long target</p>
        </div>  
        <div id="target2" style="position:absolute;top:300px;">
            <p> I am the target</p>
        </div>  
        <div id="target3" style="position:absolute;top:300px;left:400px">
            <p> I am the target</p>
        </div>  
    </body>
  
    <script>
        const stepList = [];
        stepList.push(new Step('target1',`<img width='200px' height='200px' src="image.jpg">`,`Let me show you`))
        stepList.push(new Step('target2','Title 2','Description2'))
        stepList.push(new Step('target3','Title 3','Description3'))
        const tinyTour = new TinyTour(stepList);
    </script>
</html>
```

