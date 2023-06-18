import { OpensearchClient } from "./OpensearchClient.js";

class OpensearchStorage {
  client;

  constructor() {
    this.client = new OpensearchClient();
  }

  async executed() {
    const migrationsIndexExists = (
      await this.client.indices.exists({ index: "migrations" })
    ).body;

    if (!migrationsIndexExists) {
      await this.client.indices.create({ index: "migrations" });
      return [];
    }

    const response = await this.client.search({
      index: "migrations",
      body: {
        query: {
          match_all: {},
        },
        size: 100,
      },
    });

    const result =
      response?.body?.hits?.hits?.map((m) => m["_source"]["name"]) ?? [];

    return result;
  }

  async logMigration(params) {
    await this.client.index({
      index: "migrations",
      body: {
        name: params.name,
        timestamp: new Date().toISOString(),
      },
      refresh: true,
    });
  }

  async unlogMigration(params) {
    await this.client.deleteByQuery({
      index: "migrations",
      body: {
        query: {
          bool: {
            filter: [
              {
                term: {
                  name: params.name,
                },
              },
            ],
          },
        },
      },
    });
  }
}

export { OpensearchStorage };
