import HomeNavbar from "@/components/navbar"
import PageWrapper from "@/components/page-wrapper"
import { ThemeProvider } from "next-themes"

export default function Layout({ children }: { children: React.ReactNode }) {
    const navItems = [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/about' },
        // { name: 'Services', href: '/services' },
        // { name: 'Contact', href: '/contact' }
      ]
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <PageWrapper>
                <HomeNavbar navItems={navItems} />
                {children}
            </PageWrapper>
        </ThemeProvider>
    )
}
