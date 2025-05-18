// import React, { useRef, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { generateCaptions } from "../util/geminiApi";
// import { useSelector } from "react-redux";
// import { toPng } from "html-to-image";

// function CreateMemePageStudio() {
//   const navigate = useNavigate();
//   const { user } = useSelector((state) => state.app);

//   const [image, setImage] = useState(null);
//   const [topText, setTopText] = useState("");
//   const [bottomText, setBottomText] = useState("");
//   const [fontSize, setFontSize] = useState(24);
//   const [fontColor, setFontColor] = useState("#ffffff");
//   const [alignment, setAlignment] = useState("center");
//   const [loading, setLoading] = useState(false);
//   const [darkMode, setDarkMode] = useState(false);

//   const memeRef = useRef(null);

//   useEffect(() => {
//     if (darkMode) {
//       document.documentElement.classList.add("dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//     }
//   }, [darkMode]);

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImage(URL.createObjectURL(file));
//     }
//   };

//   const handleGenerateCaption = async () => {
//     if (!topText && !bottomText)
//       return alert("Enter some context for Gemini to generate from!");

//     setLoading(true);
//     const inputText = `${topText} ${bottomText}`;
//     const captions = await generateCaptions(inputText, 3);
//     setLoading(false);
//     alert("✨ AI Caption:\n\n" + captions.join("\n"));
//   };

//   const exportMemeAsImage = async () => {
//     if (!memeRef.current) return;
//     const dataUrl = await toPng(memeRef.current);
//     const link = document.createElement("a");
//     link.download = "meme.png";
//     link.href = dataUrl;
//     link.click();
//   };

//   const saveToLocalStorage = async (status) => {
//     if (!user) {
//       alert("Please log in first.");
//       navigate("/login");
//       return;
//     }

//     if (!memeRef.current) return;

//     const imageDataUrl = await toPng(memeRef.current);

//     const memeData = {
//       id: Date.now(),
//       userId: user.uid,
//       image: imageDataUrl,
//       topText,
//       bottomText,
//       fontSize,
//       fontColor,
//       alignment,
//       status,
//       createdAt: new Date().toISOString(),
//     };

//     const key = status === "draft" ? "draftMemes" : "publishedMemes";
//     const saved = JSON.parse(localStorage.getItem(key)) || [];
//     saved.push(memeData);
//     localStorage.setItem(key, JSON.stringify(saved));

//     alert(
//       status === "draft"
//         ? "💾 Meme saved as draft!"
//         : "✅ Meme published successfully!"
//     );

//     if (status === "published") navigate("/dashboard");
//   };

//   return (
//     <div className="p-4 max-w-3xl mx-auto text-gray-900 dark:text-white bg-white dark:bg-gray-900 min-h-screen">
//       <button
//         onClick={() => setDarkMode(!darkMode)}
//         className="absolute top-4 right-4 text-sm px-3 py-1 bg-gray-300 dark:bg-gray-700 rounded"
//       >
//         {darkMode ? "🌙 Dark" : "☀️ Light"}
//       </button>

//       <h2 className="text-3xl font-bold mb-4 text-center">Create Your Meme</h2>

//       <div className="my-4">
//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleImageUpload}
//           className="file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
//         />
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//         <input
//           type="text"
//           placeholder="Top text"
//           value={topText}
//           onChange={(e) => setTopText(e.target.value)}
//           className="w-full border p-2 rounded dark:bg-gray-800 dark:border-gray-700"
//         />
//         <input
//           type="text"
//           placeholder="Bottom text"
//           value={bottomText}
//           onChange={(e) => setBottomText(e.target.value)}
//           className="w-full border p-2 rounded dark:bg-gray-800 dark:border-gray-700"
//         />
//       </div>

//       <div className="flex flex-wrap items-center gap-4 mb-4">
//         <label className="flex items-center gap-2">
//           Font Size:
//           <input
//             type="range"
//             min="12"
//             max="64"
//             value={fontSize}
//             onChange={(e) => setFontSize(parseInt(e.target.value))}
//             className="w-32"
//           />
//           <span>{fontSize}px</span>
//         </label>
//         <label className="flex items-center gap-2">
//           Font Color:
//           <input
//             type="color"
//             value={fontColor}
//             onChange={(e) => setFontColor(e.target.value)}
//           />
//         </label>
//         <label className="flex items-center gap-2">
//           Align:
//           <select
//             value={alignment}
//             onChange={(e) => setAlignment(e.target.value)}
//             className="border p-1 rounded dark:bg-gray-800 dark:border-gray-700"
//           >
//             <option value="center">Center</option>
//             <option value="left">Left</option>
//             <option value="right">Right</option>
//           </select>
//         </label>
//       </div>

