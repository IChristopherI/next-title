import type { Metadata } from "next";
import "./globals.css";
import Header from "../shared/layout/Header";
import { AppSidebar } from "../shared/layout/Sidebar";
import AuthCompilize from "@/features/auth/components/AuthCheck";
import { SidebarProvider } from "@/shared/ui/sidebar";


export const metadata: Metadata = {title: ""};

export default function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html className="dark">
      <body className="min-h-screen bg-[#09090b] text-zinc-100 antialiased">
        <AuthCompilize>

        <SidebarProvider>
          <AppSidebar />

          <div className="min-w-0 flex-1">
            <Header />

            <main className="mx-auto w-full max-w-420 px-4 pb-10 pt-5 sm:px-6 lg:px-8">
              {children}
            </main>
          </div>
        </SidebarProvider>
        </AuthCompilize>
      </body>
    </html>
  );
}
