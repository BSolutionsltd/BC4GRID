// CSS style
// import '@/app/globals.css'
import 'semantic-ui-css/semantic.min.css';
import { Inter } from 'next/font/google'

// session manager
import Provider from "@/app/auth/context/client-provider";
import { getServerSession } from "next-auth/next";
import { authOptions } from './api/auth/[...nextauth]/route';

// context manager for ethereum
import { EthExplorerProvider } from "@/app/web3/context/ethExplorerContext";


// components
import { Container }  from 'semantic-ui-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';



const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'BC4GRID app',
  description: 'Next.js app',
}

export default async function RootLayout({ children }) {

  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider session={session}>
        <Container  >
          <EthExplorerProvider>
            <Header />        
              {children}        
              <Footer />
        </EthExplorerProvider>
        </Container>
        </Provider>
        </body>
    </html>
  )
}
