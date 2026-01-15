import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "ConvoBench | Voice Agent Paper Hunt",
    description: "Curated collection of papers on Conversational AI, Voice Agents, Speech LLMs, and Real-time Voice Interaction",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="zh-CN">
            <body className="antialiased">
                {children}
            </body>
        </html>
    );
}
