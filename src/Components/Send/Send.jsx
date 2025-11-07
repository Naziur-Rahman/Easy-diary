import Navbar from '../SideBar/Navbar';
import { useState } from 'react';

const Send = () => {
  const [selectedEntries, setSelectedEntries] = useState([]);
  const [recipientEmail, setRecipientEmail] = useState('');
  const [message, setMessage] = useState('');
  const [shareMethod, setShareMethod] = useState('email');
  const [sentItems, setSentItems] = useState([]);

  // Sample sent items data
  const sampleSentItems = [
    { 
      id: 1, 
      title: "My Vacation Diary", 
      recipient: "friend@example.com", 
      date: "2024-01-15", 
      status: "Delivered",
      method: "email"
    },
    { 
      id: 2, 
      title: "Work Notes", 
      recipient: "colleague@company.com", 
      date: "2024-01-14", 
      status: "Sent",
      method: "email"
    },
    { 
      id: 3, 
      title: "Personal Thoughts", 
      recipient: "Cloud Storage", 
      date: "2024-01-13", 
      status: "Uploaded",
      method: "cloud"
    }
  ];

  // Sample diary entries for sharing
  const diaryEntries = [
    { id: 1, title: "My First Day", date: "2024-01-15", size: "2.1 KB" },
    { id: 2, title: "Weekend Adventure", date: "2024-01-14", size: "1.8 KB" },
    { id: 3, title: "Work Progress", date: "2024-01-13", size: "3.2 KB" },
  ];

  const handleSendEntries = () => {
    if (selectedEntries.length === 0) {
      alert('Please select at least one entry to send');
      return;
    }

    if (shareMethod === 'email' && !recipientEmail) {
      alert('Please enter recipient email');
      return;
    }

    // Simulate sending
    const newSentItem = {
      id: Date.now(),
      title: selectedEntries.length === 1 
        ? diaryEntries.find(e => e.id === selectedEntries[0])?.title 
        : `${selectedEntries.length} Entries`,
      recipient: shareMethod === 'email' ? recipientEmail : 'Cloud Storage',
      date: new Date().toISOString().split('T')[0],
      status: 'Sent',
      method: shareMethod
    };

    setSentItems([newSentItem, ...sentItems]);
    setSelectedEntries([]);
    setRecipientEmail('');
    setMessage('');

    // Show success modal
    document.getElementById('send_success_modal').showModal();
  };

  const toggleEntrySelection = (entryId) => {
    setSelectedEntries(prev => 
      prev.includes(entryId) 
        ? prev.filter(id => id !== entryId)
        : [...prev, entryId]
    );
  };

  const selectAllEntries = () => {
    setSelectedEntries(diaryEntries.map(entry => entry.id));
  };

  const clearSelection = () => {
    setSelectedEntries([]);
  };

  const exportAsPDF = () => {
    // Simulate PDF export
    alert('Exporting selected entries as PDF...');
    // Add actual PDF generation logic here
  };

  const shareToCloud = () => {
    setShareMethod('cloud');
    handleSendEntries();
  };

  return (
    <>
      <div className='ml-16 md:ml-64 min-h-screen bg-gray-50'>
        <Navbar />
        
        <div className="p-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Share & Send</h1>
            <p className="text-gray-600">Share your diary entries via email or cloud storage</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column - Send Interface */}
            <div className="space-y-6">
              {/* Share Options Card */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold mb-4">Share Options</h2>
                
                {/* Share Method Selection */}
                <div className="mb-4">
                  <label className="label">
                    <span className="label-text">Share Method</span>
                  </label>
                  <div className="flex gap-4">
                    <label className="cursor-pointer">
                      <input 
                        type="radio" 
                        name="shareMethod" 
                        className="radio radio-primary mr-2" 
                        checked={shareMethod === 'email'}
                        onChange={() => setShareMethod('email')}
                      />
                      Email
                    </label>
                    <label className="cursor-pointer">
                      <input 
                        type="radio" 
                        name="shareMethod" 
                        className="radio radio-primary mr-2" 
                        checked={shareMethod === 'cloud'}
                        onChange={() => setShareMethod('cloud')}
                      />
                      Cloud Storage
                    </label>
                  </div>
                </div>

                {/* Recipient Email (only for email method) */}
                {shareMethod === 'email' && (
                  <div className="mb-4">
                    <label className="label">
                      <span className="label-text">Recipient Email</span>
                    </label>
                    <input 
                      type="email" 
                      placeholder="Enter email address" 
                      className="input input-bordered w-full"
                      value={recipientEmail}
                      onChange={(e) => setRecipientEmail(e.target.value)}
                    />
                  </div>
                )}

                {/* Message */}
                <div className="mb-4">
                  <label className="label">
                    <span className="label-text">Message (Optional)</span>
                  </label>
                  <textarea 
                    placeholder="Add a personal message..." 
                    className="textarea textarea-bordered w-full h-24"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2">
                  <button 
                    className="btn btn-primary"
                    onClick={handleSendEntries}
                    disabled={selectedEntries.length === 0}
                  >
                    Send Selected ({selectedEntries.length})
                  </button>
                  <button 
                    className="btn btn-secondary"
                    onClick={exportAsPDF}
                    disabled={selectedEntries.length === 0}
                  >
                    Export as PDF
                  </button>
                  <button 
                    className="btn btn-outline"
                    onClick={shareToCloud}
                    disabled={selectedEntries.length === 0}
                  >
                    Save to Cloud
                  </button>
                </div>
              </div>

              {/* Available Entries Card */}
              <div className="bg-white rounded-lg shadow">
                <div className="p-4 border-b flex justify-between items-center">
                  <h2 className="text-lg font-semibold">Available Entries</h2>
                  <div className="flex gap-2">
                    <button className="btn btn-xs btn-outline" onClick={selectAllEntries}>
                      Select All
                    </button>
                    <button className="btn btn-xs btn-outline" onClick={clearSelection}>
                      Clear
                    </button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="table table-zebra w-full">
                    <thead>
                      <tr>
                        <th>
                          <label>
                            <input 
                              type="checkbox" 
                              className="checkbox" 
                              checked={selectedEntries.length === diaryEntries.length}
                              onChange={(e) => e.target.checked ? selectAllEntries() : clearSelection()}
                            />
                          </label>
                        </th>
                        <th>Title</th>
                        <th>Date</th>
                        <th>Size</th>
                      </tr>
                    </thead>
                    <tbody>
                      {diaryEntries.map(entry => (
                        <tr key={entry.id}>
                          <td>
                            <label>
                              <input 
                                type="checkbox" 
                                className="checkbox" 
                                checked={selectedEntries.includes(entry.id)}
                                onChange={() => toggleEntrySelection(entry.id)}
                              />
                            </label>
                          </td>
                          <td className="font-medium">{entry.title}</td>
                          <td>{entry.date}</td>
                          <td>{entry.size}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Right Column - Sent History */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b">
                <h2 className="text-lg font-semibold">Sent History</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Recipient</th>
                      <th>Date</th>
                      <th>Method</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sentItems.map(item => (
                      <tr key={item.id}>
                        <td className="font-medium">{item.title}</td>
                        <td>{item.recipient}</td>
                        <td>{item.date}</td>
                        <td>
                          <span className={`badge ${item.method === 'email' ? 'badge-primary' : 'badge-secondary'}`}>
                            {item.method}
                          </span>
                        </td>
                        <td>
                          <span className={`badge ${
                            item.status === 'Delivered' ? 'badge-success' : 
                            item.status === 'Sent' ? 'badge-warning' : 'badge-info'
                          }`}>
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {sentItems.length === 0 && (
                      <tr>
                        <td colSpan="5" className="text-center py-8 text-gray-500">
                          No sent items yet. Share your first diary entry!
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <dialog id="send_success_modal" className="modal">
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
                <p className="font-semibold">Your diary entries have been sent successfully!</p>
                <p className="text-sm text-gray-600 mt-1">
                  {selectedEntries.length} entries shared via {shareMethod}.
                </p>
              </div>
            </div>
          </div>
          <div className="modal-action">
            <button className="btn btn-primary">Close</button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Send;