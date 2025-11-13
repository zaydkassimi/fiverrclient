import React from 'react'
import Link from 'next/link'

export default function AccountingManualPage() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Accounting — Manual Entry</h2>
        <Link href="/accounting" className="text-sm text-blue-600">Back</Link>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <p className="text-gray-600">Create manual journal entries here. This page is a placeholder for the manual entry workflow.</p>
        <div className="mt-4">
          <button className="px-3 py-2 bg-blue-600 text-white rounded">New Manual Entry</button>
        </div>
      </div>
    </div>
  )
}


