import Header from '@/components/shared/Header'
import Footer from '@/components/shared/Footer'
import cn from 'clsx'

export default function Page({
  children,
  className,
  title,
}: {
  children: React.ReactNode
  className?: string
  title?: string
}) {
  return (
    <>
      <Header title={title} />
      <main className={cn('w-full max-w-3xl mx-auto py-16', className)}>
        {children}
      </main>
      <Footer />
    </>
  )
}
