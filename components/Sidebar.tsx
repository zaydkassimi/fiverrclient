import Link from 'next/link'

type SidebarProps = {
  isOpen?: boolean
  onClose?: () => void
}

const items = [
  { href: '/', label: 'Dashboard' },
  { href: '/accounting', label: 'Accounting' },
  { href: '/accounting/manual', label: 'Manual Entry' },
  { href: '/accounting/reports', label: 'Accounting Reports' },
  { href: '/sales', label: 'Sales' },
  { href: '/purchasing', label: 'Purchasing' },
  { href: '/payroll', label: 'Payroll' },
  { href: '/inventory', label: 'Inventory' },
  { href: '/reports', label: 'Reports' },
  { href: '/inbox', label: 'Inbox' }
]

import React, { useEffect, useState } from 'react'
import { getCompany } from '../lib/company'

const Sidebar: React.FC<SidebarProps> = ({ isOpen = false, onClose }) => {
  const [companyName, setCompanyName] = useState<string>('CA')

  useEffect(() => {
    try {
      const c = getCompany()
      // show short name or first word
      const short = c.name.split(' ')[0] || c.name
      setCompanyName(short)
    } catch {
      // ignore
    }
  }, [])

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="w-64 bg-white border-r hidden md:block">
        <div className="h-16 flex items-center justify-center border-b">
          <span className="font-bold">{companyName}</span>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            {items.map((it) => (
              <li key={it.href}>
                <Link href={it.href} className="block px-3 py-2 rounded hover:bg-gray-50">
                  {it.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Mobile sidebar overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
        aria-hidden={!isOpen}
      >
        <div className="absolute inset-0 bg-black opacity-30" onClick={onClose} />
        <aside className="relative w-64 bg-white h-full border-r">
          <div className="h-16 flex items-center justify-between px-4 border-b">
            <span className="font-bold">{companyName}</span>
            <button className="text-gray-600" onClick={onClose} aria-label="Close menu">
              ✕
            </button>
          </div>
          <nav className="p-4">
            <ul className="space-y-2">
              {items.map((it) => (
                <li key={it.href}>
                  <Link href={it.href} className="block px-3 py-2 rounded hover:bg-gray-50" onClick={onClose}>
                    {it.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      </div>
    </>
  )
}

export default Sidebar


