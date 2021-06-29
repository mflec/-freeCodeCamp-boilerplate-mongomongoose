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
  {name: "Jere", age: 19, favoriteFoods: ["Anything"]},
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

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

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
