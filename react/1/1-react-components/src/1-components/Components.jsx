export const Card = () => {
  console.log("Hello form Card!", Math.random());

  return (
    <article>
      <h2>Lego</h2>
      <img
        src="https://www.lego.com/cdn/cs/set/assets/bltbbddf9140f849bb9/31212.png"
        alt="Lego"
        width="300px"
      />
      <p>Price: $ 999</p>
    </article>
  );
};

export const Components = () => (
  <>
    <Card />
    <Card />
    <Card />
    <Card />
  </>
);
