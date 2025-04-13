
function load() {


	 YaGames.init()

    .then((ysdk) => {

        
        document.getElementById("lang").textContent=ysdk.environment.i18n.lang;
        ysdk.features.LoadingAPI?.ready();
        while (document.getElementById("lang").textContent == "Language") {
            console.log("Language loading");
            sleep(20);
        }
        loadFunction();

    })

    .catch(console.error);

    
}


function loadFunction() {
    
	document.getElementById("helper").textContent=setText("Помощь","Help");

	 var d= document.createElement("div");
                    d.className=d.className+'alert';
                    d.id='init_menu';
                    d.style.height="40vw";
                    d.style.width="50vh";
                    d.style.display="table";
                    d.style.margin="0";

                    var h1 = document.createElement("h1");
                    h1.textContent=setText("Задайте параметры игры","Choose game params");
                    h1.style.fontSize="2vw";
                    h1.style.align="center";
                    h1.style.width="50vw";
                    h1.style.margin="0";
                    d.appendChild(h1);

                    var p1=document.createElement("p");
                    d.appendChild(p1);
                    p1.style.display="table-row";
                    
                    var l1 = document.createElement("label");
                    l1.innerHTML=setText("Вы обычно просыпаетесь:","Usually you get up...");
                    p1.appendChild(l1);
                    l1.style.display="table-cell";

                    var s1 = document.createElement("select");
                    s1.name="hours";
                    s1.id="timespan-select";
                    s1.style.display="table-cell";
                    
                    var o11=document.createElement("option");
                    o11.value="03";
                    o11.text=setText("Экстремально рано (до 3 часов)","Too early (before 3 AM)");
                    s1.appendChild(o11);

                    var o12=document.createElement("option");
                    o12.value="36";
                    o12.text=setText("Рано (до 6 часов)","Very early (before 6 AM)");
                    s1.appendChild(o12);

                    var o13=document.createElement("option");
                    o13.value="69";
                    o13.text=setText("Рановато (до 9 часов)","Early (before 9 AM)");
                    s1.appendChild(o13);

                    var o14=document.createElement("option");
                    o14.value="912";
                    o14.text=setText("Не спеша (до 12 часов)", "In no hurry (before noon)");
                    s1.appendChild(o14);

                    var o15=document.createElement("option");
                    o15.value="12plus";
                    o15.text=setText("Лениво (после полудня)", "Lazily (after noon)");
                    s1.appendChild(o15);

                    p1.appendChild(s1);

                    var p2=document.createElement("p");
                    d.appendChild(p2);
                    p2.style.display="table-row";

                    var l2 = document.createElement("label");
                    l2.innerHTML=setText("Сколько будильников вы ставите:", "How many alarms do you set?");
                    p2.appendChild(l2);
                    l2.style.display="table-cell";

                    var s2 = document.createElement("select");
                    s2.name="initalarms";
                    s2.id="initalarms-select";
                    s2.style.display="table-cell";
                    
                    var o21=document.createElement("option");
                    o21.value="5";
                    o21.text=setText("До 5","Up to 5");
                    s2.appendChild(o21);

                    var o22=document.createElement("option");
                    o22.value="10";
                    o22.text=setText("До 10","Up to 10");
                    s2.appendChild(o22);

                    var o23=document.createElement("option");
                    o23.value="15";
                    o23.text=setText("До 15", "Up to 15");
                    s2.appendChild(o23);

                    var o24=document.createElement("option");
                    o24.value="20";
                    o24.text=setText("До 20","Up to 20");
                    s2.appendChild(o24);
                    
                    p2.appendChild(s2);

                    var p3=document.createElement("p");
                    d.appendChild(p3);
                    p3.style.display="table-row";

                    var l3 = document.createElement("label");
                    l3.innerHTML=setText("Вам хватает:", "To get up, you need...");
                    p3.appendChild(l3);
                    l3.style.display="table-cell";

                    var s3 = document.createElement("select");
                    s3.name="curralarms";
                    s3.id="curralarms-select";
                    s3.style.display="table-cell";
                    
                    var o31=document.createElement("option");
                    o31.value="1";
                    o31.text=setText("Одного прозвонившего будильника", "One alarm clock");
                    s3.appendChild(o31);

                    var o32=document.createElement("option");
                    o32.value="2";
                    o32.text=setText("Двух прозвонивших будильников", "Two alarm clocks");
                    s3.appendChild(o32);

                    var o33=document.createElement("option");
                    o33.value="5";
                    o33.text=setText("Пяти прозвонивших будильников","Five alarm clocks");
                    s3.appendChild(o33);

                    var o34=document.createElement("option");
                    o34.value="10";
                    o34.text=setText("Десяти прозвонивших будильников","Ten alarm clocks");
                    s3.appendChild(o34);
                    
                    p3.appendChild(s3);

                    var b = document.createElement("button");
                    b.className+="button";
                    b.style.width="25vw";
                    b.style.height="5vw";
                    b.style.fontSize="3vw";
                    b.textContent=setText("Играть","Play");

                    b.onclick=function() {
                    	let timespan = document.getElementById('timespan-select').options[document.getElementById('timespan-select').selectedIndex].value;
                    	let setAlarms= document.getElementById('initalarms-select').options[document.getElementById('initalarms-select').selectedIndex].value;
                    	let ringAlarms=document.getElementById('curralarms-select').options[document.getElementById('curralarms-select').selectedIndex].value;
                    	document.getElementById("game").removeChild(document.getElementById('init_menu'));
                    	theField = new FieldOfSleep(timespan, setAlarms,ringAlarms);
						theField.init_field();
						theField.redraw();
                    }
                    d.appendChild(b);
             
                    document.getElementById("game").appendChild(d);

                YaGames.init()

    .then((ysdk) => {

        // Informing about starting the gameplay.

        ysdk.features.GameplayAPI?.start()



        // Gameplay is active.



        // Informing about stopping the gameplay:

        // player has entered menu, completed the level, or an ad is planned to be shown.

        

    });    
	
	
}

