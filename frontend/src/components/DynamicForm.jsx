import React, { useState, useEffect } from 'react';

const DynamicForm = ({ dataStructure, ruleId }) => {
  const [formData, setFormData] = useState({});
  const [result, setResult] = useState(null);
  
  const [loading, setLoading] = useState(false); 
  const [successMessage, setSuccessMessage] = useState(""); 
  const [errorMessage, setErrorMessage] = useState(""); 

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

  const handleEvaluate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");
  
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

      if(!response.ok)  throw new Error(resultData.error?.message);
      

    setResult(resultData.result); 
     
    } catch (error) {
        setErrorMessage(` ${error.message}`);
        console.error('Error:', error);
    }
    finally {
        setLoading(false);
      }
  };
  

  return (
    <form onSubmit={handleEvaluate} className="space-y-4">
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
        {!loading && <div className="flex justify-start mt-2"> <button type="submit" onClick={handleEvaluate} className="text-white  bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Evaluate </button></div>}
        {loading && <button disabled type="button" class="mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
                        <svg aria-hidden="true" role="status" class="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                        </svg>
                        Evaluating...
                        </button>
        }

      {errorMessage && <div className="text-red-500 mt-4 ">{errorMessage}</div>}
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
