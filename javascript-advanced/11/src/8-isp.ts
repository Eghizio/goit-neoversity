import { Colors } from "./colors";

export {};

/* SOLID - Interface Segregation Principle */

/* Bad */
interface EverythingParser {
  jsonParse(json: any): string;
  htmlParse(html: any): string;
}

class BadParser implements EverythingParser {
  jsonParse(json: any): string {
    return "Parsing JSON";
  }

  htmlParse(): string {
    return "Parsing HTML";
  }
}

/* Good */
interface JsonParser {
  jsonParse(json: any): string;
}

interface HtmlParser {
  htmlParse(html: any): string;
}

class SpecificHtmlParser implements HtmlParser {
  htmlParse(): string {
    return "Specifically parsing HTML";
  }
}

class UniversalParser implements JsonParser, HtmlParser {
  jsonParse(): string {
    return "Parsing JSON";
  }

  htmlParse(): string {
    return "Parsing HTML";
  }
}

/* Example */

interface MieszankaKrakowska {
  getPinapple(): string;
  getRaspberry(): string;
  getOrange(): string;
}

interface MieszankaWawelska {
  getMalaga(): string;
  getTikiTaki(): string;
  getKasztanki(): string;
}

class BadShoppingExperience implements MieszankaKrakowska {
  getPinapple(): string {
    return "Pinapple";
  }
  getRaspberry(): string {
    return "Raspberry";
  }
  getOrange(): string {
    return "Orange";
  }

  buyCandies(): string[] {
    return [this.getPinapple(), this.getRaspberry(), this.getOrange()];
  }
}

interface MieszankaWawelskaMalaga {
  getMalaga(): string;
}

interface MieszankaKrakowskaTikiTaki {
  getTikiTaki(): string;
}

interface MieszankaKrakowskaKasztanki {
  getKasztanki(): string;
}

class GoodShoppingExperience
  implements MieszankaKrakowskaKasztanki, MieszankaKrakowskaTikiTaki
{
  getKasztanki(): string {
    return "Kasztanki";
  }
  getTikiTaki(): string {
    return "Tiki Taki";
  }

  buyCandies(): string[] {
    return [this.getKasztanki(), this.getTikiTaki()];
  }
}

const poorShoppingExperience = new BadShoppingExperience().buyCandies();

const pleasantShoppingExperience = new GoodShoppingExperience().buyCandies();

console.log(
  Colors.Red,
  "\n💔 We only wanted pinapple but we need to buy whole pack.\n",
  poorShoppingExperience
);

console.log(
  Colors.Green,
  "\n❤️ We don't like Malaga so we don't buy it.\n",
  pleasantShoppingExperience
);