//       {image && (
//         <div
//           ref={memeRef}
//           className="relative w-full max-w-lg mx-auto border shadow-lg animate-fade-in bg-white dark:bg-gray-800 rounded overflow-hidden"
//         >
//           <img src={image} alt="Meme Preview" className="w-full rounded" />

//           <div
//             className={`absolute top-2 left-0 right-0 text-${alignment} px-2 font-extrabold`}
//             style={{ fontSize: `${fontSize}px`, color: fontColor }}
//           >
//             {topText}
//           </div>
//           <div
//             className={`absolute bottom-6 left-0 right-0 text-${alignment} px-2 font-extrabold`}
//             style={{ fontSize: `${fontSize}px`, color: fontColor }}
//           >
//             {bottomText}
//           </div>
//           {user?.displayName && (
//             <div className="absolute bottom-1 right-2 text-xs text-gray-700 dark:text-gray-300 opacity-60">
//               @{user.displayName}
//             </div>
//           )}
//         </div>
//       )}

//       <div className="mt-6 flex flex-wrap gap-4 justify-center">
//         <button
//           onClick={handleGenerateCaption}
//           className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
//           disabled={loading}
//         >
//           {loading ? "Generating..." : "Generate Caption with Gemini"}
//         </button>

//         <button
//           onClick={() => saveToLocalStorage("published")}
//           className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//         >
//           Publish Meme
//         </button>

//         <button
//           onClick={() => saveToLocalStorage("draft")}
//           className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
//         >
//           Save as Draft
//         </button>

//         <button
//           onClick={exportMemeAsImage}
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//         >
//           Download Meme
//         </button>
//       </div>
//     </div>
//   );
// }

// export default CreateMemePageStudio;

import React, { useState, useRef, useEffect } from "react";
import html2canvas from "html2canvas";
import { useSelector } from "react-redux";
import { generateCaptions } from "../util/geminiApi";
const memeTemplates = [
  "https://i.imgflip.com/30b1gx.jpg",
  "https://i.imgflip.com/4t0m5.jpg",
  "https://i.imgflip.com/1bij.jpg",
  "https://i.imgflip.com/26am.jpg",
  "https://i.imgflip.com/1otk96.jpg",
];

