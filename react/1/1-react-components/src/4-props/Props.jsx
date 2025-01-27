const Card = (props) => {
  const price = props.price.toFixed(2) + ",-";

  return (
    <article>
      <h2>{props.name}</h2>
      <img src={props.image} alt={props.name} width="300px" />
      {/* <p>Price: $ {props.price}</p> */}
      <p>Price: $ {price}</p>
    </article>
  );
};

export const Props = () => {
  const book = {
    name: "Programming Books",
    // title: "Programming Books",
    image:
      "https://cdn.shopify.com/s/files/1/0017/0432/9285/files/gift-idea-for-dev-babies-html-javascript-books.jpg?v=1545139557",
    price: 42,
  };

  return (
    <main>
      <Card
        name="Lego"
        image="https://www.lego.com/cdn/cs/set/assets/bltbbddf9140f849bb9/31212.png"
        price={999}
      />
      <Card
        name="Flowers"
        image="https://media.bunches.co.uk/products/586x586/fmauvm-category.jpg"
        price={69}
      />

      <Card name={book.name} image={book.image} price={book.price} />

      <Card {...book} />
      <Card {...book} name="Elo" />
      <Card name="Elo" {...book} />
    </main>
  );
};
