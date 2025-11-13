import React, { useEffect, useState } from 'react'
import Table from '../../components/Table'
import Modal from '../../components/Modal'
import ConfirmDialog from '../../components/ConfirmDialog'
import { getInvoices, addInvoice, updateInvoice, deleteInvoice } from '../../lib/mockApi'

type PurchaseRow = {
  id: string
  reference: string
  supplier: string
  amount: number
  date: string
}

export default function Purchasing() {
  const [purchases, setPurchases] = useState<PurchaseRow[]>([])
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  const [form, setForm] = useState({ reference: '', supplier: '', amount: '', date: '' })

  useEffect(() => {
    // For frontend-only scaffold, reuse invoices storage as placeholder
    const inv = getInvoices()
    setPurchases(inv.map((i) => ({ id: i.id, reference: i.reference, supplier: i.customer, amount: i.amount, date: i.date })))
  }, [])

  const columns = [
    { key: 'reference', title: 'Reference' },
    { key: 'supplier', title: 'Supplier' },
    { key: 'amount', title: 'Amount', render: (r: PurchaseRow) => `${r.amount.toFixed(2)}` },
    { key: 'date', title: 'Date' }
  ]

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (editingId) {
        // update placeholder storage by mapping back to invoices (not perfect but works for demo)
        updateInvoice(editingId, {
          reference: form.reference,
          customer: form.supplier,
          amount: Number(form.amount || 0),
          date: form.date || new Date().toISOString().slice(0, 10)
        })
        setPurchases((s) => s.map((it) => (it.id === editingId ? { ...it, reference: form.reference, supplier: form.supplier, amount: Number(form.amount || 0), date: form.date } : it)))
      } else {
        const created = addInvoice({
          reference: form.reference,
          customer: form.supplier,
          amount: Number(form.amount || 0),
          date: form.date || new Date().toISOString().slice(0, 10)
        })
        setPurchases((s) => [{ id: created.id, reference: created.reference, supplier: created.customer, amount: created.amount, date: created.date }, ...s])
      }
      setOpen(false)
      setEditingId(null)
      setForm({ reference: '', supplier: '', amount: '', date: '' })
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (row: any) => {
    setEditingId(row.id)
    setForm({ reference: row.reference, supplier: row.supplier, amount: String(row.amount), date: row.date })
    setOpen(true)
  }

  const handleDelete = (row: any) => {
    setConfirmOpen(true)
    setEditingId(row.id)
  }

  const confirmDelete = () => {
    if (!editingId) return
    deleteInvoice(editingId)
    // refresh placeholder list
    const inv = getInvoices()
    setPurchases(inv.map((i) => ({ id: i.id, reference: i.reference, supplier: i.customer, amount: i.amount, date: i.date })))
    setEditingId(null)
    setConfirmOpen(false)
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Purchasing</h2>
        <button className="px-3 py-2 bg-blue-600 text-white rounded" onClick={() => setOpen(true)}>
          New Supplier Invoice
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
          data={purchases}
        />
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="Create Supplier Invoice">
        <form onSubmit={submit} className="space-y-3">
          <div>
            <label className="block text-sm">Reference</label>
            <input className="w-full border px-3 py-2 rounded" value={form.reference} onChange={(e) => setForm({ ...form, reference: e.target.value })} required />
          </div>
          <div>
            <label className="block text-sm">Supplier</label>
            <input className="w-full border px-3 py-2 rounded" value={form.supplier} onChange={(e) => setForm({ ...form, supplier: e.target.value })} required />
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
        title="Delete supplier invoice"
        description="Are you sure you want to delete this supplier invoice? This action cannot be undone."
        onCancel={() => setConfirmOpen(false)}
        onConfirm={confirmDelete}
      />
    </div>
  )
}


