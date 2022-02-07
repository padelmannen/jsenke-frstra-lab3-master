![Node.js ><](./node.js.png)
![Express.js ><](./express.js.png)

# Lab 3

[Lab 3](https://kth.instructure.com/courses/31494/assignments/187820/) [_(demo)_](https://authentication-base.herokuapp.com/) ska lämnas in i [src/base](./src/base/) före presentationen. Båda studenterna ska kunna redogöra för programmets alla delar. [Lab 3X](https://kth.instructure.com/courses/31494/assignments/187820) [_(demo)_](https://authentication-bonus.herokuapp.com/) ska lämnas in i [src/bonus](./src/bonus/) **senast den 18:e februari** för att få bonuspoäng. Statiska filer har placerats i [public](./public/) och behöver inte ändras alls. Följ instruktionerna nedan och se till att ha en övergripande förståelse för hur alla filer hänger ihop innan programmet vidareutvecklas. _Lycka till!_

## Introduktion

**Viktiga länkar:**

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [Express.js](https://expressjs.npm install exprescom/)
- [SQLite](https://www.npmjs.com/package/sqlite/)
- [BCrypt](https://www.npmjs.com/package/bcrypt/) _(endast för bonusuppgiften)_

1. Klona ned och navigera till repot i terminalen.
2. Kör `npm install` för att installera alla nödvändiga paket.
3. Kör `npm start` för att starta servern.
4. Öppna webbläsaren och navigera till [localhost:8989](http://localhost:8989/).

## Statisk kodanalys _(lint)_

Statisk kodanalys utförs för att hitta potentiella fel, misstänkta konstruktioner eller andra problem relaterade till bristande kodkvalitet. Följande steg är nödvändiga för att utföra statisk kodanalys och därmed bli godkänd på uppgiften. Observera att **alla rapporterade problem ska åtgärdas** före presentationen. Vidare måste den senaste versionen av [Node.js LTS](https://nodejs.org/) installeras innan instruktionerna nedan kan utföras.

1. Klona ned och navigera till repot i terminalen.
2. Kör `npm install` för att installera alla nödvändiga paket.
3. Kör `npm run lint` för att analysera koden och se resultatet.

Observera att de allra flesta problem kan elimineras _automatiskt_ genom att köra `npm run lint:fix`. Se därför till att _kontinuerligt_ köra kommandot ovan och åtgärda nya problem på löpande basis.
