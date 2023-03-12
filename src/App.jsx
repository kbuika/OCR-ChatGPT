import axios from "axios";
import { useState } from "react";
import Tesseract from "tesseract.js";
import "./App.css";
import CloudinaryUploadWidget from "./CloudinaryUpload";

function App() {
  const [answer, setAnswer] = useState("");
  const [status, setStatus] = useState({});
  const [image, setImage] = useState();
  const [queryText, setQueryText] = useState("");
  const [fetching, setFetching] = useState(false);

  const recognize = () => {
    Tesseract.recognize(`${image}`, "eng", {
      logger: (m) => {
        setStatus(m);
      },
    }).then(({ data: { text } }) => {
      const cleanText = text.replace(/[^a-zA-Z0-9 ]/g, "");
      setQueryText(cleanText);
    });
  };

  const getAnswers = async () => {
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

    try {
      const res = await axios(config);
      setAnswer(res?.data?.message?.content);
      setFetching(false);
    } catch (err) {
      console.log(err);
      setFetching(false);
    } finally {
      setFetching(false);
    }
    setFetching(false);
  };

  return (
    <div className="App">
      <h1>Tusomeni: Image to Answers</h1>
      <div className="card">
        <div className="button-wrap btn-logo-box">
          {answer ? (
            <button onClick={() => window.location.reload()}>reset</button>
          ) : (
            <CloudinaryUploadWidget setImage={setImage} />
          )}
        </div>

        {image && !answer && (
          <>
            <div>
              <img src={image} alt="paper image" style={{ marginTop: "3em" }} />
              <p>
                *Tip - make sure the image is upright and of good quality and
                that text can be well read
              </p>
            </div>
            <button onClick={recognize} style={{ marginTop: "1em" }}>
              {"Extract Questions"}{" "}
              {status?.progress ? Math.round(status?.progress * 100) + "%" : ""}
            </button>
          </>
        )}
        <div style={{ marginTop: "1em" }}>
          {queryText && (
            <>
              <textarea
                cols="40"
                rows="15"
                value={queryText}
                onChange={(e) => setQueryText(e.target.value)}
                style={{
                  border: "1px solid grey",
                  borderRadius: "5px",
                  padding: ".5em",
                }}
              ></textarea>
              <p>
                * make sure the text is sensible. If not, edit it to what it is
                supposed to be
              </p>
              {answer && (
                <p>* you can edit the text to get different answers</p>
              )}

              <button onClick={getAnswers} style={{ marginTop: "1em" }}>
                {fetching ? "Fetching Answers..." : "Get Answers"}
              </button>
            </>
          )}
          <div style={{ marginTop: "1em" }}>
            {answer && (
              <textarea
                cols="40"
                rows="15"
                value={answer}
                style={{
                  border: "1px solid grey",
                  borderRadius: "5px",
                  padding: ".5em",
                }}
              ></textarea>
            )}
          </div>
        </div>
        <footer
          style={{
            position: "relative",
            bottom: "0",
            padding: ".5em",
            marginTop: "3em",
          }}
        >
          <hr />
          Built by <a href="https://twitter.com/the_kibuika">Kibuika</a>
        </footer>
      </div>
    </div>
  );
}

export default App;
