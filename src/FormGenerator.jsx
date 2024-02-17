import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import "./form.css"
const FormGenerator = () => {
  const [formFields, setFormFields] = useState([]);
  const [formData, setFormData] = useState({});
//   const [errors, setErrors] = useState({});

  const addFormField = (type) => {
    const newField = { type, label: '', options: [] };
    setFormFields([...formFields, newField]);
  };

  const removeFormField = (index) => {
    const updatedFields = [...formFields];
    updatedFields.splice(index, 1);
    setFormFields(updatedFields);
  };

  const handleInputChange = (index, key, value) => {
    const updatedFields = [...formFields];
    updatedFields[index][key] = value;
    setFormFields(updatedFields);
    
  };
// const handleInputChange = (index, value) => {
//     const updatedFormFields = [...formFields];
//     updatedFormFields[index].value = value;
//     setFormFields(updatedFormFields);
//   };

  const handleOptionChange = (index, optionIndex, value) => {
    const updatedFields = [...formFields];
    updatedFields[index].options[optionIndex] = value;
    setFormFields(updatedFields);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Form validation logic goes here
    console.log(formData);
  };

  const renderFormField = (field, index) => {
    switch (field.type) {
      case 'text':
      case 'textarea':
        return (
          <div key={index}>
            <label>
              {field.label}:
              {/* <TextField
               id="outlined-text-input"
                label="text"
                 type={field.type}
                 value={formData[field.label]}
                 onChange={(e) => setFormData({ ...formData, [field.label]: e.target.value })}
                 /> */}
              <input
                type={field.type}
                value={formData[field.label]}
                onChange={(e) => setFormData({ ...formData, [field.label]: e.target.value })}
              />
            </label>
          </div>
        );
      case 'dropdown':
        return (
          <div key={index}>
            <label>
              {field.label}:
              <select
                value={formData[field.label]}
                onChange={(e) => setFormData({ ...formData, [field.label]: e.target.value })}
              >
                {field.options.map((option, optionIndex) => (
                  <option key={optionIndex} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>
        );
        case 'checkbox':
        return (
          <div key={index}>
            <label>
              <input
                type="checkbox"
                checked={formData[field.label] || false}
                onChange={(e) => setFormData({ ...formData, [field.label]: e.target.checked })}
              />
              {field.label}
            </label>
          </div>
        );
        case 'radio':
      return (
        <div key={index}>
          <label>
            {field.label}:
            {field.options.map((option, optionIndex) => (
              <div key={optionIndex}>
                <input
                  type="radio"
                  name={field.label}
                  value={option}
                  checked={formData[field.label] === option}
                  onChange={(e) => handleInputChange(index, 'value', e.target.value)}
                />
                {option}
              </div>
            ))}
          </label>
        </div>
      );
    case 'file':
      return (
        <div key={index}>
          <label>
            {field.label}:
            <input
              type="file"
              onChange={(e) => handleInputChange(index, 'file', e.target.files[0])}
            />
          </label>
        </div>
      );
      // Implement other cases for checkbox, radio button, file upload
      default:
        return null;
    }
  };

  return (
    <div>
      <h1>Dynamic Form Generator</h1>
      <form onSubmit={handleFormSubmit}>
        {formFields.map((field, index) => (
          <div key={index}>
            <div style = {{margin: "10px", display:"flex"}}>
            <select value={field.type} onChange={(e) => handleInputChange(index, 'type', e.target.value)}>
                <option exact value="text">Text Input</option>
                <option exact value="textarea">Text Area</option>
                <option exact value="dropdown">Dropdown</option>
                {/* Add options for other field types */}
              </select>
              {(field.type === 'text'||field.type === 'textarea') && (
               <div className='input'>
               <input type= "text" value={field.label} onChange={(e) => handleInputChange(index, 'label', e.target.value)} />
               <button type="button" onClick={() => removeFormField(index)}>Remove</button>
               
                {/* <label>Full Name</label> */}
                {/* <input type="text" name="name" onChange={event => validateName(event)} className={errors.name !== undefined ? "invalid" : ""} placeholder="Name"></input>
                {errors.name && <span className='errorMsg'>{errors.name}</span>} */}
            </div>
              )}
              {/* <input type="text" value={field.label} onChange={(e) => handleInputChange(index, 'label', e.target.value)} /> */}
            {field.type === 'dropdown' && (
              <div>
                {field.options.map((option, optionIndex) => (
                  <input
                    key={optionIndex}
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange(index, optionIndex, e.target.value)}
                  />
                ))}
                <button type="button" onClick={() => handleOptionChange(index, field.options.length, '')}>Add Option</button>
                <button type="button" onClick={() => removeFormField(index)}>Remove</button>
              </div>
            )}
              </div>
          </div>
        ))}
        <button type="button" onClick={() => addFormField('text')}>Add Text Input</button>
         <button type="button" onClick={() => addFormField('textarea')}>Add Text Area</button>
        <button type="button" onClick={() => addFormField('dropdown')}>Add Dropdown</button>
         <button type="button" onClick={() => addFormField('checkbox')}>Add Checkbox</button>
        <button type="button" onClick={() => addFormField('radio')}>Add Radio Button</button>
        <button type="button" onClick={() => addFormField('file')}>Add File Upload</button>     
{/* Add buttons for other field types */}
        <button type="submit">Submit</button>
       </form>
     </div>
  );
 };

// return (
//     <div>
//       <h1>Dynamic Form Generator</h1>
//       <form onSubmit={handleFormSubmit}>
//         {formFields.map((field, index) => (
//           <div key={index}>
//             {renderFormField(field, index)}
//             <button type="button" onClick={() => removeFormField(index)}>Remove</button>
//           </div>
//         ))}
//         <button type="button" onClick={() => addFormField('text')}>Add Text Input</button>
//         <button type="button" onClick={() => addFormField('textarea')}>Add Text Area</button>
//         <button type="button" onClick={() => addFormField('dropdown')}>Add Dropdown</button>
//         <button type="button" onClick={() => addFormField('checkbox')}>Add Checkbox</button>
//         <button type="button" onClick={() => addFormField('radio')}>Add Radio Button</button>
//         <button type="button" onClick={() => addFormField('file')}>Add File Upload</button>
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };
export default FormGenerator;
