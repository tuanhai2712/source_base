const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@state": path.join(path.resolve(__dirname, "./src/state")),
      "@assets": path.join(path.resolve(__dirname, "./src/assets")),
      "@components": path.join(path.resolve(__dirname, "./src/components")),
      "@pages": path.join(path.resolve(__dirname, "./src/pages")),
      "@utils": path.join(path.resolve(__dirname, "./src/utils")),
    },
  },
};
