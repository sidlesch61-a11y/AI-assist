export function Footer() {
  return (
    <footer className="glass-strong border-t border-industrial-800 px-6 py-4">
      <div className="flex items-center justify-between text-xs text-industrial-400">
        <div className="flex items-center gap-2">
          <span>Vehicle Diagnostics AI</span>
          <span className="text-industrial-600">•</span>
          <span>&copy; {new Date().getFullYear()}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-industrial-500">Powered by AI Technology</span>
        </div>
      </div>
    </footer>
  );
}


