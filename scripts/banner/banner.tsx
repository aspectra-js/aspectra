import { description, name } from 'package.json'
import React, { type CSSProperties } from 'react'

const full: CSSProperties = {
  width: '100%',
  height: '100%',
}

const config = {
  patternFactor: 30,
  stroke: 'rgba(255,255,255,0.10)',
}

const background = encodeURIComponent(`
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='${config.patternFactor * 4}'
    height='${config.patternFactor * 7}'
    viewBox='0 0 80 140'
  >
    <g transform='matrix(0 1 -1 0 80 0)'>
      <path
        fill='none'
        stroke='${config.stroke}'
        stroke-width='2'
        d='M47 0H0V80H47l46-80h47v80H93zM117 40H23l-23 40 140-80-23 40 23 40-140-80 23 40M70-5v90'
      />
    </g>
  </svg>
`)

export function Banner() {
  return (
    <div
      style={{
        ...full,
        background:
          'linear-gradient(45deg, rgba(168,132,237,1) 0%, rgba(145,215,184,1) 100%)',
        borderRadius: '1em',
        color: '#fafafa',
        display: 'flex',
        fontSmooth: 'always',
      }}
    >
      <div
        style={{
          ...full,
          alignItems: 'center',
          background: `url('data:image/svg+xml;charset=utf-8,${background}')`,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            fontFamily: 'GeistMono-Bold',
            fontSize: 30,
            marginTop: 15,
            letterSpacing: '-0.02em',
          }}
        >
          {description}
        </div>
        <div
          style={{
            fontSize: 120,
            letterSpacing: '-0.05em',
          }}
        >
          {name.replace('a', '@')}
        </div>
      </div>
    </div>
  )
}
