import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Tesseract from "tesseract.js";
import axios from "axios";
import CloudinaryUploadWidget from "./CloudinaryUpload";

function App() {
  const [answer, setAnswer] = useState("");
  const [status, setStatus] = useState({});
  const [image, setImage] = useState();
  const [queryText, setQueryText] = useState("");
  const [fetching, setFetching] = useState(false);

  // const uploadImage = (e) => {};

  // const handleAdd = (event) => {
  //   const img = event.target.files?.[0];
  //   const imageUrl = URL.createObjectURL(img);
  //   console.log(imageUrl);
  //   setImage(imageUrl);
  // };

  const recognize = () => {
    Tesseract.recognize(
      `${image}`,
      "eng",
      {
        logger: (m) => {
          // console.log(m);
          setStatus(m);
        },
      }
    ).then(({ data: { text } }) => {
      const cleanText = text.replace(/[^a-zA-Z0-9 ]/g, "");
      setQueryText(cleanText);      
    });
  };

  const getAnswers = () => {
    setFetching(true);
    let data = JSON.stringify({
      question: queryText,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${import.meta.env.VITE_API_URL}/api/v1/past_papers/gpt`,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      data: data,
      mode: "no-cors",
    };

    axios(config)
      .then(function (response) {
        const res = response.data;
        setAnswer(res?.message?.content);
        setFetching(false);
      })
      .catch(function (error) {
        console.log(error);
        setFetching(false);
      });
      setFetching(false);
  }

  

  return (
    <div className="App">
      <h1>Tusomeni: Image to Answers</h1>
      <div className="card">
        <div className="button-wrap btn-logo-box">
          {/* <input
            name="paperImage"
            id="upload"
            type="file"
            multiple={false}
            accept="image/png, image/jpeg"
            onChange={handleAdd}
            class="custom-file-input"
          /> */}
          {answer ? <button onClick={() => window.location.reload()}>reset</button>: <CloudinaryUploadWidget setImage={setImage}/>}
        </div>
        
        {(image && !answer) && (
          <>
            <div>
              <img
                src={image}
                alt="paper image"
                style={{ marginTop: "3em" }}
              />
              <p>*Tip - make sure the image is upright and of good quality and that text can be well read</p>
            </div>
            <button onClick={recognize} style={{ marginTop: "1em" }}>
              {"Extract Questions"} {status?.progress ? Math.round(status?.progress*100)+"%" : ""}
            </button>
          </>
        )}
        <div style={{marginTop: "1em"}}>
        {queryText && (
          <>
          <textarea cols="40" rows="15" value={queryText} onChange={(e) => setQueryText(e.target.value)} style={{border: "1px solid grey", borderRadius: "5px", padding: ".5em"}}></textarea>
          <p>* make sure the text is sensible. If not, edit it to what it is supposed to be</p>
          <button onClick={getAnswers} style={{ marginTop: "1em" }}>
              {fetching ? "Fetching Answers..." : "Get Answers"}
            </button>
          </>
        )}
        <div style={{marginTop: "1em"}}>
        {answer && (
              <textarea cols="40" rows="15" value={answer} style={{border: "1px solid grey", borderRadius: "5px", padding: ".5em"}}></textarea>
            )}
        </div>
        </div>
        
      </div>
    </div>
  );
}

export default App;
