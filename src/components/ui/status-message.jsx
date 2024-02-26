const StatusMessage = ({ error, message, className }) => {
  return (
    <>
      {error && (
        <div className={`text-red-500 dark:text-red-400 text-sm ${className}`}>
          {message}
        </div>
      )}
    </>
  );
};

export default StatusMessage;
