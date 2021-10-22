const fs = require("fs");
var uniqid = require("uniqid");
const { update } = require("../users/users.model");

const TWEETModel = require("./tweets.model");
const USERModel = require("../../api/users/users.model");

/**
 * GET      /api/tweets                      -> getAll
 * POST     /api/tweets                      -> createTweet
 * GET      /api/tweets/:id                  -> getTweet
 * DELETE   /api/tweets/:id                  -> deleteTweet
 */

module.exports = { getAll, createTweet, getTweet, deleteTweet };
/*
let tweets = loadTweets();
let users = loadUsers();
*/

async function getAll(req, res) {
  const { _sort } = req.query;
  console.log({ _sort });
  if (_sort != undefined && _sort == "asc") {
    TWEETModel.find()
      .sort([["createdAt", 1]])
      .then((response) => {
        return res.json(response);
      });
  } else {
    TWEETModel.find()
      .sort([["createdAt", -1]])
      .then((response) => {
        return res.json(response);
      });
  }
  //.sort([['date', -1]]).exec(function(err, docs) { ... });
  /*
  if (req.body.hasOwnProperty("sort") && req.body.sort == "asc") {
    tweetsSorted = tweets.sort(function (a, b) {
      return a.createdAt - b.createdAt;
    });
  } else if (req.body.hasOwnProperty("sort") && req.body.sort == "des") {
    tweetsSorted = tweets.sort(function (a, b) {
      return b.createdAt - a.createdAt;
    });
  }
  res.json(tweetsSorted);
  */
}

async function createTweet(req, res) {
  var newTweet = new TWEETModel({
    text: req.body.text,
    owner: req.body.owner,
    createdAt: Date.now(),
  });
  let userExist = await USERModel.exists({ username: req.body.owner });

  if (!userExist) {
    return res
      .status(404)
      .send(`El username utilizado: ${req.body.owner}  no existe.`);
  }
  TWEETModel.create(req.body);
  newTweet
    .save()
    .then((response) => {
      return { _id: response._id, owner: response.owner };
      //return res.send("Se ha creado el Tweet correctamente \n" + response);
    })
    .then(async (response) => {
      console.log(response._id);
      // let user = await USERModel.findOne({ username: response.owner });
      // let tweets = user.tweets;
      // tweets.push(response._id);

      USERModel.updateOne(
        { username: response.owner },
        { $push: { tweets: response._id } },
        function (err) {
          if (err) return res.status(400).send(err + "  <== error");
          else
            return res.send(
              "Se ha creado el Tweet correctamente \n" + response
            );
        }
      );
    })
    .catch((e) => {
      return res.status(400).send(e);
    });
}

function getTweet(req, res) {
  let _id = req.params.id;
  /*{req.param.id}
  // { _id: id } <==> {id}
  */
  TWEETModel.findById({ _id })
    .then((response) => {
      console.log(response);
      return res.json(response);
    })
    .catch((e) => {
      return res.status(404).send(e);
    });
}
function deleteTweet(req, res) {
  let _id = req.params.id;
  TWEETModel.deleteOne({ _id }, function (err) {
    if (err) return res.status(400).send(err + " <== este es el error.");
    else
      return res.send("Se ha borrado correctamente el tweet con la id: " + _id);
  });
}

// //--------------------------------------FUNCIONES--------------------------------------------------------------------------------
// function getUserByUsername(username) {
//   return users.find((user) => user.username == username);
// }
// function sortTweetsAsc(req, res) {
//   loadData();
//   console.log("df");
//   const tweetsSorted = tweets.sort(function (a, b) {
//     return a.createdAt - b.createdAt;
//   });

//   res.json(tweetsSorted);
// }

// function sortTweetsDes(req, res) {
//   loadData();
//   const tweetsSorted = tweets.sort(function (a, b) {
//     return b.createdAt - a.createdAt;
//   });
//   res.json(tweetsSorted);
// }

// function loadUsers() {
//   const fileData = fs.readFileSync(__dirname + "/../../data/users.json");
//   return JSON.parse(fileData);
// }

// function loadTweets() {
//   const fileData = fs.readFileSync(__dirname + "/../../data/tweets.json");
//   return JSON.parse(fileData);
// }

// function saveUsers(users) {
//   fs.writeFileSync(__dirname + "/../../data/users.json", JSON.stringify(users));
// }

// function saveTweets(tweets) {
//   fs.writeFileSync(
//     __dirname + "/../../data/tweets.json",
//     JSON.stringify(tweets)
//   );
// }

// function loadData() {
//   users = loadUsers();
//   tweets = loadTweets();
// }

// function saveData() {
//   saveUsers(users);
//   saveTweets(tweets);
// }

// function generateId() {
//   return uniqid.time("tweet-");
// }

// function getTweet(id) {
//   let tweet = {};
//   tweet = tweets.find((tweet) => tweet.id == id);
//   return tweet;
// }

// function validateID(id) {}
