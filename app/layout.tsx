import "./globals.css";

export const metadata = {
  title: "Orientation Sénégal",
  description: "Trouve la filière qui te correspond après le bac",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}