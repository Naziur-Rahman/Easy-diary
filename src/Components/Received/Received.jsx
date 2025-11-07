import Navbar from '../SideBar/Navbar';
import { useState } from 'react';

const Received = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Sample received items data
  const [receivedItems, setReceivedItems] = useState([
    {
      id: 1,
      title: "Friend's Vacation Diary",
      sender: "friend@example.com",
      date: "2024-01-15",
      type: "diary",
      status: "unread",
      size: "2.1 KB",
      preview: "Had an amazing time at the beach today...",
      attachment: true
    },
    {
      id: 2,
      title: "Work Collaboration Notes",
      sender: "colleague@company.com",
      date: "2024-01-14",
      type: "notes",
      status: "read",
      size: "1.8 KB",
      preview: "Project updates and meeting notes...",
      attachment: false
    },
    {
      id: 3,
      title: "Personal Thoughts Sharing",
      sender: "family@example.com",
      date: "2024-01-13",
      type: "diary",
      status: "unread",
      size: "3.2 KB",
      preview: "Just wanted to share some thoughts...",
      attachment: true
    },
    {
      id: 4,
      title: "Travel Journal",
      sender: "travelbuddy@example.com",
      date: "2024-01-12",
      type: "journal",
      status: "read",
      size: "4.5 KB",
      preview: "My adventures across Europe...",
      attachment: true
    }
  ]);

  // Filter items based on selection
  const filteredItems = receivedItems.filter(item => {
    const matchesFilter = filter === 'all' || 
                         (filter === 'unread' && item.status === 'unread') ||
                         (filter === 'diary' && item.type === 'diary') ||
                         (filter === 'with-attachments' && item.attachment);
    
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.preview.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const toggleItemSelection = (itemId) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const selectAllItems = () => {
    setSelectedItems(filteredItems.map(item => item.id));
  };

  const clearSelection = () => {
    setSelectedItems([]);
  };

  const markAsRead = () => {
    setReceivedItems(prev => 
      prev.map(item => 
        selectedItems.includes(item.id) ? { ...item, status: 'read' } : item
      )
    );
    setSelectedItems([]);
  };

  const markAsUnread = () => {
    setReceivedItems(prev => 
      prev.map(item => 
        selectedItems.includes(item.id) ? { ...item, status: 'unread' } : item
      )
    );
    setSelectedItems([]);
  };

  const deleteItems = () => {
    if (selectedItems.length === 0) return;
    
    setReceivedItems(prev => 
      prev.filter(item => !selectedItems.includes(item.id))
    );
    setSelectedItems([]);
  };

  const downloadItem = (item) => {
    // Simulate download
    alert(`Downloading: ${item.title}`);
    // Add actual download logic here
  };

  const viewItemDetails = (item) => {
    // Show item details in modal
    document.getElementById('item_details_modal').showModal();
    // Set the current item details (you can use state for this)
  };

  const getStatusBadge = (status) => {
    return status === 'unread' ? 'badge-primary' : 'badge-ghost';
  };

  const getTypeBadge = (type) => {
    const typeColors = {
      diary: 'badge-success',
      notes: 'badge-warning',
      journal: 'badge-info'
    };
    return typeColors[type] || 'badge-ghost';
  };

  return (
    <>
      <div className='ml-16 md:ml-64 min-h-screen bg-gray-50'>
        <Navbar />
        
        <div className="p-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Received Items</h1>
            <p className="text-gray-600">View and manage diary entries shared with you</p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="stats shadow">
              <div className="stat">
                <div className="stat-title">Total Received</div>
                <div className="stat-value">{receivedItems.length}</div>
                <div className="stat-desc">All items</div>
              </div>
            </div>
            <div className="stats shadow">
              <div className="stat">
                <div className="stat-title">Unread</div>
                <div className="stat-value">{receivedItems.filter(item => item.status === 'unread').length}</div>
                <div className="stat-desc">Need attention</div>
              </div>
            </div>
            <div className="stats shadow">
              <div className="stat">
                <div className="stat-title">With Attachments</div>
                <div className="stat-value">{receivedItems.filter(item => item.attachment).length}</div>
                <div className="stat-desc">Includes files</div>
              </div>
            </div>
            <div className="stats shadow">
              <div className="stat">
                <div className="stat-title">Diary Entries</div>
                <div className="stat-value">{receivedItems.filter(item => item.type === 'diary').length}</div>
                <div className="stat-desc">Personal diaries</div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="flex flex-col lg:flex-row gap-4 justify-between">
              {/* Search */}
              <div className="flex-1">
                <input 
                  type="text" 
                  placeholder="Search received items..." 
                  className="input input-bordered w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Filters */}
              <div className="flex gap-2">
                <select 
                  className="select select-bordered"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="all">All Items</option>
                  <option value="unread">Unread</option>
                  <option value="diary">Diary Entries</option>
                  <option value="with-attachments">With Attachments</option>
                </select>
              </div>

              {/* Bulk Actions */}
              <div className="flex gap-2">
                <button 
                  className="btn btn-outline btn-sm"
                  onClick={selectAllItems}
                  disabled={filteredItems.length === 0}
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

            {/* Action Buttons */}
            {selectedItems.length > 0 && (
              <div className="mt-4 pt-4 border-t flex flex-wrap gap-2">
                <button 
                  className="btn btn-primary btn-sm"
                  onClick={markAsRead}
                >
                  Mark as Read ({selectedItems.length})
                </button>
                <button 
                  className="btn btn-secondary btn-sm"
                  onClick={markAsUnread}
                >
                  Mark as Unread ({selectedItems.length})
                </button>
                <button 
                  className="btn btn-error btn-sm"
                  onClick={deleteItems}
                >
                  Delete ({selectedItems.length})
                </button>
              </div>
            )}
          </div>

          {/* Received Items List */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold">
                Received Items ({filteredItems.length})
                {selectedItems.length > 0 && ` - ${selectedItems.length} selected`}
              </h2>
            </div>
            
            <div className="overflow-x-auto">
              {filteredItems.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-6xl mb-4">📭</div>
                  <h3 className="text-lg font-semibold text-gray-600">No items found</h3>
                  <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                </div>
              ) : (
                <table className="table table-zebra w-full">
                  <thead>
                    <tr>
                      <th>
                        <input 
                          type="checkbox" 
                          className="checkbox" 
                          checked={selectedItems.length === filteredItems.length}
                          onChange={(e) => e.target.checked ? selectAllItems() : clearSelection()}
                        />
                      </th>
                      <th>Title & Preview</th>
                      <th>Sender</th>
                      <th>Date</th>
                      <th>Type</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredItems.map(item => (
                      <tr key={item.id} className={item.status === 'unread' ? 'bg-blue-50' : ''}>
                        <td>
                          <input 
                            type="checkbox" 
                            className="checkbox" 
                            checked={selectedItems.includes(item.id)}
                            onChange={() => toggleItemSelection(item.id)}
                          />
                        </td>
                        <td>
                          <div className="flex items-start gap-3">
                            <div className={`w-2 h-2 rounded-full mt-2 ${item.status === 'unread' ? 'bg-blue-500' : 'bg-transparent'}`}></div>
                            <div>
                              <div className="font-semibold">{item.title}</div>
                              <div className="text-sm text-gray-500 mt-1">{item.preview}</div>
                              {item.attachment && (
                                <div className="text-xs text-blue-500 mt-1 flex items-center gap-1">
                                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                  </svg>
                                  Has attachment
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="font-medium">{item.sender}</td>
                        <td>{item.date}</td>
                        <td>
                          <span className={`badge badge-sm ${getTypeBadge(item.type)}`}>
                            {item.type}
                          </span>
                        </td>
                        <td>
                          <span className={`badge badge-sm ${getStatusBadge(item.status)}`}>
                            {item.status}
                          </span>
                        </td>
                        <td>
                          <div className="flex gap-1">
                            <button 
                              className="btn btn-xs btn-outline"
                              onClick={() => viewItemDetails(item)}
                            >
                              View
                            </button>
                            <button 
                              className="btn btn-xs btn-ghost"
                              onClick={() => downloadItem(item)}
                            >
                              Download
                            </button>
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

      {/* Item Details Modal */}
      <dialog id="item_details_modal" className="modal">
        <div className="modal-box max-w-4xl">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 className="font-bold text-lg mb-4">Item Details</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">
                  <span className="label-text font-semibold">Title</span>
                </label>
                <p>Friend's Vacation Diary</p>
              </div>
              <div>
                <label className="label">
                  <span className="label-text font-semibold">Sender</span>
                </label>
                <p>friend@example.com</p>
              </div>
            </div>
            <div>
              <label className="label">
                <span className="label-text font-semibold">Content</span>
              </label>
              <div className="border rounded-lg p-4 bg-gray-50 max-h-60 overflow-y-auto">
                <p>Had an amazing time at the beach today. The weather was perfect and the water was crystal clear. We spent the whole day swimming, sunbathing, and building sandcastles. Can't wait to come back again soon!</p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">
                Received on January 15, 2024 • Size: 2.1 KB
              </div>
              <button className="btn btn-primary">Download</button>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Received;