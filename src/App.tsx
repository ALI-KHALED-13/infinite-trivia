import { useEffect, useState } from "react"
import TriviaCard from "./components/TriviaCard";

function App() {
  const [isFetching, setIsFetching] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [sessionToken, setSessionToken] = useState("");
  
  
  useEffect(()=> {
    const getSessiontoken = async()=> {
      setIsFetching(true);
      try {
        const response = await fetch(`https://opentdb.com/api_token.php?command=request`);
        const jsonResp = await response.json();

        if (jsonResp.response_code === 0){
          setSessionToken(jsonResp.token);
        } else {
          throw new Error("some error happened, try refreshing the page")
        }
      } catch (err){
        setFetchError(err);
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
