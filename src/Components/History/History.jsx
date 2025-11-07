import Navbar from "../SideBar/Navbar"
import { useState } from 'react'

const History = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState('list') // 'list' or 'timeline'

  // Sample history data
  const [historyItems, setHistoryItems] = useState([
    {
      id: 1,
      type: 'share',
      title: 'My Vacation Diary',
      description: 'Shared with friend@example.com',
      date: '2024-01-15 14:30',
      timestamp: new Date('2024-01-15T14:30:00'),
      status: 'completed',
      icon: '📤',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      id: 2,
      type: 'receive',
      title: "Friend's Travel Journal",
      description: 'Received from travelbuddy@example.com',
      date: '2024-01-15 12:15',
      timestamp: new Date('2024-01-15T12:15:00'),
      status: 'completed',
      icon: '📥',
      color: 'text-green-500',
      bgColor: 'bg-green-50'
    },
    {
      id: 3,
      type: 'compress',
      title: 'Work Notes Archive',
      description: 'Compressed 15 entries to save space',
      date: '2024-01-14 16:45',
      timestamp: new Date('2024-01-14T16:45:00'),
      status: 'completed',
      icon: '🗜️',
      color: 'text-purple-500',
      bgColor: 'bg-purple-50'
    },
    {
      id: 4,
      type: 'export',
      title: 'Monthly Backup',
      description: 'Exported as PDF format',
      date: '2024-01-14 10:20',
      timestamp: new Date('2024-01-14T10:20:00'),
      status: 'completed',
      icon: '📄',
      color: 'text-orange-500',
      bgColor: 'bg-orange-50'
    },
    {
      id: 5,
      type: 'create',
      title: 'New Diary Entry',
      description: 'Created "Weekend Reflections"',
      date: '2024-01-13 09:15',
      timestamp: new Date('2024-01-13T09:15:00'),
      status: 'completed',
      icon: '✏️',
      color: 'text-teal-500',
      bgColor: 'bg-teal-50'
    },
    {
      id: 6,
      type: 'edit',
      title: 'Updated Personal Goals',
      description: 'Modified goals for 2024',
      date: '2024-01-12 18:30',
      timestamp: new Date('2024-01-12T18:30:00'),
      status: 'completed',
      icon: '📝',
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50'
    },
    {
      id: 7,
      type: 'delete',
      title: 'Cleaned Old Entries',
      description: 'Removed 5 old diary entries',
      date: '2024-01-12 11:45',
      timestamp: new Date('2024-01-12T11:45:00'),
      status: 'completed',
      icon: '🗑️',
      color: 'text-red-500',
      bgColor: 'bg-red-50'
    },
    {
      id: 8,
      type: 'failed',
      title: 'Share Failed',
      description: 'Failed to send to colleague@company.com',
      date: '2024-01-11 15:20',
      timestamp: new Date('2024-01-11T15:20:00'),
      status: 'failed',
      icon: '❌',
      color: 'text-gray-500',
      bgColor: 'bg-gray-50'
    }
  ])

  // Filter history items based on selections
  const filteredItems = historyItems.filter(item => {
    const matchesPeriod = selectedPeriod === 'all' || 
      (selectedPeriod === 'today' && isToday(item.timestamp)) ||
      (selectedPeriod === 'week' && isThisWeek(item.timestamp)) ||
      (selectedPeriod === 'month' && isThisMonth(item.timestamp))
    
    const matchesCategory = selectedCategory === 'all' || item.type === selectedCategory
    
    const matchesSearch = searchTerm === '' || 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesPeriod && matchesCategory && matchesSearch
  })

  // Helper functions for date filtering
  const isToday = (date) => {
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  const isThisWeek = (date) => {
    const today = new Date()
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()))
    return date >= startOfWeek
  }

  const isThisMonth = (date) => {
    const today = new Date()
    return date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear()
  }

  // Group items by date for timeline view
  const groupedItems = filteredItems.reduce((groups, item) => {
    const date = item.timestamp.toDateString()
    if (!groups[date]) {
      groups[date] = []
    }
    groups[date].push(item)
    return groups
  }, {})

  // Statistics
  const stats = {
    total: historyItems.length,
    today: historyItems.filter(item => isToday(item.timestamp)).length,
    thisWeek: historyItems.filter(item => isThisWeek(item.timestamp)).length,
    byType: historyItems.reduce((acc, item) => {
      acc[item.type] = (acc[item.type] || 0) + 1
      return acc
    }, {})
  }

  const clearHistory = () => {
    if (window.confirm('Are you sure you want to clear all history? This action cannot be undone.')) {
      setHistoryItems([])
    }
  }

  const exportHistory = () => {
    // Simulate export
    const historyData = {
      exportedAt: new Date().toISOString(),
      totalItems: historyItems.length,
      items: historyItems
    }
    const dataStr = JSON.stringify(historyData, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `diary-history-${new Date().toISOString().split('T')[0]}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  const retryAction = (item) => {
    if (item.type === 'failed') {
      // Logic to retry failed action
      alert(`Retrying: ${item.title}`)
    }
  }

  return (
    <>
      <div className="ml-16 md:ml-64 min-h-screen bg-gray-50">
        <Navbar />
        
        <div className="p-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Activity History</h1>
            <p className="text-gray-600">Track all your diary activities and operations</p>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="stats shadow bg-white">
              <div className="stat">
                <div className="stat-figure text-primary">
                  <span className="text-2xl">📊</span>
                </div>
                <div className="stat-title">Total Activities</div>
                <div className="stat-value">{stats.total}</div>
                <div className="stat-desc">All time</div>
              </div>
            </div>
            
            <div className="stats shadow bg-white">
              <div className="stat">
                <div className="stat-figure text-secondary">
                  <span className="text-2xl">📅</span>
                </div>
                <div className="stat-title">Today</div>
                <div className="stat-value">{stats.today}</div>
                <div className="stat-desc">Activities today</div>
              </div>
            </div>
            
            <div className="stats shadow bg-white">
              <div className="stat">
                <div className="stat-figure text-accent">
                  <span className="text-2xl">🔄</span>
                </div>
                <div className="stat-title">This Week</div>
                <div className="stat-value">{stats.thisWeek}</div>
                <div className="stat-desc">Last 7 days</div>
              </div>
            </div>
            
            <div className="stats shadow bg-white">
              <div className="stat">
                <div className="stat-figure text-success">
                  <span className="text-2xl">✅</span>
                </div>
                <div className="stat-title">Successful</div>
                <div className="stat-value">{historyItems.filter(item => item.status === 'completed').length}</div>
                <div className="stat-desc">Completed actions</div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="bg-white rounded-lg shadow p-4 mb-6">
            <div className="flex flex-col lg:flex-row gap-4 justify-between items-center">
              <div className="flex flex-wrap gap-4 items-center">
                {/* Search */}
                <div className="form-control">
                  <input 
                    type="text" 
                    placeholder="Search history..." 
                    className="input input-bordered input-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                {/* Period Filter */}
                <select 
                  className="select select-bordered select-sm"
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                </select>

                {/* Category Filter */}
                <select 
                  className="select select-bordered select-sm"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="all">All Categories</option>
                  <option value="share">Shares</option>
                  <option value="receive">Receives</option>
                  <option value="compress">Compression</option>
                  <option value="export">Exports</option>
                  <option value="create">Creations</option>
                  <option value="edit">Edits</option>
                  <option value="delete">Deletions</option>
                </select>
              </div>

              <div className="flex gap-2">
                {/* View Mode Toggle */}
                <div className="join">
                  <button 
                    className={`join-item btn btn-sm ${viewMode === 'list' ? 'btn-active' : ''}`}
                    onClick={() => setViewMode('list')}
                  >
                    📋 List
                  </button>
                  <button 
                    className={`join-item btn btn-sm ${viewMode === 'timeline' ? 'btn-active' : ''}`}
                    onClick={() => setViewMode('timeline')}
                  >
                    ⏰ Timeline
                  </button>
                </div>

                {/* Actions */}
                <button 
                  className="btn btn-outline btn-sm"
                  onClick={exportHistory}
                >
                  Export History
                </button>
                <button 
                  className="btn btn-error btn-sm"
                  onClick={clearHistory}
                  disabled={historyItems.length === 0}
                >
                  Clear All
                </button>
              </div>
            </div>
          </div>

          {/* Activity Type Summary */}
          <div className="bg-white rounded-lg shadow p-4 mb-6">
            <h3 className="font-semibold mb-3">Activity Summary</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
              {Object.entries(stats.byType).map(([type, count]) => {
                const item = historyItems.find(h => h.type === type)
                return (
                  <div key={type} className="text-center p-2 rounded-lg bg-gray-50">
                    <div className="text-2xl">{item?.icon}</div>
                    <div className="text-sm font-semibold capitalize">{type}</div>
                    <div className="text-lg font-bold">{count}</div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Content */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold">
                Activity History ({filteredItems.length} items)
              </h2>
            </div>

            <div className="p-4">
              {filteredItems.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-6xl mb-4">📜</div>
                  <h3 className="text-lg font-semibold text-gray-600">No history found</h3>
                  <p className="text-gray-500">Try adjusting your filters or search terms</p>
                </div>
              ) : viewMode === 'list' ? (
                /* List View */
                <div className="space-y-3">
                  {filteredItems.map(item => (
                    <div 
                      key={item.id} 
                      className={`flex items-start gap-4 p-4 rounded-lg border-l-4 ${item.bgColor} border-l-${item.color.split('-')[1]}-500`}
                    >
                      <div className={`text-2xl ${item.color}`}>
                        {item.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="font-semibold">{item.title}</h3>
                          <span className="text-sm text-gray-500">{item.date}</span>
                        </div>
                        <p className="text-gray-600 mt-1">{item.description}</p>
                        <div className="flex gap-2 mt-2">
                          <span className={`badge badge-sm ${item.status === 'completed' ? 'badge-success' : 'badge-error'}`}>
                            {item.status}
                          </span>
                          <span className="badge badge-sm badge-outline capitalize">
                            {item.type}
                          </span>
                        </div>
                      </div>
                      {item.status === 'failed' && (
                        <button 
                          className="btn btn-xs btn-primary"
                          onClick={() => retryAction(item)}
                        >
                          Retry
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                /* Timeline View */
                <div className="space-y-6">
                  {Object.entries(groupedItems).map(([date, items]) => (
                    <div key={date}>
                      <h3 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b">
                        {date}
                      </h3>
                      <div className="space-y-4">
                        {items.map((item, index) => (
                          <div key={item.id} className="flex gap-4">
                            {/* Timeline line */}
                            <div className="flex flex-col items-center">
                              <div className={`w-3 h-3 rounded-full ${item.color} ${item.bgColor}`}></div>
                              {index < items.length - 1 && (
                                <div className="w-0.5 h-full bg-gray-300 mt-1"></div>
                              )}
                            </div>
                            
                            {/* Content */}
                            <div className={`flex-1 p-4 rounded-lg ${item.bgColor} mb-4`}>
                              <div className="flex justify-between items-start">
                                <div className="flex items-center gap-3">
                                  <span className="text-xl">{item.icon}</span>
                                  <h4 className="font-semibold">{item.title}</h4>
                                </div>
                                <span className="text-sm text-gray-500">
                                  {item.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                              </div>
                              <p className="text-gray-600 mt-2 ml-8">{item.description}</p>
                              <div className="flex gap-2 mt-2 ml-8">
                                <span className={`badge badge-sm ${item.status === 'completed' ? 'badge-success' : 'badge-error'}`}>
                                  {item.status}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default History