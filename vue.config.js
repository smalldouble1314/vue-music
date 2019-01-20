const path = require('path')
const resolve = dir => path.join(__dirname, dir)
const BASE_URL = process.env.NODE_ENV === 'production' ? '/vue-music/' : '/'
module.exports = {
    baseUrl: BASE_URL,
    lintOnSave: false,
    chainWebpack: config => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('_c', resolve('src/components'))
            .set('_a', resolve('src/assets'))
    },
    productionSourceMap: false,
    devServer: {
        // proxy: "http://localhost:3000"
    }
}