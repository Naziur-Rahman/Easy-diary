// Updated Cards component
const Cards = ({ icon, title, value, description, trend, trendPositive, bgColor }) => {
  return (
    <div className={`${bgColor || 'bg-white'} rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow`}>
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 bg-white rounded-lg shadow-sm">
          {icon}
        </div>
        <div className={`text-sm font-medium ${trendPositive ? 'text-green-500' : 'text-red-500'}`}>
          {trend}
        </div>
      </div>
      
      <h3 className="text-2xl font-bold text-gray-800 mb-2">{value}</h3>
      <p className="text-gray-600 font-medium">{title}</p>
      {description && (
        <p className="text-sm text-gray-500 mt-1">{description}</p>
      )}
    </div>
  );
};

export default Cards;