import React, { useEffect, useState } from 'react'
import Table from '../../components/Table'
import Modal from '../../components/Modal'
import { getAccounts, addAccount } from '../../lib/mockApi'

export default function Accounting() {
  const [accounts, setAccounts] = useState([] as any[])
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ code: '', name: '', type: '' })

  useEffect(() => {
    setAccounts(getAccounts())
  }, [])

  const columns = [
    { key: 'code', title: 'Code' },
    { key: 'name', title: 'Name' },
    { key: 'type', title: 'Type' }
  ]

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const created = addAccount({ code: form.code, name: form.name, type: form.type })
    setAccounts((s) => [created, ...s])
    setForm({ code: '', name: '', type: '' })
    setOpen(false)
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Accounting</h2>
        <button className="px-3 py-2 bg-blue-600 text-white rounded" onClick={() => setOpen(true)}>
          New Account
        </button>
      </div>

      <div className="bg-white p-4 rounded shadow-sm">
        <Table columns={columns} data={accounts} />
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="Create Account">
        <form onSubmit={submit} className="space-y-3">
          <div>
            <label className="block text-sm">Code</label>
            <input className="w-full border px-3 py-2 rounded" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} required />
          </div>
          <div>
            <label className="block text-sm">Name</label>
            <input className="w-full border px-3 py-2 rounded" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          </div>
          <div>
            <label className="block text-sm">Type</label>
            <input className="w-full border px-3 py-2 rounded" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} />
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


