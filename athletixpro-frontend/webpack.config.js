// ...existing code...
module.exports = {
  // ...existing code...
  resolve: {
    fallback: {
      "crypto": require.resolve("crypto-browserify")
    }
  },
  // ...existing code...
};
