"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import LogoutButton from "../form/LogoutButton"
import DemanderMonCreditButton from "../form/DemanderMonCreditButton"


type HeaderProps = {
  loggedIn?: boolean
}

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Crédits", href: "#credits" },
  { name: "Services", href: "#services" },
  { name: "Contact", href: "#contact" },
]

const Header = ({ loggedIn = false }: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const renderNavLinks = () =>
    navLinks.map((link) => (
      <Link
        key={link.name}
        href={link.href}
        className="text-sm text-gray-700 hover:text-black transition"
      >
        {link.name}
      </Link>
    ))

  const renderAuthButtons = (isMobile = false) => {
    const sharedClasses = isMobile
      ? "block text-sm px-4 py-2"
      : "text-sm px-4 py-2"

    return loggedIn ? (
      <>
        <Link
          href="/dashboard"
          className={`${sharedClasses} border rounded-md hover:bg-gray-100 transition`}
          onClick={() => isMobile && setMobileMenuOpen(false)}
        >
          Espace Client
        </Link>
        <LogoutButton
          variant="ghost"
          className={`${sharedClasses} text-gray-700 hover:underline  text-left`}
          onClick={() => isMobile && setMobileMenuOpen(false)}
        />
      </>
    ) : (
      <>
        <Link
          href="/sign-in"
          className={`${sharedClasses} border rounded-md hover:bg-gray-100 transition`}
          onClick={() => isMobile && setMobileMenuOpen(false)}
        >
          Espace Client
        </Link>
        <DemanderMonCreditButton/>
      </>
    )
  }

  return (
    <header className="bg-white sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-gray-900">
            Crediz
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {renderNavLinks()}
            {renderAuthButtons()}
          </nav>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-4 space-y-4">
            {renderNavLinks()}
            {renderAuthButtons(true)}
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
