import dynamic from 'next/dynamic'

// turn off SSR
const TradeMenu = dynamic(() => import('@/components/TradeMenu'), { ssr: false })

//import  TradeMenu from "@/components/TradeMenu";

const Trading = ({ children }) => {
    return (
        <>
        <TradeMenu/>   
              {children}        
        </>      
      
    )
  } 

  export default Trading;