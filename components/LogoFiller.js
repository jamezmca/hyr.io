import { Poppins } from 'next/font/google';
import React from 'react'
const poppins = Poppins({ subsets: ["latin"], weight: ['400', '100', '200', '300', '500', '600', '700'] });


export default function LogoFiller() {
    return (
        <div className='grid place-items-center flex-1 text-center text-blue-300  '>
            <div className='flex flex-col gap-4 font-medium'>
                <h4 className={'text-xl px-3 sm:text-2xl blueGradient font-medium sm:px-4  ' + poppins.className}>Hyr.sh</h4>
                <p className=''>
                    Show the world who you are.<br />
                    Add your resume to get started.
                </p>
            </div>
        </div>
    )
}
