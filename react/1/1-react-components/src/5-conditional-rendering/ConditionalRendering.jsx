const UserAvatar = () => {
  const avatar =
    "https://insidethemagic.net/wp-content/uploads/2020/06/Screen-Shot-2020-06-06-at-4.12.25-PM.png";

  return (
    <article>
      <h1>Grogu</h1>
      <img
        src={avatar}
        alt="Baby Yoda"
        width="300px"
        style={{ borderRadius: "50%" }}
      />
    </article>
  );
};

// const renderIcons = (iconName) => {
//   switch (iconName) {
//     case "star":
//       return <Star />;
//     case "heart":
//       return <Heart />;
//     default:
//       return null;
//   }
// };

export const ConditionalRendering = () => {
  const isLoggedIn = true;
  // const isLoggedIn = false;
  // const isLoggedIn = Math.random() > 0.5;

  // const avatar = isLoggedIn ? <UserAvatar /> : "No avatar";

  // if (isLoggedIn) return <UserAvatar />;
  // return null;
  // return <p>Please log in!</p>;

  return (
    <main>
      {isLoggedIn && <UserAvatar />}
      {/* {0 && false} */}

      {/* {isLoggedIn ? <UserAvatar /> : null} */}

      {/* {isLoggedIn ? <UserAvatar /> : "User not logged in!"} */}

      {/* {isLoggedIn ? <UserAvatar /> : <p>User not logged in!</p>} */}

      {/* {avatar} */}
    </main>
  );
};
