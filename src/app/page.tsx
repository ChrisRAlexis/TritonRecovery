'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabaseClient'

export default function DashboardPage() {
  const supabase = createClient()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser()
      setUser(data.user)
    }

    getUser()
  }, [])

  if (!user) {
    return (
      <div className="p-6">You must be signed in to access the dashboard.</div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="mb-4 text-2xl font-bold">Welcome, {user.email}</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="text-xl font-semibold">Deals Submitted</h2>
          <p className="mt-2 text-3xl font-bold">5</p>
        </div>
        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="text-xl font-semibold">Total Collected</h2>
          <p className="mt-2 text-3xl font-bold">$23,000</p>
        </div>
      </div>
    </div>
  )
}
