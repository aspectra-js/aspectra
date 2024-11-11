import Image from 'next/image'
import { Link } from 'nextra-theme-docs'
import basic from '~/assets/codeblocks/basic.svg'
import { description } from '~/packages/aspectra/package.json'

export const metadata = {}

export default function IndexPage() {
  return (
    <div
      style={{
        paddingBottom: '2.5em',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <h1
        style={{
          fontSize: '4em',
          fontWeight: 'bold',
          margin: '0',
          marginTop: '1.5em',
        }}
      >
        @spectra
      </h1>
      <p
        style={{
          marginTop: '1em',
          fontSize: '1.2em',
          maxWidth: '30em',
        }}
      >
        {description}
      </p>
      <Link
        style={{
          margin: '3em',
          fontWeight: 'bold',
        }}
        href='/docs'
      >
        Get Started
      </Link>
      <Image src={basic} alt={''} />
    </div>
  )
}
