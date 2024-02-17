import React, { useState } from 'react';
import { Form, Input, Select, Checkbox, Radio, message } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import "./form.css"
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';

// import Radio from '@mui/material/Radio';
const FormGenerate = () => {
    // const VisuallyHiddenInput = styled('input')({
    //     clip: 'rect(0 0 0 0)',
    //     clipPath: 'inset(50%)',
    //     height: 1,
    //     overflow: 'hidden',
    //     position: 'absolute',
    //     bottom: 0,
    //     left: 0,
    //     whiteSpace: 'nowrap',
    //     width: 1,
    //   });
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    // // Validate email input
    
    
        const [fileData, setFileData] = useState(null);
      
        const handleFileChange = (event) => {
          const file = event.target.files[0];
          const reader = new FileReader();
      
          reader.onload = (event) => {
            const content = event.target.result;
            const base64Content = btoa(content);
            const data = {
              filename: file.name,
              type: file.type,
              size: file.size,
              content: base64Content
            };
            setFileData(data);
          };
      
          reader.readAsBinaryString(file);
        };
    
      


    const validateEmail = (event) => {
        const mail = event.target.value;
        setEmail(mail);
        if (!/\S+@\S+\.\S+/.test(mail) || mail.trim() === "") {
            setErrors({ ...errors, ["email"]: "Please enter a valid email" });
        } else {
            delete errors.email;
        }
    };

    // Validate name input
    const validateName = (event) => {
        const fullName = event.target.value;
        setName(fullName);
        if (fullName.trim() === "") {
            setErrors({ ...errors, ["name"]: "Please enter a valid name" });
        } else {
            delete errors.name;
        }
    };

    // Validate phone input
    const validatePhone = (event) => {
        const no = event.target.value;
        setPhone(no);
        if (no === "" || no.length !== 10 || !/^\d+$/.test(no)) {
            setErrors({ ...errors, ["phone"]: "Please enter a valid phone number" });
        } else {
            delete errors.phone;
        }
    };

    // Validate password input
    const validatePassword = (event) => {
        const pass = event.target.value;
        setPassword(pass);
        if (
            pass === "" ||
            pass.length < 7 ||
            !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,15}/.test(password)
        ) {
            setErrors({
                ...errors,
                ["password"]:
                    "Password should contain at least 8 characters, 1 special character, and 1 uppercase letter",
            });
        } else {
            delete errors.password;
        }
    };

    // Validate confirm password input
    const validateConfirmPassword = (event) => {
        const confPass = event.target.value;
        setConfirmPassword(confPass);
        if (confPass !== password) {
            setErrors({ ...errors, ["confirmPassword"]: "Passwords do not match" });
        } else {
            delete errors.confirmPassword;
        }
    };


    return (
        <div>
            <h3>Dynamic Form Generator</h3>
            <div className='input'>
                {/* <label>Full Name</label> */}
                <input type="text" name="name" onChange={event => validateName(event)} className={errors.name !== undefined ? "invalid" : ""} placeholder="Name"></input>
                {errors.name && <span className='errorMsg'>{errors.name}</span>}
            </div>

            <div className='input'>
                {/* <label>Email Address</label> */}
                <input type="email" name="email" placeholder='Email' onChange={event => { validateEmail(event) }} className={errors.email !== undefined ? "invalid" : ""}></input>
                {console.log(errors.email, "Email Errors")}
                {errors.email && <span className='errorMsg'>{errors.email}</span>}
            </div>
            <div className='input'>
                {/* <label>Phone No</label> */}
                <input type="number" name="phone" placeholder='Phone' onChange={event => validatePhone(event)} className={errors.phone !== undefined ? "invalid" : ""}></input>
                {errors.phone && <span className='errorMsg'>{errors.phone}</span>}
            </div>

            <div className='input'>
                {/* <label>Password</label> */}
                <input type="password" name="password" placeholder='Password' onChange={event => validatePassword(event)} className={errors.password !== undefined ? "invalid" : ""}></input>
                {errors.password && <span className='errorMsg'>{errors.password}</span>}
            </div>
            <div className='input'>
                {/* <label>Confirm Password </label> */}
                <input type="password" name="confirm-password" placeholder='Confirm Password' onChange={event => validateConfirmPassword(event)} className={errors.confirmPassword !== undefined ? "invalid" : ""}></input>
                {errors.confirmPassword && <span className='errorMsg'>{errors.confirmPassword}</span>}
            </div>
            <div className='input'>
                {/* <h5>Highest Education</h5> */}
                <select>
                    <option value="option1">Highest Qualification</option>
                    <option value="option1">HSC</option>
                    <option value="option2">Graduation</option>
                    <option value="option3">Post Graduation</option>
                </select>
            </div>
            <div className='radionbtn'>
            {/* <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
            >
                Upload file
                <VisuallyHiddenInput type="file" />
            </Button> */}
            <input type="file" onChange={handleFileChange} />
      {fileData && (
        <div>
          {/* <h2>File Data</h2> */}
          Filename: {fileData.filename}
          Type: {fileData.type}
          Size: {fileData.size} bytes
          Content (Base64): {fileData.content}
        </div>
      )}
            
                <FormControlLabel value="private_employee" control={<Radio />} label="Private Employee" />
                <FormControlLabel value="govt_employee" control={<Radio />} label="Government Employee" />
            </div>
        </div>
    );
};

export default FormGenerate;