// Card wrapper component
export function Card({ children, className }) {
  return (
    <div className={`bg-white rounded-2xl shadow p-4 ${className || ""}`}>
      {children}
    </div>
  );
}

// Card header
export function CardHeader({ children, className }) {
  return (
    <div className={`mb-2 border-b pb-2 ${className || ""}`}>{children}</div>
  );
}

// Card title
export function CardTitle({ children, className }) {
  return (
    <h2 className={`text-lg font-semibold ${className || ""}`}>{children}</h2>
  );
}

// Card content
export function CardContent({ children, className }) {
  return <div className={className || ""}>{children}</div>;
}
