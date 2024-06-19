// src/App.js

import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';
import OrbitingCircles from './components/orbitingCircles';

const SOCKET_SERVER_URL = 'ws://localhost:4000';

function App() {
  const [words, setWords] = useState([]);
  const [word, setWord] = useState('');

  useEffect(() => {
    const socket = socketIOClient(SOCKET_SERVER_URL, {
      transports: ['websocket'],
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    // Receive all words when connected
    socket.on('allWords', (allWords) => {
      console.log('All words received:', allWords);
      setWords(allWords);
    });

    // Receive new word broadcasts
    socket.on('newWord', (newWord) => {
      console.log('New word received:', newWord);
      setWords((prevWords) => [...prevWords, newWord]);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
    });

    socket.on('connect_error', (error) => {
      console.error('Connection Error:', error);
    });

    socket.on('reconnect_attempt', () => {
      console.log('Attempting to reconnect...');
    });

    return () => socket.disconnect();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const socket = socketIOClient(SOCKET_SERVER_URL);
    socket.emit('submitWord', word);
    setWord(''); // Clear the input field
  };

  const numWords = words.length;
  const angleStep = 360 / numWords;

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center overflow-hidden bg-white relative">
        <div className="absolute inset-0 bg-custom-gradient bg-[200%_200%] animate-gradient"></div>
        <div className="relative flex items-center justify-center h-full w-full">
          <span className="text-white text-center text-6xl font-semibold leading-none text-transparent z-10">
            Stay Connected
          </span>
          {/* {words.splice(0, 4).map((word, index) => (
            <OrbitingCircles
              key={index}
              className="h-[80px] w-[80px] border-none bg-transparent opacity-30 font-bold text-lg"
              duration={20}
              delay={index * 2} // Adjusted to spread words evenly
              angle={index * angleStep} // Spread words evenly
              radius={150}
            >
              <div className="text-black dark:text-white">{word}</div>
            </OrbitingCircles>
          ))} */}
        </div>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center bg-gray-100">
        
        <form onSubmit={handleSubmit} className="mb-4">
          <input
            type="text"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            placeholder="Enter a word"
            required
            className="border p-2 rounded mr-2"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Submit
          </button>
        </form>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {words.map((word, index) => (
            <div key={index} className="bg-green-500 text-white p-4 rounded">
              {word}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
