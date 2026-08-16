import express from "express";
import cors from "cors";
import sysResourceRoute from "./routes/sysResourcesRoute";
import dockerRoute from "./routes/dockerRoute";
import scriptsRoute from "./routes/scriptsRoute";
import servicesRoute from "./routes/servicesRoute";
import fileSystemRoute from "./routes/fileSystemRoute";
import { loadConfig } from "./services/configService";

const app = express();
const port = process.env.PORT || 3000;
loadConfig();

app.use(cors());

app.use("/sysResources", sysResourceRoute);
app.use("/docker", dockerRoute);
app.use("/scripts", scriptsRoute);
app.use("/services", servicesRoute);
app.use("/fileSystem", fileSystemRoute);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

export default app;
