import { useState,useEffect } from "react";
import "./App.css";
import logo from "./assets/logo.png";
import DynamicForm from "./components/DynamicForm";
import CreateRule from "./components/CreateRule";



function App() {
  
  
  const [rules,setRules] = useState([]);

  const [selectedRules, setSelectedRules] = useState([]); 
  const [loading, setLoading] = useState(false); 
  const [successMessage, setSuccessMessage] = useState(""); 
  const [errorMessage, setErrorMessage] = useState(""); 
  const [ruleToEvaluate, setRuleToEvaluate] = useState({});
  const [combinedRuleName, setCombinedRuleName] = useState("");

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  
    const handleCheckboxChange = (rule) => {
      console.log(selectedRules)
      setSelectedRules((prevSelectedRules) =>
        prevSelectedRules.includes(rule)
          ? prevSelectedRules.filter((r) => r !== rule)
          : [...prevSelectedRules, rule]
      );
    };

    useEffect(() => {
      const fetchAllRules = async () => {
        setLoading(true);
        try {
          const response = await fetch(`${backendUrl}/api/rule-engine/get-all-rules`);
          const data = await response.json();
          console.log(data);
          setRules(data);
        } catch (error) {
          setErrorMessage("Error fetching rules.");
        } finally {
          setLoading(false);
        }
      };
      fetchAllRules();
    }, []);
  
    

  useEffect(() => {
      if(selectedRules.length==1)
      {
        const reqRule = rules.find((rule) => rule._id === selectedRules[0]);
        setRuleToEvaluate(reqRule);
        console.log(reqRule);
      }
      else
      {
        setRuleToEvaluate({});
      }
  }, [selectedRules]);    

  const handleCombineRules = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await fetch(`${backendUrl}/api/rule-engine/combine-rules`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: combinedRuleName, rulesIds: selectedRules }),
      });
      const data = await response.json();

      if(!data.rule) return setErrorMessage("Error combining rules.");
      setRules([data.rule, ...rules]);
      setCombinedRuleName("");
      setSuccessMessage("Rules combined successfully!");
      console.log(data);
    } catch (error) {
      setErrorMessage("Error combining rules.");
      console.error('Error:', error);
    }
    finally {
      setLoading(false);
  }
}

  return (
    <div className="flex flex-col ">
      
      <div className="flex space-x-2 mx-auto">
        <img src={logo} />
        <h1 className="font-bold text-green-500">Rule Engine</h1>
      </div>

      <div className="mt-10 flex justify-around ">

        <div>
           
            <CreateRule setRules={setRules} rules={rules} setSelectedRules={setSelectedRules}/>
           <div className="mt-20 relative">
              <p className="text-xl">Select One Rule from the Created Rules to Evaluate</p>
              {
                // Check if a valid rule has been selected
                ruleToEvaluate && ruleToEvaluate.dataStructure && (
                  <DynamicForm 
                    dataStructure={ruleToEvaluate.dataStructure}
                    ruleId={ruleToEvaluate._id} 

                  />
                )
             }
              
           </div> 

           <div className="mt-20 relative">
              <p className="text-xl">Select Rules from the Created Rules to Combine</p>
                <form>

                  <input type="text" onChange={
                    (e)=>{
                      e.preventDefault();
                      setCombinedRuleName(e.target.value);
                    }
                  } 
                  placeholder="Enter Name for Combined Rule" className="mt-2 block w-full  p-4  text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" required/>
                  <div className="absolute start-0 mt-2 flex justify-between">
                    <button onClick={handleCombineRules} type="submit" className=" focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Combine</button>

                  </div>
                </form>
           </div> 
        </div>

        <div>
          <div>
              <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">Created Rules</h3>
              <ul className="w-60 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    {rules.map((rule,key) => (
                      <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600" key={key}>
                          <div className="flex items-center ps-3">
                              <input 
                              id={`checkbox-${key}`}
                              type="checkbox"
                              checked={selectedRules.includes(rule._id)}
                              onChange={() => handleCheckboxChange(rule._id)}
                              className="w-4 h-4 text-green-600 accent-green-400 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                              <label  className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{rule.name}</label>
                          </div>
                      </li>
                    )
                    
                    )}
              </ul>
            </div>
            
        </div>
      </div>
    </div>
  );
}

export default App;
