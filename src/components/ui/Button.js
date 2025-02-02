const Button = ({ children, className, onClick }) => {
    return (
      <button
        className={`px-4 py-0.2 font-semibold rounded-full transition-all duration-300 ${className}`}
        onClick={onClick}
      >
        {children}
      </button>
    );
  };
  
  export default Button;
  