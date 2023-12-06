import "dotenv/config";
import "reflect-metadata";
import { app } from "./app";
import { bootstrap } from "./bootstrap";

const port = 3001;

const main = async () => {
  await bootstrap();

  app.listen(port, () => {
    console.log(`API is listening at http://localhost:${port}`);
  });
};

main();
