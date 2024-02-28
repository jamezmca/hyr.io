'use client'
import CoolLayout from '@/components/CoolLayout'
import Dashboard from '@/components/Dashboard'
import Main from '@/components/Main'
import { useAuth } from '@/context/AuthContext'
import React from 'react'


export default function AdminPage() {
    const { currentUser, loading } = useAuth()

    return (
        <Dashboard />
    )
}
