import React from 'react'

export default function SideNavbar() {
  return (
    <div className='bg-slate-400 grid h-screen w-32 text-white font-semibold text-xl'>
        <ul className='mt-4'>
            <li className='p-2'>Dashboard</li>
            <li className='p-2'>Statistic</li>
            <li className='p-2'>Orders</li>
        </ul>        
    </div>
  )
}
