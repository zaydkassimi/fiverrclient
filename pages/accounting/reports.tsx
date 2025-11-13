import React from 'react'
import Link from 'next/link'

export default function AccountingReportsPage() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Accounting — Reports</h2>
        <Link href="/accounting" className="text-sm text-blue-600">Back</Link>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <p className="text-gray-600">Customizable accounting reports will be available here (time period, accounts, filters).</p>
        <div className="mt-4">
          <button className="px-3 py-2 bg-blue-600 text-white rounded">Create Report</button>
        </div>
      </div>
    </div>
  )
}


