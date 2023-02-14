
class PaymentForm extends React.Component {
    state = {
      successMessage: "",
      customerDetails: {}
    };
  
    handlePayment = async () => {
      const response = await fetch("http://localhost:3000/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: "Your Order Name"
        })
      });
  
      const json = await response.json();
      this.setState({
        successMessage: json.message,
        customerDetails: json.customerDetails
      });
    };
  
    render() {
      const { successMessage, customerDetails } = this.state;
      return (
        <div>
          <button onClick={this.handlePayment}>Payment</button>
          {successMessage && (
            <div>
              <h2>{successMessage}</h2>
              <ul>
                <li>Name: {customerDetails.name}</li>
                <li>Address: {customerDetails.address}</li>
                <li>Phone: {customerDetails.phone}</li>
              </ul>
            </div>
          )}
        </div>
      );
    }
  }