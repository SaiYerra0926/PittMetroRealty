import { useState, useRef, useEffect } from "react";
import { MessageCircle, Send, X, Bot, User, Home, DollarSign, MapPin, Phone, Mail, Calendar, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'text' | 'quick_reply' | 'suggestion';
}

interface QuickReply {
  text: string;
  action: string;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your AI assistant for Pitt Metro Realty. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickReplies: QuickReply[] = [
    { text: "🏠 Find Properties", action: "find_properties" },
    { text: "📞 Contact Agent", action: "contact_agent" },
    { text: "📅 Schedule Consultation", action: "schedule_consultation" },
    { text: "📍 Pittsburgh Areas", action: "pittsburgh_areas" },
    { text: "💼 Investment Properties", action: "investment_properties" },
    { text: "🏦 Mortgage Calculator", action: "mortgage_calculator" }
  ];

  const suggestions = [
    "What properties are available in Robinson Township?",
    "What are the current mortgage rates?",
    "Tell me about Pittsburgh real estate market",
    "How do I schedule a property viewing?",
    "What documents do I need to buy a home?",
    "How can I calculate my mortgage payments?"
  ];

  const qaDatabase: { [key: string]: string } = {
    // Property Search
    "find_properties": "I can help you find properties! We have listings in Robinson Township, Moon Township, and throughout Pittsburgh. Would you like to see properties in a specific area or price range?",
    "pittsburgh_areas": "We specialize in Pittsburgh area properties, particularly:\n• Robinson Township - Great for families, near shopping\n• Moon Township - Close to airport, growing community\n• Downtown Pittsburgh - Urban living\n• Squirrel Hill - Historic neighborhood\n• Shadyside - Trendy area with great amenities",
    
    // Property Valuation
    "property_valuation": "I'd be happy to help with property valuation! Our free valuation service provides:\n• Market analysis\n• Comparable sales\n• Price recommendations\n• 24-hour delivery\n\nWould you like to schedule a free property valuation?",
    
    // Contact & Consultation
    "contact_agent": "You can reach our team through:\n📞 Phone: +1 (234) 567-8900\n📧 Email: info@amitaggarwal.com\n📍 Office: 123 Business Center, Pittsburgh, PA\n\nWe're available Mon-Fri 9AM-7PM, Sat-Sun 10AM-5PM",
    "schedule_consultation": "I can help you schedule a consultation! We offer:\n• Free initial consultation\n• Personalized advice\n• Market insights\n• No obligation\n\nWould you like to book a consultation?",
    
    // Investment
    "investment_properties": "Great question about investment properties! We have:\n• Rental properties in Pittsburgh\n• Multi-family homes\n• Commercial properties\n• Fix-and-flip opportunities\n\nWhat type of investment are you interested in?",
    
    // General Questions
    "mortgage_rates": "Current mortgage rates vary by loan type and credit score. For the most accurate rates, I recommend:\n• Getting pre-approved\n• Speaking with our mortgage partners\n• Checking current market conditions\n\nWould you like help connecting with a mortgage specialist?",
    "documents_needed": "To buy a home, you'll typically need:\n• Pre-approval letter\n• Proof of income (pay stubs, tax returns)\n• Bank statements\n• Credit report\n• Down payment funds\n• ID and social security number\n\nNeed help with any specific document?",
    "viewing_schedule": "To schedule a property viewing:\n• Call us at +1 (234) 567-8900\n• Use our online scheduling\n• Email us your preferred times\n• We can arrange same-day viewings\n\nWhat property interests you?",
    "market_conditions": "Pittsburgh real estate market is currently:\n• Strong buyer demand\n• Limited inventory\n• Competitive pricing\n• Good investment opportunities\n• Growing neighborhoods\n\nWould you like specific market data for your area?",
    
    // Default responses
    "default": "I understand you're interested in real estate. Let me help you with that! I can assist with:\n• Finding properties\n• Property valuations\n• Market information\n• Scheduling consultations\n• Investment advice\n\nWhat would you like to know more about?"
  };

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    // Check for specific keywords and return appropriate response
    if (message.includes('property') && message.includes('find')) return qaDatabase.find_properties;
    if (message.includes('worth') || message.includes('value') || message.includes('valuation')) return qaDatabase.property_valuation;
    if (message.includes('contact') || message.includes('agent') || message.includes('phone')) return qaDatabase.contact_agent;
    if (message.includes('schedule') || message.includes('consultation') || message.includes('meeting')) return qaDatabase.schedule_consultation;
    if (message.includes('pittsburgh') || message.includes('area') || message.includes('location')) return qaDatabase.pittsburgh_areas;
    if (message.includes('investment') || message.includes('rental') || message.includes('commercial')) return qaDatabase.investment_properties;
    if (message.includes('mortgage') || message.includes('rate') || message.includes('loan')) return qaDatabase.mortgage_rates;
    if (message.includes('document') || message.includes('paperwork') || message.includes('need')) return qaDatabase.documents_needed;
    if (message.includes('viewing') || message.includes('tour') || message.includes('visit')) return qaDatabase.viewing_schedule;
    if (message.includes('market') || message.includes('condition') || message.includes('trend')) return qaDatabase.market_conditions;
    
