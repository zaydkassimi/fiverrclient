import React from 'react'
import { getInvoices } from '../../lib/mockApi'

function downloadCSV(filename: string, rows: string[][]) {
  const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n')
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

export default function Reports() {
  const exportInvoices = () => {
    const inv = getInvoices()
    const rows = [['Reference', 'Customer', 'Amount', 'Date'], ...inv.map((i) => [i.reference, i.customer, String(i.amount), i.date])]
    downloadCSV('invoices.csv', rows)
  }

  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Reports</h2>
      <div className="bg-white p-4 rounded shadow-sm">
        <p className="text-sm text-gray-600 mb-4">Export data from the system.</p>
        <div className="flex gap-2">
          <button className="px-3 py-2 bg-blue-600 text-white rounded" onClick={exportInvoices}>Export Invoices (CSV)</button>
        </div>
      </div>
    </div>
  )
}


