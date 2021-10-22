const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/twitter");
const Schema = mongoose.Schema;

var USERschema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  name: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  id: String,
  tweets: [
    {
      type: Schema.Types.ObjectId,
      ref: "Tweet",
    },
  ],
  created: {
    type: Date,
    default: Date.now,
  },
});

var USER = mongoose.model("User", USERschema);

/*USER.find({}, (err, res) => {
  console.log(res);
});*/
module.exports = USER;
