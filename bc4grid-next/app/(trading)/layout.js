import  TradeMenu from "@/components/TradeMenu";


const Trading = ({ children }) => {
    return (
        <>
        <TradeMenu />              
              {children}        
        </>      
      
    )
  }
  

  export default Trading;