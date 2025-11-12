import React, { useState } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen flex bg-gradient-to-b from-gray-50 to-white">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col">
        <Navbar onToggleSidebar={() => setSidebarOpen((s) => !s)} />
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  )
}

export default Layout


