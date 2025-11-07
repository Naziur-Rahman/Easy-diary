import Navbar from "../SideBar/Navbar"
import { useState } from 'react'

const Pending = () => {
  const [selectedItems, setSelectedItems] = useState([])
  const [activeTab, setActiveTab] = useState('outgoing')

  // Sample pending data
  const [pendingItems, setPendingItems] = useState({
    outgoing: [
      {
        id: 1,
        title: "My Vacation Diary",
        recipient: "friend@example.com",
        date: "2024-01-15",
        status: "pending",
        type: "share",
        size: "2.1 KB",
        expires: "2024-01-22"
      },
      {
        id: 2,
        title: "Work Notes Collaboration",
        recipient: "team@company.com",
        date: "2024-01-14",
        status: "sent",
        type: "collaboration",
        size: "3.4 KB",
        expires: "2024-01-21"
      },
      {
        id: 3,
        title: "Personal Thoughts",
        recipient: "family@example.com",
        date: "2024-01-13",
        status: "failed",
        type: "share",
        size: "1.8 KB",
        expires: "2024-01-20"
      }
    ],
    incoming: [
      {
        id: 4,
        title: "Friend's Travel Journal",
        sender: "friend@example.com",
        date: "2024-01-15",
        status: "pending",
        type: "share",
        size: "2.5 KB",
        actionRequired: true
      },
      {
        id: 5,
        title: "Project Documentation",
        sender: "colleague@company.com",
        date: "2024-01-14",
        status: "pending",
        type: "collaboration",
        size: "4.2 KB",
        actionRequired: true
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
    const currentItems = pendingItems[activeTab]
    setSelectedItems(currentItems.map(item => item.id))
  }

  const clearSelection = () => {
    setSelectedItems([])
  }

  const cancelRequests = () => {
    if (selectedItems.length === 0) return
    
    setPendingItems(prev => ({
      ...prev,
      [activeTab]: prev[activeTab].filter(item => !selectedItems.includes(item.id))
    }))
    setSelectedItems([])
    
    // Show success message
    document.getElementById('cancel_success_modal').showModal()
  }

  const resendRequests = () => {
    if (selectedItems.length === 0) return
    
    setPendingItems(prev => ({
      ...prev,
      outgoing: prev.outgoing.map(item => 
        selectedItems.includes(item.id) ? { ...item, status: 'pending' } : item
      )
    }))
    setSelectedItems([])
  }

  const acceptRequest = (itemId) => {
    setPendingItems(prev => ({
      ...prev,
      incoming: prev.incoming.filter(item => item.id !== itemId)
    }))
    document.getElementById('accept_success_modal').showModal()
  }

  const rejectRequest = (itemId) => {
    setPendingItems(prev => ({
      ...prev,
      incoming: prev.incoming.filter(item => item.id !== itemId)
    }))
  }

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { class: 'badge-warning', text: 'Pending' },
      sent: { class: 'badge-info', text: 'Sent' },
      failed: { class: 'badge-error', text: 'Failed' }
    }
    const config = statusConfig[status] || { class: 'badge-ghost', text: status }
    return <span className={`badge ${config.class}`}>{config.text}</span>
  }

  const getTypeBadge = (type) => {
    const typeConfig = {
      share: { class: 'badge-primary', text: 'Share' },
      collaboration: { class: 'badge-secondary', text: 'Collaboration' }
    }
    const config = typeConfig[type] || { class: 'badge-ghost', text: type }
    return <span className={`badge ${config.class}`}>{config.text}</span>
  }

  const currentItems = pendingItems[activeTab]

  return (
    <>
      <div className="ml-16 md:ml-64 min-h-screen bg-gray-50">
        <Navbar />
        
        <div className="p-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Pending Requests</h1>
            <p className="text-gray-600">Manage your outgoing and incoming sharing requests</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="stats shadow bg-white">
              <div className="stat">
                <div className="stat-figure text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </div>
                <div className="stat-title">Outgoing</div>
                <div className="stat-value">{pendingItems.outgoing.length}</div>
                <div className="stat-desc">Requests you sent</div>
              </div>
            </div>
            
            <div className="stats shadow bg-white">
              <div className="stat">
                <div className="stat-figure text-secondary">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="stat-title">Incoming</div>
                <div className="stat-value">{pendingItems.incoming.length}</div>
                <div className="stat-desc">Requests you received</div>
              </div>
            </div>
            
            <div className="stats shadow bg-white">
              <div className="stat">
                <div className="stat-figure text-warning">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="stat-title">Action Required</div>
                <div className="stat-value">{pendingItems.incoming.filter(item => item.actionRequired).length}</div>
                <div className="stat-desc">Need your attention</div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-lg shadow mb-6">
            <div className="tabs tabs-boxed p-2">
              <button 
                className={`tab tab-lg flex-1 ${activeTab === 'outgoing' ? 'tab-active' : ''}`}
                onClick={() => {
                  setActiveTab('outgoing')
                  setSelectedItems([])
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                Outgoing Requests ({pendingItems.outgoing.length})
              </button>
              <button 
                className={`tab tab-lg flex-1 ${activeTab === 'incoming' ? 'tab-active' : ''}`}
                onClick={() => {
                  setActiveTab('incoming')
                  setSelectedItems([])
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Incoming Requests ({pendingItems.incoming.length})
              </button>
            </div>
          </div>

          {/* Controls */}
          {activeTab === 'outgoing' && selectedItems.length > 0 && (
            <div className="bg-white rounded-lg shadow p-4 mb-6">
              <div className="flex flex-wrap gap-2 items-center">
                <span className="font-semibold">{selectedItems.length} items selected</span>
                <div className="flex-1"></div>
                <button 
                  className="btn btn-primary btn-sm"
                  onClick={resendRequests}
                >
                  Resend Selected
                </button>
                <button 
                  className="btn btn-error btn-sm"
                  onClick={cancelRequests}
                >
                  Cancel Selected
                </button>
                <button 
                  className="btn btn-outline btn-sm"
                  onClick={clearSelection}
                >
                  Clear Selection
                </button>
              </div>
            </div>
          )}

          {/* Content */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-lg font-semibold">
                {activeTab === 'outgoing' ? 'Outgoing Requests' : 'Incoming Requests'}
                {selectedItems.length > 0 && ` - ${selectedItems.length} selected`}
              </h2>
              
              {activeTab === 'outgoing' && currentItems.length > 0 && (
                <div className="flex gap-2">
                  <button 
                    className="btn btn-outline btn-sm"
                    onClick={selectAllItems}
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
              )}
            </div>

            <div className="overflow-x-auto">
              {currentItems.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-6xl mb-4">
                    {activeTab === 'outgoing' ? '📤' : '📥'}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-600">
                    No {activeTab} requests
                  </h3>
                  <p className="text-gray-500">
                    {activeTab === 'outgoing' 
                      ? 'You have no pending outgoing requests' 
                      : 'You have no pending incoming requests'
                    }
                  </p>
                </div>
              ) : (
                <table className="table table-zebra w-full">
                  <thead>
                    <tr>
                      {activeTab === 'outgoing' && (
                        <th>
                          <input 
                            type="checkbox" 
                            className="checkbox" 
                            checked={selectedItems.length === currentItems.length}
                            onChange={(e) => e.target.checked ? selectAllItems() : clearSelection()}
                          />
                        </th>
                      )}
                      <th>Title</th>
                      {activeTab === 'outgoing' ? <th>Recipient</th> : <th>Sender</th>}
                      <th>Date</th>
                      <th>Type</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map(item => (
                      <tr key={item.id}>
                        {activeTab === 'outgoing' && (
                          <td>
                            <input 
                              type="checkbox" 
                              className="checkbox" 
                              checked={selectedItems.includes(item.id)}
                              onChange={() => toggleItemSelection(item.id)}
                            />
                          </td>
                        )}
                        <td className="font-medium">{item.title}</td>
                        <td>
                          {activeTab === 'outgoing' ? item.recipient : item.sender}
                        </td>
                        <td>{item.date}</td>
                        <td>{getTypeBadge(item.type)}</td>
                        <td>{getStatusBadge(item.status)}</td>
                        <td>
                          <div className="flex gap-1">
                            {activeTab === 'outgoing' ? (
                              <>
                                <button 
                                  className="btn btn-xs btn-outline"
                                  onClick={() => resendRequests([item.id])}
                                >
                                  Resend
                                </button>
                                <button 
                                  className="btn btn-xs btn-error btn-outline"
                                  onClick={() => cancelRequests([item.id])}
                                >
                                  Cancel
                                </button>
                              </>
                            ) : (
                              <>
                                <button 
                                  className="btn btn-xs btn-success"
                                  onClick={() => acceptRequest(item.id)}
                                >
                                  Accept
                                </button>
                                <button 
                                  className="btn btn-xs btn-error btn-outline"
                                  onClick={() => rejectRequest(item.id)}
                                >
                                  Reject
                                </button>
                              </>
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
        </div>
      </div>

      {/* Cancel Success Modal */}
      <dialog id="cancel_success_modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 className="font-bold text-lg text-success">Success!</h3>
          <div className="py-4">
            <div className="flex items-center gap-3">
              <div className="text-success">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold">Requests cancelled successfully!</p>
                <p className="text-sm text-gray-600 mt-1">
                  {selectedItems.length} request(s) have been cancelled.
                </p>
              </div>
            </div>
          </div>
          <div className="modal-action">
            <button className="btn btn-primary">Close</button>
          </div>
        </div>
      </dialog>

      {/* Accept Success Modal */}
      <dialog id="accept_success_modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 className="font-bold text-lg text-success">Request Accepted!</h3>
          <div className="py-4">
            <p>The shared diary entry has been added to your received items.</p>
          </div>
          <div className="modal-action">
            <button className="btn btn-primary">Close</button>
          </div>
        </div>
      </dialog>
    </>
  )
}
export default Pending