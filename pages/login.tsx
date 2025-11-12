import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useRouter } from 'next/router'
import { getCompany } from '../lib/company'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const router = useRouter()
  const [companyName, setCompanyName] = useState('ALUXO')

  useEffect(() => {
    try {
      const c = getCompany()
      setCompanyName(c.name || 'ALUXO')
    } catch {
      // ignore (localStorage may be unavailable on SSR)
    }
  }, [])

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await login(username, password)
      router.push('/')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
            {companyName.split(' ')[0].slice(0, 2)}
          </div>
          <div>
            <div className="text-lg font-semibold">{companyName}</div>
            <div className="text-sm text-gray-500">Sign in to your account</div>
          </div>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-gray-200 focus:border-blue-400 focus:ring-1 focus:ring-blue-200 px-3 py-2 rounded-md shadow-sm"
              placeholder="you@company.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-200 focus:border-blue-400 focus:ring-1 focus:ring-blue-200 px-3 py-2 rounded-md shadow-sm"
              placeholder="Your password"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="inline-flex items-center text-sm">
              <input type="checkbox" className="mr-2" />
              Remember me
            </label>
            <a className="text-sm text-blue-600 hover:underline" href="#">Forgot?</a>
          </div>

          <div>
            <button type="submit" className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>

        <div className="text-center text-sm text-gray-500 mt-6">
          Need an account? <a className="text-blue-600 hover:underline" href="#">Contact administrator</a>
        </div>
      </div>
    </div>
  )
}


