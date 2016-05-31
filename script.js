/* exported start, update */
function init(x, y){
    
}
var level = 0;
var walls1 = [0, 45, 90, 135, 180, 225, 270, 315];
var walls2 = [45, 90, 135, 180, 225, 270, 315, 360];
var rectangle = {x: 0, y: 0,};
var room = [];
var i;
var enemy = [];
var path;

function start()
{
    level++;
    InitMaze();
    spawnenemy();
    rectangle.x = totalWidth-30;
    rectangle.y = totalHeight-30;
    update();
    
    
}

function update()
{
    drawMaze();
    if (keyboard.left) {Left(); ctx.clearRect(rectangle.x, rectangle.y, 20, 20);}
    if (keyboard.right) {Right();ctx.clearRect(rectangle.x, rectangle.y, 20, 20);}
    if (keyboard.up) {Up();ctx.clearRect(rectangle.x, rectangle.y, 20, 20);}
    if (keyboard.down) {Down();ctx.clearRect(rectangle.x, rectangle.y, 20, 20);}
    rectangle(rectangle.x, rectangle.y, 20, 20, "blue");
    drawenemy();
    enemymovement();
    rectangle(0,0,45,45,"green");
    if (rectangle.x < 30 && rectangle.y < 30){
        UWIN();
    }
    
}

function spawnenemy(){
    if (level == 1){
        enemy[0]={x:195, y:195, xtarget: null, ytarget: null, direction:null};
        enemy[1]={x:285, y:105, xtarget: null, ytarget: null, direction:null};
    }
    else if (level == 2){}
    else if (level == 3){}
    else if (level == 4){}
    else if (level == 5){}
    else if (level == 6){}
    else {UWIN();}
}

function drawenemy(){
    for (var i=0; i<(level+1);i++){
        rectangle(enemy[i].x,enemy[i].y,15,15,"orange");
    }
}

function enemymovement(){
    for(var i=0;i<enemy.length;i++){
        if(enemy[i].xtarget==null || enemy[i].ytarget==null)
            generateTarget(enemy[i]);
        //Go towards target
    }
}
function generateTarget(enemy){
    enemy.xtarget=null;
    enemy.ytarget=null;
    var roomX=whichRoomX(enemy.x);
    var roomY=whichRoomY(enemy.y);
    while(enemy.xtarget==null && enemy.ytarget==null){
        var temp=Math.floor(Math.random()*4);
        if(temp==0 && room[roomX][roomY].w){
            enemy.xtarget=roomX-1;
            enemy.ytarget=roomY;
        }else if(temp==1 && room[roomX][roomY].n){
            enemy.xtarget=roomX;
            enemy.ytarget=roomY-1;
        }else if(temp==2 && room[roomX][roomY].e){
            enemy.xtarget=roomX+1;
            enemy.ytarget=roomY;
        }else if(temp==3 && room[roomX][roomY].s){
            enemy.xtarget=roomX;
            enemy.ytarget=roomY+1;
        }
    }
    console.log(enemy.xtarget+" "+enemy.ytarget);
}

function UWIN(){
    clearScreen();
    text(10,100,20,"Ät bajs :D", "gold");
}
function whichRoomX(x){
    var xx = Math.floor(x/(canvas.width/room.length));
    return Math.floor(x/(canvas.width/room.length));
}
function whichRoomY(y){
    var yy = Math.floor(y/(canvas.height/room[0].length));
    return Math.floor(y/(canvas.height/room[0].length));
}






















function Left(){
    if(whichRoomX(rectangle.x-3)==whichRoomX(rectangle.x)){
        rectangle.x-=3;
    }else if(room[whichRoomX(rectangle.x)][whichRoomY(rectangle.y)].w && room[whichRoomX(rectangle.x)][whichRoomY(rectangle.y+20)].w){
        if(whichRoomY(rectangle.y)==whichRoomY(rectangle.y+20)){
            rectangle.x-=3;
        }else{
            rectangle.x-=rectangle.x-(whichRoomX(rectangle.x)*((canvas.width/room.length)));
        }
    }else{
        rectangle.x-=rectangle.x-(whichRoomX(rectangle.x)*((canvas.width/room.length)));
    }
}

function Right(){
    if(whichRoomX(rectangle.x+23)==whichRoomX(rectangle.x+20)){
        rectangle.x+=3;
    }else if(room[whichRoomX(rectangle.x+20)][whichRoomY(rectangle.y)].e && room[whichRoomX(rectangle.x+20)][whichRoomY(rectangle.y+20)].e){
        if(whichRoomY(rectangle.y)==whichRoomY(rectangle.y+20)){
            rectangle.x+=3;
        }else{
            rectangle.x+=((whichRoomX(rectangle.x)+1)*((canvas.width/room.length)))-rectangle.x-20-1;
        }
    }else{
        rectangle.x+=((whichRoomX(rectangle.x)+1)*((canvas.width/room.length)))-rectangle.x-20-1;
    }
}


function Up(){
    if(whichRoomY(rectangle.y)==whichRoomY(rectangle.y-3)){
        rectangle.y-=3;
    }else if(room[whichRoomX(rectangle.x)][whichRoomY(rectangle.y)].n && room[whichRoomX(rectangle.x+20)][whichRoomY(rectangle.y)].n){
        if(whichRoomX(rectangle.x)==whichRoomX(rectangle.x+20)){
            rectangle.y-=3;
        }else{
            rectangle.y-=rectangle.y-((whichRoomY(rectangle.y))*((canvas.height/room[0].length)));
        }
    }else{
        rectangle.y-=rectangle.y-((whichRoomY(rectangle.y))*((canvas.height/room[0].length)));
    }
}

function Down(){
   if(whichRoomY(rectangle.y+20)==whichRoomY(rectangle.y+23)){
        rectangle.y+=3;
    }else if(room[whichRoomX(rectangle.x)][whichRoomY(rectangle.y+20)].s && room[whichRoomX(rectangle.x+20)][whichRoomY(rectangle.y+20)].s){
        if(whichRoomX(rectangle.x)==whichRoomX(rectangle.x+20)){
            rectangle.y+=3;
        }else{
            rectangle.y+=((whichRoomY(rectangle.y)+1)*((canvas.height/room[0].length)))-rectangle.y-20-1;
        }
    }else{
        rectangle.y+=((whichRoomY(rectangle.y)+1)*((canvas.height/room[0].length)))-rectangle.y-20-1;
    }
}




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




