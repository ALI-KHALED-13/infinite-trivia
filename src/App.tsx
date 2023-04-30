import { useEffect, useState } from "react"
import TriviaCard from "./components/TriviaCard";
import axios from "axios";

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
      <h1 style={{color: "orange"}}>Trivia Game</h1>
      {isFetching? <div>Loading...</div>: 
        fetchError? <div>{fetchError.message}</div>:(
          <TriviaCard sessionToken={sessionToken} />
      )}  
    </div>
  )
}

export default App
