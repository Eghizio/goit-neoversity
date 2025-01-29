import { Card } from "./Card/Card";
import "./styles.css";
import s from "./styles.module.css";

const img =
  "https://cdn.pixabay.com/photo/2019/02/20/10/51/spiderman-4008954_1280.jpg";

export const CssModules = () => {
  console.log("CssModules:", s.card);
  return (
    <main>
      <h1>CssModules</h1>

      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt
        libero doloremque nobis blanditiis, magni repellendus mollitia, deserunt
        recusandae ipsa nostrum nihil laudantium sapiente quibusdam delectus
        nulla voluptas voluptate, eum et!
      </p>

      <ul>
        <li>
          <Card
            title="Spiderman"
            img={img}
            description="Spiderman, spiderman! NaNaNaNaN"
          />
        </li>

        <li>
          <article className="card">
            <h2 className="title">Spiderman</h2>
            <img src={img} alt="Spiderman" width="200px" />
            <p>Spiderman, spiderman! NaNaNaNaN</p>
          </article>
        </li>

        <li>
          <article className={s.card}>
            <h2 className="title">Spiderman</h2>
            <img src={img} alt="Spiderman" width="200px" />
            <p>Spiderman, spiderman! NaNaNaNaN</p>
          </article>
        </li>
      </ul>
    </main>
  );
};
