/* eslint-disable no-unused-expressions */

var expect = require('chai').expect;

// importo la lista de 'to do's'
var Model = require('../models/model');
describe('Model', function() {

  // cada uno de los test arranca con una nueva lista (todos.js)
  beforeEach(function() {
    Model.reset();
  });

  describe('addFamily` and `listFamilies`', function() {
    it('Inicialmente devuelve un arreglo de familias vacío', function() {
      expect(Model.listFamilies()).to.eql([]);
    });

    it('Agrega familias a la lista', function() {
      Model.addFamily('Simpsons');
      expect(Model.listFamilies()).to.have.length(1);
      Model.addFamily('Gorgory');
      expect(Model.listFamilies()).to.have.length(2);
    });

    it('Si la familia ya existe no se agrega a la lista', function() {
      Model.addFamily('Simpsons');
      expect(Model.listFamilies()).to.have.length(1);
      Model.addFamily('Gorgory');
      expect(Model.listFamilies()).to.have.length(2);
      Model.addFamily('Gorgory');
      expect(Model.listFamilies()).to.have.length(2);
    });

  });

  describe('`addCharacter` y `listCharacter`', function() {
    it('Inicialmente devuelve un arreglo vacío', function() {
      expect(Model.listCharacter()).to.eql([]);
    });

    it('Agrega personajes al arreglo', function() {
      Model.addFamily('Simpsons');
      Model.addCharacter('Homero', 36, "Simpsons");
      expect(Model.listCharacter()).to.have.length(1);
      Model.addCharacter('Bart', 10, "Simpsons");
      expect(Model.listCharacter()).to.have.length(2);
    });

    it('Inicialmente las frases del personajes deben estar vacias', function() {
      Model.addFamily('Simpsons');
      Model.addCharacter('Homero', 36, "Simpsons");
      expect(Model.listCharacter()).to.have.length(1);
      expect(Model.listCharacter()[0].quotes).to.eql([]);
    });

    it('Agrega correctamente la edad del personaje', function() {
      Model.addFamily('Simpsons');
      Model.addCharacter('Homero', 36, "Simpsons");
      expect(Model.listCharacter()).to.have.length(1);
      expect(Model.listCharacter()[0].age).to.eql(36);
      Model.addCharacter('Bart', 10, "Simpsons");
      expect(Model.listCharacter()).to.have.length(2);
      expect(Model.listCharacter()[1].age).to.eql(10);
    });

    it('Agrega correctamente la familia del personaje mediante el indice en el arreglo de familias', function() {
      Model.addFamily('Simpsons');
      Model.addFamily('Gorgory');
      Model.addCharacter('Homero', 36, "Simpsons");
      expect(Model.listCharacter()).to.have.length(1);
      expect(Model.listCharacter()[0].familyId).to.eql(1);
      Model.addCharacter('Rafa', 10, "Gorgory");
      expect(Model.listCharacter()).to.have.length(2);
      expect(Model.listCharacter()[1].familyId).to.eql(2);
    });

    it('Si no se provee un nombre de familia valido no se agrega al arreglo', function() {
      Model.addFamily('Simpsons');
      Model.addFamily('Gorgory');
      Model.addCharacter('Homero', 36, "Flanders");
      expect(Model.listCharacter()).to.have.length(0);
    });

    it('Si recibe un nombre de familia como parámetro debería filtrar solo los personajes de ella', function() {
      Model.addFamily('Simpsons');
      Model.addFamily('Gorgory');
      Model.addCharacter('Homero', 36, "Simpsons");
      Model.addCharacter('Bart', 10, "Simpsons");
      Model.addCharacter('Rafa', 10, "Gorgory");
      expect(Model.listCharacter('Simpsons')).to.have.length(2);
      expect(Model.listCharacter('Simpsons')[0].name).to.eql("Homero");
      expect(Model.listCharacter('Simpsons')[1].name).to.eql("Bart");
      expect(Model.listCharacter('Gorgory')).to.have.length(1);
      expect(Model.listCharacter('Gorgory')[0].name).to.eql("Rafa");
    });

    it('Si recibe un segundo parámetro en true debe devolver únicamente los nombres de los personajes', function() {
      Model.addFamily('Simpsons');
      Model.addFamily('Gorgory');
      Model.addCharacter('Homero', 36, "Simpsons");
      Model.addCharacter('Bart', 10, "Simpsons");
      Model.addCharacter('Rafa', 10, "Gorgory");
      expect(Model.listCharacter('Simpsons', true)).to.have.length(2);
      expect(Model.listCharacter('Simpsons', true)[0]).to.eql("Homero");
      expect(Model.listCharacter('Simpsons', true)[1]).to.eql("Bart");
      expect(Model.listCharacter('Gorgory', true)).to.have.length(1);
      expect(Model.listCharacter('Gorgory', true)[0]).to.eql("Rafa");
    });
  });

  describe('`showQuotes` y `addQuote`', function() {
    it('Inicialmente devuelve un arreglo vacío', function() {
      Model.addFamily('Simpsons');
      Model.addCharacter('Homero', 36, "Simpsons");
      expect(Model.showQuotes('Homero')).to.eql([]);
    });

    it('Agrega una frase al personaje', function() {
      Model.addFamily('Simpsons');
      Model.addCharacter('Homero', 36, "Simpsons");
      Model.addQuote('Homero', {text: 'Que no panda el cunico'});
      expect(Model.showQuotes('Homero')).to.have.length(1);
      expect(Model.showQuotes('Homero')[0].text).to.eql('Que no panda el cunico');
      Model.addQuote('Homero', {text: 'Soy intelectual, muy inteligente'});
      expect(Model.showQuotes('Homero')).to.have.length(2);
      expect(Model.showQuotes('Homero')[1].text).to.eql('Soy intelectual, muy inteligente');
    });

    it('Si no se le pasa texto o es un string vacio no se agrega la frase al personaje', function() {
      Model.addFamily('Simpsons');
      Model.addCharacter('Homero', 36, "Simpsons");
      Model.addQuote('Homero', {});
      expect(Model.showQuotes('Homero')).to.have.length(0);
      Model.addQuote('Homero', {text: ''});
      expect(Model.showQuotes('Homero')).to.have.length(0);
    });

    it('Devuelve un arreglo vacío si el personaje no existe', function() {
      Model.addFamily('Simpsons');
      Model.addCharacter('Homero', 36, "Simpsons");
      Model.addQuote('Homero', {text: 'Que no panda el cunico'});
      expect(Model.showQuotes('Bart')).to.have.length(0);
    });

    it('Setea la temporada de la frase y si no es especificada se coloca en false', function() {
      Model.addFamily('Simpsons');
      Model.addCharacter('Homero', 36, "Simpsons");
      Model.addQuote('Homero', {text: 'Que no panda el cunico', season: 14});
      expect(Model.showQuotes('Homero')).to.have.length(1);
      expect(Model.showQuotes('Homero')[0].text).to.eql('Que no panda el cunico');
      expect(Model.showQuotes('Homero')[0].season).to.eql(14);
      Model.addQuote('Homero', {text: 'Miiiiiiilhooooooooouse'});
      expect(Model.showQuotes('Homero')).to.have.length(2);
      expect(Model.showQuotes('Homero')[1].text).to.eql('Miiiiiiilhooooooooouse');
      expect(Model.showQuotes('Homero')[1].season).to.be.false;
    });

  });

});
