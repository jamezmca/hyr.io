import { Poppins } from 'next/font/google';
import Link from 'next/link'
import React from 'react'
import GraphicDisplay from './GraphicDisplay';
import RegisterBtn from './RegisterBtn';

const poppins = Poppins({ subsets: ["latin"], weight: ['400', '100', '200', '300', '500', '600', '700'] });

export default function Hero() {
    return (
        <section className='flex flex-col flex-1  grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 w-full mx-auto  '>
            <div className='flex flex-col flex-1 items-center gap-8  text-center lg:text-left mx-auto w-full'>
                {/* <h2 className={'text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-center lg:text-left ' + poppins.className}>Resumes and Cover Letters  <span className='blueGradient'>in one place.</span></h2> */}
                {/* <h2 className={'text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-center lg:text-left ' + poppins.className}><span className='blueGradient'>Superfast</span> Resumes and Cover Letters.</h2> */}
                <h2 className={'text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-center lg:text-left ' + poppins.className}>Land Your Dream Job <span className='blueGradient'>Superfast</span> </h2>
                <p className='text-base sm:text-lg md:text-xl lg:max-w-[80%] lg:mr-auto '>

                    Build resumés and cover letters that <span className='font-medium'> companies love.</span>
                </p>
                <RegisterBtn leftAligned />
            </div>

            {/* START GRAPHIC DISPLAY */}
            {/* START GRAPHIC DISPLAY */}
            {/* START GRAPHIC DISPLAY */}
            {/* START GRAPHIC DISPLAY */}
            {/* START GRAPHIC DISPLAY */}
            {/* START GRAPHIC DISPLAY */}

            <GraphicDisplay />
        </section >
    )
}

// /* Professional resumes and cover letters built for <span className=' font-medium '>landing jobs</span>. Create and share <span className=' font-medium '>job specific</span> resumes & cover letters in seconds with your very own link. */ 
// /* Hyr.sh helps you create <span className='font-medium'>personalized and job specific</span> resumes and cover letters in seconds. */ 