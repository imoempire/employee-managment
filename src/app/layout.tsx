import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@mantine/core/styles.css";
import {
  ColorSchemeScript,
  MantineProvider,
  mantineHtmlProps,
} from "@mantine/core";
import "@mantine/dropzone/styles.css";
import ReactQueryProvider from "./context/ReactQueryProvider";
import { Notifications } from "@mantine/notifications";
import { SessionProvider } from "next-auth/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Employee Onboarding System",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <ReactQueryProvider>
        <html lang="en" {...mantineHtmlProps}>
          <head>
            <ColorSchemeScript />
          </head>
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            <MantineProvider>
              <Notifications />
              <ReactQueryProvider>{children}</ReactQueryProvider>
            </MantineProvider>
          </body>
        </html>
      </ReactQueryProvider>
    </SessionProvider>
  );
}
