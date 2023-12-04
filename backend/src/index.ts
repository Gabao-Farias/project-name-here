import "dotenv/config";
import { app } from "./app";

const port = 3001;

app.listen(port, () => {
  console.log(`API is listening at http://localhost:${port}`);
});
