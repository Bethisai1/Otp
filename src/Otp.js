import React, { useState } from 'react';
import Email from 'emailjs-com'; // You might need to install this package: npm install emailjs-com

function Otp() {
  const [email, setEmail] = useState('');
  const [otpInput, setOtpInput] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpValue, setOtpValue] = useState('');
  const [verificationStatus, setVerificationStatus] = useState('');

  const sendOTP = () => {
    let otp_val = Math.floor(Math.random() * 10000);
    setOtpValue(otp_val);
    
    let emailbody = <h2>Your OTP is ${otp_val}</h2>;
    Email.send({
      SecureToken: "3cb38b94-780f-43a3-b009-7bc33e1b3401",
      To: email,
      From: "shailukasani1211@gmail.com",
      Subject: "Email OTP using JavaScript",
      Body: emailbody,
    }).then(message => {
      if (message === "OK") {
        alert("OTP sent to your email " + email);
        setOtpSent(true);
      }
    }).catch(error => {
      console.error("Error sending OTP:", error);
    });
  };

  const verifyOTP = () => {
    if (otpInput === otpValue.toString()) {
      setVerificationStatus("Email address verified...");
    } else {
      setVerificationStatus("Invalid OTP");
    }
  };

  return (
    <div className="form">
      <h1>OTP Using React.js</h1>
      <input
        type="email"
        placeholder="Enter Email..."
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {otpSent && (
        <div className="otpverify">
          <input
            type="text"
            placeholder="Enter the OTP sent to your Email..."
            value={otpInput}
            onChange={(e) => setOtpInput(e.target.value)}
          />
          <button className="btn" onClick={verifyOTP}>Verify</button>
        </div>
      )}
      <button className="btn" onClick={sendOTP}>Send OTP</button>
      {verificationStatus && <p>{verificationStatus}</p>}
    </div>
  );
}

export default Otp;