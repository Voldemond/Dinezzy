import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import CommonSection from "../components/UI/common-section/CommonSection";
import Helmet from "../components/Helmet/Helmet";
// import  PayPal  from "../components/paypal/PayPal";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import "../styles/checkout.css";
import { useEffect } from "react";



const Checkout = (args) => {
  const [enterName, setEnterName] = useState("");
  const [enterEmail, setEnterEmail] = useState("");
  const [enterNumber, setEnterNumber] = useState("");
  // const [checkout, setCheckOut] = useState(false);
  // const [enterCountry, setEnterCountry] = useState("");
  // const [enterCity, setEnterCity] = useState("");
  // const [postalCode, setPostalCode] = useState("");

  const shippingInfo = [];
  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  // const shippingCost = 30;

  const totalAmount = cartTotalAmount;
  useEffect(() => {
    console.log(totalAmount)
  })

  const [paypal, setpaypal] = useState(false)


  const submitHandler = (e) => {
    e.preventDefault();
    const userShippingAddress = {
      name: enterName,
      email: enterEmail,
      phone: enterNumber,
      // country: enterCountry,
      // city: enterCity,
      // postalCode: postalCode,
    };

    shippingInfo.push(userShippingAddress);
    console.log(shippingInfo);
  };

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <Helmet title="Checkout">
      <CommonSection title="Checkout" />
      <section>
        <Container>
          <Row>
            <Col lg="8" md="6">
              <h6 className="mb-4">Customer Details</h6>
              <form className="checkout__form" onSubmit={submitHandler}>
                <div className="form__group">
                  <input
                    type="text"
                    placeholder="Enter your name"
                    required
                    onChange={(e) => setEnterName(e.target.value)}
                  />
                </div>

                <div className="form__group">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    required
                    onChange={(e) => setEnterEmail(e.target.value)}
                  />
                </div>
                <div className="form__group">
                  <input
                    type="number"
                    placeholder="Phone number"
                    required
                    onChange={(e) => setEnterNumber(e.target.value)}
                  />
                </div>
                {/* <div className="form__group">
                  <input
                    type="text"
                    placeholder="Country"
                    required
                    onChange={(e) => setEnterCountry(e.target.value)}
                  />
                </div> */}
                {/* <div className="form__group">
                  <input
                    type="text"
                    placeholder="City"
                    required
                    onChange={(e) => setEnterCity(e.target.value)}
                  />
                </div> */}
                {/* <div className="form__group">
                  <input
                    type="number"
                    placeholder="Postal code"
                    required
                    onChange={(e) => setPostalCode(e.target.value)}
                  />
                </div> */}
                {/* <button type="submit" className="addTOCart__btn" onClick={() => setpaypal(!paypal)}>
                  Payment
                </button> */}
                {paypal && <PayPalScriptProvider options={{ "client-id": "AcbWFqseytCH0kp6iqkDfKKN6uanARCvZ-qOH3ewLSA.TFT4drJxiSpZ" }}>
                  <PayPalButtons
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        purchase_units: [
                          {
                            amount: {
                              value: totalAmount,
                            },
                          },
                        ],
                      });
                    }}
                    onApprove={async (data, actions) => {
                      const details = await actions.order.capture();
                      const name = details.payer.name.given_name;
                      alert("Transaction completed by " + name);
                    }} />
                </PayPalScriptProvider>}
              </form>
            </Col>


            <Col lg="4" md="6">
              <div className="checkout__bill">
                <h6 className="d-flex align-items-center justify-content-between mb-3">
                  Subtotal: <span>${cartTotalAmount}</span>
                </h6>
                <h6 className="d-flex align-items-center justify-content-between mb-3">
                  {/* Shipping: <span>${shippingCost}</span> */}
                </h6>
                <div className="checkout__total">
                  <h5 className="d-flex align-items-center justify-content-between">
                    Total: <span>${totalAmount}</span>
                  </h5>
                </div>
              </div>
            </Col>

            <Button color="danger" onClick={toggle}>
              Place Order
            </Button>
            
            <Modal isOpen={modal} toggle={toggle} {...args}>
              <ModalHeader toggle={toggle}>Thankyou For using Dinezzy</ModalHeader>
              <ModalBody>
              <p id="special-text">Your Order has Been Placed Succesfully.</p>
                <br />
                Name :{enterName}
                <br />
                Email :{enterEmail}
                <br />
                Contact Number :{enterNumber}
                <br />
                Total Amount To be Paid :${cartTotalAmount}
                <br />
                {/* {totalAmount} */}
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={toggle}>
                  OK
                </Button>{' '}
                <Button color="secondary" onClick={toggle}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>

          </Row>
        </Container>
      </section>
    </Helmet>
  )
};

export default Checkout;
