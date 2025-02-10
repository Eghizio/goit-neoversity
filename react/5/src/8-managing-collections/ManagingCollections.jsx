import { useId, useState } from "react";

const AddFriendForm = ({ addFriend }) => {
  const [name, setName] = useState("Kuba");
  const id = useId();

  const handleSubmit = (event) => {
    event.preventDefault();

    addFriend(name);

    setName("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor={id}>
        Friend name:
        <input
          id={id}
          type="text"
          name="name"
          placeholder="Friends name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          minLength={2}
        />
      </label>

      <button className="green" type="submit">
        Add friend
      </button>
    </form>
  );
};

const SearchBar = ({ query, updateSearch }) => {
  const id = useId();

  return (
    <label htmlFor={id}>
      Search friend:
      <input
        id={id}
        type="text"
        name="search"
        placeholder="Friends name"
        value={query}
        onChange={(e) => updateSearch(e.target.value)}
      />
    </label>
  );
};

const FriendsList = ({ friends, deleteFriend }) => (
  <section className="col">
    <h2>Friends list:</h2>

    <ul>
      {friends.length === 0 ? (
        <p>Seems like you have no friends. Make some!</p>
      ) : (
        friends.map(({ id, name }) => (
          <li key={id}>
            <h3>{name}</h3>
            <button className="red" onClick={() => deleteFriend(id)}>
              Delete
            </button>
          </li>
        ))
      )}
    </ul>
  </section>
);

export const ManagingCollections = () => {
  const [friends, setFriends] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const addFriend = (name) => {
    const friend = { id: crypto.randomUUID(), name };
    setFriends((prev) => [...prev, friend]);
  };

  const deleteFriend = (friendId) => {
    setFriends((prev) => prev.filter((friend) => friend.id !== friendId));
  };

  const displayedFriends = friends.filter(({ name }) =>
    name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // const updateFriendName = (friendId, newName) => {};

  return (
    <main className="col wide-gap">
      <h1>Managing Collections</h1>

      <AddFriendForm addFriend={addFriend} />
      <SearchBar query={searchQuery} updateSearch={setSearchQuery} />
      <FriendsList friends={displayedFriends} deleteFriend={deleteFriend} />
    </main>
  );
};

// const FriendEditor = ({ friend, updateFriend }) => {
//   const id = useId();
//   const [updatedName, setUpdatedName] = useState(friend.name);

//   const onSubmit = (event) => {
//     event.preventDefault();

//     updateFriend(friend.id, updatedName);
//   };

//   return (
//     <form onSubmit={onSubmit}>
//       <label htmlFor={id}>
//         Friend name:
//         <input
//           id={id}
//           type="text"
//           name="name"
//           placeholder="Friends name"
//           value={updatedName}
//           onChange={(e) => setUpdatedName(e.target.value)}
//           required
//           minLength={2}
//         />
//       </label>

//       <button className="green" type="submit">
//         Update friends name
//       </button>
//     </form>
//   );
// };
