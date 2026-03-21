export default function FloatingParticles() {
  const colors = ["#818cf8", "#f472b6", "#34d399", "#38bdf8"];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {[...Array(18)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full opacity-20"
          style={{
            width:  `${Math.random() * 6 + 2}px`,
            height: `${Math.random() * 6 + 2}px`,
            left:   `${Math.random() * 100}%`,
            top:    `${Math.random() * 100}%`,
            background:      colors[i % 4],
            animation:       `float ${Math.random() * 8 + 6}s ease-in-out infinite`,
            animationDelay:  `${Math.random() * 5}s`,
          }}
        />
      ))}
    </div>
  );
}