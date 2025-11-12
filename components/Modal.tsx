import React from 'react'

type ModalProps = {
  open: boolean
  onClose: () => void
  title?: string
  children?: React.ReactNode
}

export default function Modal({ open, onClose, title, children }: ModalProps) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-40" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-lg p-6 z-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-lg">{title}</h3>
          <button onClick={onClose} aria-label="Close" className="w-9 h-9 inline-flex items-center justify-center rounded-md hover:bg-gray-100">
            ✕
          </button>
        </div>
        <div className="space-y-4">{children}</div>
      </div>
    </div>
  )
}


