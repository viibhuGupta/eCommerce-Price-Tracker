import Image from 'next/image'
import Link from 'next/link'
import React from 'react'



const Navbar = () => {
  return (
    <>
    <header className='w-full '>
        <nav className='flex justify-between item-center px-6 bg-slate-400 md:px-20 py-4'>
            <Link className='flex' href="#/">
                <Image 
                src="/assets/icons/logo.svg"
                width={20}
                height={20}
                alt='logo'
                
                />
                <p className='font-spaceGrotesk text-[21px] font-bold'>Price<span className='text-rose-700  '>wise</span></p>
            </Link>
        </nav>
    </header>
    </>
  )
}

export default Navbar