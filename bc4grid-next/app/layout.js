import { Inter } from 'next/font/google'
// import './globals.css'

// CSS style
import 'semantic-ui-css/semantic.min.css';

import { Container }  from 'semantic-ui-react';


import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'BC4GRID app',
  description: 'Next.js app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Container>
          <Header />        
            {children}        
            <Footer />
        </Container>
        </body>
    </html>
  )
}