function showHelp() {


while (document.getElementById("game").firstChild) {
    				document.getElementById("game").removeChild(document.getElementById("game").lastChild);
    			}
	var d= document.createElement("div");
                    d.className=d.className+'alert';
                    d.id='helpstring';

                    d.style.display="block";
                    d.style.margin="0";
                    d.style.textAlign="left";
                    

                    var h1 = document.createElement("h1");
                    h1.textContent=setText("Как играть","How to play");
                    h1.style.fontSize="2vw";
                    h1.style.align="center";
                    h1.style.width="50vw";
                    h1.style.margin="0";
                    d.appendChild(h1);

                    var p4=document.createElement("p");
                    p4.textContent=setText("Ваша задача — проснуться в определенное время, но у вас взбесились будильники.", "You need to get up on time, but your alarms have gone mad.");
                    d.appendChild(p4);

                    var ol=document.createElement("ol");
                    d.appendChild(ol);

                    var li1=document.createElement("li");
                    li1.textContent=setText("Задайте параметры сложности: насколько рано вам нужно проснуться, сколько будильников вы готовы поставить с вечера и с которого будильника по счету обычно просыпаетесь.", "Specify the difficulty level, i. e. how early do you need to get up, how many alarm clocks you will set and how many alarms do you need to wake up.");
                    ol.appendChild(li1);

                    var li2=document.createElement("li");
                    li2.textContent=setText("Поставьте будильники на поле (сверху минуты, слева часы). Будильник ставится нажатием на клетку, а при повторном нажатии удаляется.","Set alarms on the field, with columns for minutes and rows for hours. One click on cell sets the alarm on that time, the second click removes it.");
                    ol.appendChild(li2);

                    var li3=document.createElement("li");
                    li3.textContent=setText("Наслаждайтесь сном!","Enjoy your sleep!");
                    ol.appendChild(li3);

                    var p5=document.createElement("p");
                    p5.textContent=setText("Будильники перемещаются по алгоритму «Игры в жизнь». Прошлое неизменно: часть поля, отвечающая за уже прошедшее время, не эволюционирует.","Alarms move by rules of the famous Game of Life. The past is unchanged: if the time in cell is already past, the cell doesn't evolve.");
                    d.appendChild(p5);

                    var btn2 = document.createElement("button");
                           //btn.setAttribute("value",i+'_'+j);
                           btn2.className = btn2.className + "button";
                           btn2.textContent=setText("Ага","Ok");
                           btn2.onclick = function() {document.getElementById("helpstring").parentNode.removeChild(document.getElementById("helpstring")); loadFunction();};
                    d.appendChild(btn2);


                    document.getElementById("game").appendChild(d);

}