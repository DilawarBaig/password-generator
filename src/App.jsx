import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback( () =>  {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*+=-_~`";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  },[length, numAllowed,charAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(0,10)
    window.navigator.clipboard.writeText(password)

  },[password])

  useEffect(()=>{
    passwordGenerator()
  },[length,numAllowed,charAllowed])
  return (
    <>
      <div className="w-full max-w-md mx-auto shaow-md rounded-lg pt-4 pb-4 px-3 my-8 text-orange-500 bg-gray-500 ">
        <h1 className="text-white text-center -mt-2 mb-3 text-2xl fo">Password</h1>
        <div className="flex shadow-lg rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            readOnly
            className="outline-none w-full py-1 px-3"
            placeholder="password "
            ref={passwordRef}
          />
          <button
          onClick={copyPasswordToClipboard} 
          className="outline-none bg-blue-500 text-white font-semibold px-3 py-0.5 shrink-0 hover:bg-blue-600 active:bg-blue-700 ">
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap=x-1 bg-slate-600 px-1">
            <input
              type="range"
              min={6}
              max={50}
              value={length}
              className="cursor-pointer  "
              onChange={(e) => setLength(e.target.value)}
            />
            <label>length: {length}</label>
            <div className="flex items-center gap-x-2 px-6">
              <input type="checkbox" 
              defaultChecked={numAllowed}
              id="numberInput"
              onChange={()=>{
                setNumAllowed(prev => !prev)
              }}
              />
              <label >Numbers</label>
              <div className="flex items-center gap-x-1 ">
              <input type="checkbox"
              defaultChecked={charAllowed}
              id="charInput"
              onChange={()=>{
                setCharAllowed(prev => !prev)
              }}
              />
              <label >Character</label>
              </div>


          
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
