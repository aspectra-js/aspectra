import pkg from '../../../package.json'

export function Banner() {
  return (
    <div
      style={{
        background:
          'linear-gradient(45deg, rgba(168,132,237,1) 0%, rgba(145,215,184,1) 100%)',
        height: '100%',
        width: '100%',
        textAlign: 'center',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        display: 'flex',
        borderRadius: '1em',
        fontSmooth: 'always',
        color: 'white',
      }}
    >
      <div
        style={{
          marginTop: 15,
          fontFamily: 'GeistMono-Bold',
          fontSize: 30,
          letterSpacing: '-0.02em',
        }}
      >
        {pkg.description}
      </div>
      <div
        style={{
          fontSize: 120,
          letterSpacing: '-0.05em',
        }}
      >
        {pkg.name.replace('a', '@')}
      </div>
    </div>
  )
}
