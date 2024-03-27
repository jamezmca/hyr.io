import React from 'react'

export default function Background(props) {
    const { type } = props

    const backgroundColors = {
        dark: 'linear-gradient(to bottom right, #172554, #020617)',
        white: 'white'
    }
    return (
        <div className={' top-0 left-1/2 -translate-x-1/2 w-[100vw] absolute h-full z-[0] '} style={{ background: backgroundColors[type] }}>

        </div>
    )
}
