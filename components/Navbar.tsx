import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../context/AuthContext'

type NavbarProps = {
  onToggleSidebar?: () => void
}

const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar }) => {
  const { logout, user } = useAuth()
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!menuRef.current) return
      if (!menuRef.current.contains(e.target as Node)) setMenuOpen(false)
    }
    if (menuOpen) document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [menuOpen])

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  return (
    <header className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button
            className="md:hidden p-2 rounded hover:bg-gray-100"
            onClick={onToggleSidebar}
            aria-label="Open menu"
          >
            ☰
          </button>
          <h1 className="text-lg font-semibold">Cloud Accounting</h1>
        </div>

        <div className="flex items-center space-x-3 relative" ref={menuRef}>
          <input
            className="border rounded px-2 py-1 hidden sm:block"
            placeholder="Search..."
          />

          <button
            className="w-8 h-8 rounded-full bg-transparent flex items-center justify-center text-gray-600"
            aria-label="Profile"
            onClick={() => setMenuOpen((s) => !s)}
            title={user ? `Signed in as ${user.username}` : 'Profile'}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 20c0-3.31 2.69-6 6-6s6 2.69 6 6" />
            </svg>
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow z-50">
              <button
                className="w-full text-left px-3 py-2 hover:bg-gray-50"
                onClick={() => {
                  setMenuOpen(false)
                  router.push('/accounting')
                }}
              >
                Profile
              </button>
              <button
                className="w-full text-left px-3 py-2 hover:bg-gray-50"
                onClick={() => {
                  setMenuOpen(false)
                  router.push('/reports')
                }}
              >
                Settings
              </button>
              <div className="border-t" />
              <button className="w-full text-left px-3 py-2 text-red-600 hover:bg-gray-50" onClick={handleLogout}>
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar


