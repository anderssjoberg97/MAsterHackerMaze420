/* exported start, update */
function init(x, y){
    
}
var level = 0;
var walls1 = [0, 45, 90, 135, 180, 225, 270, 315];
var walls2 = [45, 90, 135, 180, 225, 270, 315, 360];
var rectangle = {x: 0, y: 0, x2: 0, y2: 0};
var x=0;
var y=0;
var xx = 0;
var yy = 0;


    

function start()
{
    level++;
    InitMaze();
    debugger
    rectangle.x = totalWidth-30;
    rectangle.y = totalHeight-30;
    rectangle.x2 = totalWidth-12;
    rectangle.y2 = totalHeight-12;
    update();
    
    
}


function update()
{
    debugger
    drawMaze();
    RectangleRoom(); 
    RectangleRoom2();
    
    if (keyboard.left) {Left(); ctx.clearRect(rectangle.x, rectangle.y, 20, 20);}
    if (keyboard.right) {Right();ctx.clearRect(rectangle.x, rectangle.y, 20, 20);}
    if (keyboard.up) {Up();ctx.clearRect(rectangle.x, rectangle.y, 20, 20);}
    if (keyboard.down) {Down();ctx.clearRect(rectangle.x, rectangle.y, 20, 20);}
    
    rectangle(rectangle.x, rectangle.y, 20, 20, "blue");
    rectangle(0,0,45,45,"green");
    rectangle(rectangle.x,rectangle.y,2,2,"red")
    rectangle(rectangle.x2,rectangle.y2,2,2,"red")
    if (rectangle.x < 30 && rectangle.y < 30){
        UWIN();
        clearScreen();
        
    }
    
   

}
function UWIN(){
    clearScreen();
    text(10,100,20,"Congratz, beat level:"+level, "gold")
}
function RectangleRoom(){
    var t = [0, 45, 90, 135, 180, 225, 270, 315];
    var Rx = Math.floor(((rectangle.x)/45))*45;
    var Ry = Math.floor(((rectangle.y)/45))*45;
    if (Rx == -1){Rx=315;}
    if (Ry == -1){Ry=315;}
    x = t.indexOf(Rx);
    y = t.indexOf(Ry);
}
    
function RectangleRoom2(){
    var t = [0, 45, 90, 135, 180, 225, 270, 315];
    var Rx = Math.floor(((rectangle.x2)/45))*45;
    var Ry = Math.floor(((rectangle.y2)/45))*45;
    if (Rx == -1){Rx=315;}
    if (Ry == -1){Ry=315;}
    xx = t.indexOf(Rx);
    yy = t.indexOf(Ry);
    
}

function Left(){
    if (room[x][y].w == false && walls1.indexOf((rectangle.x-3)) != -1){
        rectangle.x-=2;
        rectangle.x2-=2;
    }
    else if (room[x][y].w == false && walls1.indexOf((rectangle.x-2)) != -1){
        rectangle.x--;
        rectangle.x2--;
    }
    else if (room[x][y].w == false && walls1.indexOf((rectangle.x-1)) != -1 ||
             room[xx][yy].w == false && walls1.indexOf((rectangle.x2-19)) != -1 ||
             room[x-1][y].s == false && room[x][y] != room[x][yy] && rectangle.x-1==x*45)
    {
                
                rectangle.x-=0;
                rectangle.x2-=0;
    }
  
    else {rectangle.x-=3;rectangle.x2-=3;}
}

function Right(){
    if (room[x][y].e == false && walls2.indexOf((rectangle.x+23)) != -1){
        rectangle.x+=2;
        rectangle.x2+=2;

    }
    else if (room[x][y].e == false && walls2.indexOf((rectangle.x+22)) != -1){
        rectangle.x++;
        rectangle.x2++;
    }
    else if (room[x][y].e == false && walls2.indexOf((rectangle.x+21)) != -1||
             room[xx][yy].e == false && walls2.indexOf((rectangle.x2+3)) != -1 ||
             room[x+1][y].s == false && room[x][y] != room[x][yy] && rectangle.x+21==(x+1)*45 ){
        rectangle.x+=0;
        rectangle.x2+=0;
    }
    else {rectangle.x+=3;rectangle.x2+=3;}
}

function Up(){
    if (room[x][y].n == false && walls1.indexOf((rectangle.y-3)) != -1){
        rectangle.y-=2;
        rectangle.y2-=2;
    }
    else if (room[x][y].n == false && walls1.indexOf((rectangle.y-2)) != -1){
        rectangle.y--;
        rectangle.y2--;
    }
    else if (room[x][y].n == false && walls1.indexOf((rectangle.y-1)) != -1 ||
             room[xx][yy].n == false && walls1.indexOf((rectangle.y2-19)) != -1||
        room[x][y-1].e == false && room[x][y] != room[xx][y] && rectangle.y-1==y*45){
        rectangle.y-=0;
        rectangle.y2-=0;
    }
    else {rectangle.y-=3;rectangle.y2-=3;}
}

function Down(){
    if (room[x][y].s == false && walls2.indexOf((rectangle.y+23)) != -1){
        rectangle.y+=2;
        rectangle.y2+=2;
    }
    else if (room[x][y].s == false && walls2.indexOf((rectangle.y+22)) != -1){
        rectangle.y++;
        rectangle.y2++;
    }
    else if (room[x][y].s == false && walls2.indexOf((rectangle.y+21)) != -1 ||
             room[xx][yy].s == false && walls2.indexOf((rectangle.y2+3)) != -1 ||
             room[x][y+1].e == false && room[x][y] != room[xx][y] && rectangle.y+21==(y+1)*45){
        rectangle.y+=0;
        rectangle.y2+=0;
    }
    else {rectangle.y+=3;rectangle.y2+=3;}
}


var room = [];

function InitMaze(){


    
    for (var x = 0; x < 8; x++) {
    room[x] = [];
        for (var y = 0; y < 8; y++) 
        {
            room[x][y] = {n: false, e: false, s: false, w: false};
        }
    }
maze();
}

