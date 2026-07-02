const ShimmerText = ({ children, className = '' }) => {
  return (
    <span
      className={className}
      style={{
        color: 'transparent',
        background: 'linear-gradient(90deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.3) 40%, rgba(255,255,255,0.9) 60%, rgba(255,255,255,0.9) 100%)',
        backgroundSize: '200% 100%',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        animation: 'shimmer-sweep 4s 2.5s ease-in-out infinite',
      }}
    >
      {children}
      <style>{`
        @keyframes shimmer-sweep {
          0% { background-position: 200% 0%; }
          50% { background-position: -100% 0%; }
          100% { background-position: 200% 0%; }
        }
      `}</style>
    </span>
  );
};

export default ShimmerText;
