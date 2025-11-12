import React from 'react'

type Column<T> = {
  key: string
  title: string
  render?: (row: T) => React.ReactNode
}

type TableProps<T> = {
  columns: Column<T>[]
  data: T[]
}

export default function Table<T extends Record<string, any>>({ columns, data }: TableProps<T>) {
  return (
    <div className="bg-white rounded-lg shadow overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-100">
        <thead className="bg-gradient-to-r from-white to-gray-50">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data.map((row, idx) => (
            <tr key={idx} className={`hover:bg-gray-50 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-3 text-sm text-gray-700 align-top">
                  {col.render ? col.render(row) : String(row[col.key] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}


