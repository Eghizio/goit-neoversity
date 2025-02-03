/* Passing callback functions as prop */

const style = {
  orange: { backgroundColor: "orange" },
  green: { backgroundColor: "lime" },
};

const ScreamingButton = ({ broadcast, children }) => (
  <button style={style.orange} type="button" onClick={() => alert(broadcast)}>
    {children}
  </button>
);

const FlexibleButton = ({ performOnClick, children }) => (
  <button style={style.green} type="button" onClick={performOnClick}>
    {children}
  </button>
);

const staticSpook = () => {
  console.log("Spooky static skeleton!");
};

export const Callbacks = () => {
  const spook = () => {
    console.log("Spooky scaryy skeleton!");
  };

  return (
    <main className="col wide-gap">
      <h1>Callbacks</h1>

      <div className="col border">
        <ScreamingButton broadcast="Boo bees!">
          How are scarry bees called?
        </ScreamingButton>

        <ScreamingButton broadcast="Trick or Treat!">
          Gimme dem sweets!
        </ScreamingButton>
      </div>

      <div className="col border">
        <FlexibleButton performOnClick={() => console.log("Boo bees!")}>
          How are scarry bees called?
        </FlexibleButton>

        <FlexibleButton performOnClick={() => alert("Trick or Treat!")}>
          Gimme dem sweets!
        </FlexibleButton>

        <FlexibleButton performOnClick={spook}>Spook!</FlexibleButton>

        <FlexibleButton performOnClick={staticSpook}>
          Static Spook!
        </FlexibleButton>
      </div>
    </main>
  );
};
