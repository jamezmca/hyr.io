'use client'
import BoringLayout from '@/components/BoringLayout'
import React from 'react'
import { useParams } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { Open_Sans } from 'next/font/google'
const opensans = Open_Sans({
    subsets: ["latin"], weight: ['400', '300', '500', '600', '700'], style: ['normal', 'italic'],
});

export default function CLViewerPage({ params }) {
    const { appId: applicationId } = useParams()
    let appId = decodeURI(applicationId)
    const { userDataObj } = useAuth()

    if (!applicationId) { return null }

    const coverLetter = userDataObj?.coverLetters?.[appId]?.application

    if (!coverLetter) { return null }

    return (
        <BoringLayout>
            <main className={'max-w-[1200px] mx-auto flex flex-col gap-4 w-full p-4 sm:p-8 relative ' + opensans.className}>
                {/* <p className='absolute top-4 sm:top-8 right-0 opacity-20'>hyr.sh</p> */}
                {coverLetter.split('\n').map((p, pKey) => {
                    return (
                        <p key={pKey}>{p}</p>
                    )
                })}
            </main>
        </BoringLayout>
    )
}
