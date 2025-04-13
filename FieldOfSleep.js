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
				putAlert(setText("Вы выбрали максимальное число будильников, удалите один, чтобы добавить еще.","You reached the maximum amount of alarms, remove something to add more."));
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
		let LEFT_OFFSET=vw(5);
		let TOP_OFFSET=vh(10);
		let SIDE=vmin(3.5);

		for (var j=0; j < this.width; j++) {
			var d= document.createElement("div");
			d.id='cell_-1'+'_'+j;
			d.className = d.className + "legend";
                d.style.left=LEFT_OFFSET+j*SIDE;
                d.style.top=TOP_OFFSET-SIDE;
                d.textContent=String(j*5).padStart(2,'0');
                d.style.width=SIDE;
                d.style.height=SIDE;

                document.getElementById("game").appendChild(d);
		}
		for (var i=0; i < this.height; i++) {
			var d= document.createElement("div");
			d.id='cell_'+i+'_-1';
			d.className = d.className + "legend";
                d.style.left=LEFT_OFFSET-SIDE;
                d.style.top=TOP_OFFSET+SIDE*i;
                d.textContent=String(i).padStart(2,'0');
                d.style.width=SIDE;
                d.style.height=SIDE;
                document.getElementById("game").appendChild(d);
		}
		for (var i = 0; i <this.height; i++) {
			for (var j=0; j < this.width; j++) {
				var d= document.createElement("div");
                d.id='cell_'+i+'_'+j;
                d.className = d.className + "cell";
                d.style.left=LEFT_OFFSET+j*SIDE;
                d.style.top=TOP_OFFSET+SIDE*i;
                d.style.width=SIDE;
                d.style.height=SIDE;

                const _i=i;
                const _j=j;
                
                
                d.addEventListener('click', foo);

                document.getElementById("game").appendChild(d);
                
    		}
    	}
        var b=document.createElement("button");
        b.id="endinitbutton";
        b.textContent=setText("Запустить","Run");
        b.className=b.className+"proceed";
        b.style.bottom="0px";
        b.style.left="1vw";
        

        b.addEventListener('click',function(){document.getElementById("endinitbutton").style.display="none"; theField.endInit(); });
        document.getElementById("game").appendChild(b);

        var c=document.createElement("div");
        c.id="timetable";
        c.style.left="5vw";
        c.style.width="40vw";
        c.textContent=setText("Точное время — ", "Current time is ")+String(this.hours).padStart(2,"0")+":"+String(this.minutes).padStart(2,"0");
        c.className=c.className+"clock";
        document.getElementById("game").appendChild(c);
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
			YaGames.init()

    .then((ysdk) => {

        ysdk.features.GameplayAPI?.stop();

    });
			this.currAlarms=0;
			if (this.rungAlarms<this.winAlarms) {
				putAlert(setText("Вы проиграли, но завтра будет новый день — и новая ночь. Попробуйте снова!", "You lost, but tomorrow will be another day and another night, so try again."));
			}
			else putAlert(setText("Вы успешно проснулись! Но завтра все начнется заново — сыграйте еще раз.", "You woke up in time! But tomorrow will be the same, so play again."));
			var b=document.createElement("button");
        b.id="newgamebutton";
        b.textContent=setText("Новая игра","New game");
        b.className=b.className+"proceed";
        b.style.left="1vw";
        b.addEventListener('click',function(){document.getElementById("newgamebutton").style.display="none"; 

        	 while (document.getElementById("game").firstChild) {
    				document.getElementById("game").removeChild(document.getElementById("game").lastChild);
  			}

  			var showAd=Math.random();
  			if (showAd<0.5) {

  				loadFunction();

  			}

  			else {
  				YaGames.init()

    .then((ysdk) => {

  				ysdk.adv.showFullscreenAdv({

    callbacks: {

        onClose: function(wasShown) {

          loadFunction();

        },

        onError: function(error) {

          console.log(error);

        }

    }

})})

  			}
  			}
  			

  			
        );
        document.getElementById("game").appendChild(b);

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
		document.getElementById("timetable").textContent=setText("Точное время — ", "Current time is ")+String(this.hours).padStart(2,"0")+":"+String(this.minutes).padStart(2,"0");
		//window.requestAnimationFrame(function() {theField.step(); theField.redraw();});
		
	}

	gameProcess() {
			this.isPlaying=true;
			theField.step();
				}


			
		
}

function resize() {
	var elements = document.getElementsByClassName("cell");
	let LEFT_OFFSET=vw(5);
		let TOP_OFFSET=vh(10);
		let SIDE=vmin(3.5);
	for (i = 0; i < elements.length;i++) {
		var coord=elements[i].id.substring(5).split("_");
		elements[i].style.left=LEFT_OFFSET+coord[1]*SIDE;
                elements[i].style.top=TOP_OFFSET+SIDE*coord[0];
                
                elements[i].style.width=SIDE;
                elements[i].style.height=SIDE;

	}

	elements=document.getElementsByClassName("legend");
	for (i = 0; i < elements.length;i++) {
		var coord=elements[i].id.substring(5).split("_");
		elements[i].style.left=LEFT_OFFSET+coord[1]*SIDE;
                elements[i].style.top=TOP_OFFSET+SIDE*coord[0];
                
                elements[i].style.width=SIDE;
                elements[i].style.height=SIDE;

	}
}