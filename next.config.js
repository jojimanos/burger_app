module.exports = {
  reactStrictMode: true,
  serverRuntimeConfig: {
      secret: 'hkjhflhvuyfcljvjhglujyfkjvlkjgljgjhfxjckhgvjhb.,bvhghgdagfsagzfhdxhljl;kgkfdud568ofci66s5xdiy'
  },
  publicRuntimeConfig: {
      apiUrl: process.env.NODE_ENV === 'development'
          ? 'http://localhost:3000/api' // development api
          : 'http://localhost:3000/api' // production api

  }
}