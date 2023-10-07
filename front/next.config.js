const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})
module.exports = withBundleAnalyzer({
  compress: true,
  webpack(config, { webpack }) {
    const prod = process.env.NODE_ENV === 'production';
    const plugins = [
      ...config.plugins,
      new webpack.ContextReplacementPlugin(/moment[/\\]locales$/, /^\.\/ko$/),
    ]
    return {
      ...config,
      mode: prod ? 'production' : 'development',
      devtool: prod ? 'hidden-source-map' : 'eval',
      plugins: [...config.plugins,
      new webpack.ContextReplacementPlugin(/moment[/\\]locales$/, /^\.\/ko$/)], //안해도 적용이 되어있음
      module: {
        ...config.module,
        rules: [
          ...config.module.rules,
          {

          }
        ]
      }
    }
  },
  images: {
    domains: [
      "localhost",
      "*",
      "bookthumb-phinf.pstatic.net",
      "picsum.photos",
      "loremflickr.com",
    ], // 이미지 호스트를 추가합니다.
  },
});
