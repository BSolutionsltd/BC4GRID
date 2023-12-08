"use client"
import dynamic from 'next/dynamic'

// turn off SSR
const TradeMenu = dynamic(() => import('@/components/TradeMenu'), { ssr: false })

import {SelectedOrdersProvider}  from '@/app/(trading)/context/OrdersContext';

//import  TradeMenu from "@/components/TradeMenu";

const Trading = ({ children }) => {
    return (
        <>
        <TradeMenu/>   
        <SelectedOrdersProvider>
              {children}        
        </SelectedOrdersProvider>
        </>      
      
    )
  } 

  export default Trading;