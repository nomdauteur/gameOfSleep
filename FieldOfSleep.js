let foo=function (){
    theField.init_value(this.id); theField.redraw();}

    function sleep(delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
}

function copyArr(srcArray) {
	var len = srcArray.length;
    dstArray = new Array(len); // boost in Safari
for (var i=0; i<len; ++i)
    dstArray[i] = srcArray[i].slice(0);
return dstArray;
}

function removeElementsByClass(className){
    const elements = document.getElementsByClassName(className);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}

function putAlert(_text)
{
var d= document.createElement("div");
let letters_alphabet='abcdefghijklmnopqrstuvwxyz'.split('');
                    d.className=d.className+'alert';
                    d.id='alert'+letters_alphabet[Math.floor(Math.random()*26)]+letters_alphabet[Math.floor(Math.random()*26)];
                    
                    var tn = document.createTextNode(_text+'\n\n');
                    //p.appendChild(tn);

                                              
                    var btn2 = document.createElement("button");
                           //btn.setAttribute("value",i+'_'+j);
                           btn2.className = btn2.className + "button";
                           btn2.textContent='Got it';
                           btn2.onclick = function() {document.getElementById(d.id).style.display = "none";};
                          

                    d.appendChild(tn);
                    
                     d.appendChild(btn2);
                    document.body.appendChild(d);
                  }


class FieldOfSleep {
	constructor(timespan, setAlarms,ringAlarms) {
		console.log(timespan);
		this.width = 12;
		this.height = 24;
		this.field = Array(24).fill(0).map(x => Array(12).fill(0));
		this.hours = 0;
		this.minutes = 0;
		var randLeft = (timespan == "03") ? 0 : 
				((timespan == "36") ? 3 : (
					(timespan == "69") ? 6 : (
						(timespan == "912") ? 9 : 12)));
		var randRight = (timespan == "03") ? 3 : 
				((timespan == "36") ? 6 : (
					(timespan == "69") ? 9 : (
						(timespan == "912") ? 12 : 23)));
		var mins = randLeft*60+Math.floor(Math.random()*(randRight-randLeft)*60/5)*5;
		console.log(randLeft);
		console.log(randRight);
		console.log(mins);
		this.end_hours=Math.floor(mins/60);
		this.end_minutes=mins%60;

		this.isPlaying=false;

		this.maxAlarms=setAlarms;
		this.winAlarms=ringAlarms;
		this.currAlarms=0;
		this.rungAlarms=0;


	}

	

	init_value(id) {

		var coord=id.substring(5).split("_");
		if (this.field[coord[0]][coord[1]] == 0) {
			if (this.currAlarms>=this.maxAlarms) {
				putAlert("You reached max number of possible alarms, erase something");
				return;
			}
			else {
				this.currAlarms++;
			}
		}
		else {
			this.currAlarms--;
		}
		this.field[coord[0]][coord[1]] = 1-this.field[coord[0]][coord[1]];
		
	}

	endInit() {
		for (var i = 0; i <this.height; i++) {
			for (var j=0; j < this.width; j++) {
				document.getElementById("cell_"+i+"_"+j).removeEventListener('click',foo);

			}
		}
		this.gameProcess();
	}

	init_field() {
		const LEFT_OFFSET=(window.screen.width>650)? 135 :0;
		const TOP_OFFSET=200;
		const SIDE=50;

		for (var j=0; j < this.width; j++) {
			var d= document.createElement("div");
			d.id='cell_-1'+'_'+j;
			d.className = d.className + "legend";
                d.style.left=LEFT_OFFSET+j*SIDE;
                d.style.top=TOP_OFFSET-SIDE;
                d.textContent=String(j*5).padStart(2,'0');

                document.body.appendChild(d);
		}
		for (var i=0; i < this.height; i++) {
			var d= document.createElement("div");
			d.id='cell_'+i+'_-1';
			d.className = d.className + "legend";
                d.style.left=LEFT_OFFSET-SIDE;
                d.style.top=TOP_OFFSET+SIDE*i;
                d.textContent=String(i).padStart(2,'0');
                document.body.appendChild(d);
		}
		for (var i = 0; i <this.height; i++) {
			for (var j=0; j < this.width; j++) {
				var d= document.createElement("div");
                d.id='cell_'+i+'_'+j;
                d.className = d.className + "cell";
                d.style.left=LEFT_OFFSET+j*SIDE;
                d.style.top=TOP_OFFSET+SIDE*i;

                const _i=i;
                const _j=j;
                
                
                d.addEventListener('click', foo);

                document.body.appendChild(d);
                
    		}
    	}
        var b=document.createElement("button");
        b.id="endinitbutton";
        b.textContent="End init";
        b.className=b.className+"proceed";
        b.addEventListener('click',function(){document.getElementById("endinitbutton").style.display="none"; theField.endInit(); });
        document.body.appendChild(b);

        var c=document.createElement("div");
        c.id="timetable";
        c.textContent="Точное время — "+String(this.hours).padStart(2,"0")+":"+String(this.minutes).padStart(2,"0");
        c.className=c.className+"clock";
        document.body.appendChild(c);
        this.field = Array(24).fill(0).map(x => Array(12).fill(0));


	}

