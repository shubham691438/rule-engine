import React, { useState, useEffect } from 'react';

const DynamicForm = ({ dataStructure, ruleId }) => {
  const [formData, setFormData] = useState({});
  const [result, setResult] = useState(null);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  // Initialize formData with the keys from dataStructure
  useEffect(() => {
    const initialFormData = {};
    Object.keys(dataStructure).forEach(key => {
      initialFormData[key] = '';
    });
    setFormData(initialFormData);
  }, [dataStructure]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Create a copy of formData with correct data types
    const processedData = {};
    Object.keys(formData).forEach((key) => {
      const value = formData[key];
      processedData[key] = dataStructure[key] === 'Number' ? parseFloat(value) : value;
    });
  
    try {
      const response = await fetch(`${backendUrl}/api/rule-engine/evaluate-rule`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ruleId: ruleId,
          data: processedData, 
        }),
      });
  
      const resultData = await response.json();
      
      if (response.ok) {
        setResult(resultData.result);  
      } else {
        console.error('Evaluation failed:', resultData.message);
      }
    } catch (error) {
      console.error('Error during API call:', error.message);
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {Object.keys(dataStructure).map(key => (
        <div key={key} className="flex flex-col">
          <label className="text-start text-green-700 font-semibold mb-2">{key}</label>
          <input
            type={dataStructure[key]=== 'Number' ? 'number' : 'text'}
            name={key}
            value={formData[key]}
            onChange={handleChange}
            placeholder={`Enter ${key}`}
            className=" p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      ))}
      <div className="flex justify-start">
        <button
            type="submit"
            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors"
        >
            Evaluate
        </button>
      </div>

      {/* Display result after evaluation */}
      {result !== null && (
        <div className="mt-10 p-4 bg-green-100 text-green-700 rounded-md">
          <h3 className="font-bold">Evaluation Result:</h3>
          <p>{result ? 'True' : 'False'}</p>
        </div>
      )}
    </form>
  );
};

export default DynamicForm;
