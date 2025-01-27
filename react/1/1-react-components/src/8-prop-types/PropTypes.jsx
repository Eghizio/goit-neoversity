import PropTypes from "prop-types";
import React from "react";

/* TypeScript Props interface */
// interface Props {
//   name: string;
//   image?: string;
//   price: number;
// }

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

// Card.propTypes = {
//   name: PropTypes.string.isRequired,
//   image: PropTypes.string,
//   price: PropTypes.number.isRequired,
// };

export const CompWithPropTypes = () => (
  <>
    <Card />

    {/* <Card name={42} /> */}

    {/* <Card name={"42"} /> */}

    {/* <Card name={"42"} price={69} /> */}

    {/* <Card
      name="Adam"
      image="https://www.lego.com/cdn/cs/set/assets/bltbbddf9140f849bb9/31212.png"
      price={999}
    /> */}
  </>
);
