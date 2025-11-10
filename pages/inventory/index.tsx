import React, { useEffect, useState } from 'react'
import Table from '../../components/Table'
import Modal from '../../components/Modal'
import { getInventory, addInventoryItem } from '../../lib/mockApi'

export default function Inventory() {
  const [items, setItems] = useState([] as any[])
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ name: '', sku: '', qty: '', location: '' })

  useEffect(() => {
    setItems(getInventory())
  }, [])

  const columns = [
    { key: 'sku', title: 'SKU' },
    { key: 'name', title: 'Name' },
    { key: 'qty', title: 'Quantity' },
    { key: 'location', title: 'Location' }
  ]

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const created = addInventoryItem({ name: form.name, sku: form.sku, qty: Number(form.qty || 0), location: form.location })
    setItems((s) => [created, ...s])
    setForm({ name: '', sku: '', qty: '', location: '' })
    setOpen(false)
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Inventory</h2>
        <button className="px-3 py-2 bg-blue-600 text-white rounded" onClick={() => setOpen(true)}>
          New Item
        </button>
      </div>

      <div className="bg-white p-4 rounded shadow-sm">
        <Table columns={columns} data={items} />
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="Create Inventory Item">
        <form onSubmit={submit} className="space-y-3">
          <div>
            <label className="block text-sm">SKU</label>
            <input className="w-full border px-3 py-2 rounded" value={form.sku} onChange={(e) => setForm({ ...form, sku: e.target.value })} />
          </div>
          <div>
            <label className="block text-sm">Name</label>
            <input className="w-full border px-3 py-2 rounded" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          </div>
          <div>
            <label className="block text-sm">Qty</label>
            <input type="number" className="w-full border px-3 py-2 rounded" value={form.qty} onChange={(e) => setForm({ ...form, qty: e.target.value })} />
          </div>
          <div>
            <label className="block text-sm">Location</label>
            <input className="w-full border px-3 py-2 rounded" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
          </div>
          <div className="flex justify-end">
            <button type="button" className="px-3 py-2 mr-2 rounded border" onClick={() => setOpen(false)}>Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
          </div>
        </form>
      </Modal>
    </div>
  )
}


