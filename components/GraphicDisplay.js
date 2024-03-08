import React from 'react'

export default function GraphicDisplay(props) {
    const { real, children, username } = props
    let body = (
        <img className='w-full object-cover' alt='resume-img' src='resume_2.jpg' />
    )

    if (real) {
        body = children
    }

    return (
        <div
            className={"flex flex-col dropShadow overflow-hidden rounded-b-lg w-full mx-auto " + (real ? ' max-w-[1200px]' : ' max-w-[500px]')}
        >
            <div
                className={"rounded-t-xl p-4 bg-white opacity-60  flex items-center gap-2 "}
            >

                {[1, 2, 3].map((val, i) => {
                    return (
                        <div key={i} className={"rounded-full aspect-square  bg-indigo-300 " + (real ? ' w-3 sm:w-3.5 ' : ' w-2.5 sm:w-3')} />
                    )
                })}
                <p className={'text-xl text-slate-500 pl-2  ' + (real ? ' text-base sm:text-lg font-light ' : ' text-xs sm:text-sm')}>hyr.sh/{username || 'samuel_oak'}</p>
            </div>
            <div className={"flex flex-col bg-white gap-4 flex-1  overflow-scroll relative " + (real ? ' min-h-[400px]' : ' aspect-square')}>
                {body}
            </div>
        </div>
    )
}
