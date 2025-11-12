import React, { useEffect, useRef, useState } from 'react'
import { getCompany } from '../lib/company'
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
  const [menuPos, setMenuPos] = useState<{ top: number; right: number } | null>(null)

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!menuRef.current) return
      if (!menuRef.current.contains(e.target as Node)) setMenuOpen(false)
    }
    if (menuOpen) document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [menuOpen])

  useEffect(() => {
    function updateMenuPos() {
      if (!menuRef.current) return setMenuPos(null)
      const rect = menuRef.current.getBoundingClientRect()
      const right = Math.max(12, window.innerWidth - rect.right + 12)
      setMenuPos({ top: rect.bottom + window.scrollY + 8, right })
    }

    if (menuOpen) {
      updateMenuPos()
      window.addEventListener('resize', updateMenuPos)
      window.addEventListener('scroll', updateMenuPos)
    }
    return () => {
      window.removeEventListener('resize', updateMenuPos)
      window.removeEventListener('scroll', updateMenuPos)
    }
  }, [menuOpen])

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  const [companyName, setCompanyName] = useState('Cloud Accounting')

  useEffect(() => {
    try {
      const c = getCompany()
      setCompanyName(c.name || 'Cloud Accounting')
    } catch {
      // ignore
    }
  }, [])

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button
            className="md:hidden p-2 rounded hover:bg-gray-100"
            onClick={onToggleSidebar}
            aria-label="Open menu"
          >
            ☰
          </button>
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
              {companyName.split(' ')[0].slice(0, 2)}
            </div>
            <h1 className="text-lg font-semibold">{companyName}</h1>
          </div>
        </div>

        <div className="flex items-center space-x-3 relative" ref={menuRef}>
          <input
            className="hidden sm:block w-64 border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-200"
            placeholder="Search..."
          />

          <button
            className="w-9 h-9 rounded-full bg-white border shadow-sm flex items-center justify-center text-gray-600"
            aria-label="Profile"
            onClick={() => setMenuOpen((s) => !s)}
            title={user ? `Signed in as ${user.username}` : 'Profile'}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 20c0-3.31 2.69-6 6-6s6 2.69 6 6" />
            </svg>
          </button>

          {menuOpen && (
            // render as fixed element so it escapes any ancestor stacking/overflow issues
            <div
              style={menuPos ? { position: 'fixed', top: menuPos.top, right: menuPos.right } : { position: 'fixed', top: 56, right: 24 }}
              className="w-48 bg-white border rounded-lg shadow-lg z-[9999] overflow-hidden"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="profile-menu"
            >
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center space-x-3"
                onClick={() => {
                  setMenuOpen(false)
                  router.push('/')
                }}
              >
                <span className="text-sm font-medium">Home</span>
              </button>
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center space-x-3"
                onClick={() => {
                  setMenuOpen(false)
                  router.push('/settings/company')
                }}
              >
                <span className="text-sm font-medium">Settings</span>
              </button>
              <div className="border-t" />
              <button className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-50 flex items-center" onClick={handleLogout}>
                <span className="text-sm font-medium">Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar


