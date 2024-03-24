'use client'
import BoringLayout from '@/components/BoringLayout'
import CoolLayout from '@/components/CoolLayout'
import Main from '@/components/Main'
import ResumeViewer from '@/components/ResumeViewer'
import React, { useEffect, useState } from 'react'
import { Poppins } from 'next/font/google';
import { useAuth } from '@/context/AuthContext'

const poppins = Poppins({ subsets: ["latin"], weight: ['400', '100', '200', '300', '500', '600', '700'] });

export default function CVDemo() {
    const { userDataObj, isPaid } = useAuth()
    const { userData, resumeSections } = userDataObj || {}

    if (!Object.keys(userData || {}).length || !Object.keys(resumeSections || {}).length) {
        return null
        return (
            <CoolLayout>
                <Main>
                    <div className='flex flex-1 items-center justify-center flex-col gap-4'>
                        <h2 className={'text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-center  ' + poppins.className}> <span className='blueGradient'>Umm...</span></h2>
                        <p className='text-center text-blue-400 max-w-[400px] mx-auto w-full'>No resume found :0<br />Don&apos;t forget to save your resume and user details!</p>

                    </div>
                </Main>
            </CoolLayout>
        )
    }

    return (
        <BoringLayout>
            <main className='max-w-[1200px] mx-auto flex flex-col w-full p-4 sm:p-8'>
                <ResumeViewer userData={userData} resumeSections={resumeSections} isPaid={isPaid} />
            </main>
        </BoringLayout>
    )
}
