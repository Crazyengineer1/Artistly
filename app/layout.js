import "./globals.css";


export const metadata = {
  title: "Artistly",
  description: "One stop solution for artist bookings",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
