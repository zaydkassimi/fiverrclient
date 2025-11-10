import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import { AuthProvider, useAuth } from '../context/AuthContext'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

function AuthGate({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!router.isReady) return
    const publicPaths = ['/login']
    if (!user && !publicPaths.includes(router.pathname)) {
      router.push('/login')
    }
  }, [user, router])

  return <>{children}</>
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <AuthGate>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthGate>
    </AuthProvider>
  )
}


