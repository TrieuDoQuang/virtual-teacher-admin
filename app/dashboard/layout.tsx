
import AuthWrapper from '@/components/auth-wrapper'
import { ThemeToggle } from '@/components/theme-toggle'
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <AuthWrapper>
            <div className="absolute top-4 right-4">
                <ThemeToggle />
            </div>
            {children}
        </AuthWrapper>
        )
}