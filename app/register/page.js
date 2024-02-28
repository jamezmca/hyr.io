'use client'
import Main from '@/components/Main'
import Register from '@/components/Register';
import { useAuth } from '@/context/AuthContext';
import React, { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Plans from '@/components/Plans';
import CoolLayout from '@/components/CoolLayout';
import { collection, doc, documentId, getCountFromServer, getDoc, where, query } from 'firebase/firestore';
import { db } from '@/firebase';

export default function RegisterPage() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [step, setStep] = useState(0)
    const [authenticating, setAuthenticating] = useState(false)
    // const [usernameList, setUsernameList] = useState([])
    const [userExists, setUserExists] = useState(false)

    const { signup, addUsername, currentUser } = useAuth()

    async function checkUserExists(id) {
        const snap = await getCountFromServer(query(
            collection(db, 'usernames'), where(documentId(), '==', id)
        ))
        console.log(snap.data())
        return !!snap.data().count
    }

    async function handleSubmit() {
        setUserExists(false)
        if (!username || !email || (step == 1 && (!password || password.length < 8)) || username.length < 5) { return }
        if (step === 0) {

            console.log('CHECK USERNAME')
            const usernameStatus = await checkUserExists(username)
            if (usernameStatus) {
                setUserExists(true)
            } else {
                console.log('Unique username provided')
                setUserExists(false)
                setStep(1)
            }
            return
        }
        try {
            setAuthenticating(true)
            const userCredential = await signup(email, password)
            const currentUser = userCredential.user
            const addUsernameStatus = await addUsername(currentUser, username)
            console.log(currentUser)
            setStep(2)
        } catch (err) {
            console.log('Failed to register', err.message)
        } finally {
            setAuthenticating(false)
        }
    }

    function goBack() {
        setStep(0)
    }

    // useEffect(() => {
    //     async function fetchUsernames() {
    //         const docRef = doc(db, "meta", "usernames");
    //         const docSnap = await getDoc(docRef);

    //         if (docSnap.exists()) {
    //             // console.log("Document data:", docSnap.data());
    //             const cloudUsernames = Object.keys(docSnap.data())
    //             console.log(cloudUsernames)
    //             setUsernameList(cloudUsernames)
    //         } else {
    //             // docSnap.data() will be undefined in this case
    //             console.log("No such document!");
    //         }
    //     }
    //     if (usernameList.length != 0) {
    //         return
    //     }
    //     fetchUsernames()
    // }, [])



    return (
        <CoolLayout>
            <Main>
                <Suspense loading={(
                    <div className='flex items-center justify-center flex-col flex-1'>
                        <i className="fa-solid fa-spinner text-white animate-spin text-4xl sm:text-5xl md:text-6xl"></i>
                    </div>
                )}>
                    {(step < 2 && !currentUser) ? (
                        <Register submitting={authenticating} userExists={userExists} email={email} password={password} username={username} setUsername={setUsername} setEmail={setEmail} setPassword={setPassword} authenticating={authenticating} handleSubmit={handleSubmit} goBack={goBack} step={step} />
                    ) : (
                        <Plans />
                    )}
                </Suspense>
            </Main>
        </CoolLayout>
    )
}
