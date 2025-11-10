import React, { useEffect, useState } from 'react'
import Table from '../../components/Table'
import Modal from '../../components/Modal'
import ConfirmDialog from '../../components/ConfirmDialog'
import { getInvoices, addInvoice, updateInvoice, deleteInvoice } from '../../lib/mockApi'

type InvoiceRow = {
  id: string
  reference: string
  customer: string
  amount: number
  date: string
}

export default function Invoicing() {
  const [invoices, setInvoices] = useState<InvoiceRow[]>([])
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  const [form, setForm] = useState({ reference: '', customer: '', amount: '', date: '' })

  useEffect(() => {
    setInvoices(getInvoices())
  }, [])

  const columns = [
    { key: 'reference', title: 'Reference' },
    { key: 'customer', title: 'Customer' },
    { key: 'amount', title: 'Amount', render: (r: InvoiceRow) => `$${r.amount.toFixed(2)}` },
    { key: 'date', title: 'Date' }
  ]

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (editingId) {
        const updated = updateInvoice(editingId, {
          reference: form.reference,
          customer: form.customer,
          amount: Number(form.amount || 0),
          date: form.date || new Date().toISOString().slice(0, 10)
        })
        setInvoices((s) => s.map((it) => (it.id === editingId ? (updated as any) : it)))
      } else {
        const created = addInvoice({
          reference: form.reference,
          customer: form.customer,
          amount: Number(form.amount || 0),
          date: form.date || new Date().toISOString().slice(0, 10)
        })
        setInvoices((s) => [created, ...s])
      }
      setOpen(false)
      setEditingId(null)
      setForm({ reference: '', customer: '', amount: '', date: '' })
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (row: any) => {
    setEditingId(row.id)
    setForm({ reference: row.reference, customer: row.customer, amount: String(row.amount), date: row.date })
    setOpen(true)
  }

  const handleDelete = (row: any) => {
    setConfirmOpen(true)
    setEditingId(row.id)
  }

  const confirmDelete = () => {
    if (!editingId) return
    deleteInvoice(editingId)
    setInvoices(getInvoices())
    setEditingId(null)
    setConfirmOpen(false)
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Invoicing</h2>
        <button className="px-3 py-2 bg-blue-600 text-white rounded" onClick={() => setOpen(true)}>
          New Invoice
        </button>
      </div>

      <div className="bg-white p-4 rounded shadow-sm">
        <Table
          columns={[
            ...columns,
            { key: 'actions', title: 'Actions', render: (r: any) => (
              <div className="flex gap-2">
                <button className="px-2 py-1 text-sm border rounded" onClick={() => handleEdit(r)}>Edit</button>
                <button className="px-2 py-1 text-sm bg-red-600 text-white rounded" onClick={() => handleDelete(r)}>Delete</button>
              </div>
            ) }
          ]}
          data={invoices}
        />
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="Create Invoice">
        <form onSubmit={submit} className="space-y-3">
          <div>
            <label className="block text-sm">Reference</label>
            <input className="w-full border px-3 py-2 rounded" value={form.reference} onChange={(e) => setForm({ ...form, reference: e.target.value })} required />
          </div>
          <div>
            <label className="block text-sm">Customer</label>
            <input className="w-full border px-3 py-2 rounded" value={form.customer} onChange={(e) => setForm({ ...form, customer: e.target.value })} required />
          </div>
          <div>
            <label className="block text-sm">Amount</label>
            <input type="number" step="0.01" className="w-full border px-3 py-2 rounded" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} required />
          </div>
          <div>
            <label className="block text-sm">Date</label>
            <input type="date" className="w-full border px-3 py-2 rounded" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
          </div>
          <div className="flex justify-end">
            <button type="button" className="px-3 py-2 mr-2 rounded border" onClick={() => setOpen(false)}>Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded" disabled={loading}>{loading ? 'Saving...' : 'Save'}</button>
          </div>
        </form>
      </Modal>
      <ConfirmDialog
        open={confirmOpen}
        title="Delete invoice"
        description="Are you sure you want to delete this invoice? This action cannot be undone."
        onCancel={() => setConfirmOpen(false)}
        onConfirm={confirmDelete}
      />
    </div>
  )
}


