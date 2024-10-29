import { description, name } from 'package.json'
import React, { type CSSProperties } from 'react'

const full: CSSProperties = {
  width: '100%',
  height: '100%',
}

export function Banner() {
  return (
    <div
      style={{
        ...full,
        background:
          'linear-gradient(45deg, rgba(168,132,237,1) 0%, rgba(145,215,184,1) 100%)',
        borderRadius: '1.5em',
        color: '#fafafa',
        display: 'flex',
        fontSmooth: 'always',
      }}
    >
      <div
        style={{
          ...full,
          alignItems: 'center',
          background: `url("data:image/svg+xml;charset=utf-8,%3csvg version='1.1' xmlns='http://www.w3.org/2000/svg' width='120' height='210' viewBox='0 0 80 140' preserveAspectRatio='none'%3e%3cg opacity='.025' transform='matrix(0 1-1 0 80 0)'%3e%3cpath fill='none' stroke='%23333333' stroke-width='5' d='M47 0h-47v80h47l46-80h47v80h-47zM117 40h-94l-23 40l140-80-23 40 23 40-140-80 23 40M70-5v90'/%3e%3c/g%3e%3c/svg%3e")`,
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
