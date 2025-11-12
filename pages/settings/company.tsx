import React, { useEffect, useState } from 'react'
import { getCompany, saveCompany, Company } from '../../lib/company'
import Link from 'next/link'

export default function CompanySettingsPage() {
  const [company, setCompany] = useState<Company>(() => getCompany())
  const [local, setLocal] = useState<Company>(company)

  useEffect(() => {
    setLocal(company)
  }, [company])

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    const saved = saveCompany(local)
    setCompany(saved)
    alert('Company settings saved.')
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Company Settings</h2>
        <Link href="/" className="text-sm text-blue-600">Back</Link>
      </div>

      <form onSubmit={handleSave} className="bg-white p-4 rounded shadow-sm space-y-4">
        <div>
          <label className="block text-sm">Company name</label>
          <input className="w-full border px-3 py-2 rounded" value={local.name} onChange={(e) => setLocal({ ...local, name: e.target.value })} required />
        </div>

        <div>
          <label className="block text-sm">Address</label>
          <textarea className="w-full border px-3 py-2 rounded" value={local.address} onChange={(e) => setLocal({ ...local, address: e.target.value })} />
        </div>

        <div>
          <label className="block text-sm">Currency</label>
          <select className="w-full border px-3 py-2 rounded" value={local.currency} onChange={(e) => setLocal({ ...local, currency: e.target.value })}>
            <option value="CHF">CHF</option>
            <option value="EUR">EUR</option>
            <option value="USD">USD</option>
          </select>
        </div>

        <div>
          <label className="block text-sm">Standard VAT rates (%)</label>
          <div className="flex space-x-2 mt-2">
            {local.vatRates.map((r, i) => (
              <input
                key={i}
                type="number"
                step="0.1"
                className="w-24 border px-2 py-1 rounded"
                value={String(r)}
                onChange={(e) => {
                  const newRates = [...local.vatRates]
                  newRates[i] = Number(e.target.value || 0)
                  setLocal({ ...local, vatRates: newRates })
                }}
              />
            ))}
            <button type="button" className="px-3 py-1 border rounded" onClick={() => setLocal({ ...local, vatRates: [...local.vatRates, 0] })}>Add</button>
          </div>
        </div>

        <div>
          <label className="block text-sm">Tax method</label>
          <div className="mt-2 space-y-2">
            <label className="flex items-center space-x-2">
              <input type="radio" name="taxMethod" checked={local.taxMethod === 'effective'} onChange={() => setLocal({ ...local, taxMethod: 'effective', saldosteuersatzPercent: null })} />
              <span>Effective method (use VAT rates: {local.vatRates.join('%, ')}%)</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="radio" name="taxMethod" checked={local.taxMethod === 'saldosteuersatz'} onChange={() => setLocal({ ...local, taxMethod: 'saldosteuersatz', saldosteuersatzPercent: local.saldosteuersatzPercent ?? 6.0 })} />
              <span>Saldosteuersatz (enter percentage)</span>
            </label>
            {local.taxMethod === 'saldosteuersatz' && (
              <div className="mt-2">
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  className="w-40 border px-2 py-1 rounded"
                  value={String(local.saldosteuersatzPercent ?? '')}
                  onChange={(e) => setLocal({ ...local, saldosteuersatzPercent: Number(e.target.value || 0) })}
                />
                <div className="text-xs text-gray-500 mt-1">Typical range in Switzerland: 5.6% - 6.4% (enter company-specific rate)</div>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
        </div>
      </form>
    </div>
  )
}


