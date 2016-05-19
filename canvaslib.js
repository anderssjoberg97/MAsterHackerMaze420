/* jshint unused:false */
/* global start, update */

var canvas;
var ctx;
var updateID;
var fps;
var fpsInterval;
var then;
var startTime;
var keyboard;
var keyindex;
var mouse;
var totalWidth;
var totalHeight;
var turtle;
var math;


function KeyUp(e)
{
    if (keyindex[e.keyCode] !== undefined)
    {
        if (keyindex[e.keyCode] != '?')
        {
            keyboard[keyindex[e.keyCode]] = false;
        }
    }
}

function KeyDown(e)
{
    if (keyindex[e.keyCode] !== undefined)
    {
        if (keyindex[e.keyCode] != '?')
        {
            keyboard[keyindex[e.keyCode]] = true;
        }
    }
}

function MouseMove(e)
{
    var rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
}

function MouseOut()
{
    mouse.x = -10000;
    mouse.y = -10000;
}

function MouseDown(e)
{

    if (e.button === 0)
    {
        mouse.left = true;
    }
    else if (e.button == 1)
    {
        mouse.middle = true;
    }
    else if (e.button == 2)
    {
        mouse.right = true;
    }
}

function MouseUp(e)
{

    if (e.button === 0)
    {
        mouse.left = false;
    }
    else if (e.button == 1)
    {
        mouse.middle = false;
    }
    else if (e.button == 2)
    {
        mouse.right = false;
    }

}

function showMouse()
{
    canvas.style.cursor = 'default';
}

function hideMouse()
{
    canvas.style.cursor = 'none';
}

function startAnimating(fps)
{
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
    animate();
}

function stopUpdate()
{
    cancelAnimationFrame(updateID);
}

function animate()
{
    // request another frame
    updateID = requestAnimationFrame(animate);

    // calc elapsed time since last loop
    var now = Date.now();
    var elapsed = now - then;

    // if enough time has elapsed, draw the next frame
    if (elapsed > fpsInterval)
    {
        // Get ready for next frame by setting then=now, but also adjust for your
        // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
        then = now - (elapsed % fpsInterval);
        update();
    }
}

function circle(x, y, radius, color)
{
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
}

function ring(x, y, radius, lineWidth, color)
{
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = color;
    ctx.stroke();       
}

function arc(x, y, radius, angle, lineWidth, color)
{
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, -angle * Math.PI / 180, true);
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = color;
    ctx.stroke();
}

