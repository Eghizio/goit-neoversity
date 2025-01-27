const Card = ({ name, image, price }) => {
  console.log("Card", name);

  return (
    <article>
      <h2>{name}</h2>
      <img src={image} alt={name} width="300px" />
      <p>Price: $ {price}</p>
    </article>
  );
};

const products = Array.from({ length: 100 }, (_, i) => ({
  id: i,
  title: "Lego",
  image: "https://www.lego.com/cdn/cs/set/assets/bltbbddf9140f849bb9/31212.png",
  price: 999,
}));

export const Mapping = () => {
  // const products = [
  //   {
  //     // id: "abc",
  //     title: "Lego",
  //     image:
  //       "https://www.lego.com/cdn/cs/set/assets/bltbbddf9140f849bb9/31212.png",
  //     price: 999,
  //   },
  //   {
  //     title: "Flowers",
  //     image: "https://media.bunches.co.uk/products/586x586/fmauvm-category.jpg",
  //     price: 69,
  //   },
  //   {
  //     title: "Programming Books",
  //     image:
  //       "https://cdn.shopify.com/s/files/1/0017/0432/9285/files/gift-idea-for-dev-babies-html-javascript-books.jpg?v=1545139557",
  //     price: 42,
  //   },
  // ];

  return (
    <main>
      {products.map((product, index) => (
        <Card
          // key={Math.random()}
          // key={index}
          // key={product.title}
          key={product.id}
          name={product.title}
          image={product.image}
          price={product.price}
        />
      ))}
    </main>
  );
};
