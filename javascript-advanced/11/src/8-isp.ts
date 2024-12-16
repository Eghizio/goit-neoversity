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
