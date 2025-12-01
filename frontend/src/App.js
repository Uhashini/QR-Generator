import React, { useState } from "react";
import "./App.css";

function App() {
  const [url, setUrl] = useState("");
  const [qrSrc, setQrSrc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setQrSrc(null);

    try {
      const response = await fetch("http://localhost:5000/generate-qr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate QR");
      }

      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      setQrSrc(imageUrl);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <div className="card">
        <h1 className="title">QR Generator</h1>
        <p className="subtitle">
          Paste any URL and get an instant downloadable QR code.
        </p>

        <form className="form" onSubmit={handleSubmit}>
          <div className="field-group">
            <input
              type="text"
              placeholder="https://your-website.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="input"
            />
            <p className="helper-text">
              Tip: Use a full URL including <code>https://</code>.
            </p>
          </div>

          <button
            type="submit"
            className="button"
            disabled={!url || loading}
          >
            {loading ? "Generating..." : "Generate QR"}
          </button>

          {error && <p className="error">{error}</p>}
        </form>

        {qrSrc && (
          <div className="qr-wrapper">
            <img src={qrSrc} alt="QR Code" className="qr-image" />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
