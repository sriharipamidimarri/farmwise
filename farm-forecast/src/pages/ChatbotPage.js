import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { IoMdSend } from "react-icons/io";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdMic, MdMicOff } from "react-icons/md";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

const ChatbotPage = () => {
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [listeningMode, setListeningMode] = useState(false);

  const genAI = new GoogleGenerativeAI("AIzaSyBgGC-V-QsWifrOG61I5uHlCFNOSyqx1r8");

  const handleGenerateResponse = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setResponse(""); // Clear previous response
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt, { language: "english" });
    const resText = await result.response.text();
    setResponse(resText);
    setLoading(false);
  };

  const handleMicToggle = () => {
    if (listening) {
      SpeechRecognition.stopListening();
      setListeningMode(false);
      setPrompt(transcript); // Set the captured speech as the prompt
    } else {
      SpeechRecognition.startListening({ continuous: true });
      setListeningMode(true);
    }
  };

  const handleClear = () => {
    setPrompt("");
    setResponse("");
    resetTranscript();
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex justify-center items-center p-6">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-6 flex flex-col space-y-6">
        {/* Chat Input Section */}
        <div className="flex flex-col space-y-4">
          <textarea
            className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type or speak your question..."
            value={listening ? transcript : prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={4}
            disabled={listening}
          />
          <div className="flex items-center justify-between">
            <button
              onClick={handleGenerateResponse}
              className="flex items-center space-x-2 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            >
              <IoMdSend size={24} />
              <span>Send</span>
            </button>
            <button
              onClick={handleMicToggle}
              className={`flex items-center space-x-2 ${
                listeningMode ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
              } text-white py-2 px-4 rounded-lg`}
            >
              {listeningMode ? <MdMicOff size={24} /> : <MdMic size={24} />}
              <span>{listeningMode ? "Stop Listening" : "Start Listening"}</span>
            </button>
          </div>
        </div>

        {/* Response Section */}
        {loading ? (
          <div className="flex justify-center items-center">
            <AiOutlineLoading3Quarters size={48} className="animate-spin text-blue-500" />
          </div>
        ) : response ? (
          <div className="p-4 bg-gray-100 rounded-lg shadow-inner max-h-64 overflow-y-auto">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Response:</h2>
            <p className="text-gray-800">{response}</p>
          </div>
        ) : null}

        {/* Clear Button */}
        {(prompt || response) && (
          <button
            onClick={handleClear}
            className="self-center bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
};

export default ChatbotPage;
