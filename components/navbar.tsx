'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import * as React from 'react'
import { motion } from 'framer-motion'
import { Navbar } from '@/types/navigation'
export default function HomeNavbar({ navItems }: { navItems: Navbar[] }) {
  const pathname = usePathname()

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`w-full fixed z-[1000] flex items-center justify-between 
        ${pathname !== '/' 
          ? 'border-b border-solid border-zinc-800/50 bg-gradient-to-b from-black/80 to-black/40 backdrop-filter backdrop-blur-lg top-0 h-20' 
          : 'h-16 top-[.5rem]'
        }`}
    >
      <div className="w-1/3 h-full flex items-center ml-[2rem]">
        <motion.h1 
          whileHover={{ scale: 1.02 }}
          className='text-[1.75rem] uppercase font-bold font-sans bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent'
        >
          English Learning App
        </motion.h1>
      </div>
      
      <div className="w-1/3 h-full flex justify-center">
        <div className="flex items-center gap-8">
          {navItems.map(({ name, href }) => (
            <motion.div 
              key={href} 
              className="relative group"
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Link
                href={href}
                className={`text-[.95rem] uppercase transition-all duration-300 ease-out font-medium tracking-wide
                  ${pathname === href ? 'text-[#35B5FF]' : 'text-white/90 hover:text-[#35B5FF]'}`}
              >
                {name}
                <span
                  className={`absolute left-0 -bottom-[.12rem] h-[.1rem] bg-gradient-to-r from-[#35B5FF] to-[#62c5ff] transition-all duration-300 ease-out rounded-full
                    ${pathname === href ? 'w-full' : 'w-0 group-hover:w-full'}`}
                />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="w-1/3 h-full flex items-center justify-end mr-[2rem] gap-4">
        <Link href='/dashboard'>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative inline-flex w-[8rem] h-[2.85rem] overflow-hidden rounded-full p-[1px] focus:outline-none"
          >
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#35B5FF_0%,#134869_50%,#35B5FF_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-gradient-to-b from-slate-900 to-slate-800 px-[.85rem] py-1 text-[.9rem] uppercase font-medium text-white backdrop-blur-3xl transition-all duration-300 hover:from-slate-800 hover:to-slate-700">
              dashboard
            </span>
          </motion.button>
        </Link>
      </div>
    </motion.nav>
  )
}