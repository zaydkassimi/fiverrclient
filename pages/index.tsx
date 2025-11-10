import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Table from '../components/Table'
import { getInvoices, getAccounts, getEmployees, getInventory } from '../lib/mockApi'

const Card: React.FC<{ title: string; value: string }> = ({ title, value }) => (
  <div className="bg-white p-4 rounded shadow-sm">
    <div className="text-sm text-gray-500">{title}</div>
    <div className="text-2xl font-semibold">{value}</div>
  </div>
)

export default function Dashboard() {
  const [counts, setCounts] = useState({ invoices: 0, accounts: 0, employees: 0, inventory: 0 })
  const recent = [
    { id: 'INV-1001', type: 'Invoice', desc: 'Paid by ACME', date: '2025-11-01' },
    { id: 'PAY-2025-10', type: 'Payroll', desc: 'Payroll processed', date: '2025-10-31' },
    { id: 'GRN-554', type: 'Inventory', desc: 'Shipment received', date: '2025-10-28' }
  ]

  const columns = [
    { key: 'id', title: 'Reference' },
    { key: 'type', title: 'Type' },
    { key: 'desc', title: 'Description' },
    { key: 'date', title: 'Date' }
  ]

  useEffect(() => {
    setCounts({
      invoices: getInvoices().length,
      accounts: getAccounts().length,
      employees: getEmployees().length,
      inventory: getInventory().length
    })
  }, [])

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <div className="space-x-2">
          <Link href="/invoicing" className="px-3 py-2 bg-blue-600 text-white rounded">New Invoice</Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card title="Invoices" value={`${counts.invoices}`} />
        <Card title="Accounts" value={`${counts.accounts}`} />
        <Card title="Employees" value={`${counts.employees}`} />
        <Card title="Inventory Items" value={`${counts.inventory}`} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow-sm">
          <h3 className="font-semibold mb-2">Recent Activity</h3>
          <Table columns={columns} data={recent} />
        </div>

        <div className="bg-white p-4 rounded shadow-sm">
          <h3 className="font-semibold mb-2">Shortcuts</h3>
          <div className="flex flex-wrap gap-2">
            <Link href="/invoicing" className="px-3 py-2 bg-gray-100 rounded">Invoices</Link>
            <Link href="/accounting" className="px-3 py-2 bg-gray-100 rounded">Accounting</Link>
            <Link href="/payroll" className="px-3 py-2 bg-gray-100 rounded">Payroll</Link>
          </div>
        </div>
      </div>
    </div>
  )
}


