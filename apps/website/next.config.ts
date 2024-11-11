import nextra from 'nextra'

const withNextra = nextra({
  search: {
    codeblocks: true,
  },
  contentDirBasePath: '/docs',
  codeHighlight: true,
  defaultShowCopyCode: true,
})

export default withNextra({
  reactStrictMode: true,
})
