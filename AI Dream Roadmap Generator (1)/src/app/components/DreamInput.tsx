import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Slider } from './ui/slider';
import { Alert, AlertDescription } from './ui/alert';
import { Heart, Target, AlertCircle, Phone } from 'lucide-react';
import type { Dream } from './DreamApp';

interface DreamInputProps {
  onSubmit: (dream: Dream) => void;
}

// Content moderation: Check for harmful or negative content
const checkForHarmfulContent = (text: string): { 
  isHarmful: boolean; 
  category?: 'suicide' | 'violence' | 'substance' | 'abuse' | 'crime' | 'negative' 
} => {
  const lowerText = text.toLowerCase();
  
  // Suicide and self-harm keywords
  const suicideKeywords = [
    'suicide', 'suicidal', 'kill myself', 'kill me', 'end my life', 'end life',
    'hurt myself', 'self harm', 'self-harm', 'cut myself', 'cutting myself',
    'die', 'death', 'dead', 'dying', 'overdose', 'jump off', 'hanging', 'suffocate',
    'want to die', 'better off dead', 'no reason to live'
  ];

  // Violence and harm to others
  const violenceKeywords = [
    'kill', 'killing', 'murder', 'murderer', 'harm others', 'hurt people', 
    'hurt someone', 'harm someone', 'violence', 'violent', 'attack people', 
    'attack someone', 'weapon', 'gun', 'knife', 'bomb', 'explosive', 
    'terror', 'terrorist', 'shoot', 'shooting', 'stab', 'stabbing'
  ];

  // Substance abuse
  const substanceKeywords = [
    'drug deal', 'drug dealer', 'sell drugs', 'buy drugs', 'get high',
    'overdose', 'meth', 'heroin', 'cocaine', 'crack', 'addiction'
  ];

  // Abuse and domestic violence
  const abuseKeywords = [
    'abuse', 'abusive', 'torture', 'kidnap', 'assault', 'domestic violence',
    'beat', 'hitting', 'rape', 'sexual assault', 'molest'
  ];

  // Criminal activities
  const crimeKeywords = [
    'steal', 'stealing', 'theft', 'rob', 'robbery', 'burglary',
    'scam', 'scammer', 'scamming', 'fraud', 'fraudulent',
    'trafficking', 'smuggle', 'smuggling', 'blackmail', 'extort'
  ];
  
  // Negative or destructive keywords
  const negativeKeywords = [
    'destroy', 'destruction', 'ruin', 'ruining', 'sabotage',
    'revenge', 'get back at', 'retaliate', 'payback', 'vengeance',
    'make them pay', 'make him pay', 'make her pay',
    'hate', 'hatred', 'racist', 'racism', 'discriminate',
    'cheat', 'cheating', 'deceive', 'manipulate', 'exploit',
    'threaten', 'intimidate'
  ];

  // Check for each category
  for (const keyword of suicideKeywords) {
    if (lowerText.includes(keyword)) {
      return { isHarmful: true, category: 'suicide' };
    }
  }

  for (const keyword of violenceKeywords) {
    if (lowerText.includes(keyword)) {
      return { isHarmful: true, category: 'violence' };
    }
  }

  for (const keyword of substanceKeywords) {
    if (lowerText.includes(keyword)) {
      return { isHarmful: true, category: 'substance' };
    }
  }

  for (const keyword of abuseKeywords) {
    if (lowerText.includes(keyword)) {
      return { isHarmful: true, category: 'abuse' };
    }
  }

  for (const keyword of crimeKeywords) {
    if (lowerText.includes(keyword)) {
      return { isHarmful: true, category: 'crime' };
    }
  }

  for (const keyword of negativeKeywords) {
    if (lowerText.includes(keyword)) {
      return { isHarmful: true, category: 'negative' };
    }
  }

  return { isHarmful: false };
};

