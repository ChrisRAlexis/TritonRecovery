'use client'

import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'

export default function Dashboard() {
  const session = useSession()
  const supabase = useSupabaseClient()
  const [userName, setUserName] = useState('')

  useEffect(() => {
    if (session) {
      const fetchUser = async () => {
        const { data } = await supabase.auth.getUser()
        setUserName(data?.user?.email ?? 'Client')
      }
      fetchUser()
    }
  }, [session])

  if (!session) {
    return (
      <p className="p-4">You must be signed in to access the client portal.</p>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="mb-4 text-2xl font-bold">Welcome, {userName}</h1>
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
      <div className="mt-6">
        <p className="text-gray-600">
          Use the sidebar or navigation to submit new deals, view messages, or
          check status.
        </p>
      </div>
    </div>
  )
}
