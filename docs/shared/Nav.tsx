import Link from 'next/link'

export default () => (
  <nav className="flex bg-white border-b border-gray-200 fixed top-0 inset-x-0 z-100 h-16 items-center">
    <header>
      <Link href="/">UI Platform Docs</Link>
      <Link href="/colors">Colors</Link>
      <Link href="/button">Button</Link>
    </header>
  </nav>
)
