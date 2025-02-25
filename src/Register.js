import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import eqImage from "./eq.jpg";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    mobile: "",
    dob: "",
    password: "",
    confirmPassword: "",
    terms: false
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const validateForm = () => {
    let newErrors = {};
    
    if (formData.userName.length < 3) newErrors.userName = "Username must be at least 3 characters";
    
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";
    
    if (!/^\d{10}$/.test(formData.mobile)) newErrors.mobile = "Mobile number must be 10 digits";
    
    if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    
    if (!formData.terms) newErrors.terms = "You must agree to the terms and conditions";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Ensure only numeric values for mobile number
    if (name === "mobile" && !/^\d*$/.test(value)) {
      return;
    }

    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validateForm()) return;
  
    try {
      const response = await fetch("http://127.0.0.1:8000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: formData.userName,
          email: formData.email,
          mobile: formData.mobile,
          dob: formData.dob,
          password: formData.password
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert("Registration successful! Redirecting to login page...");
        navigate("/login");
      } else {
        alert(`Registration failed: ${data.detail}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };
  
  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <div style={styles.leftSide}>
          <img src={eqImage} alt="EQ" style={styles.image} />
        </div>

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
            {errors.userName && <p style={styles.error}>{errors.userName}</p>}

            <input 
              type="email" 
              name="email" 
              placeholder="Enter User Email ID" 
              value={formData.email}
              onChange={handleChange} 
              required 
              style={styles.input} 
            />
            {errors.email && <p style={styles.error}>{errors.email}</p>}

            <input 
              type="tel" 
              name="mobile" 
              placeholder="Enter User Mobile Number" 
              value={formData.mobile}
              onChange={handleChange} 
              required 
              style={styles.input} 
            />
            {errors.mobile && <p style={styles.error}>{errors.mobile}</p>}

            <input 
              type="date" 
              name="dob" 
              value={formData.dob}
              onChange={handleChange} 
              required 
              style={styles.input} 
            />

            {/* Password Field with Eye Icon */}
            <div style={styles.passwordContainer}>
              <input 
                type={showPassword ? "text" : "password"}
                name="password" 
                placeholder="Enter Password" 
                value={formData.password}
                onChange={handleChange} 
                required 
                style={styles.input} 
              />
              <span style={styles.eyeIcon} onClick={togglePasswordVisibility}>
                {showPassword ? "👁️" : "🔒"}
              </span>
            </div>
            {errors.password && <p style={styles.error}>{errors.password}</p>}

            {/* Confirm Password Field with Eye Icon */}
            <div style={styles.passwordContainer}>
              <input 
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword" 
                placeholder="Enter Confirm Password" 
                value={formData.confirmPassword}
                onChange={handleChange} 
                required 
                style={styles.input} 
              />
              <span style={styles.eyeIcon} onClick={toggleConfirmPasswordVisibility}>
                {showConfirmPassword ? "👁️" : "🔒"}
              </span>
            </div>
            {errors.confirmPassword && <p style={styles.error}>{errors.confirmPassword}</p>}

            <label style={styles.checkboxLabel}>
              <input 
                type="checkbox" 
                name="terms" 
                checked={formData.terms}
                onChange={handleChange} 
                required 
              /> I Read and Agree to <a href="#">Terms & Conditions</a>
            </label>
            {errors.terms && <p style={styles.error}>{errors.terms}</p>}

            <button type="submit" style={styles.button}>SIGN IN</button>
          </form>
        </div>
      </div>
    </div>
  );
};

// Styles for the password container and eye icon
const styles = {
  container: { 
    display: "flex", 
    justifyContent: "center", 
    alignItems: "center", 
    height: "100vh", 
    backgroundColor: "#f8f9fa" 
  },
  box: {
    display: "flex",
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
    width: "80%",
    height: "auto",
    objectFit: "cover"
  },
  rightSide: {
    width: "50%",
    padding: "30px",
    textAlign: "center"
  },
  passwordContainer: {
    position: "relative",
    width: "100%"
  },
  eyeIcon: {
    position: "absolute",
    right: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    cursor: "pointer",
    fontSize: "18px"
  },
  input: { 
    padding: "10px", 
    margin: "6px 0", 
    width: "95%", 
    fontSize: "14px",
    border: "2px solid #ccc", 
    borderRadius: "6px" 
  },
  error: {
    color: "red",
    fontSize: "12px",
    marginBottom: "10px"
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
