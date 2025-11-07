import Cards from './Cards'
import { IoIosSend } from "react-icons/io";
import { MdCallReceived } from "react-icons/md";
import { MdOutlinePendingActions } from "react-icons/md";
import { GrCompliance } from "react-icons/gr";
import { FaHistory, FaChartLine, FaCompressAlt, FaFileExport } from "react-icons/fa";
import { useState, useEffect } from 'react';

const Dashboards = () => {
  const [stats, setStats] = useState({
    send: 0,
    received: 0,
    pending: 0,
    complete: 0,
    compressed: 0,
    exported: 0
  });

  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate data fetching
  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setStats({
          send: 50,
          received: 20,
          pending: 7,
          complete: 50,
          compressed: 15,
          exported: 8
        });

        setRecentActivities([
          { id: 1, type: 'send', title: 'Vacation Diary', recipient: 'friend@example.com', time: '2 hours ago', status: 'completed' },
          { id: 2, type: 'receive', title: 'Travel Journal', sender: 'travel@example.com', time: '5 hours ago', status: 'pending' },
          { id: 3, type: 'compress', title: 'Work Notes', description: 'Compressed 5 entries', time: '1 day ago', status: 'completed' },
          { id: 4, type: 'export', title: 'Monthly Backup', format: 'PDF', time: '2 days ago', status: 'completed' },
          { id: 5, type: 'send', title: 'Personal Thoughts', recipient: 'family@example.com', time: '3 days ago', status: 'failed' }
        ]);

        setLoading(false);
      }, 1000);
    };

    fetchDashboardData();
  }, []);

  const getActivityIcon = (type) => {
    const icons = {
      send: <IoIosSend className="text-blue-500" />,
      receive: <MdCallReceived className="text-green-500" />,
      compress: <FaCompressAlt className="text-purple-500" />,
      export: <FaFileExport className="text-orange-500" />
    };
    return icons[type] || <GrCompliance />;
  };

  const getStatusBadge = (status) => {
    const styles = {
      completed: 'badge-success',
      pending: 'badge-warning',
      failed: 'badge-error'
    };
    return <span className={`badge badge-sm ${styles[status]}`}>{status}</span>;
  };

  if (loading) {
    return (
      <div className='grow p-8'>
        <div className="flex items-center justify-center h-64">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      </div>
    );
  }

  return (
    <div className='grow p-6 bg-gray-50 min-h-screen'>
      {/* Header */}
      <div className="mb-8">
        <h1 className='text-3xl font-bold text-gray-800 mb-2'>Easy Diary Dashboard</h1>
        <p className='text-gray-600'>Welcome back! Here's your activity overview.</p>
      </div>

      {/* Main Stats Cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
        <Cards 
          icon={<IoIosSend className="text-2xl text-blue-500"/>} 
          title="Sent Items" 
          value={stats.send.toString()}
          description="Diary entries shared"
          trend="+12% from last month"
          trendPositive={true}
          bgColor="bg-gradient-to-br from-blue-50 to-blue-100"
        />
        <Cards 
          icon={<MdCallReceived className="text-2xl text-green-500"/>} 
          title="Received" 
          value={stats.received.toString()}
          description="Entries received"
          trend="+5% from last month"
          trendPositive={true}
          bgColor="bg-gradient-to-br from-green-50 to-green-100"
        />
        <Cards 
          icon={<MdOutlinePendingActions className="text-2xl text-yellow-500"/>} 
          title="Pending" 
          value={stats.pending.toString()}
          description="Awaiting action"
          trend="2 new today"
          trendPositive={false}
          bgColor="bg-gradient-to-br from-yellow-50 to-yellow-100"
        />
        <Cards 
          icon={<GrCompliance className="text-2xl text-emerald-500"/>} 
          title="Completed" 
          value={stats.complete.toString()}
          description="Successful operations"
          trend="All time"
          trendPositive={true}
          bgColor="bg-gradient-to-br from-emerald-50 to-emerald-100"
        />
      </div>

      {/* Secondary Stats and Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Storage Stats */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Storage Overview</h2>
            <FaChartLine className="text-gray-400" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <FaCompressAlt className="text-2xl text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">{stats.compressed}</div>
              <div className="text-sm text-gray-600">Compressed Entries</div>
              <div className="text-xs text-green-500 mt-1">+3 this week</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <FaFileExport className="text-2xl text-orange-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">{stats.exported}</div>
              <div className="text-sm text-gray-600">Exported Files</div>
              <div className="text-xs text-green-500 mt-1">+1 today</div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Total Space Saved:</span>
              <span className="font-semibold">45.2 MB</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '65%' }}></div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button className="btn btn-primary btn-block justify-start">
              <IoIosSend className="text-lg" />
              Share New Entry
            </button>
            <button className="btn btn-outline btn-block justify-start">
              <FaCompressAlt className="text-lg" />
              Compress Files
            </button>
            <button className="btn btn-outline btn-block justify-start">
              <FaFileExport className="text-lg" />
              Export Diary
            </button>
            <button className="btn btn-ghost btn-block justify-start">
              <FaHistory className="text-lg" />
              View History
            </button>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Recent Activities</h2>
          <button className="btn btn-ghost btn-sm">
            View All
          </button>
        </div>
        
        <div className="space-y-4">
          {recentActivities.map(activity => (
            <div key={activity.id} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-gray-100 rounded-lg">
                  {getActivityIcon(activity.type)}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{activity.title}</h3>
                  <p className="text-sm text-gray-600">
                    {activity.type === 'send' && `To: ${activity.recipient}`}
                    {activity.type === 'receive' && `From: ${activity.sender}`}
                    {activity.type === 'compress' && activity.description}
                    {activity.type === 'export' && `Format: ${activity.format}`}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                {getStatusBadge(activity.status)}
                <span className="text-sm text-gray-500">{activity.time}</span>
              </div>
            </div>
          ))}
        </div>

        {recentActivities.length === 0 && (
          <div className="text-center py-8">
            <FaHistory className="text-4xl text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No recent activities</p>
          </div>
        )}
      </div>

      {/* Bottom Stats Bar */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="text-2xl font-bold text-blue-600">{stats.send}</div>
          <div className="text-sm text-gray-600">Sent Today</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="text-2xl font-bold text-green-600">{stats.received}</div>
          <div className="text-sm text-gray-600">Received Today</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="text-2xl font-bold text-purple-600">{stats.compressed}</div>
          <div className="text-sm text-gray-600">Space Saved</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="text-2xl font-bold text-orange-600">{stats.exported}</div>
          <div className="text-sm text-gray-600">Files Exported</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboards;