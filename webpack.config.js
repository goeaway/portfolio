const uglify = require('uglifyjs-webpack-plugin');
const path = require("path");
const analyser = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = (env) => {
    return {
        mode: env.mode === "production" ? "production" : "development",
        devtool: env.mode === "production" ? undefined : 'inline-source-map',
        entry: './src/index.tsx',
        output: {
            filename: 'bundle.js',
            path: __dirname + '/build',
            publicPath: '/output'
        },
        // plugins: [
        //     new analyser()
        // ],
        resolve: {
            extensions: ['.ts', '.tsx', '.js'],
            alias: {
                "@config": path.join(__dirname, "src", "config", env.mode === "production" ? "live": "local"),
                "@src": path.join(__dirname, "src"),
                "react": "preact/compat",
                "react-dom": "preact/compat"
            }
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: '/node_modules/'
                }
            ]
        },
        devServer: {
            host: "localhost.app.com",
            port: 30,
            contentBase: './wwwroot',
            publicPath: '/output',
            hot: true,
            headers: {
              'Access-Control-Allow-Origin': '*',
            },
            historyApiFallback: true,
          }
    };
};