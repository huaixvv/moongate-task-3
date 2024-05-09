import express, { Express, Request, Response } from "express";
import airdropsRouter from "./controllers/airdropController"


const app: Express = express();
const port = process.env.PORT || "8888";

app.get("/", (req: Request, res: Response) => {
  res.send("OK");
});

app.use(express.json());
app.use(airdropsRouter)


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});


/**
 * 1. auth: admin/public
 * admin can airdrop, public no auth
 *
 * 2. if had airdroped
 *
 * 3. call ether.js -> airdrop
 *
 * 4. if owner
 *
 * 5. airdrop
 */
