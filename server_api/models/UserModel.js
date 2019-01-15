const mongoose = require('../db');
const UserSchema = require('../schemas/UserSchema');

// Create a `User` Model instance on the current mongoose connection.
const User = mongoose.model('users', UserSchema );

const addUser = (userObject) => {
  return User.create(userObject);
};

const getAllUsers = () => {
  // return entire collection, sorted
  return User.find({});
};

const updateUser = (updatedUserObject) => {
  const { id } = userObject;
  return User.findByIdAndUpdate(id, updatedUserObject);
};

const addContacts = async (id, contactsIdArray) => {

  return User.update(
    { _id: id },
    { $push: { contacts: { $each: [...contactsIdArray]} } }
  );
};

const getMyProfile = (id) => {
  return User.find( { _id: id } );
};

const getUsersFriends = (myProfileRaw) => {  
  // get the `contacts` array from the profile
  const contactsArray = myProfileRaw[0].contacts;
  const idArray = contactsArray.map( contact => contact.friendContact_id);

  return User.find({
    '_id': { $in : idArray} 
  });
}



const deleteUser = (id) => {
  return User.findByIdAndDelete(id);
};

module.exports = {
  addUser,
  getAllUsers,
  updateUser,
  addContacts,
  getMyProfile,
  getUsersFriends,
  deleteUser
};