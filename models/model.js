'use strict';

var characters = []; // arreglo de personajes de cada familia {'Homero', 36, "Simpsons"}

var families = []; //arreglo de familias ['Simpsons'[{'Homero', 36, "Simpsons"},{'Bart', 10, "Simpsons"}], 'Gorgory'[{'Rafa', 10, "Gorgory"}]]


//hola fede

module.exports = {
  reset: function () {
    // No es necesario modificar esta función (Ya está completa)
    characters = [];
    families = [];
  },
  // ==== COMPLETEN LAS SIGUIENTES FUNCIONES (vean los test de `model.js`) =====
  listCharacter: function (family, pluckName) {
    // Devuelve un arreglo con todos los personajes
    // Si recibe un nombre de familia como parámetro debería filtrar solo los personajes de ella
    // Si recibe un segundo parámetro en true debe devolver únicamente los nombres de los personajes
    let names = [];
    if (family && pluckName) {  //SI RECIBE UN SEGUNDO PARAMETRO FILTRO EL ARRAY DE CHARACTERS Y DEVUELVO NAMES CON LOS NOMBRES DE LOS PERSONAJES
      characters.filter(character => {
        if (character.familyId === families.indexOf(family)+1) { //Aca paso el id porque el character no tiene una prop family
          names.push(character.name)
        }
      })
      return names;
    } else if (family) { //sino le mando los personajes de family que matcheen
      characters.filter(character => {
        if (character.familyId === families.indexOf(family)+1) {
          names.push(character)
        }
      })
      return names;
    } else {

      return characters;
    }

  },
  addFamily: function (name) {
    // Agrega el apellido de una nueva familia verificando que no exista
    // Debe retornar el nombre de la familia agregado o existente
    if (!families.includes(name)) {
      families.push(name)
      return name;
    }
  return families;
  },
  listFamilies: function () {
    // Devuelve un arreglo con todas las familias
    return families;
  },
  addCharacter: function (name, age, family) {
    // Agrega un nuevo personaje, inicialmente sus frases (quotes) deben estar "vacias"
    // Adicionalmente va a ser necesario guardar el número de familia y no su nombre !!!!!
    // El número de familia debe empezar desde 1 y no desde 0.
    // Debe retornar el personaje creado
    let familyId = families.indexOf(family) + 1
    let quotes = [];
    let newCharacter = {
      name,
      age,
      quotes,
      familyId
    }
    if (families.includes(family)) {
      characters.push(newCharacter)
      return newCharacter;
    }
  },
  addQuote: function (name, quote) {
    // Agrega una nueva frase a un personaje en particular con el formato:
    // {text: "Este es el texto de la frase", season: 3} // 
    // QUOTE === OBJETOS CON PROPIEDADES TEXT Y SEASON
    //QUOTES ES UN ARREGLO SETEADO COMO PROPIEDAD DEL CHARACTER
    let filterCharacter = characters.filter (character => character.name === name);
    if (quote.text){
      if (!quote.season) {
     quote.season = false;
 }
 filterCharacter[0].quotes.push(quote);
    }
  },

  showQuotes: function (name) {
    // Devuelve todas las frases de un personaje en particular
    let filterCharacter2 = characters.filter (character => character.name === name);
    if (filterCharacter2.length>0){ 
    return filterCharacter2[0].quotes;
}
return filterCharacter2;
  }
};