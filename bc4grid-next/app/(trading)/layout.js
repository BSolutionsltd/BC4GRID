import dynamic from 'next/dynamic'

// turn off SSR
const TradeMenu = dynamic(() => import('@/components/TradeMenu'), { ssr: false })

//import  TradeMenu from "@/components/TradeMenu";
import Balance from "@/components/Balance";

const Trading = ({ children }) => {
    return (
        <>
        <TradeMenu/>   
            <Balance />
              {children}        
        </>      
      
    )
  } 

  export default Trading;