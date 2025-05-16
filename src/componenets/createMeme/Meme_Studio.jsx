import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateCaption } from "../util/geminiApi";
import { useDispatch, useSelector } from "react-redux";

function CreateMemePageStudio() {
  const navigate = useNavigate();
  const {} = useSelector((state)=>state)
  const dispatch = useDispatch()

  const [image, setImage] = useState(null);
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const [fontSize, setFontSize] = useState(24);
  const [fontColor, setFontColor] = useState("#ffffff");
  const [alignment, setAlignment] = useState("center");
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleGenerateCaption = async () => {
    if (!topText && !bottomText)
      return alert("Enter some context for Gemini to generate from!");

    setLoading(true);
    const inputText = `${topText} ${bottomText}`;
    const captions = await generateCaptions(inputText, 3);
    setLoading(false);
    alert("✨ AI Caption:\n\n" + captions.join("\n"));
  };

  const handlePublish = () => {
    if (!user) {
      alert("Please log in to publish memes.");
      navigate("/login");
      return;
    }

    // TODO: Save meme to Firestore/Backend here
    alert("✅ Meme published!");
    navigate("/dashboard");
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Create Meme</h2>

      {/* Upload Image */}
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="mb-4"
      />

      {/* Text Inputs */}
      <input
        type="text"
        placeholder="Top text"
        value={topText}
        onChange={(e) => setTopText(e.target.value)}
        className="block w-full border p-2 mb-2 rounded"
      />
      <input
        type="text"
        placeholder="Bottom text"
        value={bottomText}
        onChange={(e) => setBottomText(e.target.value)}
        className="block w-full border p-2 mb-4 rounded"
      />

      {/* Style Controls */}
      <div className="flex gap-4 mb-4">
        <label>
          Font Size:
          <input
            type="number"
            value={fontSize}
            onChange={(e) => setFontSize(parseInt(e.target.value))}
            className="ml-2 w-16 border p-1 rounded"
          />
        </label>
        <label>
          Font Color:
          <input
            type="color"
            value={fontColor}
            onChange={(e) => setFontColor(e.target.value)}
            className="ml-2"
          />
        </label>
        <label>
          Align:
          <select
            value={alignment}
            onChange={(e) => setAlignment(e.target.value)}
            className="ml-2 border p-1 rounded"
          >
            <option value="center">Center</option>
            <option value="left">Left</option>
            <option value="right">Right</option>
          </select>
        </label>
      </div>

      {/* Preview */}
      {image && (
        <div className="relative w-full max-w-lg mx-auto border shadow-lg">
          <img src={image} alt="Meme Preview" className="w-full" />
          <div
            className={`absolute top-2 left-0 right-0 text-${alignment} px-2 font-extrabold`}
            style={{ fontSize: `${fontSize}px`, color: fontColor }}
          >
            {topText}
          </div>
          <div
            className={`absolute bottom-2 left-0 right-0 text-${alignment} px-2 font-extrabold`}
            style={{ fontSize: `${fontSize}px`, color: fontColor }}
          >
            {bottomText}
          </div>
        </div>
      )}

      {/* Buttons */}
      <div className="mt-4 flex gap-4">
        <button
          onClick={handleGenerateCaption}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Caption with Gemini"}
        </button>

        <button
          onClick={handlePublish}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Publish Meme
        </button>
      </div>
    </div>
  );
}

export default CreateMemePageStudio
