import { useEffect, useState } from "react"
import TriviaSection from "./components/TriviaSection";
import axios from "axios";
import Loader from "./components/Loader";

function App() {
  const [isFetching, setIsFetching] = useState(false);
  const [fetchError, setFetchError] = useState<IFetchError | null>(null);
  const [sessionToken, setSessionToken] = useState("");
  
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
  }, [])

  
  return (
    <div style={{textAlign: "center", marginTop: "5rem"}}>
      <h1 style={{color: "orange"}}>Infinite Trivia</h1>
      {isFetching? <Loader text="initiating a session..."/>: 
        fetchError? <div>{fetchError.message}</div>:(
          <TriviaSection sessionToken={sessionToken} />
      )} 
    </div>
    
  )
}

export default App