function rectangle(x, y, width, height, color)
{
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

function line(x1, y1, x2, y2, width, color)
{
    // x1, y1, x2, y2, color, thickness
    
    var col = typeof(color) != 'undefined' ? color : "black";
    var wid = typeof(width) != 'undefined' ? width : 5;    
    
    ctx.strokeStyle = col;
    ctx.lineWidth = wid;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath();
}

function triangle(x1, y1, x2, y2, x3, y3, color) 
  {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.fill();
  }

function text(x, y, size, label, color)
{
    
    var col = typeof(color) != 'undefined' ? color : "black";
    
    ctx.font = size + "pt Courier";
    ctx.fillStyle = col;
    ctx.fillText(label, x, y);
}


function clearScreen()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function fill(color)
{
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function distance(p1, p2, p3, p4)
{
    var x1, y1, x2, y2;

    var dx = 0;
    var dy = 0;

    if (p1.hasOwnProperty('x'))
    {
        x1 = p1.x;
        y1 = p1.y;
        x2 = p2.x;
        y2 = p2.y;
    }
    else
    {
        x1 = p1;
        y1 = p2;
        x2 = p3;
        y2 = p4;
    }

    dx = x2 - x1;
    dy = y2 - y1;

    return Math.sqrt(dx * dx + dy * dy);
}

function distance3D(x1, y1, z1, x2, y2, z2)
{
    var dx, dy,dz;
    
    if(x1.hasOwnProperty('x'))
    {
      dx = x1.x - y1.x;
      dy = x1.y - y1.y;
      dz = x1.z - y1.z;
    }
    else 
    {
      dx = x1 - x2;
      dy = y1 - y2;
      dz = z1 - z2;
    }

    return Math.sqrt(dx * dx + dy * dy + dz * dz);
}


function getPixel(x, y)
{
    var data = ctx.getImageData(x, y, 1, 1).data;
    return {
        red: data[0],
        green: data[1],
        blue: data[2]
    };
}

function mixColor(red, green, blue)
{
    return "rgb(" + red + "," + green + "," + blue + ")";
}

function random(max, intervalMax)
{
    if (typeof (intervalMax) == 'undefined')
    {
        return Math.floor(Math.random() * max);
    }
    else
    {
        var diff = intervalMax - max;
        return max + Math.floor(Math.random() * (diff + 1));
    }
}


function sin(x) { return Math.sin(x); }
function cos(x) { return Math.cos(x); }
function tan(x) { return Math.tan(x); }
function asin(x) { return Math.asin(x); }
function acos(x) { return Math.acos(x); }
function atan(x) { return Math.atan(x); }
function round(x) { return Math.round(x); }
function sqrt(x) { return Math.sqrt(x); }
function floor(x) { return Math.floor(x); }
function ceil(x) { return Math.ceil(x); }
function PI(x) { return Math.PI(x); }
function abs(x) { return Math.abs(x); }
function pow(x,y) { return Math.pow(x,y); }



function RoboroMath(origoX, origoY, step, canvas)
{
  var env = this;

  this.origoX = origoX;
  this.origoY = origoY;
  this.step   = step;
  this.c      = canvas;

  this.yMax   = 3;
  this.yMin   = -this.yMax;
  this.xMax   = this.c.width/this.step/2;
  this.xMin   = -this.xMax;

  this.point = function(x, y, size, color, label)
  {
    var size1 = typeof(size) != 'undefined' ? size : (this.step/30);
    var color1 = typeof(color) != 'undefined' ? color : "black";
    var label1 = typeof(label) != 'undefined' ? label : "";
    save();
    translate(this.origoX, this.origoY);
    circle(x*this.step, -y*this.step, size1, color1);

    var xOffset = x > 0 ? -4 : label1.length*12+32;
    var yOffset = y > 0 ? 0 : 28;

    text(x*this.step+3-xOffset, -y*this.step-3+yOffset, 20, label1, color1);

    restore();
  };

  this.ring = function(x, y, size, thickness, color)
  {
    var size1 = typeof(size) != 'undefined' ? size : (this.step/30);
    var thickness1 = typeof(thickness) != 'undefined' ? thickness : 1;
    var color1 = typeof(color) != 'undefined' ? color : "black";
    save();
    translate(this.origoX, this.origoY);
    ring(x*this.step, -y*this.step, size1, thickness1, color1);
    restore();
  };

  this.polarPoint = function(v, r, size, color, label)
  {
    var size1 = typeof(size) != 'undefined' ? size : (this.step/30);
    var color1 = typeof(color) != 'undefined' ? color : "black";
    var label1 = typeof(label) != 'undefined' ? label : "";
    var x = r*Math.cos(v);
    var y = r*Math.sin(v);
    this.point(x, y, size1, color1, label1);
  };

  this.polarRing = function(v, r, size, thickness, color)
  {
    var size1 = typeof(size) != 'undefined' ? size : 1;
    var thickness1 = typeof(thickness) != 'undefined' ? thickness : 1;
    var color1 = typeof(color) != 'undefined' ? color : "black";
    var x = r*Math.cos(v);
    var y = r*Math.sin(v);
    this.ring(x, y, size1*this.step, thickness1, color1);
  };

  this.polarLine = function(v1, r1, v2, r2, color)
  {
    var x1 = r1*Math.cos(v1);
    var y1 = r1*Math.sin(v1);
    var x2 = r2*Math.cos(v2);
    var y2 = r2*Math.sin(v2);

    this.line(x1, y1, x2, y2, color);
  };

  this.text = function(x, y, size, label, color)
  {
    var color1 = typeof(color) != 'undefined' ? color : "black";

    save();
    translate(this.origoX, this.origoY);
    text(x*this.step, -y*this.step, size, label, color1);
    restore();
  };

  this.line = function(x1, y1, x2, y2, color, thickness)
  {
    var color1 = typeof(color) != 'undefined' ? color : "black";
    var thickness1 = typeof(thickness) != 'undefined' ? thickness : 2;

    save();
    translate(this.origoX, this.origoY);
    line(x1*this.step, -y1*this.step, x2*this.step, -y2*this.step, thickness1, color1);
    restore();
  };

  this.axes = function()
  {
    var stepNoDecimals = Math.floor(this.step);

    line(this.origoX, 0, this.origoX, this.c.height, 2, "black");
    line(0, this.origoY, this.c.width, this.origoY, 2, "black");

    for (var i = this.origoX; i <= (this.c.width - stepNoDecimals); i+=stepNoDecimals)
      {line(i, this.origoY-10, i, this.origoY+10, 1, "black");}
      
    for (i = this.origoX; i >= stepNoDecimals; i-=stepNoDecimals)
      {line(i, this.origoY-10, i, this.origoY+10, 1, "black");}

    for (i = this.origoY; i <= (this.c.height - stepNoDecimals); i+=stepNoDecimals)
      {line(this.origoX-10, i, this.origoX+10, i, 1, "black");}
      
    for (i = this.origoY; i >= stepNoDecimals; i-=stepNoDecimals)
      {line(this.origoX-10, i, this.origoX+10, i, 1, "black");}

    triangle(this.origoX-10, 10, this.origoX+10, 10, this.origoX, 0, "black");
    text(this.origoX-20, 30, 20, "y", "black");
    triangle(this.c.width-10, this.origoY-10, this.c.width-10, this.origoY+10, this.c.width, this.origoY, "black");
    text(this.c.width-30, this.origoY+22, 20, "x", "black");
  };

  this.unitCircle = function()
  {
    ring(this.origoX, this.origoY, this.step, 1, "#333333");
  };

  this.arcDegrees = function(r, angle, width, color)
  {
    arc(this.origoX, this.origoY, r*this.step, angle, width, color);
  };

  this.arcRadians = function(r, angle, width, color)
  {
    this.arcDegrees(r, angle*(180/Math.PI), width, color);
  };

  // Here be 3D-dragons  

  this.DDDPerspective  = true;
  this.DDDRotation     = {dvx:0, dvy:0, dvz:0};
  this.DDDStack        = [];

  this.save3D = function() 
  { 
    this.DDDStack.push({rotation: { dvx: this.DDDRotation.dvx, 
                                    dvy: this.DDDRotation.dvy,
                                    dvz: this.DDDRotation.dvz }, 
                        origoX: this.origoX, 
                        origoY: this.origoY}); 
  };

  this.restore3D = function() 
  { 
    var oldState = this.DDDStack.pop();

    this.DDDRotation = oldState.rotation;
    this.origoX      = oldState.origoX;
    this.origoY      = oldState.origoY;
  };

  this.rotate3D = function(dx, dy, dz)
  {
    this.DDDRotation.dvx += dx;
    this.DDDRotation.dvy += dy;
    this.DDDRotation.dvz += dz;
  };

  this.point3D = function(x, y, z, color, fixedSize)
  {
    var color1 = typeof(color) != 'undefined' ? color : "black";
  
    var coords = env.calculate3DRotatedCoordinates(x, y, z, env.DDDRotation.dvx, env.DDDRotation.dvy, env.DDDRotation.dvz); 

    save();
    translate(env.origoX, env.origoY);
    var zmax = 10;
    var zdiff = env.DDDPerspective ? (zmax+coords.z)/zmax : 1;
    var size = typeof(fixedSize) != 'undefined' ? fixedSize : (coords.z+4 > 0 ? coords.z+4+2 : 2);
      
    circle(coords.x*env.step*zdiff, -coords.y*env.step*zdiff, size, color1);
    restore();
  };

  this.sphericalPoint = function(radius, inclination, azimuth, color, fixedSize)
  {
    var color1 = typeof(color) != 'undefined' ? color : "black";

    var x = radius * Math.sin(inclination) * Math.cos(azimuth);
    var y = radius * Math.sin(inclination) * Math.sin(azimuth);
    var z = radius * Math.cos(inclination);
    if (typeof(fixedSize) != 'undefined')
      {this.point3D(x, y, z, color1, fixedSize);}
    else
      {this.point3D(x, y, z, color1);}
  };

  this.sphericalLine = function(radius, inclination, azimuth, color, thickness)
  {
    var color1 = typeof(color) != 'undefined' ? color : "black";
    var thickness1 = typeof(thickness) != 'undefined' ? thickness : 1;

    var x = radius * Math.sin(inclination) * Math.cos(azimuth);
    var y = radius * Math.sin(inclination) * Math.sin(azimuth);
    var z = radius * Math.cos(inclination);

    this.line3D(0, 0, 0, x, y, z, color1, thickness1);
  };

  this.text3D = function(x, y, z, text, color, fixedSize)
  {
    var color1 = typeof(color) != 'undefined' ? color : "black";
  
    var coords = env.calculate3DRotatedCoordinates(x, y, z, env.DDDRotation.dvx, env.DDDRotation.dvy, env.DDDRotation.dvz); 

    save();
    translate(env.origoX, env.origoY);
    var zmax = 10;
    var zdiff = env.DDDPerspective ? (zmax+coords.z)/zmax : 1;
    var size = typeof(fixedSize) != 'undefined' ? fixedSize : (coords.z+4 > 0 ? coords.z+4+2 : 2);
  
    text(coords.x*env.step*zdiff, -coords.y*env.step*zdiff, size*10, text, color1);
    restore();
  };

  this.Point3D = function(x, y, z, color)
  {
    this.x = x;
    this.y = y;
    this.z = z;
    this.color = color;

    this.draw = function()
    {
      save();
      translate(env.origoX, env.origoY);
      var zmax = 10;
      var zdiff = env.DDDPerspective ? (zmax+this.z)/zmax : 1;
      var size = this.z+4 > 0 ? this.z+4+2 : 2;
      
      circle(this.x*env.step*zdiff, -this.y*env.step*zdiff, size, this.color);
      restore();
    };
    
    this.rotate = function(dvx, dvy, dvz)
    {
      // rotate about x
      var oldY = this.y;
      var oldZ = this.z;
      this.y = oldY*Math.cos(dvx)-oldZ*Math.sin(dvx);
      this.z = oldY*Math.sin(dvx)+oldZ*Math.cos(dvx);
      
      // rotate about y
      var oldX = this.x;
      oldZ = this.z;
      this.x = oldZ*Math.sin(dvy)+oldX*Math.cos(dvy);
      this.z = oldZ*Math.cos(dvy)-oldX*Math.sin(dvy);
      
      // rotate about z
      oldX = this.x;
      oldY = this.y;
      this.x = oldX*Math.cos(dvz)-oldY*Math.sin(dvz);
      this.y = oldX*Math.sin(dvz)+oldY*Math.cos(dvz);    
    };
    
    this.lineTo = function(point2, color, thickness)
    {
      save();
      translate(env.origoX, env.origoY);
      var zmax = 10;
      var zdiff1 = env.DDDPerspective ? (zmax+this.z)/zmax : 1;
      var zdiff2 = env.DDDPerspective ? (zmax+point2.z)/zmax : 1;
      line(this.x*env.step*zdiff1, -this.y*env.step*zdiff1, point2.x*env.step*zdiff2, -point2.y*env.step*zdiff2, thickness, color);
      restore();    
    };
  };

  this.line3D = function(a)
  {
    var thickness = 1;
    var color = "black";
      
    var x1, y1, z1, x2, y2, z2;        
    var zmax, zdiff1, zdiff2;
    var coords1, coords2;
      
    // p1, p2, color, thickness, where p1={x: , ...}
    if (arguments[0].hasOwnProperty('x') && !arguments[0].hasOwnProperty('rotate')) 
    {
      if (arguments.length >= 3)
        {color = arguments[2];}
      if (arguments.length == 4)
        {thickness = arguments[3];}

      x1 = arguments[0].x;
      y1 = arguments[0].y;
      z1 = arguments[0].z;
      x2 = arguments[1].x;
      y2 = arguments[1].y;
      z2 = arguments[1].z;


      coords1 = env.calculate3DRotatedCoordinates(x1, y1, z1, env.DDDRotation.dvx, env.DDDRotation.dvy, env.DDDRotation.dvz); 
      coords2 = env.calculate3DRotatedCoordinates(x2, y2, z2, env.DDDRotation.dvx, env.DDDRotation.dvy, env.DDDRotation.dvz); 

      save();
      translate(env.origoX, env.origoY);
      zmax = 10;
      zdiff1 = env.DDDPerspective ? (zmax+coords1.z)/zmax : 1;
      zdiff2 = env.DDDPerspective ? (zmax+coords2.z)/zmax : 1;
      line(coords1.x*env.step*zdiff1, 
                 -coords1.y*env.step*zdiff1, 
                 coords2.x*env.step*zdiff2, 
                 -coords2.y*env.step*zdiff2, 
                 thickness, color);
      restore();    
    }
    else if (arguments.length >= 6) // x,y,z,x2,y2,z2,color,thickness
    {
      if (arguments.length >= 7)
        {color = arguments[6];}
      if (arguments.length == 8)
        {thickness = arguments[7];}

      x1 = arguments[0];
      y1 = arguments[1];
      z1 = arguments[2];
      x2 = arguments[3];
      y2 = arguments[4];
      z2 = arguments[5];

      coords1 = env.calculate3DRotatedCoordinates(x1, y1, z1, env.DDDRotation.dvx, env.DDDRotation.dvy, env.DDDRotation.dvz); 
      coords2 = env.calculate3DRotatedCoordinates(x2, y2, z2, env.DDDRotation.dvx, env.DDDRotation.dvy, env.DDDRotation.dvz); 

      save();
      translate(env.origoX, env.origoY);
      zmax = 10;
      zdiff1 = env.DDDPerspective ? (zmax+coords1.z)/zmax : 1;
      zdiff2 = env.DDDPerspective ? (zmax+coords2.z)/zmax : 1;
      line(coords1.x*env.step*zdiff1, 
                 -coords1.y*env.step*zdiff1, 
                 coords2.x*env.step*zdiff2, 
                 -coords2.y*env.step*zdiff2, 
                 thickness, color);
      restore();    
    }
    else // point1, point2, color, thickness
    {
      if (arguments.length >= 3)
        {color = arguments[2];}
      if (arguments.length == 4)
        {thickness = arguments[3];}
      
      var point1 = arguments[0];
      var point2 = arguments[1];

      point1.lineTo(point2, color, thickness);
    }
  };
  
  this.distance3D = function(point1, point2)
  {
    return distance3D(point1.x, point1.y, point1.z, point2.x, point2.y, point2.z);
  };

  this.calculate3DRotatedCoordinates = function(x, y, z, dvx, dvy, dvz)
  {
    // rotate about x
    var oldY = y;
    var oldZ = z;
    y = oldY*Math.cos(dvx)-oldZ*Math.sin(dvx);
    z = oldY*Math.sin(dvx)+oldZ*Math.cos(dvx);
      
    // rotate about y
    var oldX = x;
    oldZ = z;
    x = oldZ*Math.sin(dvy)+oldX*Math.cos(dvy);
    z = oldZ*Math.cos(dvy)-oldX*Math.sin(dvy);
      
    // rotate about z
    oldX = x;
    oldY = y;
    x = oldX*Math.cos(dvz)-oldY*Math.sin(dvz);
    y = oldX*Math.sin(dvz)+oldY*Math.cos(dvz);    

    return {x: x, y: y, z: z};
  };

  this.axes3D = function()
  {

      
      var rightExtreme  = new this.Point3D(3, 0, 0);
      var rightExtreme2 = new this.Point3D(2.9, 0, 0);
      var leftExtreme   = new this.Point3D(-3, 0, 0);
      var topExtreme    = new this.Point3D(0, 3, 0);
      var topExtreme2   = new this.Point3D(0, 2.9, 0);
      var bottomExtreme = new this.Point3D(0, -3, 0);
      var backExtreme   = new this.Point3D(0, 0, -3);
      var frontExtreme  = new this.Point3D(0, 0, 3);
      var frontExtreme2 = new this.Point3D(0, 0, 2.9);

      var topArrow1   = new this.Point3D(0.1, 2.9, 0);
      var topArrow2   = new this.Point3D(-0.1, 2.9, 0);
      var rightArrow1 = new this.Point3D(2.9, 0.1, 0);
      var rightArrow2 = new this.Point3D(2.9, -0.1, 0);
      var frontArrow1 = new this.Point3D(0.1, 0, 2.9);
      var frontArrow2 = new this.Point3D(-0.1, 0, 2.9);

      var xone1 = new this.Point3D(1, 0.1, 0);
      var xone2 = new this.Point3D(1, -0.1, 0);
      var xtwo1 = new this.Point3D(2, 0.1, 0);
      var xtwo2 = new this.Point3D(2, -0.1, 0);

      var xmone1 = new this.Point3D(-1, 0.1, 0);
      var xmone2 = new this.Point3D(-1, -0.1, 0);
      var xmtwo1 = new this.Point3D(-2, 0.1, 0);
      var xmtwo2 = new this.Point3D(-2, -0.1, 0);

      var yone1  = new this.Point3D(0.1,  1, 0);
      var yone2  = new this.Point3D(-0.1, 1, 0);
      var ytwo1  = new this.Point3D(0.1,  2, 0);
      var ytwo2  = new this.Point3D(-0.1, 2, 0);

      var ymone1  = new this.Point3D(0.1,  -1, 0);
      var ymone2  = new this.Point3D(-0.1, -1, 0);
      var ymtwo1  = new this.Point3D(0.1,  -2, 0);
      var ymtwo2  = new this.Point3D(-0.1, -2, 0);

      var zone1  = new this.Point3D(0.1,  0, 1);
      var zone2  = new this.Point3D(-0.1, 0, 1);
      var ztwo1  = new this.Point3D(0.1,  0, 2);
      var ztwo2  = new this.Point3D(-0.1, 0, 2);

      var zmone1  = new this.Point3D(0.1,  0, -1);
      var zmone2  = new this.Point3D(-0.1, 0, -1);
      var zmtwo1  = new this.Point3D(0.1,  0, -2);
      var zmtwo2  = new this.Point3D(-0.1, 0, -2);

      var axes = [rightExtreme, leftExtreme, rightExtreme2,
                  topExtreme, bottomExtreme, topExtreme2,
                  backExtreme, frontExtreme, frontExtreme2,
                  topArrow1, topArrow2,
                  rightArrow1, rightArrow2,
                  frontArrow1, frontArrow2,
                  xone1, xone2, xtwo1, xtwo2,
                  xmone1, xmone2, xmtwo1, xmtwo2,
                  yone1, yone2, ytwo1, ytwo2,
                  ymone1, ymone2, ymtwo1, ymtwo2,
                  zone1, zone2, ztwo1, ztwo2,
                  zmone1, zmone2, zmtwo1, zmtwo2];

      for (var index in axes)
        {axes[index].rotate(this.DDDRotation.dvx,
                           this.DDDRotation.dvy,
                           this.DDDRotation.dvz);}

      this.line3D(rightExtreme2, leftExtreme,   "black", 2);
      this.line3D(backExtreme,  frontExtreme2,  "black", 2);
      this.line3D(topExtreme2,   bottomExtreme, "black", 2);
      this.line3D(topExtreme,   topArrow1,     "black", 2);
      this.line3D(topExtreme,   topArrow2,     "black", 2);
      this.line3D(rightExtreme,   rightArrow1,     "black", 2);
      this.line3D(rightExtreme,   rightArrow2,     "black", 2);
      this.line3D(frontExtreme,   frontArrow1,     "black", 2);
      this.line3D(frontExtreme,   frontArrow2,     "black", 2);
      this.line3D(frontArrow1,   frontArrow2,     "black", 2);
      this.line3D(rightArrow1,   rightArrow2,     "black", 2);
      this.line3D(topArrow1,   topArrow2,     "black", 2);

      this.line3D(xone1, xone2, "black", 2);
      this.line3D(xtwo1, xtwo2, "black", 2);
      this.line3D(xmone1, xmone2, "black", 2);
      this.line3D(xmtwo1, xmtwo2, "black", 2);

      this.line3D(yone1,  yone2, "black", 2);
      this.line3D(ytwo1,  ytwo2, "black", 2);
      this.line3D(ymone1, ymone2, "black", 2);
      this.line3D(ymtwo1, ymtwo2, "black", 2);

      this.line3D(zone1,  zone2, "black", 2);
      this.line3D(ztwo1,  ztwo2, "black", 2);
      this.line3D(zmone1, zmone2, "black", 2);
      this.line3D(zmtwo1, zmtwo2, "black", 2);
    
  };

  // Vector arithmetics below

  this.vectorMagnitude = function(vector)
  {
    return sqrt(vector.x*vector.x+vector.y*vector.y);
  };

  this.normalizeVector = function(vector)
  {
    var magnitude = env.vectorMagnitude(vector);
    return {x: vector.x/magnitude, y: vector.y/magnitude};
  };

  this.dotProduct = function(v1, v2)
  {
    return v1.x*v2.x+v1.y*v2.y;
  };

  this.addVectors = function(v1, v2)
  {
    return {x: v1.x+v2.x, y: v1.y+v2.y};
  };

  this.multiplyScalar = function(v, s)
  {
    return {x: v.x*s, y: v.y*s};
  };
}


















function RoboroTurtle(startX, startY, canvas)
{
  this.x = startX;
  this.y = startY;
  this.c = canvas;
  this.width = 1;
  this.color = "black";
  this.isDrawing = true;
  this.direction = 0;
  this.positionStack = [];
  
  this.penDown = function() { this.isDrawing = true; };
  this.penUp   = function() { this.isDrawing = false; };

  this.move = function(steps) 
  {
    var targetX = this.x + Math.cos(-this.direction*(Math.PI/180))*steps;
    var targetY = this.y + Math.sin(-this.direction*(Math.PI/180))*steps;
    if (this.isDrawing)
      {line(this.x, this.y, targetX, targetY, this.width, this.color);}
    this.x = targetX;
    this.y = targetY;
  };
  
  this.moveWithPen = function(steps) 
  {
    var targetX = this.x + Math.cos(-this.direction*(Math.PI/180))*steps;
    var targetY = this.y + Math.sin(-this.direction*(Math.PI/180))*steps;
    line(this.x, this.y, targetX, targetY, this.width, this.color);
    this.x = targetX;
    this.y = targetY;
  };

  this.moveWithoutPen = function(steps) 
  {
    var targetX = this.x + Math.cos(-this.direction*(Math.PI/180))*steps;
    var targetY = this.y + Math.sin(-this.direction*(Math.PI/180))*steps;
    this.x = targetX;
    this.y = targetY;
  };

  this.rotate    = function(angle) { this.direction += angle; };
  this.turnLeft  = function(angle) { this.direction += angle; };
  this.turnRight = function(angle) { this.direction -= angle; };
  
  this.pushPosition = function() 
  { 
    this.positionStack.push({x: this.x, 
                             y: this.y, 
                             direction: this.direction,
                             color: this.color,
                             width: this.width}); 
  };

  this.popPosition = function() 
  { 
    var oldState = this.positionStack.pop();

    this.x         = oldState.x;
    this.y         = oldState.y;
    this.color     = oldState.color;
    this.width     = oldState.width;
    this.direction = oldState.direction;
  };
}





function save()
{
    ctx.save();
}

function restore()
{
    ctx.restore();
}

function translate(x, y)
{
    ctx.translate(x, y);
}

function scale(x, y)
{
    ctx.scale(x, y);
}

function rotate(degrees)
{
    ctx.rotate(degrees * Math.PI / 180);
}

function picture(x,y,src) 
{
    var imageObj = new Image();

    if (typeof src === 'string') 
    {
        imageObj.onload = function()
        {
            ctx.drawImage(imageObj, x, y);
        };
        imageObj.src = src;    
        return imageObj;

    }
    else
    {
        ctx.drawImage(src, x, y);
    }        
}






// Här nedanför kommer initieringskoden - - - - - - - - - - - - - - - - -
// Här nedanför kommer initieringskoden - - - - - - - - - - - - - - - - -
// Här nedanför kommer initieringskoden - - - - - - - - - - - - - - - - -
// Här nedanför kommer initieringskoden - - - - - - - - - - - - - - - - -
// Här nedanför kommer initieringskoden - - - - - - - - - - - - - - - - -
// Här nedanför kommer initieringskoden - - - - - - - - - - - - - - - - -

function init(width, height)
{
    
    mouse = {
        x: 0,
        y: 0,
        left: false,
        middle: false,
        right: false
    };

    keyindex = new Array(256);
    for (var i = 0; i < keyindex.length; i++)
    {
        keyindex[i] = "?";
    }

    // koder - se här
    // http://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes

    keyboard = {
        left: false,
        right: false,
        up: false,
        down: false,
        s: false,
        w: false
    };

    keyindex[37] = 'left';
    keyindex[39] = 'right';
    keyindex[38] = 'up';
    keyindex[40] = 'down';
    keyindex[83] = 's';
    keyindex[87] = 'w';

    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    
    if (width === undefined ) 
    {
        canvas.style.position = 'absolute';
        canvas.style.left = '0';
        canvas.style.top = '0';

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        canvas.style.width = window.innerWidth;
        canvas.style.height = window.innerHeight;           
    }   
    else
    {
        canvas.width = width;
        canvas.height = height;
        canvas.style.width = width;
        canvas.style.height = height;               
    }
 
    totalWidth = canvas.width;
    totalHeight = canvas.height;


    window.addEventListener("keydown", KeyDown, true);
    window.addEventListener("keyup", KeyUp, true);

    canvas.addEventListener('mousemove', MouseMove);
    canvas.addEventListener('mouseout', MouseOut);

    // OBS - Du kan kommentera bort nedanstående två linjer om du INTE vill använda musklick i dett program
    canvas.addEventListener('mousedown', MouseDown, false);
    canvas.addEventListener('mouseup', MouseUp, false);

    // origoX = totalWidth/2;
    // origoY = totalHeight/2;
    // step = totalHeight/6;
    
    // math = new RoboroMath(origoX, origoY, step, canvas);
    math = new RoboroMath(totalWidth/2, totalHeight/2, totalHeight/6, canvas);
     
    turtle = new RoboroTurtle(totalWidth/2, totalHeight/2, canvas);

    fps = 30;
    startAnimating(fps);
    // updateID = requestAnimationFrame(animate);
    // animationen stoppas med 
    // cancelAnimationFrame(updateID);
    start();
}


// OBSERVERA att du placerar din egen kod i en separat js-fil
// Den js-filen MÅSTE innehålla funktionerna start() och update()


function star(x,y,color){
    debugger;
    
    var x1 = x;
    var y1 = y;
    
    var x2 = x-2.5;
    var y2 = y+5;
    
    var x3 = x-7.5;
    var y3 = y+5;
    
    var x4 = x-2.5;
    var y4 = y+8;
    
    var x5 = x-5;
    var y5 = y+13.75;

    var x6 = x;
    var y6 = y+10;

    var x7 = x +5;
    var y7 = y +13.75;

    var x8 = x+2.5;
    var y8 = y+8;

    var x9 = x+7.5;
    var y9 = y+5;

    var x10 = x+2.5;
    var y10 = y+5;
ctx.fillStyle = color;

ctx.beginPath();

ctx.moveTo(x1, y1);
    
    ctx.lineTo(x2, y2);

ctx.lineTo(x3, y3);
    
    ctx.lineTo(x4, y4);

ctx.lineTo(x5, y5);
    
    ctx.lineTo(x6, y6);
    
        ctx.lineTo(x7, y7);
    
        ctx.lineTo(x8, y8);
    
        ctx.lineTo(x9, y9);
    
        ctx.lineTo(x10, y10);
    
ctx.fill();
}

function eu (height, width){
    clearScreen();
rectangle(0, 0, width, height, 'blue');
    
    for(var i=0;i<13;i++){
        var x = 50*cos(i*Math.PI/6) + 130;
        var y = 50*sin(i*Math.PI/6) + 70;
        star(x,y,'gold');
    }
    
    
    
}




function liberiaa(height, width)
{
 clearScreen();   
   for(var i=1;i<14;i++){
        
        var t = [1,3,5,7,9,11,13];
        var b = t.indexOf(i);
        var col = (b != -1) ? col= '#FFFFFF': 'red';

        var y = (i != 1) ? y=i*height/11 : 0;

                ctx.strokeStyle = col;
        var x = 0;
        var heig = height/11;
                rectangle(x, y, width, heig, col);
                
                ctx.beginPath();

                ctx.moveTo(0, y);

                ctx.lineTo(width, y);

                ctx.closePath();
        }
    
rectangle(0, (2*height/11), (width/3.5), (5*height/11), 'blue');
star2((260/7),(450/11),'#FFFFFF');
}

function star2(x,y,color){
    debugger;
    
    var x1 = x;
    var y1 = y;
    
    var x2 = 0.45*x;
    var y2 = 2*y;
    
    var x3 = x*1.7;
    var y3 = y*1.35;
    
    var x4 = x*0.3;
    var y4 = y*1.35;
    
    var x5 = 1.55*x;
    var y5 = y*2;

    
    

    
ctx.fillStyle = color;

ctx.beginPath();

ctx.moveTo(x1, y1);
    
    ctx.lineTo(x2, y2);

ctx.lineTo(x3, y3);
    
    ctx.lineTo(x4, y4);

ctx.lineTo(x5, y5);
    
    ctx.lineTo(x1, y1);
    
ctx.fill();
}














