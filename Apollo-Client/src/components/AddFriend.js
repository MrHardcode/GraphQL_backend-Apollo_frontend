import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

// const ALL_FRIENDS = gql`
//   {
//     allFriends {
//       id
//       firstName
//       lastName
//       gender
//       age
//     }
//   }
// `;

const ADD_FRIEND = gql`
  mutation createFriend($input: FriendInput!) {
    createFriend(input: $input) {
      id
      firstName
      lastName
      gender
      age
    }
  }
`;

const AddFriend = ({ initialFriend, allowEdit }) => {
  const EMPTY_FRIEND = {
    firstName: "",
    lastName: "",
    gender: "MALE",
    age: "",
    email: "",
  };
  let newFriend = initialFriend ? initialFriend : { ...EMPTY_FRIEND };
  const [friend, setFriend] = useState({ ...newFriend });
  const [readOnly, setReadOnly] = useState(!allowEdit);
  
  const [createFriend, { }] = useMutation(ADD_FRIEND, {});

  const handleChange = (event) => {
    const id = event.target.id;
    friend[id] = event.target.value;
    setFriend({ ...friend });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    //Todo

    // alert(JSON.stringify(friend));
    createFriend({
      variables: {
        input: {
          firstName: friend.firstName,
          lastName: friend.lastName,
          //email: friend.email,
          age: Number(friend.age),
          gender: friend.gender,
        },
      },
    });
    setFriend({ ...EMPTY_FRIEND });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        FirstName
        <br />
        <input
          type="text"
          readOnly={readOnly}
          id="firstName"
          value={friend.firstName}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        LastName <br />
        <input
          readOnly={readOnly}
          type="text"
          id="lastName"
          value={friend.lastName}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Gender &nbsp;
        <select
          disabled={readOnly}
          id="gender"
          value={friend.gender}
          onChange={handleChange}
        >
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
        </select>
      </label>
      <br />
      <label>
        Age <br />
        <input
          readOnly={readOnly}
          type="number"
          id="age"
          value={friend.age}
          onChange={handleChange}
        />
      </label>
      <br />
      <br />
      {!readOnly && <input type="submit" value="Submit" />}
    </form>
  );
};

export default AddFriend;