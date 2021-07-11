var path = require('path')
var fs = require('fs')
var pkg = require('../package.json')
var nodeExternals = require('webpack-node-externals')
var Components = require('../components.json'),
    utilsList = fs.readdirSync(path.resolve(__dirname, '../packages/utils'))
externals = {}

Object.keys(Components).forEach(function (key) {
    externals[`ui-lib-vue3-ts-demo/packages/${key}`] = `ui-lib-vue3-ts-demo/lib/${key}`
})
utilsList.forEach(function (file) {
    file = path.basename(file, '.js')
    externals[`ui-lib-vue3-ts-demo/packages/utils/${file}`] = `ui-lib-vue3-ts-demo/lib/${file}`
})

externals = [
    Object.assign(
        {
            vue: 'vue'
        },
        externals
    ),
    nodeExternals()
]

exports.externals = externals
exports.version = pkg.version

exports.alias = {
    '@': path.resolve(__dirname, '../src'),
    packages: path.resolve(__dirname, '../packages'),
    examples: path.resolve(__dirname, '../examples'),
    'ui-lib-vue3-ts-demo': path.resolve(__dirname, '../')
}

exports.vue = {
    root: 'Vue',
    commonjs: 'vue',
    commonjs2: 'vue',
    amd: 'vue'
}

exports.vueUmd = {
    root: 'Vue',
    commonjs: 'Vue',
    commonjs2: 'Vue',
    amd: 'Vue'
}

exports.jsexclude = /node_modules/