    return qaDatabase.default;
  };

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    setShowSuggestions(false);

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse = getBotResponse(text);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
        type: 'text'
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleQuickReply = (action: string) => {
    const reply = quickReplies.find(r => r.action === action);
    if (reply) {
      handleSendMessage(reply.text);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <Button
            onClick={() => setIsOpen(true)}
            className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-primary-light hover:from-primary-light hover:to-primary shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 animate-pulse-slow"
          >
            <MessageCircle className="h-8 w-8 text-white" />
          </Button>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-primary to-primary-light p-4 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Pitt Metro AI</h3>
                  <p className="text-sm text-white/80">Real Estate Assistant</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 p-2"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="h-[400px] overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                  <div className={`flex items-start gap-2 ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.sender === 'user' 
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600' 
                        : 'bg-gradient-to-r from-primary to-primary-light'
                    }`}>
                      {message.sender === 'user' ? (
                        <User className="h-4 w-4 text-white" />
                      ) : (
                        <Bot className="h-4 w-4 text-white" />
                      )}
                    </div>
                    <div className={`rounded-2xl px-4 py-3 ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                        : 'bg-white text-gray-800 shadow-sm border border-gray-200'
                    }`}>
                      <p className="text-sm whitespace-pre-line">{message.text}</p>
                      <p className={`text-xs mt-1 ${
                        message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-primary-light flex items-center justify-center">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div className="bg-white rounded-2xl px-4 py-3 shadow-sm border border-gray-200">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          {showSuggestions && messages.length === 1 && (
            <div className="p-4 bg-white border-t border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-semibold text-gray-700">Quick Actions</h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowSuggestions(false)}
                  className="p-1 h-6 w-6"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {quickReplies.map((reply, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickReply(reply.action)}
                    className="text-xs h-8 border-primary/20 text-primary hover:bg-primary/5"
                  >
                    {reply.text}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Suggestions */}
          {showSuggestions && messages.length === 1 && (
            <div className="p-4 bg-gray-50 border-t border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-semibold text-gray-700">Popular Questions</h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowSuggestions(false)}
                  className="p-1 h-6 w-6"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
              <div className="space-y-2">
                {suggestions.map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full text-left justify-start text-xs h-8 text-gray-600 hover:text-primary hover:bg-primary/5"
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-200">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 border-2 border-gray-200 focus:border-primary rounded-xl"
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
              />
              <Button
                onClick={() => handleSendMessage(inputValue)}
                disabled={!inputValue.trim()}
                className="bg-gradient-to-r from-primary to-primary-light hover:from-primary-light hover:to-primary text-white px-4 rounded-xl"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;

