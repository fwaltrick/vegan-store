/* eslint-disable */
const withCss = require("@zeit/next-css")
// const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = withCss({
  webpack: (config, { isServer }) => {
    if (isServer) {
      const antStyles = /antd\/.*?\/style\/css.*?/
      const origExternals = [...config.externals]
      config.externals = [
        (context, request, callback) => {
          if (request.match(antStyles)) return callback()
          if (typeof origExternals[0] === "function") {
            origExternals[0](context, request, callback)
          } else {
            callback()
          }
        },
        ...(typeof origExternals[0] === "function" ? [] : origExternals),
      ]

      config.module.rules.unshift({
        test: antStyles,
        use: "null-loader",
      })
    }

    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    })

    return config
  },
  // target: "serverless",
  env: {
    MONGO_SRV:
      "mongodb+srv://fabertrick:chan8277@veganstore-pnppr.mongodb.net/test?retryWrites=true&w=majority",
    JWT_SECRET: "star13me",
    CLOUDINARY_URL: "https://api.cloudinary.com/v1_1/dvn52rfzx/image/upload",
    STRIPE_SECRET_KEY: "sk_test_ZkHGQFF1SLPkaJnOdCrwIKEC00HIEcT8qB",
  },
})
