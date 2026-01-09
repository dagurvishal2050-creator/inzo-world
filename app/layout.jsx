import "./globals.css";

export const metadata = {
  title: "Inzo World",
  description: "Premium Netflix-style video experience",
  manifest: "/manifest.json",
  themeColor: "#e50914",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}