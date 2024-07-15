'use client'

import Link from "next/link"
import { SignInButton, SignedIn, SignedOut, UserButton, useAuth } from '@clerk/nextjs'
import { usePathname } from "next/navigation"

const Navbar = () => {
  const path = usePathname()
  const currentPage = path.includes('new')
  const { userId } = useAuth()

  return (
    <nav>
      <div className="nav-items">
        <h1 className="font-bold">YelpCamp</h1>
        <ul>
          <li>
            <Link href={'/'}>Home</Link>
          </li>
          <li className={!currentPage ? 'text-white' : ''}>
            <Link href={'/campgrounds'}>Campgrounds</Link>
          </li>
          {userId && <li className={currentPage ? 'text-white' : ''}>
            <Link href={'/campgrounds/new'}>New Campground</Link>
          </li>}
        </ul>
      </div>
      <div className="flex justify-center align-middle text-center">
        <SignedOut>
          <SignInButton>
            <button>Login</button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton afterSignOutUrl="/campgrounds" />
        </SignedIn>
      </div>
    </nav>
  )
}
export default Navbar