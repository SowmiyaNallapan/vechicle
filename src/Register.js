import React, { useState } from "react";
import eqImage from "./eq.jpg";

const Register = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    mobile: "",
    dob: "",
    password: "",
    confirmPassword: "",
    terms: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Form Submitted", formData);
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        {/* Left Side - Image Section */}
        <div style={styles.leftSide}>
          <img src={eqImage} alt="EQ" style={styles.image} />
        </div>

        {/* Right Side - Registration Form */}
        <div style={styles.rightSide}>
          <h2 style={styles.heading}>Welcome To Register Page</h2>
          <p style={styles.subHeading}>Enter User Personal Details</p>

          <form onSubmit={handleSubmit} style={styles.form}>
            <input 
              type="text" 
              name="userName" 
              placeholder="Enter User Name" 
              value={formData.userName}
              onChange={handleChange} 
              required 
              style={styles.input} 
            />

            <input 
              type="email" 
              name="email" 
              placeholder="Enter User Email ID" 
              value={formData.email}
              onChange={handleChange} 
              required 
              style={styles.input} 
            />                                                                                                                                                                                                                    

            <input 
              type="tel" 
              name="mobile" 
              placeholder="Enter User Mobile Number" 
              value={formData.mobile}
              onChange={handleChange} 
              required 
              style={styles.input} 
            />

            <input 
              type="date" 
              name="dob" 
              value={formData.dob}
              onChange={handleChange} 
              required 
              style={styles.input} 
            />

            <input 
              type="password" 
              name="password" 
              placeholder="Enter Password" 
              value={formData.password}
              onChange={handleChange} 
              required 
              style={styles.input} 
            />

            <input 
              type="password" 
              name="confirmPassword" 
              placeholder="Enter Confirm Password" 
              value={formData.confirmPassword}
              onChange={handleChange} 
              required 
              style={styles.input} 
            />

            <label style={styles.checkboxLabel}>
              <input 
                type="checkbox" 
                name="terms" 
                checked={formData.terms}
                onChange={handleChange} 
                required 
              /> I Read and Agree to <a href="#">Terms & Conditions</a>
            </label>

            <button type="submit" style={styles.button}>SIGN IN</button>
          </form>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { 
    display: "flex", 
    justifyContent: "center", 
    alignItems: "center", 
    height: "100vh", 
    backgroundColor: "#f8f9fa" 
  },
  box: {
    display: "flex", // Fixed layout issue
    width: "850px",
    height: "550px",
    border: "3px solid #000",
    borderRadius: "15px",
    overflow: "hidden", 
    backgroundColor: "#fff",
    boxShadow: "8px 8px 20px rgba(0, 0, 0, 0.3)"
  },
  leftSide: {
    width: "50%",
    backgroundColor: "#cd5bcf",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    width: "80%", // Adjusted size
    height: "auto",
    objectFit: "cover"
  },
  rightSide: {
    width: "50%",
    padding: "30px",
    textAlign: "center"
  },
  heading: { 
    color: "red", 
    fontSize: "24px", 
    fontWeight: "bold", 
    marginTop: "-6px" 
  },
  subHeading: { 
    fontSize: "18px", 
    marginBottom: "10px" 
  },
  form: { 
    display: "flex", 
    flexDirection: "column", 
    alignItems: "center" 
  },
  input: { 
    padding: "10px", 
    margin: "6px 0", 
    width: "95%", 
    fontSize: "14px",
    border: "2px solid #ccc", 
    borderRadius: "6px" 
  },
  checkboxLabel: { 
    fontSize: "16px", 
    margin: "15px 0" 
  },
  button: { 
    backgroundColor: "red", 
    color: "#fff", 
    padding: "12px",
    fontSize: "18px", 
    border: "none", 
    width: "100%", 
    cursor: "pointer",
    marginTop: "15px"
  }
};

export default Register;
