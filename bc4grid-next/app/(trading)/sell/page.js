
"use client";

import React, { useState } from 'react';

import OfferCreator from '@/components/OfferCreator';
import Market from '@/components/Market';
import Balance from '@/components/Balance';


const SellPage = () => {
  
  return (    
    <>
    <Balance />
    <OfferCreator />
    <Market />
    </>
  );
}

export default SellPage;
