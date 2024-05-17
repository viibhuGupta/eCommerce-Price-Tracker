import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const navIcons = [
    {
        src:'/assets/icons/search.svg'  ,
        alt : 'search'
    },
    {
        src:'/assets/icons/black-heart.svg'  ,
        alt : 'heart'
    },
    {
        src:'/assets/icons/user.svg'  ,
        alt : 'user'
    },
    
]

const Navbar = () => {
  return (
    <>
    <header className='w-full '>
        <nav className='flex justify-between item-center px-6 md:px-20 py-4'>
            <Link className='flex' href="#/">
                <Image 
                src="/assets/icons/logo.svg"
                width={20}
                height={20}
                alt='logo'
                
                />
                <p className='font-spaceGrotesk text-[21px] font-bold'>Price<span className='text-rose-700'>wise</span> </p>
            </Link>

            <div className="flex items-center gap-4">
                {navIcons.map((icon) => (
                    <Image
                    key={icon.alt}
                    src={icon.src}
                    alt={icon.alt}
                    width={25}
                    height={25}
                    className=' object-contain cursor-pointer'
                    />
                ))}
            </div>
        </nav>
    </header>
    </>
  )
}

export default Navbar