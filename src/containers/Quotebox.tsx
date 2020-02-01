import React, { useEffect, useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import CallToAction from '../ui/CallToAction';

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
    <div id="quote-box" className="bg-red-500 rounded-lg w-6/12">
      <div className="p-8">
        <div className="pb-4 h-40">
          {loading ? (
            <div className="text-center">
              <ClipLoader />
            </div>
          ) : (
            <>
              <p className=" font-sans text-gray-100 text-xl" id="text">
                &ldquo;{quote}&rdquo;
              </p>
              {!!author && (
                <p className="text-right font-serif text-lg text-red-200" id="author">
                  - {author}
                </p>
              )}
            </>
          )}
        </div>
        <CallToAction id="new-quote" onClick={getAndSetNewQuote}>
          New Quote
        </CallToAction>
        <a id="tweet-quote" href={`https://twitter.com/intent/tweet?text=${tweetText}`}>
          Twitter
        </a>
      </div>
    </div>
  );
};
type Quote = {
  _id: string;
  quoteText: string;
  quoteAuthor: string;
};
export default Quotebox;
