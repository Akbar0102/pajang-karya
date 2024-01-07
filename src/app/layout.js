import { Poppins as FontSans } from "next/font/google";
import { Provider } from "@/components/provider/index.jsx";
import "@/styles/globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata = {
  title: "Karyadev - Hexteam",
  description:
    "Explore a showcase of creative projects on Karyadev by Hexteam. Discover innovative solutions, beautiful designs, and inspiring work crafted by our talented community. Join us in celebrating the art of technology and creativity.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={fontSans.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
