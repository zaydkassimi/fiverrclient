import React from 'react'
import FileUploader from '../../components/FileUploader'

export default function Inbox() {
  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Upload Inbox</h2>
      <div className="bg-white p-4 rounded shadow-sm mb-4">
        <p className="text-sm text-gray-600">Clients can upload receipts and documents here.</p>
      </div>

      <div className="max-w-3xl">
        <FileUploader />
      </div>
    </div>
  )
}


