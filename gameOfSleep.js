
function loadFunction() {

	 var d= document.createElement("div");
                    d.className=d.className+'alert';
                    d.id='init_menu';
                    d.style.height="500px";
                    d.style.width="500px";
                    d.style.display="table";

                    var h1 = document.createElement("h1");
                    h1.textContent="Задайте параметры игры";
                    h1.style.fontSize="22px";
                    h1.style.align="center";
                    h1.style.width="500px";
                    d.appendChild(h1);

                    var p1=document.createElement("p");
                    d.appendChild(p1);
                    
                    var l1 = document.createElement("label");
                    l1.innerHTML="Вы обычно просыпаетесь:";
                    p1.appendChild(l1);

                    var s1 = document.createElement("select");
                    s1.name="hours";
                    s1.id="timespan-select";
                    
                    var o11=document.createElement("option");
                    o11.value="03";
                    o11.text="Экстремально рано (до 3 часов)";
                    s1.appendChild(o11);

                    var o12=document.createElement("option");
                    o12.value="36";
                    o12.text="Рано (до 6 часов)";
                    s1.appendChild(o12);

                    var o13=document.createElement("option");
                    o13.value="69";
                    o13.text="Рановато (до 9 часов)";
                    s1.appendChild(o13);

                    var o14=document.createElement("option");
                    o14.value="912";
                    o14.text="Не спеша (до 12 часов)";
                    s1.appendChild(o14);

                    var o15=document.createElement("option");
                    o15.value="12plus";
                    o15.text="Лениво (после полудня)";
                    s1.appendChild(o15);

                    p1.appendChild(s1);

                    var p2=document.createElement("p");
                    d.appendChild(p2);

                    var l2 = document.createElement("label");
                    l2.innerHTML="Сколько будильников вы ставите:";
                    p2.appendChild(l2);

                    var s2 = document.createElement("select");
                    s2.name="initalarms";
                    s2.id="initalarms-select";
                    
                    var o21=document.createElement("option");
                    o21.value="5";
                    o21.text="До 5";
                    s2.appendChild(o21);

                    var o22=document.createElement("option");
                    o22.value="10";
                    o22.text="До 10";
                    s2.appendChild(o22);

                    var o23=document.createElement("option");
                    o23.value="15";
                    o23.text="До 15";
                    s2.appendChild(o23);

                    var o24=document.createElement("option");
                    o24.value="20";
                    o24.text="До 20";
                    s2.appendChild(o24);
                    
                    p2.appendChild(s2);

                    var p3=document.createElement("p");
                    d.appendChild(p3);

                    var l3 = document.createElement("label");
                    l3.innerHTML="Вам хватает:";
                    p3.appendChild(l3);

                    var s3 = document.createElement("select");
                    s3.name="curralarms";
                    s3.id="curralarms-select";
                    
                    var o31=document.createElement("option");
                    o31.value="1";
                    o31.text="Одного прозвонившего будильника";
                    s3.appendChild(o31);

                    var o32=document.createElement("option");
                    o32.value="2";
                    o32.text="Двух прозвонивших будильников";
                    s3.appendChild(o32);

                    var o33=document.createElement("option");
                    o33.value="5";
                    o33.text="Пяти прозвонивших будильников";
                    s3.appendChild(o33);

                    var o34=document.createElement("option");
                    o34.value="10";
                    o34.text="Десяти прозвонивших будильников";
                    s3.appendChild(o34);
                    
                    p3.appendChild(s3);

                    var b = document.createElement("button");
                    b.className+="button";
                    b.style.width="100px";
                    b.style.height="40px";
                    b.style.fontSize="20px";
                    b.textContent="Играть";

                    b.onclick=function() {
                    	console.log("I was clicked");
                    	let timespan = document.getElementById('timespan-select').options[document.getElementById('timespan-select').selectedIndex].value;
                    	let setAlarms= document.getElementById('initalarms-select').options[document.getElementById('initalarms-select').selectedIndex].value;
                    	let ringAlarms=document.getElementById('curralarms-select').options[document.getElementById('curralarms-select').selectedIndex].value;
                    	document.body.removeChild(document.getElementById('init_menu'));
                    	theField = new FieldOfSleep(timespan, setAlarms,ringAlarms);
						theField.init_field();
						theField.redraw();
                    }
                    d.appendChild(b);
             
                    document.body.appendChild(d);

                    
                
	
	
}