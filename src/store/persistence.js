import * as XLSX from 'xlsx'

const STORAGE_KEY = 'taskTrackerState'

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem(STORAGE_KEY)
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (err) {
    console.error('Error loading state from localStorage:', err)
    return undefined
  }
}

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem(STORAGE_KEY, serializedState)
  } catch (err) {
    console.error('Error saving state to localStorage:', err)
  }
}

export const exportState = () => {
  try {
    const state = loadState()
    const tasks = state?.tasks?.tasks || []
    const date = new Date().toISOString().split('T')[0]

    // Export to Excel
    const worksheetData = tasks.map((task) => ({
      'Task ID': task.id,
      'Title': task.title,
      'Description': task.description || '',
      'Status': task.completed ? 'Completed' : 'Active',
      'Priority': task.priority ? task.priority.charAt(0).toUpperCase() + task.priority.slice(1) : 'Medium',
      'Category': task.category || 'Other',
      'Created Date': task.createdAt ? new Date(task.createdAt).toLocaleDateString() : '',
      'Updated Date': task.updatedAt ? new Date(task.updatedAt).toLocaleDateString() : '',
      'Created At (ISO)': task.createdAt || '',
      'Updated At (ISO)': task.updatedAt || '',
    }))

    const worksheet = XLSX.utils.json_to_sheet(worksheetData)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Tasks')
    
    // Auto-size columns
    const colWidths = [
      { wch: 15 }, // Task ID
      { wch: 30 }, // Title
      { wch: 50 }, // Description
      { wch: 12 }, // Status
      { wch: 10 }, // Priority
      { wch: 15 }, // Category
      { wch: 15 }, // Created Date
      { wch: 15 }, // Updated Date
      { wch: 25 }, // Created At (ISO)
      { wch: 25 }, // Updated At (ISO)
    ]
    worksheet['!cols'] = colWidths

    XLSX.writeFile(workbook, `task-tracker-${date}.xlsx`)
  } catch (err) {
    console.error('Error exporting state:', err)
    throw err
  }
}

export const importState = (file) => {
  return new Promise((resolve, reject) => {
    const fileExtension = file.name.split('.').pop().toLowerCase()
    
    if (fileExtension !== 'xlsx' && fileExtension !== 'xls') {
      reject(new Error('Please select an Excel file (.xlsx or .xls)'))
      return
    }

    // Import from Excel
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result)
        const workbook = XLSX.read(data, { type: 'array' })
        const firstSheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[firstSheetName]
        const jsonData = XLSX.utils.sheet_to_json(worksheet)

        // Convert Excel data back to task format
        const tasks = jsonData.map((row, index) => {
          // Try to get ISO date first, fallback to formatted date
          const createdAt = row['Created At (ISO)'] || 
            (row['Created Date'] ? new Date(row['Created Date']).toISOString() : new Date().toISOString())
          const updatedAt = row['Updated At (ISO)'] || 
            (row['Updated Date'] ? new Date(row['Updated Date']).toISOString() : createdAt)

          return {
            id: row['Task ID'] || `imported-${Date.now()}-${index}`,
            title: row['Title'] || `Task ${index + 1}`,
            description: row['Description'] || '',
            completed: row['Status'] === 'Completed' || row['Status'] === 'completed',
            priority: (row['Priority'] || 'medium').toLowerCase(),
            category: row['Category'] || 'Other',
            createdAt: createdAt,
            updatedAt: updatedAt,
          }
        })

        // Create state structure matching the app's format
        const state = {
          tasks: {
            tasks: tasks,
            categories: [...new Set(tasks.map(t => t.category))],
            priorities: ['low', 'medium', 'high'],
          },
          filters: {
            statusFilter: 'all',
            categoryFilter: 'all',
            priorityFilter: 'all',
            searchQuery: '',
            sortBy: 'createdAt',
            sortOrder: 'desc',
          },
          history: {
            past: [],
            future: [],
          },
          toast: {
            toasts: [],
          },
        }

        resolve(state)
      } catch (err) {
        reject(new Error('Invalid Excel file format'))
      }
    }
    reader.onerror = () => reject(new Error('Error reading Excel file'))
    reader.readAsArrayBuffer(file)
  })
}
