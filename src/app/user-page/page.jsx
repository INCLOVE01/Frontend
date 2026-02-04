'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useState, useEffect } from "react"

export default function UserPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState({ name: '', email: '' })
  const [userLoading, setUserLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/auth/me')
        const data = await response.json()
        
        if (response.ok) {
          setUser(data)
        } else {
          toast.error('Failed to load user data', {
            position: 'top-center',
            style: { color: 'red' }
          })
        }
      } catch (error) {
        console.error('Error fetching user:', error)
        toast.error('Failed to load user data', {
          position: 'top-center',
          style: { color: 'red' }
        })
      } finally {
        setUserLoading(false)
      }
    }

    fetchUser()
  }, [])

  const handleLogout = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/logout', {
        method: 'POST',
      })

      const data = await response.json()

      if (data.success) {
        toast.success('Logged out successfully', {
          position: 'top-center',
          style: { color: 'green' }
        })
        setTimeout(() => {
          router.push('/auth/login')
        }, 1000)
      } else {
        toast.error('Logout failed', {
          position: 'top-center',
          style: { color: 'red' }
        })
        setLoading(false)
      }
    } catch (error) {
      console.error('Logout error:', error)
      toast.error('Logout failed', {
        position: 'top-center',
        style: { color: 'red' }
      })
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header with Logout Button */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Welcome</h1>
          <Button
            onClick={handleLogout}
            disabled={loading}
            variant="outline"
            className="bg-white hover:bg-slate-50"
          >
            {loading ? 'Logging out...' : 'Logout'}
          </Button>
        </div>

        {/* Welcome Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Welcome!</CardTitle>
            <CardDescription>
              You have successfully logged in. This is your user page.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {userLoading ? (
              <p className="text-slate-600">Loading user information...</p>
            ) : (
              <div className="space-y-2">
                <p className="text-slate-600">
                  <span className="font-semibold">Name:</span> {user.name || 'N/A'}
                </p>
                <p className="text-slate-600">
                  <span className="font-semibold">Email:</span> {user.email || 'N/A'}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Additional Content Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>Manage your account settings</CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
              <CardDescription>Configure your preferences</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  )
}

