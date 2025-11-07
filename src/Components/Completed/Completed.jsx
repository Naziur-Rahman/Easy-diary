import Navbar from "../SideBar/Navbar"
import { useState } from 'react'

const Completed = () => {
  const [selectedItems, setSelectedItems] = useState([])
  const [activeTab, setActiveTab] = useState('shared')
  const [filter, setFilter] = useState('all')
  const [dateRange, setDateRange] = useState('all')

  // Sample completed activities data
  const [completedActivities, setCompletedActivities] = useState({
    shared: [
      {
        id: 1,
        title: "My Vacation Diary",
        recipient: "friend@example.com",
        date: "2024-01-15",
        type: "email",
        status: "delivered",
        size: "2.1 KB",
        duration: "2 days",
        downloadCount: 3
      },
      {
        id: 2,
        title: "Work Notes Collaboration",
        recipient: "team@company.com",
        date: "2024-01-14",
        type: "collaboration",
        status: "completed",
        size: "3.4 KB",
        duration: "5 days",
        downloadCount: 12
      },
      {
        id: 3,
        title: "Personal Thoughts",
        recipient: "family@example.com",
        date: "2024-01-13",
        type: "email",
        status: "read",
        size: "1.8 KB",
        duration: "1 day",
        downloadCount: 1
      }
    ],
    received: [
      {
        id: 4,
        title: "Friend's Travel Journal",
        sender: "friend@example.com",
        date: "2024-01-15",
        type: "share",
        status: "saved",
        size: "2.5 KB",
        importDate: "2024-01-15",
        source: "email"
      },
      {
        id: 5,
        title: "Project Documentation",
        sender: "colleague@company.com",
        date: "2024-01-14",
        type: "collaboration",
        status: "archived",
        size: "4.2 KB",
        importDate: "2024-01-14",
        source: "cloud"
      }
    ],
    exported: [
      {
        id: 6,
        title: "Complete Diary Backup",
        format: "PDF",
        date: "2024-01-15",
        size: "15.2 MB",
        pages: 45,
        status: "completed",
        downloadUrl: "#"
      },
      {
        id: 7,
        title: "Monthly Summary",
        format: "Excel",
        date: "2024-01-14",
        size: "2.1 MB",
        pages: 12,
        status: "completed",
        downloadUrl: "#"
      }
    ]
  })

  const toggleItemSelection = (itemId) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    )
  }

  const selectAllItems = () => {
    const currentItems = completedActivities[activeTab]
    setSelectedItems(currentItems.map(item => item.id))
  }

  const clearSelection = () => {
    setSelectedItems([])
  }

  const downloadItems = () => {
    if (selectedItems.length === 0) return
    
    // Simulate download
    alert(`Downloading ${selectedItems.length} items...`)
    // Add actual download logic here
  }

  const shareAgain = (item) => {
    document.getElementById('share_again_modal').showModal()
    // Pre-fill share form with previous recipient
  }

  const deleteItems = () => {
    if (selectedItems.length === 0) return
    
    setCompletedActivities(prev => ({
      ...prev,
      [activeTab]: prev[activeTab].filter(item => !selectedItems.includes(item.id))
    }))
    setSelectedItems([])
    
    document.getElementById('delete_success_modal').showModal()
  }

  const getStatusBadge = (status) => {
    const statusConfig = {
      delivered: { class: 'badge-success', text: 'Delivered' },
      completed: { class: 'badge-primary', text: 'Completed' },
      read: { class: 'badge-info', text: 'Read' },
      saved: { class: 'badge-success', text: 'Saved' },
      archived: { class: 'badge-secondary', text: 'Archived' }
    }
    const config = statusConfig[status] || { class: 'badge-ghost', text: status }
    return <span className={`badge ${config.class}`}>{config.text}</span>
  }

  const getTypeBadge = (type) => {
    const typeConfig = {
      email: { class: 'badge-primary', icon: '✉️' },
      collaboration: { class: 'badge-secondary', icon: '👥' },
      share: { class: 'badge-accent', icon: '📤' },
      export: { class: 'badge-warning', icon: '📄' }
    }
    const config = typeConfig[type] || { class: 'badge-ghost', icon: '📁' }
    return <span className={`badge ${config.class}`}>{config.icon} {type}</span>
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const currentItems = completedActivities[activeTab]
  const totalActivities = Object.values(completedActivities).reduce((acc, arr) => acc + arr.length, 0)

  return (
    <>
      <div className="ml-16 md:ml-64 min-h-screen bg-gray-50">
        <Navbar />
        
        <div className="p-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Completed Activities</h1>
            <p className="text-gray-600">View your completed shares, receives, and exports</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="stats shadow bg-white">
              <div className="stat">
                <div className="stat-figure text-primary">
                  <span className="text-2xl">📤</span>
                </div>
                <div className="stat-title">Shared</div>
                <div className="stat-value">{completedActivities.shared.length}</div>
                <div className="stat-desc">Items you shared</div>
              </div>
            </div>
            
            <div className="stats shadow bg-white">
              <div className="stat">
                <div className="stat-figure text-secondary">
                  <span className="text-2xl">📥</span>
                </div>
                <div className="stat-title">Received</div>
                <div className="stat-value">{completedActivities.received.length}</div>
                <div className="stat-desc">Items received</div>
              </div>
            </div>
            
            <div className="stats shadow bg-white">
              <div className="stat">
                <div className="stat-figure text-accent">
                  <span className="text-2xl">📄</span>
                </div>
                <div className="stat-title">Exported</div>
                <div className="stat-value">{completedActivities.exported.length}</div>
                <div className="stat-desc">Files exported</div>
              </div>
            </div>
            
            <div className="stats shadow bg-white">
              <div className="stat">
                <div className="stat-figure text-success">
                  <span className="text-2xl">✅</span>
                </div>
                <div className="stat-title">Total</div>
                <div className="stat-value">{totalActivities}</div>
                <div className="stat-desc">All activities</div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-lg shadow mb-6">
            <div className="tabs tabs-boxed p-2">
              <button 
                className={`tab tab-lg ${activeTab === 'shared' ? 'tab-active' : ''}`}
                onClick={() => {
                  setActiveTab('shared')
                  setSelectedItems([])
                }}
              >
                📤 Shared ({completedActivities.shared.length})
              </button>
              <button 
                className={`tab tab-lg ${activeTab === 'received' ? 'tab-active' : ''}`}
                onClick={() => {
                  setActiveTab('received')
                  setSelectedItems([])
                }}
              >
                📥 Received ({completedActivities.received.length})
              </button>
              <button 
                className={`tab tab-lg ${activeTab === 'exported' ? 'tab-active' : ''}`}
                onClick={() => {
                  setActiveTab('exported')
                  setSelectedItems([])
                }}
              >
                📄 Exported ({completedActivities.exported.length})
              </button>
            </div>
          </div>

          {/* Filters and Controls */}
          <div className="bg-white rounded-lg shadow p-4 mb-6">
            <div className="flex flex-col lg:flex-row gap-4 justify-between items-center">
              <div className="flex flex-wrap gap-4 items-center">
                <select 
                  className="select select-bordered select-sm"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="delivered">Delivered</option>
                  <option value="completed">Completed</option>
                  <option value="read">Read</option>
                </select>
                
                <select 
                  className="select select-bordered select-sm"
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                </select>
              </div>

              <div className="flex gap-2">
                {selectedItems.length > 0 && (
                  <>
                    <button 
                      className="btn btn-primary btn-sm"
                      onClick={downloadItems}
                    >
                      Download ({selectedItems.length})
                    </button>
                    <button 
                      className="btn btn-error btn-sm"
                      onClick={deleteItems}
                    >
                      Delete ({selectedItems.length})
                    </button>
                  </>
                )}
                <button 
                  className="btn btn-outline btn-sm"
                  onClick={selectAllItems}
                  disabled={currentItems.length === 0}
                >
                  Select All
                </button>
                <button 
                  className="btn btn-outline btn-sm"
                  onClick={clearSelection}
                  disabled={selectedItems.length === 0}
                >
                  Clear
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold">
                {activeTab === 'shared' && 'Shared Items'}
                {activeTab === 'received' && 'Received Items'}
                {activeTab === 'exported' && 'Exported Files'}
                {selectedItems.length > 0 && ` - ${selectedItems.length} selected`}
              </h2>
            </div>

            <div className="overflow-x-auto">
              {currentItems.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-6xl mb-4">✅</div>
                  <h3 className="text-lg font-semibold text-gray-600">
                    No {activeTab} activities found
                  </h3>
                  <p className="text-gray-500">
                    {activeTab === 'shared' && 'You haven\'t shared any diary entries yet'}
                    {activeTab === 'received' && 'You haven\'t received any shared entries yet'}
                    {activeTab === 'exported' && 'You haven\'t exported any files yet'}
                  </p>
                </div>
              ) : (
                <table className="table table-zebra w-full">
                  <thead>
                    <tr>
                      <th>
                        <input 
                          type="checkbox" 
                          className="checkbox" 
                          checked={selectedItems.length === currentItems.length}
                          onChange={(e) => e.target.checked ? selectAllItems() : clearSelection()}
                        />
                      </th>
                      <th>Title</th>
                      {activeTab === 'shared' && <th>Recipient</th>}
                      {activeTab === 'received' && <th>Sender</th>}
                      {activeTab === 'exported' && <th>Format</th>}
                      <th>Date</th>
                      <th>Type</th>
                      <th>Status</th>
                      {activeTab === 'shared' && <th>Downloads</th>}
                      {activeTab === 'exported' && <th>Size</th>}
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map(item => (
                      <tr key={item.id}>
                        <td>
                          <input 
                            type="checkbox" 
                            className="checkbox" 
                            checked={selectedItems.includes(item.id)}
                            onChange={() => toggleItemSelection(item.id)}
                          />
                        </td>
                        <td className="font-medium">{item.title}</td>
                        {activeTab === 'shared' && (
                          <td>
                            <div className="flex items-center gap-2">
                              <div className="avatar">
                                <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs">
                                  {item.recipient.charAt(0).toUpperCase()}
                                </div>
                              </div>
                              {item.recipient}
                            </div>
                          </td>
                        )}
                        {activeTab === 'received' && (
                          <td>
                            <div className="flex items-center gap-2">
                              <div className="avatar">
                                <div className="w-6 h-6 rounded-full bg-secondary text-white flex items-center justify-center text-xs">
                                  {item.sender.charAt(0).toUpperCase()}
                                </div>
                              </div>
                              {item.sender}
                            </div>
                          </td>
                        )}
                        {activeTab === 'exported' && (
                          <td>
                            <span className={`badge ${item.format === 'PDF' ? 'badge-error' : 'badge-success'}`}>
                              {item.format}
                            </span>
                          </td>
                        )}
                        <td>{item.date}</td>
                        <td>{getTypeBadge(item.type)}</td>
                        <td>{getStatusBadge(item.status)}</td>
                        {activeTab === 'shared' && (
                          <td className="text-center">
                            <span className="font-mono">{item.downloadCount}</span>
                          </td>
                        )}
                        {activeTab === 'exported' && (
                          <td className="font-mono text-sm">{item.size}</td>
                        )}
                        <td>
                          <div className="flex gap-1">
                            <button className="btn btn-xs btn-outline">
                              View
                            </button>
                            {activeTab === 'shared' && (
                              <button 
                                className="btn btn-xs btn-primary"
                                onClick={() => shareAgain(item)}
                              >
                                Share Again
                              </button>
                            )}
                            {activeTab === 'exported' && (
                              <button className="btn btn-xs btn-success">
                                Download
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {/* Summary */}
          {currentItems.length > 0 && (
            <div className="mt-6 bg-white rounded-lg shadow p-4">
              <h3 className="font-semibold mb-2">Summary</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Total Items:</span>
                  <span className="font-semibold ml-2">{currentItems.length}</span>
                </div>
                <div>
                  <span className="text-gray-600">Selected:</span>
                  <span className="font-semibold ml-2">{selectedItems.length}</span>
                </div>
                {activeTab === 'shared' && (
                  <div>
                    <span className="text-gray-600">Total Downloads:</span>
                    <span className="font-semibold ml-2">
                      {currentItems.reduce((acc, item) => acc + item.downloadCount, 0)}
                    </span>
                  </div>
                )}
                {activeTab === 'exported' && (
                  <div>
                    <span className="text-gray-600">Total Size:</span>
                    <span className="font-semibold ml-2">
                      {currentItems.reduce((acc, item) => {
                        const size = parseFloat(item.size)
                        return acc + size
                      }, 0).toFixed(1)} MB
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Share Again Modal */}
      <dialog id="share_again_modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 className="font-bold text-lg">Share Again</h3>
          <div className="py-4">
            <p>Select new recipients or use previous settings to share this item again.</p>
            <div className="mt-4 space-y-4">
              <div>
                <label className="label">
                  <span className="label-text">Recipient Email</span>
                </label>
                <input 
                  type="email" 
                  placeholder="Enter email address" 
                  className="input input-bordered w-full"
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text">Message (Optional)</span>
                </label>
                <textarea 
                  placeholder="Add a personal message..." 
                  className="textarea textarea-bordered w-full h-20"
                />
              </div>
            </div>
          </div>
          <div className="modal-action">
            <button className="btn btn-primary">Share Now</button>
          </div>
        </div>
      </dialog>

      {/* Delete Success Modal */}
      <dialog id="delete_success_modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 className="font-bold text-lg text-success">Deleted Successfully!</h3>
          <div className="py-4">
            <p>{selectedItems.length} item(s) have been moved to trash.</p>
          </div>
          <div className="modal-action">
            <button className="btn btn-primary">Close</button>
          </div>
        </div>
      </dialog>
    </>
  )
}

export default Completed