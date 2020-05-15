import React, { useState } from "react";
import { useLazyQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import AddFriend from "./AddFriend";
import EditFriend from "./EditFriend";

const GET_FRIEND = gql`
  query getOneFriend($id: ID!) {
    getOneFriend(id: $id) {
      firstName
      lastName
      gender
      age
    }
  }
`;

export default function FindFriend() {
  const [id, setId] = useState("");
  const [getFriend, { loading, error, data }] = useLazyQuery(GET_FRIEND);
  const [isEditMode, setIsEditMode] = useState(false);

  const onClickEditHandler = () => {
    setIsEditMode(true);
  };

  const fetchFriend = () => {
    // if (id === "" || id.length !== 24) {
    //   return;
    // }
    getFriend({ variables: { id } });
    // alert(`Find friend with id: ${id}`);
  };

  return (
    <div>
      ID:
      <input
        type="txt"
        value={id}
        onChange={(e) => {
          setId(e.target.value);
        }}
      />
      &nbsp; <button onClick={fetchFriend}>Find Friend</button>
      <br />
      <br />
      {loading && <h2>Loading...</h2>}
      {error && <h2>Error while fetching friend...</h2>}
      {(data && !isEditMode) && (
        <AddFriend initialFriend={data.getOneFriend} />
      )}
      {/* Apparently the parentheses aren't needed to make the check work */}
      {data && !isEditMode && (
        <button type="button" onClick={onClickEditHandler}>
          Edit
        </button>
      )}
      {(data && isEditMode) && (
        <EditFriend initialFriend={data.getOneFriend} isEditMode={isEditMode} setIsEditMode={setIsEditMode} id={id} fetchFriend={fetchFriend}/>
      )}
    </div>
  );
}
