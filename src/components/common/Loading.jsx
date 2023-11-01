const Loading = () => {
  return (
    <div className="flex items-center justify-center py-3">
      <div className="relative">
        <div className="h-8 w-8 rounded-full border-t-8 border-b-8 border-indigo-500"></div>
        <div className="absolute top-0 left-0 h-8 w-8 rounded-full border-t-8 border-b-8 border-indigo-100 animate-spin"></div>
      </div>
    </div>
  );
};

export default Loading;
