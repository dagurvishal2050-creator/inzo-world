export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body
  onContextMenu={(e) => e.preventDefault()}
        style={{
          background: "#0b0b0b",
          color: "#fff",
          fontFamily: "system-ui",
          margin: 0,
        }}
      >
        {children}
      </body>
    </html>
  );
}