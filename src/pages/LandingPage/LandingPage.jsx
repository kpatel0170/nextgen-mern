import React, { useState, useEffect } from "react";
import ReactMarkdown from 'react-markdown';
import Navbar from "../../components/Navbar/Navbar";

const LandingPage = () => {
  const [markdown, setMarkdown] = useState('');

  useEffect(() => {
    import('./README.md')
      .then(response => {
        fetch(response.default)
          .then(response => response.text())
          .then(response => setMarkdown(response))
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <>
    <Navbar />
    <div className="mx-auto px-4 py-8 sm:max-w-3xl">
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Markdown Preview
        </h2>
        <div className="prose lg:prose-xl">
          <ReactMarkdown children={markdown} />
        </div>
      </div>
    </div>
    </>
  )
};

export default LandingPage;
