import Navbar from "../SideBar/Navbar";
import { useState } from "react";

const Compress = () => {
  const [selectedEntries, setSelectedEntries] = useState([]);
  const [compressionStats, setCompressionStats] = useState({
    totalEntries: 0,
    compressedEntries: 0,
    spaceSaved: "0 KB"
  });

  // Sample data - replace with your actual data
  const diaryEntries = [
    { id: 1, title: "My First Day", content: "Today was amazing...", date: "2024-01-15", compressed: false, size: "2.1 KB" },
    { id: 2, title: "Weekend Adventure", content: "Went hiking...", date: "2024-01-14", compressed: true, size: "0.8 KB" },
    { id: 3, title: "Work Progress", content: "Finished the project...", date: "2024-01-13", compressed: false, size: "3.2 KB" },
  ];

  const handleCompressEntries = () => {
    // Logic to compress selected entries
    console.log("Compressing entries:", selectedEntries);
    // Add your compression logic here
    document.getElementById('compression_modal').showModal();
  };

  const handleUncompressEntries = () => {
    // Logic to uncompress selected entries
    console.log("Uncompressing entries:", selectedEntries);
    // Add your uncompression logic here
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

  return (
    <>
      <div className="ml-16 md:ml-64 min-h-screen bg-gray-50">
        <Navbar />
        
        <div className="p-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Storage Management</h1>
            <p className="text-gray-600">Compress diary entries to save storage space</p>
          </div>

          {/* Compression Stats */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">Storage Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{compressionStats.totalEntries}</div>
                <div className="text-gray-600">Total Entries</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{compressionStats.compressedEntries}</div>
                <div className="text-gray-600">Compressed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{compressionStats.spaceSaved}</div>
                <div className="text-gray-600">Space Saved</div>
              </div>
            </div>
          </div>

          {/* Bulk Actions */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">Bulk Actions</h2>
            <div className="flex flex-wrap gap-2 mb-4">
              <button 
                className="btn btn-primary"
                onClick={handleCompressEntries}
                disabled={selectedEntries.length === 0}
              >
                Compress Selected ({selectedEntries.length})
              </button>
              <button 
                className="btn btn-secondary"
                onClick={handleUncompressEntries}
                disabled={selectedEntries.length === 0}
              >
                Uncompress Selected ({selectedEntries.length})
              </button>
              <button className="btn btn-outline" onClick={selectAllEntries}>
                Select All
              </button>
              <button className="btn btn-outline" onClick={clearSelection}>
                Clear Selection
              </button>
            </div>
          </div>

          {/* Entries List */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold">Diary Entries</h2>
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
                    <th>Status</th>
                    <th>Actions</th>
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
                      <td>
                        <div className="font-medium">{entry.title}</div>
                      </td>
                      <td>{entry.date}</td>
                      <td>{entry.size}</td>
                      <td>
                        <span className={`badge ${entry.compressed ? 'badge-success' : 'badge-warning'}`}>
                          {entry.compressed ? 'Compressed' : 'Uncompressed'}
                        </span>
                      </td>
                      <td>
                        <button className="btn btn-xs btn-outline mr-2">
                          {entry.compressed ? 'Uncompress' : 'Compress'}
                        </button>
                        <button className="btn btn-xs btn-ghost">View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Compression Modal */}
      <dialog id="compression_modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 className="font-bold text-lg">Compression Started!</h3>
          <div className="py-4">
            <p>Compressing {selectedEntries.length} entries...</p>
            <progress className="progress progress-primary w-full mt-4"></progress>
            <p className="text-sm text-gray-600 mt-2">
              This may take a few moments. Your entries will be available after compression.
            </p>
          </div>
          <div className="modal-action">
            <button className="btn btn-primary">Close</button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Compress;