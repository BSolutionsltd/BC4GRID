import React, { useState } from "react";
import { Table, Form, Button } from "semantic-ui-react";

const MakeOffer = () => {
  const [amount, setAmount] = useState("");
  const [pricePerUnit, setPricePerUnit] = useState("");

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPricePerUnit(e.target.value);
  };

  const handleSubmit = () => {
    // Handle the form submission, e.g., sending the offer data to the server
    console.log("Amount: ", amount);
    console.log("Price per Unit: ", pricePerUnit);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Table definition>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Amount (KWh)</Table.Cell>
            <Table.Cell>
              <Form.Input
                type="number"
                value={amount}
                onChange={handleAmountChange}
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Price per Unit</Table.Cell>
            <Table.Cell>
              <Form.Input
                type="number"
                value={pricePerUnit}
                onChange={handlePriceChange}
              />
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <Button primary type="submit" floated="right">
        Make Offer
      </Button>
    </Form>
  );
};

export default MakeOffer;
