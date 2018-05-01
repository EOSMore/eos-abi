module.exports = {
  type: 'web-module',
  npm: {
    esModules: false,
    umd: {
      global: 'EOSABI',
      externals: {}
    }
  }
}
