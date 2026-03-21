export default function Header() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month:   "long",
    day:     "numeric",
  }).toUpperCase();

  return (
    <div className="mb-8 text-center">
      <h1
        className="text-7xl font-black leading-none mb-3 shine-text"
        style={{ fontFamily: "'Exo 2', sans-serif", letterSpacing: "-3px" }}
      >
        TO-DO
      </h1>
      <p
        className="text-slate-600 text-sm tracking-widest"
        style={{ fontFamily: "'Space Mono', monospace" }}
      >
        {today}
      </p>
    </div>
  );
}