const MemeStudio = () => {
  const { user } = useSelector((state) => state.app);
  const [image, setImage] = useState(null);
  const [title,setTitle] = useState("")
  const [loading, setLoading] = useState(false);
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const [Captions, setCaptions] = useState([]);
  const [topStyle, setTopStyle] = useState({
    fontSize: "40px",
    fontFamily: "Impact",
    color: "#ffffff",
    textAlign: "center",
    textShadow: true,
    animation: "",
  });
  const [bottomStyle, setBottomStyle] = useState({
    fontSize: "40px",
    fontFamily: "Impact",
    color: "#ffffff",
    textAlign: "center",
    textShadow: true,
    animation: "",
  });
  const [darkMode, setDarkMode] = useState(false);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const previewRef = useRef(null);
  const canvasRef = useRef(null);

  const updateHistory = (newTop, newBottom) => {
    const newHistory = [
      ...history.slice(0, historyIndex + 1),
      { top: newTop, bottom: newBottom },
    ];
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const prev = history[historyIndex - 1];
      setTopText(prev.top);
      setBottomText(prev.bottom);
      setHistoryIndex(historyIndex - 1);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const next = history[historyIndex + 1];
      setTopText(next.top);
      setBottomText(next.bottom);
      setHistoryIndex(historyIndex + 1);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  const handleTextChange = (text, isTop) => {
    if (isTop) {
      setTopText(text);
      updateHistory(text, bottomText);
    } else {
      setBottomText(text);
      updateHistory(topText, text);
    }
  };

  const exportMeme = async () => {
    if (previewRef.current) {
      const canvas = await html2canvas(previewRef.current);
      const link = document.createElement("a");
      link.download = "meme.png";
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  const publishMeme = async () => {
    if (!user) {
      alert("Please log in first to publish.");
      navigate("/login");
      return;
    }
    if (!previewRef.current) {
      alert("No meme to publish.");
      return;
    }

    try {
  //     const canvas = await html2canvas(previewRef.current);
  //     const imageDataUrl = canvas.toDataURL();

  //     const payload = {
  //       created_by: user,
  //       post_image: imageDataUrl,
  //       description:title,
  //       tags:Captions.join(",")
  //     };
  //     console.log(payload)

  //     const response = await fetch(
  //       "https://backend-memehub-production.up.railway.app/api/posts/",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(payload),
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error(`Failed to publish: ${response.statusText}`);
  //     }

  //     const data = await response.json();
  //     alert("🎉 Meme published successfully!");
  //     console.log("Publish response:", data);
  //   } catch (error) {
  //     console.error("Publish error:", error);
  //     alert("⚠️ Error publishing meme. Please try again.");
  //   }
  // };

  const canvas = await html2canvas(previewRef.current);
    const blob = await new Promise((resolve) =>
      canvas.toBlob(resolve, "image/png")
    );

    const formData = new FormData();
    // Ensure 'user', 'title', and 'Captions' are not null, undefined, or empty
    if (!user || !title || !Captions || Captions.length === 0) {
        console.error("Missing required data for post");
        // Handle the error, maybe display a message to the user
        return;
    }

    formData.append("created_by", user);
    formData.append("description", title);
    // Check if backend expects a comma-separated string or an array
    // Assuming comma-separated is expected based on current code
    formData.append("tags", Captions.join(","));
    formData.append("post_image", blob, "meme.png");

    // Log formData entries to verify data before sending
    for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
    }

    const response = await fetch(
      "https://backend-memehub-production.up.railway.app/api/posts/",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      const errorText = await response.text(); 
      console.error(`Failed to publish: ${response.status} - ${response.statusText}`, errorText);
      throw new Error(`Failed to publish: ${response.statusText}`);
    }

    const data = await response.json();
    alert("🎉 Meme published successfully!");
    console.log("Published meme URL:", data?.post_image);

  } catch (error) {
    console.error("Publish error:", error);
    alert("⚠️ Error publishing meme. Please try again.");
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
    console.log(captions);
    setCaptions([...captions.slice(1)]);
    console.log(Captions);
  };

  const saveDraft = async () => {
    if (!user) {
      alert("Please log in first.");
      navigate("/login");
      return;
    }
    if (!previewRef.current) return;
    const canvas = await html2canvas(previewRef.current);
    const imageDataUrl = canvas.toDataURL();

    const draft = {
      id: Date.now(),
      image: imageDataUrl,
      topText,
      bottomText,
      topStyle,
      bottomStyle,
      createdAt: new Date().toISOString(),
    };

    const key = `draftMemes_${user.uid || user.email}`;
    const existingDrafts = JSON.parse(localStorage.getItem(key)) || [];
    existingDrafts.push(draft);

    localStorage.setItem(key, JSON.stringify(existingDrafts));

    alert("💾 Meme draft saved!");
  };

  const loadDrafts = () => {
    if (!user) return [];

    const key = `draftMemes_${user.uid || user.email}`;
    const drafts = JSON.parse(localStorage.getItem(key)) || [];
    return drafts;
  };

  useEffect(() => {
    if (!user) return;
    const drafts = loadDrafts();
    if (drafts.length > 0) {
      const lastDraft = drafts[drafts.length - 1];
      setImage(lastDraft.image);
      setTopText(lastDraft.topText);
      setBottomText(lastDraft.bottomText);
      setTopStyle(lastDraft.topStyle);
      setBottomStyle(lastDraft.bottomStyle);
    }
  }, [user]);

  return (
    <div
      className={`min-h-screen p-4 md:p-6 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-center">
        🎨 Meme Creation Studio
      </h1>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 space-y-4">
          <div className="flex flex-col gap-2 border-2 p-2 rounded">
            <label className="font-medium">Upload or Choose a Template:</label>
            <div className="border-2 p-2 rounded">
              <input
                type="file"
                onChange={handleImageUpload}
                accept="image/*"
                className="w-full"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {memeTemplates.map((template, index) => (
                <img
                  key={index}
                  src={template}
                  alt={`Template ${index + 1}`}
                  onClick={() => setImage(template)}
                  className="w-20 h-20 object-cover border cursor-pointer hover:scale-105 transition"
                />
              ))}
            </div>
          </div>

          <h4 className="mb-0">Description : </h4>
          <div>
            <input
            type="text"
            placeholder="description or title of memes"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
          />
          </div>

          <h4 className="mb-0">Top Text : </h4>
          <input
            type="text"
            placeholder="Top Text"
            value={topText}
            onChange={(e) => handleTextChange(e.target.value, true)}
            className="w-full p-2 border rounded"
          />
          <h4 className="mb-0">Bottom Text : </h4>
          <input
            type="text"
            placeholder="Bottom Text"
            value={bottomText}
            onChange={(e) => handleTextChange(e.target.value, false)}
            className="w-full p-2 border rounded"
          />

          {/* Style Controls */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 border-2 p-4 rounded-lg text-sm">
            <StyleControls
              title="Top Text Style"
              style={topStyle}
              setStyle={setTopStyle}
            />
            <StyleControls
              title="Bottom Text Style"
              style={bottomStyle}
              setStyle={setBottomStyle}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleUndo}
              className="px-4 py-2 bg-yellow-500 text-white rounded"
            >
              ↩️ Undo
            </button>
            <button
              onClick={handleRedo}
              className="px-4 py-2 bg-yellow-500 text-white rounded"
            >
              ↪️ Redo
            </button>

            <button
              onClick={handleGenerateCaption}
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
              disabled={loading}
            >
              {loading ? "Generating..." : "Generate Caption with Gemini"}
            </button>

            <button
              onClick={exportMeme}
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              📥 Download
            </button>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="px-2 py-2 bg-indigo-600 text-white rounded"
            >
              Toggle Dark Mode
            </button>
            <button
              onClick={() => saveDraft()}
              className="px-2 py-2 bg-indigo-600 text-white rounded"
            >
              📩 Draft
            </button>
            <button
              onClick={() => publishMeme()}
              className="px-2 py-2 bg-indigo-600 text-white rounded"
            >
              ➤ Publish
            </button>
          </div>
        </div>

        {/* Meme Preview */}
        <div className="flex-1">
          <div
            ref={previewRef}
            className="relative w-full max-w-md mx-auto my-10 border border-gray-600 shadow-lg"
            style={{ aspectRatio: "1 / 1", backgroundColor: "#eee" }}
          >
            {image && (
              <img
                src={image}
                alt="Meme"
                className="w-full h-full object-cover object-center"
              />
            )}
            <MemeText text={topText} style={topStyle} position="top-2" />
            <MemeText
              text={bottomText}
              style={bottomStyle}
              position="bottom-2"
            />
          </div>
        </div>
      </div>

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

const StyleControls = ({ title, style, setStyle }) => (
  <div className="flex-1 space-y-2">
    <h2 className="font-semibold text-base">{title}</h2>
    <div>
      <label>Color : </label>
      <input
        type="color"
        value={style.color}
        onChange={(e) => setStyle({ ...style, color: e.target.value })}
      />
    </div>
    <div>
      <label>Font : </label>
      <select
        value={style.fontFamily}
        onChange={(e) => setStyle({ ...style, fontFamily: e.target.value })}
      >
        <option>Impact</option>
        <option>Arial</option>
        <option>Comic Sans MS</option>
        <option>Georgia</option>
        <option>Courier New</option>
      </select>
    </div>
    <div>
      <label>Font Size : </label>
      <input
        type="number"
        value={parseInt(style.fontSize)}
        onChange={(e) =>
          setStyle({ ...style, fontSize: `${e.target.value}px` })
        }
        className="mx-3"
      />
    </div>
    <div>
      <label>Alignment : </label>
      <select
        value={style.textAlign}
        onChange={(e) => setStyle({ ...style, textAlign: e.target.value })}
        className={`mx-2`}
      >
        <option>left</option>
        <option>center</option>
        <option>right</option>
      </select>
    </div>
    <div>
      <label>
        Shadow :{" "}
        <input
          type="checkbox"
          checked={style.textShadow}
          onChange={(e) => setStyle({ ...style, textShadow: e.target.checked })}
        />{" "}
      </label>
    </div>
  </div>
);

const MemeText = ({ text, style, position }) => (
  <div
    className={`${style.animation} absolute ${position} w-full px-2`}
    style={{
      fontSize: style.fontSize,
      fontFamily: style.fontFamily,
      color: style.color,
      textAlign: style.textAlign,
      textShadow: style.textShadow ? "2px 2px 4px rgba(0,0,0,0.7)" : "none",
    }}
  >
    {text}
  </div>
);

export default MemeStudio;
