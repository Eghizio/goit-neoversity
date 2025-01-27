import React from "react";

const text = "Red Text";
// const text = 0;

const textStyles = {
  textDecoration: "underline",
};

const RedText = () => (
  <p className="red" style={textStyles}>
    {text}
  </p>
);

// const abc = `This is: ${text}`;

export const Jsx = () => {
  const title = "Hello from JSX";

  return (
    <>
      <div id="elomelo">
        <h1>Elo</h1>

        <React.Fragment>
          <h1>{title}</h1>

          <RedText />
          <RedText />
          <RedText />
          <>
            <RedText />
            <RedText />
            <RedText />
          </>
        </React.Fragment>
      </div>
    </>
  );
};
