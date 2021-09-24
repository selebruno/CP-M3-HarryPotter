/* eslint-disable no-unused-expressions */



  ///==========================================================================///
 ///===============================HENRY-POTTER===============================///
///===================================TESTS==================================///

var expect = require('chai').expect;

// importo las funciones que voy a testear'
var Model = require('../models/model');
describe('Model', function() {

  // cada uno de los test arranca con characters y houses vacíos.
  beforeEach(function() {
    Model.reset();
  });

  describe('addHouse` and `listHouses`', function() {
    it('Inicialmente devuelve un arreglo de casas vacío', function() {
      expect(Model.listHouses()).to.eql([]);
    });

    it('Agrega casas a la lista', function() {
      Model.addHouse("Gryffindor");
      expect(Model.listHouses()).to.have.length(1);
      Model.addHouse("Slytherin");
      expect(Model.listHouses()).to.have.length(2);
    });

    it('Si la casa ya existe no se agrega a la lista', function() {
      Model.addHouse("Gryffindor");
      expect(Model.listHouses()).to.have.length(1);
      Model.addHouse("Slytherin");
      expect(Model.listHouses()).to.have.length(2);
      Model.addHouse("Slytherin");
      expect(Model.listHouses()).to.have.length(2);
    });

  });

  describe('`addCharacter` y `listCharacters`', function() {
    it('Inicialmente devuelve un arreglo vacío', function() {
      expect(Model.listCharacters()).to.eql([]);
    });

    it('Agrega personajes al arreglo', function() {
      Model.addHouse("Gryffindor");
      Model.addCharacter("Harry", "Potter", "Gryffindor","31-07-1980",false);
      expect(Model.listCharacters()).to.have.length(1);
      Model.addCharacter("Ginny", "Weasley", "Gryffindor","11-08-1981",false);
      expect(Model.listCharacters()).to.have.length(2); 
    });

    it('Inicialmente las varitas de los personajes deben ser objetos vacios', function() {
      Model.addHouse("Gryffindor");
      Model.addCharacter("Harry", "Potter", "Gryffindor","31-07-1980",false);
      expect(Model.listCharacters()).to.have.length(1);
      expect(Model.listCharacters()[0].wand).to.eql({});
      Model.addHouse("Slytherin");
      Model.addCharacter("Draco", "Malfoy", "Slytherin","26-07-1990",false);
      expect(Model.listCharacters()).to.have.length(2);
      expect(Model.listCharacters()[1].wand).to.eql({});
    });

    it('Debe guardar el número (id) de la casa y no su nombre', function() {
      Model.addHouse("Gryffindor");
      Model.addCharacter("Harry", "Potter", "Gryffindor","31-07-1980",false);
      expect(Model.listCharacters()).to.have.length(1);
      expect(Model.listCharacters()[0].houseId).to.eql(1);
      Model.addHouse("Slytherin");
      Model.addCharacter("Fede", "Panella", "Slytherin","26-07-1990",false);
      expect(Model.listCharacters()).to.have.length(2);
      expect(Model.listCharacters()[1].houseId).to.eql(2);
    });

    it('su propiedad spells (hechizos) será inicialmente un arreglo vacío', function() {
      Model.addHouse("Gryffindor");
      Model.addCharacter("Harry", "Potter", "Gryffindor","31-07-1980",false);
      expect(Model.listCharacters()).to.have.length(1);
      expect(Model.listCharacters()[0].spells).to.eql([]);
      Model.addHouse("Slytherin");
      Model.addCharacter("Draco", "Malfoy", "Slytherin","26-07-1990",false);
      expect(Model.listCharacters()).to.have.length(2);
      expect(Model.listCharacters()[1].spells).to.eql([]);
    });
    it('su propiedad yearOfBirth debe ser un número', function() {
      Model.addHouse("Gryffindor");
      Model.addCharacter("Harry", "Potter", "Gryffindor","31-07-1980",false);
      expect(Model.listCharacters()).to.have.length(1);
      expect(Model.listCharacters()[0].yearOfBirth).to.eql(1980);
      Model.addHouse("Slytherin");
      Model.addCharacter("Draco", "Malfoy", "Slytherin","26-07-1990",false);
      expect(Model.listCharacters()).to.have.length(2);
      expect(Model.listCharacters()[1].yearOfBirth).to.eql(1990);
    });

    it('Si no se provee un nombre de casa válido no se agrega al arreglo', function() {
      Model.addHouse("Gryffindor");
      Model.addCharacter("Draco", "Malfoy", "Slytherin","26-07-1990",false);
      expect(Model.listCharacters()).to.have.length(0);
    });

    it('Si recibe un nombre de casa como parámetro debería filtrar solo los personajes de ella', function() {
      Model.addHouse("Gryffindor");
      Model.addHouse("Slytherin");
      Model.addCharacter("Harry", "Potter", "Gryffindor","31-07-1980",false);
      Model.addCharacter("Hermione", "Granger", "Gryffindor","06-12-1987",false);
      Model.addCharacter("Draco", "Malfoy", "Slytherin","26-07-1990",false);
      expect(Model.listCharacters('Gryffindor')).to.have.length(2);
      expect(Model.listCharacters('Gryffindor')[0].name).to.eql("Harry");
      expect(Model.listCharacters('Gryffindor')[1].name).to.eql("Hermione");
      expect(Model.listCharacters('Slytherin')).to.have.length(1);
      expect(Model.listCharacters('Slytherin')[0].name).to.eql("Draco");
    });

    it('Si recibe un segundo parámetro en true debe devolver únicamente los nombres y apellidos de los personajes', function() {
      Model.addHouse("Gryffindor");
      Model.addHouse("Slytherin");
      Model.addCharacter("Harry", "Potter", "Gryffindor","31-07-1980",false);
      Model.addCharacter("Hermione", "Granger", "Gryffindor","06-12-1987",false);
      Model.addCharacter("Draco", "Malfoy", "Slytherin","26-07-1990",false);
      expect(Model.listCharacters('Gryffindor', true)).to.have.length(2);
      expect(Model.listCharacters('Gryffindor', true)[0]).to.eql("Harry Potter");
      expect(Model.listCharacters('Gryffindor', true)[1]).to.eql("Hermione Granger");
      expect(Model.listCharacters('Slytherin', true)).to.have.length(1);
      expect(Model.listCharacters('Slytherin', true)[0]).to.eql("Draco Malfoy");
    });
  });

  describe('`showSpells` y `addSpell`', function() {
    it('Inicialmente devuelve un arreglo vacío', function() {
      Model.addHouse("Gryffindor");
      Model.addCharacter("Harry", "Potter", "Gryffindor","31-07-1980",false);
      expect(Model.showSpells('Harry')).to.eql([]);
    });

    it('Agrega un hechizo al personaje', function() {
      Model.addHouse("Gryffindor");
      Model.addCharacter("Harry", "Potter", "Gryffindor","31-07-1980",false);
      Model.addSpell('Harry', 1, "Kadabra", "es mágico");
      expect(Model.showSpells('Harry')).to.have.length(1);
      expect(Model.showSpells('Harry')[0].description).to.eql('es mágico');
      Model.addSpell('Harry', 2, "otro", "levita");
      expect(Model.showSpells('Harry')).to.have.length(2);
      expect(Model.showSpells('Harry')[1].description).to.eql('levita');
    });

    it('Devuelve un arreglo vacío si el personaje no existe', function() {
      Model.addHouse("Gryffindor");
      Model.addCharacter("Harry", "Potter", "Gryffindor","31-07-1980",false);
      Model.addSpell('Harry', 1, "Kadabra", "es mágico");
      expect(Model.showSpells('Fede')).to.have.length(0);
    });

    it('Si no se le pasa id, spellName o description no agrega el hechizo al personaje', function() {
      Model.addHouse("Gryffindor");
      Model.addCharacter("Harry", "Potter", "Gryffindor","31-07-1980",false);
      Model.addSpell('Harry', 1, "Kadabra");
      expect(Model.showSpells('Harry')).to.have.length(0);
      Model.addSpell('Harry');
      expect(Model.showSpells('Harry')).to.have.length(0);
      Model.addSpell('Harry', null, "Kadabra", "es mágico");
      expect(Model.showSpells('Harry')).to.have.length(0);
      Model.addSpell('Harry', 1, null, "es mágico");
      expect(Model.showSpells('Harry')).to.have.length(0);
    });

  })

  describe('`showWand` y `addWand`', function() {
    it('Inicialmente devuelve el string "el personaje no tiene varita"', function() {
      Model.addHouse("Gryffindor");
      Model.addCharacter("Harry", "Potter", "Gryffindor","31-07-1980",false);
      expect(Model.showWand('Harry')).to.eql("el personaje no tiene varita");
    });

    it('Agrega una varita al personaje', function() {
      Model.addHouse("Gryffindor");
      Model.addCharacter("Harry", "Potter", "Gryffindor","31-07-1980",false);
      Model.addWand('Harry', "holly", "phoenix feather", 11);
      expect(Model.showWand('Harry').wood).to.eql('holly');
      expect(Model.showWand('Harry').core).to.eql('phoenix feather');
      expect(Model.showWand('Harry').length).to.eql(11);
    });

    it('Devuelve el string: "Ya existe una varita para este personaje" si el personaje ya tiene varita', function() {
      Model.addHouse("Gryffindor");
      Model.addCharacter("Harry", "Potter", "Gryffindor","31-07-1980",false);
      Model.addWand('Harry', "holly", "phoenix feather", 11);
      expect(Model.addWand('Harry', "otro", "levita",22)).to.eql('Ya existe una varita para este personaje');
    });

    it('Devuelve un arreglo vacío si el personaje no existe', function() {
      Model.addHouse("Gryffindor");
      Model.addCharacter("Harry", "Potter", "Gryffindor","31-07-1980",false);
      Model.addWand('Harry', "holly", "phoenix feather", 11);
      expect(Model.showWand('Fede')).to.have.length(0);
    });

  })

  });
 
