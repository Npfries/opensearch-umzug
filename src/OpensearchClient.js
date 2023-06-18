import { Client } from "@opensearch-project/opensearch";

class OpensearchClient extends Client {
  constructor() {
    super({
      node: process.env.OPENSEARCH_HOST ?? "http://localhost:9200",
    });
  }
}

export { OpensearchClient };
