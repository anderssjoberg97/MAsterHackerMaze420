/* exported start, update */
function init(x, y){
    
}

var rectangle = {x: 0, y: 0};
var xx = 0;
var yy = 0;

function start()
{
    InitMaze();
    rectangle.x = totalWidth-30;
    rectangle.y = totalHeight-30;
}


function update()
{
    debugger
    RectangleRoom(); 
    var rectangleLocation = room[xx][yy];
    console.log(room[xx][yy]);
    if (keyboard.left) {
        rectangle.x-=3;
        ctx.clearRect(rectangle.x+3, rectangle.y, 21, 21);
        
        }
    
    if (keyboard.right) {rectangle.x+=3;ctx.clearRect(rectangle.x-3, rectangle.y, 21, 21);}
    if (keyboard.up) {rectangle.y-=3;ctx.clearRect(rectangle.x, rectangle.y+3, 21, 21);}
    if (keyboard.down) {rectangle.y+=3;ctx.clearRect(rectangle.x, rectangle.y-3, 21, 21);}
    
    if (rectangle.x==0){rectangle.x=0}
    if (rectangle.x==canvas.width){rectangle.x=canvas.width-20;}
    
    drawMaze();    
    rectangle(rectangle.x, rectangle.y, 20, 20, "blue");  
    
    

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
   debugger;
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









