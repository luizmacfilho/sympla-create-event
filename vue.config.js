module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/styles/_variables.scss";
          @import "@/styles/_input.scss";
        `
      }
    }
  },
  pwa: {
    workboxOptions: {
      skipWaiting: true
    }
  }
};
