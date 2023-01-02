module.exports = {
  client: {
    includes: ["./src/apollo-hooks/*.{tsx,ts}"],
    tagName: "gql",
    service: {
      name: "mili-backend",
      url: "http://localhost:4000/graphql",
    },
  },
};
