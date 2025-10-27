import { useState } from "react";
import { Star, MessageSquare, Send } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface Review {
  id: number;
  name: string;
  location?: string;
  rating: number;
  text: string;
  property_type?: string;
  created_at: string;
}

const ReviewsSection = () => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    name: '',
    email: '',
    location: '',
    rating: 5,
    text: '',
    property_type: ''
  });

  // Sample reviews data
  const reviews: Review[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      location: "Downtown District",
      rating: 5,
      text: "Pitt Metro Realty made our home buying experience seamless and stress-free. Their deep knowledge of the local market helped us find our dream home within our budget.",
      property_type: "Single Family Home",
      created_at: "2024-01-15"
    },
    {
      id: 2,
      name: "Robert Chen",
      location: "Riverside Heights",
      rating: 5,
      text: "Selling our family home was emotional, but Pitt Metro Realty handled everything with such professionalism and care. They got us above asking price.",
      property_type: "Townhouse",
      created_at: "2024-01-10"
    },
    {
      id: 3,
      name: "Jennifer Martinez",
      location: "Historic Quarter",
      rating: 5,
      text: "As a first-time homebuyer, I was overwhelmed by the process. Pitt Metro Realty patiently guided me through everything and negotiated an amazing deal.",
      property_type: "Condominium",
      created_at: "2024-01-05"
    }
  ];

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your review! It will be displayed after approval.');
    setNewReview({
      name: '',
      email: '',
      location: '',
      rating: 5,
      text: '',
      property_type: ''
    });
    setShowReviewForm(false);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  const renderStarRatingInput = (currentRating: number, setRating: (rating: number) => void) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            className="focus:outline-none"
          >
            <Star
              className={`h-6 w-6 ${
                star <= currentRating
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300'
              } hover:text-yellow-400 transition-colors`}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <section className="py-24 bg-gradient-to-br from-blue-50/30 via-slate-50/50 to-indigo-50/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real stories from satisfied clients across Pittsburgh. Share your experience!
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 animate-fade-in-up">
          <Card className="shadow-professional hover:shadow-professional-hover section-transition text-center p-6">
            <CardTitle className="text-5xl font-bold text-primary mb-2">15+</CardTitle>
            <p className="text-muted-foreground">Total Reviews</p>
          </Card>
          <Card className="shadow-professional hover:shadow-professional-hover section-transition text-center p-6">
            <CardTitle className="text-5xl font-bold text-primary mb-2">4.9</CardTitle>
            <p className="text-muted-foreground">Average Rating</p>
          </Card>
          <Card className="shadow-professional hover:shadow-professional-hover section-transition text-center p-6">
            <CardTitle className="text-5xl font-bold text-primary mb-2">12</CardTitle>
            <p className="text-muted-foreground">5 Star Reviews</p>
          </Card>
          <Card className="shadow-professional hover:shadow-professional-hover section-transition text-center p-6">
            <CardTitle className="text-5xl font-bold text-primary mb-2">3</CardTitle>
            <p className="text-muted-foreground">4 Star Reviews</p>
          </Card>
        </div>

        {/* Reviews */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 animate-fade-in-up">
          {reviews.map((review) => (
            <Card key={review.id} className="shadow-professional hover:shadow-professional-hover section-transition group">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="flex">{renderStars(review.rating)}</div>
                  <span className="ml-auto text-xs text-muted-foreground">{new Date(review.created_at).toLocaleDateString()}</span>
                </div>

                <div className="relative mb-6">
                  <p className="text-muted-foreground italic leading-relaxed pl-6">
                    "{review.text}"
                  </p>
                </div>

                <div className="flex items-center gap-4 pt-4 border-t">
                  <div className="h-12 w-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                    {review.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-primary">{review.name}</h4>
                    <p className="text-sm text-muted-foreground">{review.location}</p>
                    {review.property_type && (
                      <p className="text-xs text-accent font-medium mt-1">{review.property_type}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Review Form */}
        <div className="text-center mt-16 animate-fade-in-up">
          {!showReviewForm ? (
            <Card className="inline-block shadow-professional hover:shadow-professional-hover section-transition animate-scale-in">
              <CardContent className="p-8">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <MessageSquare className="h-6 w-6 text-primary" />
                  <span className="font-semibold text-lg">Share Your Experience</span>
                </div>
                <p className="text-muted-foreground mb-6">
                  Help others by sharing your experience with Pitt Metro Realty
                </p>
                <Button
                  onClick={() => setShowReviewForm(true)}
                  className="bg-primary hover:bg-primary/90"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Write a Review
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card className="max-w-2xl mx-auto shadow-professional animate-scale-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  Write Your Review
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleReviewSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        placeholder="Your full name"
                        value={newReview.name}
                        onChange={(e) => setNewReview({...newReview, name: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={newReview.email}
                        onChange={(e) => setNewReview({...newReview, email: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        placeholder="City, State"
                        value={newReview.location}
                        onChange={(e) => setNewReview({...newReview, location: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="property_type">Property Type</Label>
                      <Input
                        id="property_type"
                        placeholder="e.g., Purchased $650K Condo"
                        value={newReview.property_type}
                        onChange={(e) => setNewReview({...newReview, property_type: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Rating *</Label>
                    {renderStarRatingInput(newReview.rating, (rating) => setNewReview({...newReview, rating}))}
                    <span className="ml-2 text-sm text-muted-foreground">
                      {newReview.rating} out of 5 stars
                    </span>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="review">Your Review *</Label>
                    <Textarea
                      id="review"
                      placeholder="Share your experience with Pitt Metro Realty..."
                      className="min-h-[120px]"
                      value={newReview.text}
                      onChange={(e) => setNewReview({...newReview, text: e.target.value})}
                      required
                    />
                  </div>

                  <div className="flex gap-4 justify-end">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowReviewForm(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" className="bg-primary hover:bg-primary/90">
                      Submit Review
                      <Send className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;