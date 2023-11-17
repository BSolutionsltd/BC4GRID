import  TradeMenu from "@/components/TradeMenu";
import Balance from "@/components/Balance";


const Trading = ({ children }) => {
    return (
        <>
        <TradeMenu />   
            <Balance />
              {children}        
        </>      
      
    )
  }
  

  export default Trading;