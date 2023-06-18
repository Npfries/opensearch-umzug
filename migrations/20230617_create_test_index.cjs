module.exports = {
  async up({ context: client }) {
    await client.indices.create({
      index: "test_index",
    });
  },
  async down({ context: client }) {
    await client.indices.delete({
      index: "test_index",
    });
  },
};
