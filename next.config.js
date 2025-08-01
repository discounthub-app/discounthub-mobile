// next.config.js
const { withExpo } = require('@expo/next-adapter');

module.exports = withExpo({
  // Удаляем projectRoot — он больше не нужен
  reactStrictMode: true,
});
