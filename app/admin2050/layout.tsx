export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body style={{ background: "#0f0f0f", color: "#fff", margin: 0 }}>
        {children}
      </body>
    </html>
  );
}