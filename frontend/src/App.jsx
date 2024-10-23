import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import logo from "./assets/logo.png";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col ">
      
      <div className="flex space-x-2 mx-auto">
        <img src={logo} />
        <h1 className="font-bold text-green-500">Rule Engine</h1>
      </div>

      <div className="mt-10 flex justify-around ">

        <div>
            <div>
              <form class="max-w-md mx-auto">   
                
                <div class="relative">
                    <input type="text" placeholder="Enter Name of Rule" class="block w-full  p-4  text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" required/>
                    <input type="text" id="addRule" class="mt-1 block w-full p-4  text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="Add Rule String..." required />
                    <button type="submit" class="text-white absolute start-0 mt-2 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Add Rule</button>
                </div>
            </form>
           </div>

           <div className="mt-20 relative">
              <p className="text-xl">Select Rule from the Added Rules to Evaluate</p>
              <div className="absolute start-0 mt-2 flex justify-between">
                <button type="button" class=" focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Evaluate</button>
                <div className="mt-4">
                  <span className="text-green-500 font-semibold">Result : </span><span> Eligible</span>
                </div>
              </div>
           </div> 

           <div className="mt-20 relative">
              <p className="text-xl">Select Rules from the Added Rules to Combine</p>
                <forn>
                  <input type="text" placeholder="Enter Name for Combined Rule" class="mt-2 block w-full  p-4  text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" required/>
                  <div className="absolute start-0 mt-2 flex justify-between">
                    <button type="submit" class=" focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Evaluate</button>

                  </div>
                </forn>
           </div> 
        </div>

        <div>
          <div>
              <h3 class="mb-4 font-semibold text-gray-900 dark:text-white">Added Rules</h3>
              <ul class="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                  <li class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                      <div class="flex items-center ps-3">
                          <input id="vue-checkbox" type="checkbox" value="" class="w-4 h-4 text-green-600 accent-green-400 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                          <label for="vue-checkbox" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Vue JS</label>
                      </div>
                  </li>
                  <li class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                      <div class="flex items-center ps-3">
                          <input id="react-checkbox" type="checkbox" value="" class="w-4 h-4 text-green-600 accent-green-400 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                          <label for="react-checkbox" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">React</label>
                      </div>
                  </li>
                  <li class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                      <div class="flex items-center ps-3">
                          <input id="angular-checkbox" type="checkbox" value="" class="w-4 h-4 text-green-600 accent-green-400 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                          <label for="angular-checkbox" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Angular</label>
                      </div>
                  </li>
                  <li class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                      <div class="flex items-center ps-3">
                          <input id="laravel-checkbox" type="checkbox" value="" class="w-4 h-4 text-green-600 accent-green-400 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                          <label for="laravel-checkbox" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Laravel</label>
                      </div>
                  </li>
              </ul>
            </div>
        </div>



      </div>
    </div>
  );
}

export default App;
