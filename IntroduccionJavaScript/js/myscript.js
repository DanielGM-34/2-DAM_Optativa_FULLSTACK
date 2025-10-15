function $(selector){
    return document.querySelector(selector);
}

//alert("Hello World."); 
/*

console.log("Hola K ASE!");
console.warn("aviso.");
console.error("error.");


var table = "Normal Table"; //cosas grandes como formularios.
let chair = "One chair"; //cosas simples.

console.log(table);
console.log(chair);

console.log(window.chair);
console.log(window.table);


let testBoolean = true;
console.log(testBoolean);

let testString = "text";
console.log(testString);


console.log(testString.toUpperCase());

let testNumber = 10;
console.log(testNumber);

let testBooleanObject = new Boolean(true);
console.log(testBooleanObject);

let testStringObject = new String('text');
console.log(testStringObject);


let testNumberObject = new Number(10);
console.log(testNumberObject);

console.log(window.location.port);

console.log(`${chair}  ${table}`);

let name = "Jhon";
let surname = "Doe";
let question = "How are you " + name+ " " + surname + "?";
*/
/*
let answer = "He is " + age + " years old";
console.log(question);
console.log(answer);
*/

/*
let operador_a=3;
let operador_b=3;

let expo = operador_a ** operador_b;

let inc = ++operador_a;
let dec = --operador_a;
console.log(`${inc} ${dec}`);

console.log(typeof(testBoolean));

let testNull = null;
console.log(typeof(testNull));
/*
let undefined;
console.log(typeof(undefined));
*/

/*
var first_array = [];
var second_array = new Array(3);
var fourth_arry = new Array(3,5,"Seville", true,third_array);
console.log(first_array);
console.log(second_array);
console.log(third_array);
console.log(fourth_arry);

console.log(third_array[1]);
console.log(fourth_arry[3][1]);
fourth_arry.push("Spain");
console.log(fourth_arry[5]);

third_array[2] = 9;
console.log(third_array);

fourth_arry[1][2] = 8;
console.log(fourth_arry);

var array_final = new Array(second_array,third_array);

console.log(array_final);
*/

/*
var third_array = new Array(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20);
*/
/*
for normal
for (let index = 0; index < third_array.length; index++) {
    const element = third_array[index];
    console.log(element);
}
*/


//For inverso con variable dentro
/*
for(let i =third_array.length-1;i>0;i--){
    console.log(`Iteración de  ${third_array[i]}`);
} 
    */
/*
var iM= third_array.length-1;
*/

//For inverso con variable fuera

/*
for(;iM>0;iM--){
    console.log(`Iteración de  ${third_array[iM]}`);
}
    */

/*foreach*/

/*
third_array.forEach(function myFunction(item) {
  console.log(item); 
});



console.log(third_array.forEach(myFuntion(iteam)));
*/


let today = new Date();
let first_october = new Date(2025, 9, 1);
console.log(today);
console.log(first_october);
console.log(today.getDay());


if (today > first_october) {
    console.log("mayor");

}

else {
    console.log("menor");
}


function myFirstFunction(){
    console.log("Gracias")
}


function mySecondFunction(){
    console.log("Thank you for you interest")
}

function myThirstFunction(a){
console.log(`pesao ${a}`)
}

//SELECT DOM I
let div = document.getElementById("my_div");
div.classList.add("my_class");
console.log(div);

//SELECT DOM II
let div2= document.getElementsByTagName("div");
console.log(div2);

//SELECT DOM III
let div3= document.querySelector("#my_second_div");
console.log(div3);




console.log($("#my_second_div"));
console.log($(".my_class"));
console.log($((".pruebas")));
console.log($(("#btn")));

/*

siempre CLASS se accede con el .nombreClase


usamos id cuando es algo específico ejemplo inputs de formulario #nombreId
*/

var numbers = [1,2,3,4];
var n_elevator_2 = numbers.map((n) => {return n*n});
var n_elevator_2 = numbers.map(n=> n*n);


//Create DOM Nodes I

$("#btn").addEventListener("click", function () {
    var input = document.createElement("input");
    input.setAttribute("type", "email");
    input.setAttribute("placeholder", "E-mail");
    input.setAttribute("name", "emails[]");
    $("#form").appendChild(input);
    myAlert("<h2> Add new email input </h2>");

});

/*
function myAlert(msg) {
    var div = document.createElement("div");
    div.classList.add("alert");
    div.innerHTML = msg;
    $("body").insertBefore(div, $("body").firstChild);
    console.log($("body").children[1]);


}
*/

function bind_close(){
    let elements = document.querySelectorAll(".close");
    for (let i = elements.length-1;i>=0; i--) {
        let element = elements[i];
        element.addEventListener("click",function(){
            this.parentNode.style.display="none";
        });
        
    }
}

function myAlert(msg) {
    console.log($("body").children[1]);
    var div=document.createElement("div");
    div.classList.add("alert");
    div.innerHTML=msg;
    var close=document.createElement("span");
    close.style.float="right";
    close.classList.add("close");
    close.innerHTML="X";
    div.appendChild(close);
    $("body").insertBefore(div, $("body").firstChild);
    bind_close();
}
