import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";
import React, { useState, useRef } from 'react';
import { Link } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "../styles/register.css";
const Register = (args) => {
  const signupNameRef = useRef();
  const signupPasswordRef = useRef();
  const signupEmailRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
  };

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleOpenModal = () => {
    const name = signupNameRef.current.value;
    const email = signupEmailRef.current.value;

    setName(name);
    setEmail(email);
    setModal(true);
  };
  return (
    <Helmet title="Signup">
      <CommonSection title="Signup" />
      <section>
        <Container>
          <Row>
            <Col lg="6" md="6" sm="12" className="m-auto text-center">
              <form className="form mb-5" onSubmit={submitHandler}>
                <div className="form__group">
                  <input
                    type="text"
                    placeholder="Full name"
                    required
                    ref={signupNameRef}
                  />
                </div>
                <div className="form__group">
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    ref={signupEmailRef}
                  />
                </div>
                <div className="form__group">
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    ref={signupPasswordRef}
                  />
                </div>
                {/* <button type="submit" className="addTOCart__btn">
                  Sign Up
                </button> */}
                <Button color="danger" onClick={toggle}>
        Sign Up
      </Button>
      <Modal isOpen={modal} toggle={toggle} {...args}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
        <p id="special-text">Your Account has Been Created Succesfully.</p>
        Name: {signupNameRef.current.value}
        <br />
        Email: {signupEmailRef.current.value}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Okay
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
              </form>
              <Link to="/login">Already have an account? Login</Link>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Register;
