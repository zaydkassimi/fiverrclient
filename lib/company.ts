export type TaxMethod = 'effective' | 'saldosteuersatz'

export type Company = {
  name: string
  address: string
  currency: string
  vatRates: number[]
  taxMethod: TaxMethod
  saldosteuersatzPercent?: number | null
}

const KEY = 'ca_company_v1'

const DEFAULT: Company = {
  // Company name required by the client (BY must be included)
  name: 'ALUXO BY ANNUNZIATA TREUHAND',
  address: 'Annunziata Treuhand, Feldstrasse 11a, 8370 Sirnach',
  currency: 'CHF',
  vatRates: [8.1, 2.6, 3.8],
  taxMethod: 'effective',
  saldosteuersatzPercent: null
}

export function getCompany(): Company {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return DEFAULT
    const parsed = JSON.parse(raw) as Company
    // Basic validation / fill missing fields
    return {
      ...DEFAULT,
      ...parsed
    }
  } catch {
    return DEFAULT
  }
}

export function saveCompany(c: Partial<Company>) {
  const current = getCompany()
  const next = { ...current, ...c }
  localStorage.setItem(KEY, JSON.stringify(next))
  return next
}

export function resetCompanyToDefaults() {
  localStorage.setItem(KEY, JSON.stringify(DEFAULT))
  return DEFAULT
}


