import React, { useEffect, useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

const Quotebox = () => {
  const [loading, setLoading] = useState(true);
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

  const getAndSetNewQuote = async () => {
    setLoading(true);
    const response = await fetch('https://quote-garden.herokuapp.com/quotes/random');
    const quote: Quote = await response.json();
    setQuote(quote.quoteText);
    setAuthor(quote.quoteAuthor);
    setLoading(false);
  };

  useEffect(() => {
    getAndSetNewQuote();
  }, []);

  const tweetText = `${quote} -${author}`;
  return (
    <div id="quote-box">
      {loading ? (
        <ClipLoader />
      ) : (
        <>
          <p id="text">{quote}</p>
          {!!author && <p id="author">- {author}</p>}
        </>
      )}
      <button id="new-quote" onClick={getAndSetNewQuote}>
        New Quote
      </button>
      <a id="tweet-quote" href={`https://twitter.com/intent/tweet?text=${tweetText}`}>
        Twitter
      </a>
    </div>
  );
};
type Quote = {
  _id: string;
  quoteText: string;
  quoteAuthor: string;
};
export default Quotebox;
