import React, { useEffect, useState } from 'react'
import Table from '../../components/Table'
import Modal from '../../components/Modal'
import { getEmployees, addEmployee } from '../../lib/mockApi'

export default function Payroll() {
  const [employees, setEmployees] = useState([] as any[])
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ name: '', salary: '' })

  useEffect(() => {
    setEmployees(getEmployees())
  }, [])

  const columns = [
    { key: 'name', title: 'Name' },
    { key: 'salary', title: 'Salary', render: (r: any) => `$${Number(r.salary).toFixed(2)}` }
  ]

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const created = addEmployee({ name: form.name, salary: Number(form.salary || 0) })
    setEmployees((s) => [created, ...s])
    setForm({ name: '', salary: '' })
    setOpen(false)
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Payroll</h2>
        <button className="px-3 py-2 bg-blue-600 text-white rounded" onClick={() => setOpen(true)}>
          New Employee
        </button>
      </div>

      <div className="bg-white p-4 rounded shadow-sm">
        <Table columns={columns} data={employees} />
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="Add Employee">
        <form onSubmit={submit} className="space-y-3">
          <div>
            <label className="block text-sm">Name</label>
            <input className="w-full border px-3 py-2 rounded" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          </div>
          <div>
            <label className="block text-sm">Salary</label>
            <input type="number" step="0.01" className="w-full border px-3 py-2 rounded" value={form.salary} onChange={(e) => setForm({ ...form, salary: e.target.value })} required />
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


