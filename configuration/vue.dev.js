const path = require('path')
const StyleLintPlugin = require('stylelint-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const PrerenderSPAPlugin = require('prerender-spa-plugin')
// const Renderer = PrerenderSPAPlugin.PuppeteerRenderer

module.exports = function (baseDir) {
  const resolve = (dirAry) => path.join(baseDir, ...dirAry)
  return {
    publicPath: process.env.BASE_URL,
    outputDir: resolve([`dist${process.env.BASE_URL}`]),
    productionSourceMap: false,
    devServer: {
    // public: 'https://domain',
      disableHostCheck: true,
      overlay: {
        warnings: true,
        errors: true
      }
    },
    lintOnSave: process.env.NODE_ENV !== 'production',
    css: {
      extract: {
        filename: '[name].[hash:8].css',
        chunkFilename: '[name].[hash:8].css'
      },
      loaderOptions: {
        scss: {
          prependData: '@import "@/assets/style/config/_index.scss";'
        }
      }
    },
    configureWebpack: (config) => {
      const result = {
        mode: process.env.BUILD ? 'production' : 'development', // 相應地使用其內置優化
        output: {
          filename: '[name].[hash:8].js',
          chunkFilename: '[name].[hash:8].js'
        },
        resolve: {
          alias: {
            '~': resolve(['src']),
            '@': resolve(['src'])
          }
        },
        plugins: [
          new StyleLintPlugin({
            files: ['src/**/*.{vue,scss}']
          })
        ],
        optimization: {}
      }

      if (process.env.BUILD) {
      // prerender
        result.plugins.push(
          new PrerenderSPAPlugin({
            staticDir: resolve(['dist']),
            outputDir: resolve([`dist${process.env.BASE_URL}`]),
            indexPath: resolve([`dist${process.env.BASE_URL}/index.html`]),
            routes: ['/index.html'],
            // 自己決定什麼時候要 render
            // renderer: new Renderer({
            //   renderAfterDocumentEvent: 'render-event'
            // }),
            postProcess (renderedRoute) {
              if (renderedRoute.route.endsWith('.html')) {
                renderedRoute.outputPath = resolve([
                  'dist',
                  process.env.BASE_URL,
                  renderedRoute.route
                ])
              }

              return renderedRoute
            }
          })
        )

        // 壓縮 css
        result.optimization.minimize = true
        result.optimization.minimizer = [new CssMinimizerPlugin()]

        // gzip
        result.plugins.push(
          new CompressionPlugin({
            test: /\.js$|\.html$|.\css/,
            threshold: 10240,
            deleteOriginalAssets: false
          })
        )
      }

      return result
    }
  }
}
