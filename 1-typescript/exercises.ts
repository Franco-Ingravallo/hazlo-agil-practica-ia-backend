//Ejercicio 1: Tipos básicos
const nombre: string = "Pablo";
let edad: number = 7;
const genero: boolean = true;

console.log(nombre, edad, genero);

//Ejercicio 2: Interfaces
interface Cliente {
    Nombre: string;
    email: string;
    riesgo: 'Bajo'| 'Medio'| 'Alto';
    saldo: number;
}

const cliente1: Cliente = {
    Nombre:"Pedro Zuniga",
    email:"pZuniga@nem.co",
    riesgo: "Bajo",
    saldo: 300
};

console.log(cliente1);



//Ejercicio 3: Generics
function getFirstElement<T>(arr: T[]): T | undefined {
    return arr[0];
}


const numeros: number[] = [1, 2, 3];
const primero = getFirstElement(numeros);

const texto: string[] = ["a", "b", "c"];
const primertexto = getFirstElement(texto);

console.log(primero, primertexto);