	countNeighbors(i, j, tmpField) {
		var res = 0;
		for (var a = -1; a <= 1; a++) {
			for (var b = -1; b <= 1; b++) {
				if (a==0 && b==0) {continue;}
				if (i+a < 0 || i+a >= this.height || j+b < 0 || j+b >= this.width) {continue;}
				res += tmpField[i+a][j+b];
			}
		}
		return res;
	}

	step() {
		if (this.hours*60+this.minutes>=this.end_hours*60+this.end_minutes) {
			this.isPlaying=false;
			this.currAlarms=0;
			if (this.rungAlarms<this.winAlarms) {
				putAlert("You lost");
			}
			else putAlert("You won");
			var b=document.createElement("button");
        b.id="newgamebutton";
        b.textContent="new game";
        b.className=b.className+"proceed";
        b.addEventListener('click',function(){document.getElementById("newgamebutton").style.display="none"; 

        	/*[].forEach.call(document.getElementsByClassName("cell"), function (c) {c.style.backgroundColor="";}); 
        	theField.hours = 0;
			theField.minutes = 0;
			theField.init_field(); 
			theField.redraw(); */
			 while (document.body.firstChild) {
    				document.body.removeChild(document.body.lastChild);
  			}
  			loadFunction();
        });
        document.body.appendChild(b);

			return;
		}
		var tmpField = copyArr(this.field);
		for (var i = 0; i < this.height; i++) {
			for (var j=0; j < this.width; j++) {
				if (i*60+j*5 < this.hours*60+ this.minutes) {
					continue;
				}

				if (i*60+j*5 == this.hours*60+ this.minutes) {
					if (this.field[i][j]==1) this.rungAlarms++;
					continue;
				}
				var n = this.countNeighbors(i,j, tmpField);
				if (n == 3) {
					this.field[i][j]=1; 
				}
					
				else if (n == 2) {
					
					continue;
				}
				else if (n<=1 || n>3) {
					this.field[i][j]=0;}


			}
		}
		this.hours = this.hours + ~~((this.minutes+5)/60);
		this.minutes = (this.minutes + 5)%60;

		//this.redraw();

		window.requestAnimationFrame(function() {theField.redraw(); sleep(250); theField.step(); });
		
	}
	


	redraw() {
		removeElementsByClass("arrow");
		for (var i = 0; i < this.height; i++) {
			for (var j=0; j < this.width; j++) {
				if (this.field[i][j] == 1) {
					document.getElementById('cell_'+i+'_'+j).textContent=String.fromCodePoint(9200);

				}
				else {
					document.getElementById('cell_'+i+'_'+j).textContent=" ";
				}

				if ((this.isPlaying) && (i*60+j*5 < this.hours*60+ this.minutes)) {
					document.getElementById('cell_'+i+'_'+j).style.backgroundColor="#d4d0c8";
				}

				if ((this.isPlaying) && (i*60+j*5 <= this.hours*60+ this.minutes) && (this.field[i][j] == 1)) {
					document.getElementById('cell_'+i+'_'+j).style.backgroundColor="#2cff05";
				}

				if ((this.isPlaying) && (i*60+j*5 == this.hours*60+ this.minutes) ) {
					var a = document.createElement("i");
            	a.id='arrow_'+i+'_'+j;
            	a.className = a.className + "arrow";
            	
                document.getElementById("cell_"+i+'_'+j).appendChild(a);
                
				} 
				if ((i*60+j*5 == this.end_hours*60+ this.end_minutes) ) {
					document.getElementById('cell_'+i+'_'+j).style.backgroundColor="#ff0000";
                
				} 
			}
		}
		document.getElementById("timetable").textContent="Точное время — "+String(this.hours).padStart(2,"0")+":"+String(this.minutes).padStart(2,"0");
		//window.requestAnimationFrame(function() {theField.step(); theField.redraw();});
		
	}

	gameProcess() {
			this.isPlaying=true;
			theField.step();
				}


			
		
}