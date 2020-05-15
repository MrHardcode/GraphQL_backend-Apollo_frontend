import mongoose from "mongoose";
import { Friends } from "./dbConnector.js";

// class Friend {
//     constructor(id, {firstName, lastName, gender, age, language, email, contacts}) {
//         this.id = id;
//         this.firstName = firstName;
//         this.lastName = lastName;
//         this.gender = gender;
//         this.age = age;
//         this.language = language;
//         this.email = email;
//         this.contacts = contacts;
//     }
// }

// const friendDatabase = {};

// resolver mapp
export const resolvers = {
  Query: {
    getOneFriend: async (root, { id }) => {
      const result = await Friends.findById({ _id: id });
      return result;
    },
    allFriends: () => {
      return Friends.find({});
    },
  },
  Mutation: {
    createFriend: (root, { input }) => {
      const newFriend = new Friends({
        firstName: input.firstName,
        lastName: input.lastName,
        gender: input.gender,
        language: input.language,
        age: input.age,
        email: input.email,
        contacts: input.contacts,
      });

      newFriend.id = newFriend._id;

      return newFriend.save();
    },
    updateFriend: (root, { id, input }) => {
      return Friends.findOneAndUpdate({ _id: id }, input, { new: true });
    },
    deleteFriend: async (root, { id }) => {
      const result = await Friends.findOneAndDelete({ _id: id });
      if (result) {
        return "Friend successfully deleted";
      } else {
        return "Could not delete friend";
      }
    },
  },
};
