const Card = ({ children, className = "", onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-all duration-200 ${onClick ? 'cursor-pointer hover:shadow-md hover:border-blue-100' : ''} ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
