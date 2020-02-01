import React, { useEffect, useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import CallToAction from '../ui/CallToAction';
import TwitterLogo from '../ui/TwitterLogo';

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
    <div id="quote-box" className="w-6/12 bg-red-500 rounded-lg">
      <div className="p-8">
        <div className="h-40 pb-4">
          {loading ? (
            <div className="text-center">
              <ClipLoader color="#feb2b2" />
            </div>
          ) : (
            <>
              <p className="font-sans text-xl text-gray-100 " id="text">
                &ldquo;{quote}&rdquo;
              </p>
              {!!author && (
                <p className="mt-1 font-serif text-lg text-right text-red-200" id="author">
                  - {author}
                </p>
              )}
            </>
          )}
        </div>
        <div className="flex justify-around">
          <div className="self-center">
            <CallToAction id="new-quote" onClick={getAndSetNewQuote}>
              New Quote
            </CallToAction>
          </div>
          <div className="inline-block w-16 align-bottom">
            <a
              target="_blank"
              rel="noopener noreferrer"
              id="tweet-quote"
              href={`https://twitter.com/intent/tweet?text=${tweetText}`}
            >
              <TwitterLogo />
            </a>
          </div>
        </div>
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
