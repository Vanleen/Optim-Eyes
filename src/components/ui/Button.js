const Button = ({ children, className, onClick }) => {
    return (
      <button
        className={`px-6 py-2 font-semibold rounded-full transition-all duration-300 ${className}`}
        onClick={onClick}
      >
        {children}
      </button>
    );
  };
  
  export default Button;
  