import React, { useState } from "react";

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
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>QR Generator</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{ width: "300px", marginRight: "1rem" }}
        />
        <button type="submit" disabled={!url || loading}>
          {loading ? "Generating..." : "Generate QR"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {qrSrc && (
        <div style={{ marginTop: "2rem" }}>
          <img src={qrSrc} alt="QR Code" />
        </div>
      )}
    </div>
  );
}

export default App;
