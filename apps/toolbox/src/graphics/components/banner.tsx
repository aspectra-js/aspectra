// biome-ignore lint/correctness/noUnusedImports: required
import React from 'react'
import { full } from '../css'

export function Banner() {
  return (
    <div
      style={{
        ...full,
        letterSpacing: '-0.05em',
        fontWeight: 600,
        background: '#fafafa',
        color: 'rgb(26,26,26)',
        display: 'flex',
        fontSmooth: 'always',
        fontFamily: 'geist-sans',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '8em',
      }}
    >
      @spectra
    </div>
  )
}
