import nextra from 'nextra'

const withNextra = nextra({
  search: {
    codeblocks: true,
  },
  contentDirBasePath: '/docs',
})

export default withNextra({
  reactStrictMode: true,
})
