"use client";
import { useEffect, useState } from 'react';
import TradeMenu from '@/components/TradeMenu';

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Fetch transaction data from an API or database
    const fetchTransactions = async () => {
      try {
        const response = await fetch('/api/transactions');
        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        console.error('Failed to fetch transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div>
        
      <h2>Transaction History</h2>

      
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            <p>Amount: {transaction.amount}</p>
            <p>Date: {transaction.date}</p>
            <p>Description: {transaction.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionHistory;