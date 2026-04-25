import { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Quote, RefreshCw } from 'lucide-react';
import { Button } from './ui/button';

const quotes = [
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs"
  },
  {
    text: "Dreams don't work unless you do.",
    author: "John C. Maxwell"
  },
  {
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt"
  },
  {
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill"
  },
  {
    text: "The only limit to our realization of tomorrow will be our doubts of today.",
    author: "Franklin D. Roosevelt"
  },
  {
    text: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt"
  },
  {
    text: "It does not matter how slowly you go as long as you do not stop.",
    author: "Confucius"
  },
  {
    text: "Everything you've ever wanted is on the other side of fear.",
    author: "George Addair"
  },
  {
    text: "Success is not how high you have climbed, but how you make a positive difference to the world.",
    author: "Roy T. Bennett"
  },
  {
    text: "Don't watch the clock; do what it does. Keep going.",
    author: "Sam Levenson"
  },
  {
    text: "The secret of getting ahead is getting started.",
    author: "Mark Twain"
  },
  {
    text: "It's not whether you get knocked down, it's whether you get up.",
    author: "Vince Lombardi"
  },
  {
    text: "The only impossible journey is the one you never begin.",
    author: "Tony Robbins"
  },
  {
    text: "Your limitation—it's only your imagination.",
    author: "Unknown"
  },
  {
    text: "Great things never come from comfort zones.",
    author: "Unknown"
  },
  {
    text: "Dream it. Wish it. Do it.",
    author: "Unknown"
  },
  {
    text: "Success doesn't just find you. You have to go out and get it.",
    author: "Unknown"
  },
  {
    text: "The harder you work for something, the greater you'll feel when you achieve it.",
    author: "Unknown"
  },
  {
    text: "Dream bigger. Do bigger.",
    author: "Unknown"
  },
  {
    text: "Don't stop when you're tired. Stop when you're done.",
    author: "Unknown"
  }
];

export function MotivationalQuote() {
  const [quote, setQuote] = useState(quotes[0]);

  useEffect(() => {
    // Get a random quote on mount
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  }, []);

  const getNewQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  };

  return (
    <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          <Quote className="w-8 h-8 text-amber-500 flex-shrink-0 mt-1" />
          <div className="flex-1">
            <blockquote className="text-gray-700 mb-2 italic">
              "{quote.text}"
            </blockquote>
            <p className="text-amber-700">— {quote.author}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={getNewQuote}
            className="flex-shrink-0"
          >
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
