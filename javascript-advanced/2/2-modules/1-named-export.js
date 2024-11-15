// import { grantRankOfMaster, greetMeesa } from "./index-named.js";
// import { grantRankOfMaster as masterify, greetMeesa, jedisJSON } from "./index-named.js";
// import * as JediModule from "./index-named.js";

// const title = grantRankOfMaster("Skywalker"); // "Master Skywalker"
// const title = masterify("Skywalker"); // "Master Skywalker"

// `grantRankOfMaster` name collision
// const grantRankOfMaster = () => {
//     /// something;
// };

// console.log(`Hello ${title}`); // "Hello Master Skywalker"
// console.log(greetMeesa(title)); // "Meesa, heeloooo Master Skywalker, meesa been waiting!"
// console.log(JSON.parse(jedisJSON)); // [ 'Yoda', 'Luke', 'Ahsoka' ]

// console.log(JediModule.grantRankOfMaster("Yoda"));
// console.log(JediModule.greetMeesa( JediModule.grantRankOfMaster("Yoda") ));
// console.log(JediModule);


// export const jediMasters = [
//     masterify("Skywalker"),
//     masterify("Kenobi"),
//     masterify("Yoda"),
//     masterify("Windu"),
// ];

// export const jediMasters = [...JSON.parse(jedisJSON)].map(masterify);

// console.log( jediMasters );