export function DreamInput({ onSubmit }: DreamInputProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [timeline, setTimeline] = useState([12]);
  const [error, setError] = useState<{ 
    category: 'suicide' | 'violence' | 'substance' | 'abuse' | 'crime' | 'negative';
  } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title || !description) {
      return;
    }

    // Check title for harmful content
    const titleCheck = checkForHarmfulContent(title);
    if (titleCheck.isHarmful && titleCheck.category) {
      setError({ category: titleCheck.category });
      return;
    }

    // Check description for harmful content
    const descriptionCheck = checkForHarmfulContent(description);
    if (descriptionCheck.isHarmful && descriptionCheck.category) {
      setError({ category: descriptionCheck.category });
      return;
    }

    onSubmit({
      title,
      description,
      timeline: timeline[0],
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-xl border-2 border-purple-100">
        <CardHeader className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-100 rounded-full">
              <Heart className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <CardTitle>What's Your Dream?</CardTitle>
              <CardDescription>
                Share your long-lost or childhood dream, and we'll help you achieve it
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Suicide/Self-Harm Support */}
            {error?.category === 'suicide' && (
              <Alert className="bg-red-50 border-red-200">
                <AlertCircle className="h-5 w-5 text-red-600" />
                <AlertDescription className="text-red-800">
                  <div className="space-y-3">
                    <div>
                      <p className="font-semibold text-lg mb-2">You Are Not Alone 💙</p>
                      <p className="mb-2">
                        We care about you and want you to know that help is available. Whatever you're going through, 
                        there are people who want to listen and support you.
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-red-200">
                      <p className="font-semibold mb-2">🌟 Why Reach Out for Help?</p>
                      <ul className="text-sm space-y-1 list-disc list-inside text-gray-700">
                        <li>Trained counselors understand what you're going through</li>
                        <li>Talking helps reduce overwhelming feelings</li>
                        <li>You deserve support and care</li>
                        <li>Recovery is possible - millions have found hope</li>
                      </ul>
                    </div>

                    <p className="font-semibold">📞 Immediate Help Available 24/7:</p>
                    
                    <div className="bg-white p-3 rounded border border-red-300">
                      <div className="flex items-center gap-2 mb-1">
                        <Phone className="w-5 h-5 text-red-600" />
                        <strong className="text-red-700">988 Suicide & Crisis Lifeline (US)</strong>
                      </div>
                      <p className="text-red-700 text-lg">Call or Text: 988</p>
                      <p className="text-gray-600 text-sm">Free, confidential support 24/7</p>
                    </div>

                    <div className="bg-white p-3 rounded border border-red-300">
                      <div className="flex items-center gap-2 mb-1">
                        <Phone className="w-5 h-5 text-red-600" />
                        <strong className="text-red-700">Crisis Text Line</strong>
                      </div>
                      <p className="text-red-700 text-lg">Text "HELLO" to 741741</p>
                      <p className="text-gray-600 text-sm">Text with a trained crisis counselor</p>
                    </div>

                    <div className="bg-white p-3 rounded border border-red-300">
                      <div className="flex items-center gap-2 mb-1">
                        <Phone className="w-5 h-5 text-red-600" />
                        <strong className="text-red-700">International Support</strong>
                      </div>
                      <a 
                        href="https://findahelpline.com/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Find a helpline in your country →
                      </a>
                    </div>

                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-200">
                      <p className="font-semibold text-blue-900 mb-2">💪 Remember:</p>
                      <ul className="text-sm space-y-1 text-blue-800">
                        <li>• Your feelings are temporary, even if they don't feel that way now</li>
                        <li>• Many people who sought help now live fulfilling lives</li>
                        <li>• You have inherent worth and value</li>
                        <li>• Small steps forward matter - you don't have to have everything figured out</li>
                      </ul>
                    </div>
                  </div>
                </AlertDescription>
              </Alert>
            )}

            {/* Violence/Harm to Others */}
            {error?.category === 'violence' && (
              <Alert className="bg-orange-50 border-orange-200">
                <AlertCircle className="h-5 w-5 text-orange-600" />
                <AlertDescription className="text-orange-900">
                  <div className="space-y-3">
                    <div>
                      <p className="font-semibold text-lg mb-2">Let's Talk About These Feelings 🤝</p>
                      <p className="mb-2">
                        Thoughts of harming others can be frightening. These feelings often stem from pain, anger, 
                        or feeling overwhelmed. Help is available to work through these emotions safely.
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-orange-200">
                      <p className="font-semibold mb-2">Why Seek Support?</p>
                      <ul className="text-sm space-y-1 list-disc list-inside text-gray-700">
                        <li>Learn healthy ways to manage anger and frustration</li>
                        <li>Address underlying pain without harming yourself or others</li>
                        <li>Break cycles that lead to regret</li>
                        <li>Build a better future for yourself</li>
                      </ul>
                    </div>

                    <p className="font-semibold">📞 Get Support Now:</p>
                    
                    <div className="bg-white p-3 rounded border border-orange-300">
                      <div className="flex items-center gap-2 mb-1">
                        <Phone className="w-5 h-5 text-orange-600" />
                        <strong>National Crisis Hotline</strong>
                      </div>
                      <p className="text-orange-700 text-lg">Call: 988</p>
                      <p className="text-gray-600 text-sm">24/7 crisis support and de-escalation</p>
                    </div>

                    <div className="bg-white p-3 rounded border border-orange-300">
                      <div className="flex items-center gap-2 mb-1">
                        <Phone className="w-5 h-5 text-orange-600" />
                        <strong>SAMHSA National Helpline</strong>
                      </div>
                      <p className="text-orange-700 text-lg">1-800-662-4357</p>
                      <p className="text-gray-600 text-sm">Mental health and anger management resources</p>
                    </div>

                    <div className="bg-gradient-to-r from-green-50 to-teal-50 p-4 rounded-lg border border-green-200">
                      <p className="font-semibold text-green-900 mb-2">🌱 Choose a Different Path:</p>
                      <p className="text-sm text-green-800">
                        You have the power to choose differently. Many people have learned to channel difficult 
                        emotions into positive actions - through therapy, support groups, meditation, or creative outlets.
                        Your life can take a better direction starting now.
                      </p>
                    </div>
                  </div>
                </AlertDescription>
              </Alert>
            )}

            {/* Substance Abuse */}
            {error?.category === 'substance' && (
              <Alert className="bg-purple-50 border-purple-200">
                <AlertCircle className="h-5 w-5 text-purple-600" />
                <AlertDescription className="text-purple-900">
                  <div className="space-y-3">
                    <div>
                      <p className="font-semibold text-lg mb-2">Recovery is Possible 🌈</p>
                      <p className="mb-2">
                        Substance abuse affects millions, and recovery is absolutely achievable. 
                        You don't have to face this alone - support and treatment can help you build the life you want.
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-purple-200">
                      <p className="font-semibold mb-2">Why Get Help Now?</p>
                      <ul className="text-sm space-y-1 list-disc list-inside text-gray-700">
                        <li>Treatment works - millions recover and thrive</li>
                        <li>Your health and relationships can improve</li>
                        <li>Find freedom from dependency</li>
                        <li>Discover new coping strategies and purpose</li>
                      </ul>
                    </div>

                    <p className="font-semibold">📞 Confidential Help Available:</p>
                    
                    <div className="bg-white p-3 rounded border border-purple-300">
                      <div className="flex items-center gap-2 mb-1">
                        <Phone className="w-5 h-5 text-purple-600" />
                        <strong>SAMHSA National Helpline</strong>
                      </div>
                      <p className="text-purple-700 text-lg">1-800-662-HELP (4357)</p>
                      <p className="text-gray-600 text-sm">Free, confidential, 24/7 treatment referral</p>
                    </div>

                    <div className="bg-white p-3 rounded border border-purple-300">
                      <div className="flex items-center gap-2 mb-1">
                        <Phone className="w-5 h-5 text-purple-600" />
                        <strong>Narcotics Anonymous</strong>
                      </div>
                      <a 
                        href="https://na.org/meetingsearch/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Find a meeting near you →
                      </a>
                      <p className="text-gray-600 text-sm">Free peer support groups</p>
                    </div>

                    <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-4 rounded-lg border border-amber-200">
                      <p className="font-semibold text-amber-900 mb-2">✨ Your Future Awaits:</p>
                      <p className="text-sm text-amber-800">
                        Recovery opens doors to dreams you may have set aside. People in recovery go on to 
                        pursue careers, rebuild relationships, and find joy they didn't think possible. That can be your story too.
                      </p>
                    </div>
                  </div>
                </AlertDescription>
              </Alert>
            )}

            {/* Abuse/Domestic Violence */}
            {error?.category === 'abuse' && (
              <Alert className="bg-pink-50 border-pink-200">
                <AlertCircle className="h-5 w-5 text-pink-600" />
                <AlertDescription className="text-pink-900">
                  <div className="space-y-3">
                    <div>
                      <p className="font-semibold text-lg mb-2">You Deserve Safety and Respect 💜</p>
                      <p className="mb-2">
                        If you're experiencing or considering abuse, please know that everyone deserves to feel safe. 
                        Trained advocates can help you explore options and find safety.
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-pink-200">
                      <p className="font-semibold mb-2">Why Reach Out?</p>
                      <ul className="text-sm space-y-1 list-disc list-inside text-gray-700">
                        <li>Confidential support from trained advocates</li>
                        <li>Safety planning and resources</li>
                        <li>Legal and housing assistance available</li>
                        <li>Break cycles of abuse and trauma</li>
                      </ul>
                    </div>

                    <p className="font-semibold">📞 Confidential Support:</p>
                    
                    <div className="bg-white p-3 rounded border border-pink-300">
                      <div className="flex items-center gap-2 mb-1">
                        <Phone className="w-5 h-5 text-pink-600" />
                        <strong>National Domestic Violence Hotline</strong>
                      </div>
                      <p className="text-pink-700 text-lg">1-800-799-7233</p>
                      <p className="text-gray-600 text-sm">24/7 confidential support and resources</p>
                    </div>

                    <div className="bg-white p-3 rounded border border-pink-300">
                      <div className="flex items-center gap-2 mb-1">
                        <Phone className="w-5 h-5 text-pink-600" />
                        <strong>RAINN Sexual Assault Hotline</strong>
                      </div>
                      <p className="text-pink-700 text-lg">1-800-656-4673</p>
                      <p className="text-gray-600 text-sm">Support for survivors of sexual violence</p>
                    </div>

                    <div className="bg-gradient-to-r from-rose-50 to-pink-50 p-4 rounded-lg border border-rose-200">
                      <p className="font-semibold text-rose-900 mb-2">🌸 A Better Life is Possible:</p>
                      <p className="text-sm text-rose-800">
                        Many people have found safety and healing after leaving abusive situations. 
                        With support, you can rebuild your life with dignity, peace, and hope for the future.
                      </p>
                    </div>
                  </div>
                </AlertDescription>
              </Alert>
            )}

            {/* Criminal Activity */}
            {error?.category === 'crime' && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <div className="space-y-3">
                    <p className="font-semibold">We Cannot Support Illegal Activities</p>
                    <p>
                      DreamPath AI is designed to help you achieve positive, legal goals. 
                      Criminal activities can lead to serious consequences including arrest, imprisonment, 
                      and long-term harm to your future.
                    </p>
                    <div className="bg-white p-3 rounded border border-red-200">
                      <p className="font-semibold mb-1">Consider Instead:</p>
                      <ul className="text-sm space-y-1 list-disc list-inside">
                        <li>Legitimate business opportunities and entrepreneurship</li>
                        <li>Job training and career development programs</li>
                        <li>Educational pursuits and skill-building</li>
                        <li>Community service and making a positive impact</li>
                      </ul>
                    </div>
                    <p className="text-sm">
                      If you're facing financial hardship, many organizations offer assistance. 
                      Consider reaching out to local social services, non-profits, or career counseling services.
                    </p>
                  </div>
                </AlertDescription>
              </Alert>
            )}

            {/* Negative Content */}
            {error?.category === 'negative' && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <div className="space-y-3">
                    <p className="font-semibold">Let's Focus on Positive Growth 🌟</p>
                    <p>
                      DreamPath AI is designed to help you achieve constructive, life-enriching goals. 
                      Goals focused on revenge, destruction, or harming others often stem from pain - 
                      but they lead to more pain for everyone involved.
                    </p>
                    <div className="bg-white p-3 rounded border border-red-200">
                      <p className="font-semibold mb-1">Transform Your Energy Into:</p>
                      <ul className="text-sm space-y-1 list-disc list-inside">
                        <li>Personal growth and self-improvement</li>
                        <li>Building something meaningful</li>
                        <li>Helping others and making a positive impact</li>
                        <li>Pursuing passions that bring joy and fulfillment</li>
                      </ul>
                    </div>
                    <p className="text-sm italic">
                      "The best revenge is living well and becoming the best version of yourself."
                    </p>
                  </div>
                </AlertDescription>
              </Alert>
            )}

            {/* Dream Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Dream Title</Label>
              <Input
                id="title"
                placeholder="e.g., Become a Professional Photographer"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  setError(null);
                }}
                required
              />
              <p className="text-xs text-gray-500">
                Share a positive goal that inspires you
              </p>
            </div>

            {/* Dream Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Tell us about your dream</Label>
              <Textarea
                id="description"
                placeholder="Describe your dream in detail... What inspired it? Why is it important to you? What do you hope to achieve?"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  setError(null);
                }}
                rows={6}
                required
              />
              <p className="text-xs text-gray-500">
                Focus on what you want to accomplish, learn, or create
              </p>
            </div>

            {/* Timeline */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="timeline">Timeline to Achieve</Label>
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-purple-600" />
                  <span className="text-purple-600">{timeline[0]} months</span>
                </div>
              </div>
              <Slider
                id="timeline"
                min={3}
                max={60}
                step={3}
                value={timeline}
                onValueChange={setTimeline}
                className="py-4"
              />
              <div className="flex justify-between text-gray-500 text-sm">
                <span>3 months</span>
                <span>5 years</span>
              </div>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full" size="lg">
              Generate My Dream Roadmap
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Positive Examples */}
      <Card className="mt-6 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <CardContent className="pt-6">
          <h3 className="text-green-800 mb-3">💡 Dream Ideas to Inspire You:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              <span>Learn a new language</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              <span>Start a creative business</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              <span>Write and publish a book</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              <span>Master a musical instrument</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              <span>Become a fitness coach</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              <span>Travel to 20 countries</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}