//Ejercicio 1: Tipos básicos
var nombre = "Pablo";
var edad = 7;
var genero = true;
console.log(nombre, edad, genero);
var cliente1 = {
    Nombre: "Pedro Zuniga",
    email: "pZuniga@nem.co",
    riesgo: "Bajo",
    saldo: 300
};
console.log(cliente1);
//Ejercicio 3: Generics
function getFirstElement(arr) {
    return arr[0];
}
var numeros = [1, 2, 3];
var primero = getFirstElement(numeros);
var texto = ["a", "b", "c"];
var primertexto = getFirstElement(texto);
console.log(primero, primertexto);
