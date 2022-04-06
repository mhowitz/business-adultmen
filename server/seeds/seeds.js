const faker = require('faker');
const mongoose = require('mongoose')
const { db }= require('../config/connection');
const  User = require('../models/User');

mongoose.connect(db);


User.create( [
  {
    username: "mhowitz",
    email: "mik@gmail.com",
    password: "123456" 
  },
  {
    username: "dtait",
    email:"david@gmail.com",
    password: "123456"
  },
  {
    username: "sgee",
    email: "sabriel@gmail.com",
    password: "123456"
  },
  {
    username: "jwes",
    email: "jason@gmail.com",
    password: "123456"
  }
])
.then(user=> {
  console.log('users created')
}).catch((err) => {
  console.log(err)
})
.finally(() => {
  mongoose.connection.close();
})

// const seedDB = async () => {
//   // await User.deleteMany({});
//   await User.insertMany(seedUsers)
// };

// seedDB().then(() => {
//   mongoose.connection.close();
// });
// db.once('open', async () => {
//   await User.deleteMany({});

//   // create user data
//   const userData = [];

//   for (let i = 0; i < 50; i += 1) {
//     const username = faker.internet.userName();
//     const email = faker.internet.email(username);
//     const password = faker.internet.password();

//     userData.push({ username, email, password });
//   }

// //   const createdUsers = await User.collection.insertMany(userData);

// //   // create friends
// //   for (let i = 0; i < 20; i += 1) {
// //     const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
// //     const { _id: userId } = createdUsers.ops[randomUserIndex];

// //     let friendId = userId;

// //     while (friendId === userId) {
// //       const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
// //       friendId = createdUsers.ops[randomUserIndex];
// //     }

// //     await User.updateOne({ _id: userId }, { $addToSet: { friends: friendId } });
// //   }

// //   // create thoughts
// //   let createdThoughts = [];
// //   for (let i = 0; i < 100; i += 1) {
// //     const thoughtText = faker.lorem.words(Math.round(Math.random() * 20) + 1);

// //     const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
// //     const { username, _id: userId } = createdUsers.ops[randomUserIndex];

// //     const createdThought = await Thought.create({ thoughtText, username });

// //     const updatedUser = await User.updateOne(
// //       { _id: userId },
// //       { $push: { thoughts: createdThought._id } }
// //     );

// //     createdThoughts.push(createdThought);
// //   }

// //   // create reactions
// //   for (let i = 0; i < 100; i += 1) {
// //     const reactionBody = faker.lorem.words(Math.round(Math.random() * 20) + 1);

// //     const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
// //     const { username } = createdUsers.ops[randomUserIndex];

// //     const randomThoughtIndex = Math.floor(Math.random() * createdThoughts.length);
// //     const { _id: thoughtId } = createdThoughts[randomThoughtIndex];

// //     await Thought.updateOne(
// //       { _id: thoughtId },
// //       { $push: { reactions: { reactionBody, username } } },
// //       { runValidators: true }
// //     );
// //   }

//   console.log('all done!');
//   process.exit(0);
// });
