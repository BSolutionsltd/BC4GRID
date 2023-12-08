"use client";

import React, { useState, useEffect } from "react";
import { Table, Segment, Checkbox, Header } from "semantic-ui-react";
import web3 from "web3";
import { useEthExplorer } from '@/app/web3/context/ethExplorerContext';

const Orders = ({ onCheckboxChange, selectedItems }) => {
  const { ethExplorer } = useEthExplorer();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const offerDetails = await ethExplorer.getAllOfferDetails();
        let transformedData = offerDetails.map(offer => ({
          key: Number(offer.offerId),
          account: web3.utils.toChecksumAddress(offer.sellerAddress),
          amount: Number(offer.energyAmount),
          pricePerUnit: Number(offer.pricePerEnergyAmount),
          validUntil: new Date(Number(offer.validUntil) * 1000).toLocaleDateString(),
          totalPrice: Number(offer.energyAmount) * Number(offer.pricePerEnergyAmount),
        }));
        setData(transformedData);
      } catch (error) {
        console.error('Error fetching offer details:', error);
      }
    };

    if (ethExplorer) {
      fetchOffers();
    }
  }, [ethExplorer]);

  const { Header, Row, HeaderCell, Body, Cell } = Table;

  return (
    <div style={{ overflowX: 'auto' }}>
      <Segment style={{ marginBottom: '200px', minHeight: '50vh' }}>
        <Header as="h2">Orders</Header>
        <Table celled compact>
          <Table.Header>
            <Row>
              <HeaderCell>ID</HeaderCell>
              <HeaderCell>Account</HeaderCell>
              <HeaderCell>Amount (KWh)</HeaderCell>
              <HeaderCell>Price per Unit</HeaderCell>
              <HeaderCell>Valid Until</HeaderCell>
              <HeaderCell>Total Price</HeaderCell>
              <HeaderCell>Select</HeaderCell>
            </Row>
          </Table.Header>
          <Body>
            {data.map((item) => (
              <Row key={item.key}>
                <Cell>{item.key}</Cell>
                <Cell>{item.account}</Cell>
                <Cell>{item.amount}</Cell>
                <Cell>{item.pricePerUnit}</Cell>
                <Cell>{item.validUntil}</Cell>
                <Cell>{item.totalPrice}</Cell>
                <Cell>
                  <Checkbox
                    checked={selectedItems.some(selectedItem => selectedItem.key === item.key)}
                    onChange={(e, { checked }) => onCheckboxChange(item, checked)}
                  />
                </Cell>
              </Row>
            ))}
          </Body>
        </Table>
      </Segment>
    </div>
  );
};

export default Orders;