const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'quasar'
  ],

  pluginOptions: {
    i18n: {
      locale: 'pt-br',
      fallbackLocale: 'pt-br',
      localeDir: 'locales',
      enableLegacy: false,
      runtimeOnly: false,
      compositionOnly: false,
      fullInstall: true
    },
    quasar: {
      importStrategy: 'kebab',
      rtlSupport: false
    }
  }
})
