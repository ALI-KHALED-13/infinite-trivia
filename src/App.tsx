import { useEffect, useState } from "react"
import TriviaSection from "./components/TriviaSection";
import axios from "axios";
import Loader from "./components/Loader";

function App() {
  const [isFetching, setIsFetching] = useState(false);
  const [fetchError, setFetchError] = useState<IFetchError | null>(null);
  const [sessionToken, setSessionToken] = useState(""); // to avoid questions repetition
  
  useEffect(()=> {
    const getSessiontoken = async()=> {
      setIsFetching(true);
      try {
        const response = await axios.get("https://opentdb.com/api_token.php?command=request");
        setSessionToken(response.data.token);

      } catch (error: any){
        setFetchError(error.response?.data || error);
      } finally {
        setIsFetching(false);
      }
    }
    getSessiontoken()
    const LeanWindow = window;
    LeanWindow.Lean.connect({
      app_token: "0b90de00-da33-49b7-985e-bd9c5c5cb133",
      permissions: ["identity","accounts","transactions","balance"],
      sandbox: true,
      customer_id: "investors"
    })
  }, [])

  
  return (
    <div style={{textAlign: "center", marginTop: "5rem"}}>

      <h1>Infinite Trivia</h1>

      {isFetching? <Loader text="initiating a session..."/>: 
        fetchError? <div>{fetchError.message}</div>:(
          <TriviaSection sessionToken={sessionToken} />
      )}
    </div>
  )
}

export default App
