let saludos = (persona: string)=>{
    return "hola, " + persona;
}
let usuario:string = "Marcos";
let sentencia = "Mi nombres es ".concat(usuario);
console.log(sentencia);
document.body.innerHTML = saludos(usuario);
export{};