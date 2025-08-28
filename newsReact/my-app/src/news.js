import { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [category, setCategory] = useState("general");
  const [articles, setArticles] = useState([]);
  const [saved, setSaved] = useState([]);

  // Fetch news when category changes
  useEffect(() => {
    axios.get(`http://localhost:5000/news?category=${category}`)
      .then(res => setArticles(res.data))
      .catch(err => console.error(err));
  }, [category]);

  const saveArticle = (article) => {
    axios.post("http://localhost:5000/save", article)
      .then(() => {
        alert("Saved for later!");
        loadSaved();
      });
  };

  const loadSaved = () => {
    axios.get("http://localhost:5000/saved")
      .then(res => setSaved(res.data));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>News App</h1>

      <select value={category} onChange={e => setCategory(e.target.value)}>
        <option value="general">General</option>
        <option value="technology">Tech</option>
        <option value="sports">Sports</option>
        <option value="business">Business</option>
        <option value="entertainment">Entertainment</option>
      </select>

      <h2>Top Headlines</h2>
      {articles.map((a, i) => (
        <div key={i} style={{ marginBottom: "10px" }}>
          <strong>{a.title}</strong>
          <br />
          <button onClick={() => saveArticle(a)}>Read Later</button>
        </div>
      ))}

      <h2>Read Later</h2>
      {saved.map((a, i) => (
        <div key={i} style={{ marginBottom: "10px" }}>
          <strong>{a.title}</strong>
        </div>
      ))}
    </div>
  );
}