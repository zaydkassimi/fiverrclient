import React, { useCallback, useState } from 'react'

type UploadedFile = {
  id: string
  name: string
  size: number
}

export default function FileUploader() {
  const [files, setFiles] = useState<UploadedFile[]>([])

  const onFiles = useCallback((selected: FileList | null) => {
    if (!selected) return
    const newFiles: UploadedFile[] = Array.from(selected).map((f) => ({
      id: `${Date.now()}-${f.name}`,
      name: f.name,
      size: f.size
    }))
    setFiles((prev) => [...newFiles, ...prev])
  }, [])

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    onFiles(e.dataTransfer.files)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFiles(e.target.files)
    e.currentTarget.value = ''
  }

  return (
    <div>
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="border-2 border-dashed border-gray-300 rounded p-6 text-center bg-white"
      >
        <p className="text-sm text-gray-600">Drag & drop files here or</p>
        <label className="mt-2 inline-block">
          <input type="file" multiple onChange={handleInputChange} className="hidden" />
          <span className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer">Select files</span>
        </label>
      </div>

      {files.length > 0 && (
        <div className="mt-4 bg-white p-3 rounded shadow-sm">
          <h4 className="font-semibold mb-2">Files</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            {files.map((f) => (
              <li key={f.id} className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{f.name}</div>
                  <div className="text-xs text-gray-500">{(f.size / 1024).toFixed(1)} KB</div>
                </div>
                <div className="text-xs text-gray-400">Ready</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}


