#!/user/bin/env node
import { OpensearchStorage } from "./OpensearchStorage.js";
import { OpensearchClient } from "./OpensearchClient.js";
import { Umzug } from "umzug";

const client = new OpensearchClient();

const umzug = new Umzug({
  migrations: {
    glob: "migrations/**/*.cjs",
  },
  logger: console,
  context: client,
  storage: new OpensearchStorage(),
});

umzug.runAsCLI();
