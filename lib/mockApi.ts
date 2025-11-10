/* Mock client-side API backed by localStorage for frontend-only persistence */

export type Invoice = {
  id: string
  reference: string
  customer: string
  amount: number
  date: string
}

export type Account = {
  id: string
  code: string
  name: string
  type: string
}

export type PayrollEmployee = {
  id: string
  name: string
  salary: number
  role?: string
}

export type InventoryItem = {
  id: string
  sku?: string
  name: string
  qty: number
  location?: string
}

const KEY = {
  INVOICES: 'ca_invoices_v1',
  ACCOUNTS: 'ca_accounts_v1',
  PAYROLL: 'ca_payroll_v1',
  INVENTORY: 'ca_inventory_v1'
}

function readKey<T>(key: string): T[] {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return []
    return JSON.parse(raw) as T[]
  } catch {
    return []
  }
}

function writeKey<T>(key: string, data: T[]) {
  localStorage.setItem(key, JSON.stringify(data))
}

/* Invoices */
export const getInvoices = (): Invoice[] => readKey<Invoice>(KEY.INVOICES)
export const saveInvoices = (list: Invoice[]) => writeKey(KEY.INVOICES, list)
export const addInvoice = (inv: Omit<Invoice, 'id'>) => {
  const list = getInvoices()
  const newItem: Invoice = { id: `${Date.now()}`, ...inv }
  const next = [newItem, ...list]
  saveInvoices(next)
  return newItem
}
export const updateInvoice = (id: string, patch: Partial<Invoice>) => {
  const list = getInvoices()
  const next = list.map((i) => (i.id === id ? { ...i, ...patch } : i))
  saveInvoices(next)
  return next.find((i) => i.id === id) || null
}
export const deleteInvoice = (id: string) => {
  const list = getInvoices()
  const next = list.filter((i) => i.id !== id)
  saveInvoices(next)
  return next
}

/* Accounts */
export const getAccounts = (): Account[] => readKey<Account>(KEY.ACCOUNTS)
export const saveAccounts = (list: Account[]) => writeKey(KEY.ACCOUNTS, list)
export const addAccount = (a: Omit<Account, 'id'>) => {
  const list = getAccounts()
  const newItem: Account = { id: `${Date.now()}`, ...a }
  const next = [newItem, ...list]
  saveAccounts(next)
  return newItem
}

/* Payroll (employees) */
export const getEmployees = (): PayrollEmployee[] => readKey<PayrollEmployee>(KEY.PAYROLL)
export const saveEmployees = (list: PayrollEmployee[]) => writeKey(KEY.PAYROLL, list)
export const addEmployee = (e: Omit<PayrollEmployee, 'id'>) => {
  const list = getEmployees()
  const newItem: PayrollEmployee = { id: `${Date.now()}`, ...e }
  const next = [newItem, ...list]
  saveEmployees(next)
  return newItem
}

/* Inventory */
export const getInventory = (): InventoryItem[] => readKey<InventoryItem>(KEY.INVENTORY)
export const saveInventory = (list: InventoryItem[]) => writeKey(KEY.INVENTORY, list)
export const addInventoryItem = (it: Omit<InventoryItem, 'id'>) => {
  const list = getInventory()
  const newItem: InventoryItem = { id: `${Date.now()}`, ...it }
  const next = [newItem, ...list]
  saveInventory(next)
  return newItem
}


