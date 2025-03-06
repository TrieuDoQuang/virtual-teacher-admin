import PageWrapper from "@/components/page-wrapper"

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <PageWrapper>{children}</PageWrapper>
    )
}