function maze(){
   
if(Math.random() > 0.5) {
 // alternativ 1A
        var a = Math.floor(Math.random()*8);
        room[3][a].e = true; // öppna upp mellan kolumn 3 och 4
        room[4][a].w = true;
        var a = Math.floor(Math.random()*4);
        room[a][3].s = true; // öppna upp mellan rad 3 och 4
        room[a][4].n = true; // till vänster om mitten
        var a = 4 + Math.floor(Math.random()*4);
        room[a][3].s = true; // öppna upp mellan rad 3 och 4
        room[a][4].n = true; // till höger om mitten
}

else{
         // alternativ 1B
        var a = Math.floor(Math.random()*8);
        room[a][3].s = true; // öppna upp mellan rad 3 och 4
        room[a][4].n = true;
        var a = Math.floor(Math.random()*4);
        room[3][a].e = true; // öppna upp mellan kolumn 3 och 4
        room[4][a].w = true; // ovanför mittlinjen
        var a = 4 + Math.floor(Math.random()*4);
        room[3][a].e = true; // öppna upp mellan kolumn 3 och 4
        room[4][a].w = true; // under mittlinjen
    }
//steg 2
//---------------------------kvadranter--------------------------------------
    
for (var i=0; i<5; i++){
    
    if (i==1){
        if(Math.random() > 0.5){ //alternativ A
            var a = Math.floor(Math.random()*4);
            room[1][a].e = true; 
            room[2][a].w = true;
            var a = Math.floor(Math.random()*2);
            room[a][1].s = true; 
            room[a][2].n = true; 
            var a = 2 + Math.floor(Math.random()*2);
            room[a][1].s = true; 
            room[a][2].n = true; 
        }
        else{ // Alternativ B
            var a = Math.floor(Math.random()*4);
            room[a][1].s = true; 
            room[a][2].n = true;
            var a = Math.floor(Math.random()*2);
            room[1][a].e = true; 
            room[2][a].w = true; 
            var a = 2 + Math.floor(Math.random()*2);
            room[1][a].e = true; 
            room[2][a].w = true; 
        }
    } 
    
    else if (i==2){
        if(Math.random() > 0.5){ //alternativ A
            var a = Math.floor(Math.random()*4);
            room[5][a].e = true; 
            room[6][a].w = true;
            var a = 4 + Math.floor(Math.random()*2);
            room[a][1].s = true; 
            room[a][2].n = true; 
            var a = 6 + Math.floor(Math.random()*2);
            room[a][1].s = true; 
            room[a][2].n = true; 
        }
        else{ // Alternativ B
            var a = 4 + Math.floor(Math.random()*4);
            room[a][1].s = true; 
            room[a][2].n = true;
            var a = Math.floor(Math.random()*2);
            room[5][a].e = true; 
            room[6][a].w = true; 
            var a = 2 + Math.floor(Math.random()*2);
            room[5][a].e = true; 
            room[6][a].w = true; 
        }
    }
    
    else if (i==3){
        if(Math.random() > 0.5){ //alternativ A
            var a = 4 + Math.floor(Math.random()*4);
            room[1][a].e = true; 
            room[2][a].w = true;
            var a = Math.floor(Math.random()*2);
            room[a][5].s = true; 
            room[a][6].n = true; 
            var a = 2 + Math.floor(Math.random()*2);
            room[a][5].s = true; 
            room[a][6].n = true; 
        }
         else{ // Alternativ B
            var a = Math.floor(Math.random()*4);
            room[a][5].s = true; 
            room[a][6].n = true;
            var a = 4 + Math.floor(Math.random()*2);
            room[1][a].e = true; 
            room[2][a].w = true; 
            var a = 6 + Math.floor(Math.random()*2);
            room[1][a].e = true; 
            room[2][a].w = true; 
        }
    }
    
    else if (i==4){
         if(Math.random() > 0.5){ //alternativ A
            var a = 4 + Math.floor(Math.random()*4);
            room[5][a].e = true; 
            room[6][a].w = true;
            var a = 4 + Math.floor(Math.random()*2);
            room[a][5].s = true; 
            room[a][6].n = true; 
            var a = 6 + Math.floor(Math.random()*2);
            room[a][5].s = true; 
            room[a][6].n = true; 
        }
        else{ // Alternativ B
            var a = 4 + Math.floor(Math.random()*4);
            room[a][5].s = true; 
            room[a][6].n = true;
            var a = 4 + Math.floor(Math.random()*2);
            room[5][a].e = true; 
            room[6][a].w = true; 
            var a = 6 + Math.floor(Math.random()*2);
            room[5][a].e = true; 
            room[6][a].w = true; 
        }
    }
    
}

//-------------------------sextondelar----------------------------------*/
    
    for (var lodrätt = 0;lodrätt<8;lodrätt+=2){
     
        for (var vågrätt = 0;vågrätt<8; vågrätt+=2){
                var a = vågrätt;
                var b = vågrätt+1;
                var c = lodrätt;
                var d = lodrätt+1;
                
              if(Math.random() > 0.5) { //Alternativ A  
                room[a][c].e = true;   //1
                room[b][c].w = true;   //1 en av dessa två ska väljas slumpartat
        //      room[a][d].e = true;   //2
        //      room[b][d].w = true;   //2
                
                room[a][c].s = true;
                room[a][d].n = true;   //dessa utförs oavsett
                room[b][c].s = true;
                room[b][d].n = true;
              }
             else{                     //ALternativ B
                room[a][c].e = true;   
                room[b][c].w = true;   // Alla dessa utförs oavsett
                room[a][d].e = true;   
                room[b][d].w = true;   
                
                room[a][c].s = true;   //1
                room[a][d].n = true;   //1 en av dessa två ska väljas slumpartat
            //    room[b][c].s = true;   //2
            //    room[a][c].n = true;   //2
             }
            }
        }
drawMaze();
    }


function drawMaze() {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for (var i=0;i<room.length;i++){
        
        for(var j=0;j<room[i].length;j++){
    
           
            if (room[i][j].w == false){
                ctx.beginPath();
                ctx.moveTo(((i*canvas.width)/room.length),((j*canvas.height)/room[i].length));
                ctx.lineTo(((i*canvas.width)/room.length),(((j+1)*canvas.height)/room[i].length));
                ctx.stroke();
                }
            
            if (room[i][j].e == false){
                ctx.beginPath();
                ctx.moveTo((((i+1)*canvas.width)/room.length),((j*canvas.height)/room[i].length));
                ctx.lineTo((((i+1)*canvas.width)/room.length),(((j+1)*canvas.height)/room[i].length));
                ctx.stroke();
                }
            
            if (room[i][j].n == false){
                ctx.beginPath();
                ctx.moveTo(((i*canvas.width)/room.length),((j*canvas.height)/room[i].length));
                ctx.lineTo((((i+1)*canvas.width)/room.length),((j*canvas.height)/room[i].length));
                ctx.stroke();
                }
            
            if (room[i][j].s == false){
                ctx.beginPath();
                ctx.moveTo(((i*canvas.width)/room.length),(((j+1)*canvas.height)/room[i].length));
                ctx.lineTo((((i+1)*canvas.width)/room.length),(((j+1)*canvas.height)/room[i].length));
                ctx.stroke();
                }
        }
    }
    
    
}









