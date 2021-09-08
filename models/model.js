/* 'use strict';

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
}; */

///==========================================================================///
///===============================HENRY-POTTER===============================///
///==========================================================================///

'use strict';

var characters = []; // arreglo de personajes de cada familia {'Homero', 36, "Simpsons"}

var houses = []; //arreglo de familias ['Simpsons'[{'Homero', 36, "Simpsons"},{'Bart', 10, "Simpsons"}], 'Gorgory'[{'Rafa', 10, "Gorgory"}]]


//hola fede 

// ruta que liste a la gente mágica solamente
// ruta que traiga solo a los personajes que tengan spells
// hacer el addWand
// hacer el showWand


module.exports = {
  reset: function () {
    // No es necesario modificar esta función (Ya está completa)
    characters = [];
    houses = [];
  },
  // ==== COMPLETEN LAS SIGUIENTES FUNCIONES (vean los test de `model.js`) =====
  listCharacter: function (house, fullName) {
    // Devuelve un arreglo con todos los personajes
    // Si recibe un nombre de house como parámetro debería filtrar solo los personajes de ella
    // Si recibe un segundo parámetro en true debe devolver únicamente los nombres y apellidos de los personajes
    let names = [];
    if (house && fullName) { 
      characters.filter(character => {
        if (character.houseId === houses.indexOf(house) + 1) { 
          names.push(character.name + " " + character.lastName)
        }
      })
      return names;
    } else if (house) { 
      characters.filter(character => {
        if (character.houseId === houses.indexOf(house) + 1) {
          names.push(character)
        }
      })
      return names;
    } else {

      return characters;
    }

  },
  addHouse: function (house) {
    // Agrega el nombre de una nueva casa verificando que no exista
    // Debe retornar el nombre de la casa agregado o existente
    if (!houses.includes(house)) {
      houses.push(house)
      return house;
    }
    return house;
  },
  listHouses: function () {
    // Devuelve un arreglo con todas las casas
    return houses;
  },

  addCharacter: function (name, lastName, house, dateOfBirth, isMuggle) {
    // Agrega un nuevo personaje, inicialmente su propiedad wand (varitas) debe ser un objeto vacío
    // Adicionalmente va a ser necesario guardar, en su propiedad houseId, el número (id) de la casa y no su nombre 
    // (que es lo que recibimos por parametros)
    // El número de casa debe empezar desde 1 y no desde 0.
    // su propiedad spells (hechizos) será inicialmente un arreglo vacío
    // su propiedad yearOfBirth debe ser un número (pista: podemos sacarla de dateOfBirth)
    // si el nombre de la casa no esta en el arreglo de casas: 
    // no debe agregarse el personaje al arreglo de personajes y debe devolver un objeto con un mensaje de error,
    // (mirar en los tests)
    // Si la casa existe y el personaje es agregado con éxito debe retornar el personaje creado
    let wand = {}
    let houseId = houses.indexOf(house) + 1
    let spells = [];
    let yearOfBirth = Number(dateOfBirth.slice(-4))
    let newCharacter = {
      name,
      houseId,
      lastName,
      dateOfBirth,
      yearOfBirth,
      isMuggle,
      wand,
      spells
    }
    if (houses.includes(house)) {
      characters.push(newCharacter)
      return newCharacter;
    }else{
      return {msg: 'La casa ingresada no existe'}
    }
  },

  addSpell: function (name, id, spellName, description) {
    // recibe el nombre de un personaje, id del hechizo, nombre del hechizo y descripción del hechizo
    // debe encontrar en el arreglo de personajes al personaje que matchee con el nombre
    // recibido por parametro y debe agregar a su propiedad spells un nuevo objeto hechizo de la forma: 
    //{id: id, spellName: spellName, description: description}
    // una vez agregado el hechizo debe retornar un objeto con un mensaje de éxito (ver el test de las rutas)
    // Si no se le pasa id, spellName o description no agrega el hechizo al personaje

    if(!id || !spellName || !description) return

    let filterCharacter = characters.filter(character => character.name === name);
    if (!description) description = false
    filterCharacter[0].spells.push({
      id,
      spellName,
      description
    });
    return {msg: "Hechizo agregado correctamente"};
  },

  showSpells: function (name) {
    // Devuelve todos los hechizos de un personaje en particular
    // Si no encuentra al personaje que matchee con el nombre recibido por parámetros
    // devuelve un arreglo vacío
    let filterCharacter2 = characters.filter(character => character.name === name);
    if (filterCharacter2.length > 0) {
      return filterCharacter2[0].spells;
    }
    return filterCharacter2;
  },

  addWand: function (name, wood, core, length) {
    // Recibe : nombre de personaje (name), material de la varita (wood), núcleo de la varita (core) y largo de la varita (length)
    // Debe encontrar el personaje que matchee con el nombre recibido
    // Si no encuentra ningun personaje que matchee debe devolver un arreglo vacío
    // Si lo encuentra pero ese personaje YA TIENE asignada una varita en su propiedad "wand" debe devolver el siguiente string:
    // "Ya existe una varita para este personaje"
    // caso contrario debe agregar a la propiedad wand del personaje un objeto de la siguiente forma
    // {wood: wood, core: core, length: length}
    let filterCharacter = characters.filter(character => character.name === name);
    if (filterCharacter.length === 0) return filterCharacter
    if (!filterCharacter[0].wand.wood) {
      filterCharacter[0].wand= {
        wood,
        core,
        length
      };
      return "varita agregada correctamente"
    } else {
      return "Ya existe una varita para este personaje"
    }
  },
  
  showWand: function (name) {
    // Devuelve la varita de un personaje en particular
    // Si no encuentra al personaje que matchee con el nombre recibido por parámetros devuelve un arreglo vacío
    // Si el personaje en cuestión no tiene varita devuelve el string "el personaje no tiene varita"
    let filterCharacter2 = characters.filter(character => character.name === name);
    if (filterCharacter2.length > 0) {
    return filterCharacter2[0].wand.wood ? filterCharacter2[0].wand : "el personaje no tiene varita";
    }
    return filterCharacter2;
  },


};