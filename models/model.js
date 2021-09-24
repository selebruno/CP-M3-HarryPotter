
///==========================================================================///
///===============================HENRY-POTTER===============================///
///==========================================================================///

'use strict';

var characters = []; 

var houses = []; 



module.exports = {
  reset: function () {
    // No es necesario modificar esta función (Ya está completa)
    characters = [];
    houses = [];
  },
  // ==== COMPLETEN LAS SIGUIENTES FUNCIONES (vean los test de `model.js`) =====
  listCharacters: function (house, fullName) {
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
    // Agrega un nuevo personaje, inicialmente su propiedad wand (varita) debe ser un objeto vacío
    // Adicionalmente va a ser necesario guardar, en su propiedad houseId, el número (id) de la casa y no su nombre 
    // (que es lo que recibimos por parámetros)
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
    return filterCharacter2[0].wand.wood ? filterCharacter2[0].wand : "el personaje no tiene varita"
    }
    return filterCharacter2
  
  },

};