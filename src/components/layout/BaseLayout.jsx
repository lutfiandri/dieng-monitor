function BaseLayout({ children }) {
  return (
    <div className="grid grid-cols-2 grid-rows-2 h-screen p-4 gap-4">
      {children}
    </div>
  );
}

export default BaseLayout;
