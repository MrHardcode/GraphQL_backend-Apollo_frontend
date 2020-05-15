import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const UPDATE_FRIEND = gql`
  mutation updateFriend($id: ID!, $input: FriendInput!) {
    updateFriend(id: $id, input: $input) {
      firstName
      lastName
      gender
      age
    }
  }
`;

const EditFriend = ({ initialFriend, isEditMode, setIsEditMode, id }) => {
  const EMPTY_FRIEND = {
    firstName: "",
    lastName: "",
    gender: "MALE",
    age: "",
    email: "",
  };
  let newFriend = initialFriend ? initialFriend : { ...EMPTY_FRIEND };
  const [friend, setFriend] = useState({ ...newFriend });
  const [readOnly, setReadOnly] = useState(!isEditMode);

  const [updateFriend, { error }] = useMutation(UPDATE_FRIEND, {});

  const handleChange = (event) => {
    const id = event.target.id;
    friend[id] = event.target.value;
    setFriend({ ...friend });
  };

  const handleConfirmEdit = () => {
    updateFriend({
      variables: {
        id: id,
        input: {
          firstName: friend.firstName,
          lastName: friend.lastName,
          age: parseInt(friend.age),
          gender: friend.gender,
        },
      },
    });
    setIsEditMode(false);
    setFriend({ ...EMPTY_FRIEND });
    if (error) {
        console.log(error.message);
    }
  };

  return (
    <form>
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
      {isEditMode && (
        <button type="button" onClick={handleConfirmEdit}>
          Confirm
        </button>
      )}
    </form>
  );
};

export default EditFriend;
