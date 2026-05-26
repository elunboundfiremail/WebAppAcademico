import { app } from "./infrastructure/http/app";

const puerto = process.env.PORT ? Number(process.env.PORT) : 3000;

app.listen(puerto, () => {
  console.log(`servidor en puerto ${puerto}`);
});
