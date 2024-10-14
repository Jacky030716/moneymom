import { ClerkLoaded, ClerkLoading, UserButton } from '@clerk/nextjs'
import HeaderLogo from '@/components/header-logo'
import Navigation from '@/components/navigation'
import { Filters } from '@/components/filters'
import Greeting from '@/components/greeting'
import { Loader2 } from 'lucide-react'

const Header = () => {
  return (
    <header className='bg-gradient-to-b from-yellow-200/80 via-yellow-100 to-yellow-200/50 px-4 py-8 lg:px-14 pb-36'>
      <div className='max-w-screen-2xl mx-auto'>
        <div className='w-full flex items-center justify-between mb-14'>
          <div className='flex items-center md:gap-x-10'>
            <HeaderLogo />
            <Navigation />
          </div>  
          <ClerkLoaded>
            <UserButton />
          </ClerkLoaded>
          <ClerkLoading>
            <Loader2 className='animate-spin size-8 text-slate-400'/>
          </ClerkLoading>
        </div>
        <Greeting />
        <Filters />
      </div>
    </header>
  )
}

export default Header