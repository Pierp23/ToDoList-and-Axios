const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],

  // BYPASSO IL BLOCCO CORS PER PERMETTERE IL BUON ESITO DELLA CHIAMATA API
  configureWebpack: {
    devServer: {
      proxy: 'https://xkcd.com/',
      headers: { "Access-Control-Allow-Origin": "*" }
    }
  }

})
