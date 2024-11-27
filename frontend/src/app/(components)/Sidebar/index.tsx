'use client'

import { Archive, Layout, LucideIcon, Menu, User, Clipboard, SlidersHorizontal, CircleDollarSign } from 'lucide-react'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'
import { useAppDispatch, useAppSelector } from '@/app/redux';
import { setIsSidebarCollapsed } from '@/state';


interface SiderbarLinkProps{
    href:string;
    icon:LucideIcon;
    label:string;
    isCollapsed:boolean
}

const SidebarLink=({href,icon:Icon,label,isCollapsed}:SiderbarLinkProps)=>{
    const pathname =usePathname();
    const isActive =pathname===href ||(pathname=="/" && href==="/dashboard")
    return(
        <Link href={href}>
            <div className={`cursor-pointer flex items-center 
                ${isCollapsed?"justify-center py-4 p-0": "justify-start px-8 py-4 " }
                hover:text-blue-300 hover:bg-blue-100 gap-3 transition-colors 
                ${isActive? "bg-blue-200 text-white":""}` }>
                    <Icon className='w-6 h-6 !text-gray-700'>
                    </Icon>
                    <span className={`${isCollapsed? "hidden":"block"}
                    font-medium text-gray-700`}>
                        {label}
                    </span>

            </div>
        </Link>
    )
}



export const Sidebar = () => {

    const dispatch = useAppDispatch();
    const isSidebarCollapsed=useAppSelector(
        (state)=>state.global.isSidebarCoolapsed
    );
    const toggleSidebar =()=>{
        dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))
    };
    const sidebarClassNames=`fixed flex flex-col ${isSidebarCollapsed?"w-0 md:w-20":"w-72 md:w-60"} bg-white transition-all 
    duration-300 overflow-hidden h-full shadow-md z-40`;

  return (
    <div className={sidebarClassNames}>
    {/* Top logo */}
    <div className={`flex gap-3 justify-between md:justify-normal 
        items-center pt-8 ${isSidebarCollapsed ? "px-5":"px-8"}`}>
        <div>Logo</div>
            <h1 className={` ${isSidebarCollapsed ? "hidden":"block"} font-extrabold text-2xl `}>SISAWS</h1>
            <button className='md:hidden p-3 bg-gray-100 rounded-full hover:bg-blue-100' onClick={toggleSidebar}>
                <Menu className='w-4 h-4'/>
            </button>
    </div>
    {/* Links */}
    <div className='flex-grow mt-8'>
            <SidebarLink
            href='/'
            icon={Layout}
            label='Dashboard'
            isCollapsed={isSidebarCollapsed}/>

            <SidebarLink
            href='/inventory'
            icon={Archive}
            label='Inventario'
            isCollapsed={isSidebarCollapsed}/>

            <SidebarLink
            href='/products'
            icon={Clipboard}
            label='Productos'
            isCollapsed={isSidebarCollapsed}/>

            <SidebarLink
            href='/users'
            icon={User}
            label='Usuarios'
            isCollapsed={isSidebarCollapsed}/>

            <SidebarLink
            href='/settings'
            icon={SlidersHorizontal}
            label='Configuración'
            isCollapsed={isSidebarCollapsed}/>

            <SidebarLink
            href='/expenses'
            icon={CircleDollarSign}
            label='Salidas'
            isCollapsed={isSidebarCollapsed}/>
            
    </div>        
    {/* FOOTER */}
    <div className={`${isSidebarCollapsed?"hidden":"block"}mb-10`}>
        <p className='text-center text-xs text-gray-500'>@copy: 2024 SISAWS</p>

    </div>
    </div>
  )
}