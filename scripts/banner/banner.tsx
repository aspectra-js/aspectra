import { description, name } from 'package.json'
import React from 'react'

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
          background: `url("data:image/svg+xml;charset=utf-8,%3csvg version='1.1' xmlns='http://www.w3.org/2000/svg' width='120' height='210' viewBox='0 0 80 140' preserveAspectRatio='none'%3e%3cg opacity='.025' transform='matrix(0 1-1 0 80 0)'%3e%3cpath fill='none' stroke='%23333333' stroke-width='5' d='M47 0h-47v80h47l46-80h47v80h-47zM117 40h-94l-23 40l140-80-23 40 23 40-140-80 23 40M70-5v90'/%3e%3c/g%3e%3c/svg%3e")`,
          height: '100%',
          width: '100%',
          textAlign: 'center',
          alignContent: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          display: 'flex',
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
