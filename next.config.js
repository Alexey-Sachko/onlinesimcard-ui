const withImages = require("./withImages");
module.exports = withImages({
  async rewrites() {
    return [
      // Basic `path-to-regexp` usage
      // Query object shape: { id: string }
      { source: "/privacy", destination: "/api/privacy" },
    ];
  },
});
