import React from 'react'

type ConfirmDialogProps = {
  open: boolean
  title?: string
  description?: string
  confirmLabel?: string
  cancelLabel?: string
  onConfirm: () => void
  onCancel: () => void
}

export default function ConfirmDialog({
  open,
  title = 'Confirm',
  description,
  confirmLabel = 'Delete',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel
}: ConfirmDialogProps) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-30" onClick={onCancel} />
      <div className="relative bg-white rounded shadow-lg w-full max-w-md p-4 z-10">
        <h3 className="font-semibold mb-2">{title}</h3>
        {description && <p className="text-sm text-gray-600 mb-4">{description}</p>}
        <div className="flex justify-end space-x-2">
          <button className="px-3 py-2 rounded border" onClick={onCancel}>{cancelLabel}</button>
          <button className="px-3 py-2 bg-red-600 text-white rounded" onClick={onConfirm}>{confirmLabel}</button>
        </div>
      </div>
    </div>
  )
}


