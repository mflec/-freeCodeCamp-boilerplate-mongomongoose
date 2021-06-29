require('dotenv').config();


const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI);

const {Schema} = mongoose;

const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

const Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
const mili= new Person({name: 'Milagros', age: 24, favoriteFoods: ['Anything that is not meat']})
mili.save(function(err, data) {
    if (err) return console.error(err);
    done(null, data)
  });
};


const arrayOfPeople= [ {name: "Juan", age: 22, favoriteFoods: ["Anything except meat"]},
  {name: "Jere", age: 19, favoriteFoods: ["Burrito "]},
  {name: "Javier", age: 44, favoriteFoods: ["beer"]}
]

const createManyPeople= function(arrayOfPeople, done) {
  Person.create(arrayOfPeople, function (err, people) { //PROMISE
    if (err) return console.log(err);
    done(null, people);
  });
};

// The Object.create() method creates a new object, using
// an existing object as the prototype of the newly created object.


const findPeopleByName = (personName, done) => {
Person.find({name: personName}, function (err, people) { //PROMISE
    if (err) return console.log(err);
    done(null, people);
  })
};

//Model.findOne()se comporta como Model.find(), pero 
//devuelve solo un documento (no una matriz), incluso 
//si hay varios elementos


const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, function (err, people) { //PROMISE
    if (err) return console.log(err);
    done(null, people);
  })
};

// findPersonById no es de js, si no de mongoose

const findPersonById = (personId, done) => {
  Person.findById(personId, function (err, people) { //PROMISE
    if (err) return console.log(err);
    done(null, people);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, function (err, people) { //PROMISE
  if (err) return console.log(err);
   people.favoriteFoods= [...people.favoriteFoods, foodToAdd]
   people.save((err, updatedPerson) => {
      if(err) return console.log(err);
      done(null, updatedPerson)
    })
})
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
Person.findOne({name: personName}, function (err, people) { //PROMISE
  if (err) return console.log(err);
   people.age= ageToSet
   people.save((err, updatedPerson) => {
      if(err) return console.log(err);
      done(null, updatedPerson)
    })
})
};

//findByIdAndRemove, findOneAndRemove son como los
//métodos de actualización anteriores.
//Pasan el documento eliminado a la base de datos. 

const removeById = function(personId, done) {
  Person.findByIdAndRemove(
    personId,
    (err, removedDoc) => {
      if(err) return console.log(err);
      done(null, removedDoc);
    }
  ); 
};

//Model.remove() es útil para eliminar 
//tds los documentos que coinciden con los criterios dados

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err, removedDoc) => {
      if(err) return console.log(err);
      done(null, removedDoc);
    })
};


/*Si no pasa la devolución de llamada como último argumento a Model.find()
(o a los otros métodos de búsqueda), la consulta no se ejecuta. 
Puede almacenar la consulta en una variable para su uso posterior. 
Este tipo de objeto le permite crear una consulta utilizando sintaxis 
de encadenamiento. La búsqueda de base de datos real se ejecuta cuando 
finalmente encadena el método .exec(). Siempre debe pasar su devolución 
de llamada a este último método. */


const queryChain = (done) => {
  const foodToSearch = "burrito";
const findedPeople= Person.find({ favoriteFoods: foodToSearch });                     
findedPeople.sort({name: 1 }); // Here: 1 for ascending	order and -1 for descending order. Array method
findedPeople.limit(2); // return array which has 2 items in it. Array method
findedPeople.select({ age: 0})
// Here: 0 means false and thus hide name property; 1 means true so age property will show.
findedPeople.exec(function(err, people) {
    if (err) return console.log(err);
    done(null, people);
  });
};

/*
Segun los consejos se SUPONE que deberia funcionar también asi:
Person.find({ favoriteFoods: foodToSearch });                     
.sort({name: 1 }); 
.limit(2); 
.select({ age: 0})
.exec(function(err, people) {
    if (err) return console.log(err);
    done(null, people);
  });
};
pero eso no pasaba los test

*/


/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
