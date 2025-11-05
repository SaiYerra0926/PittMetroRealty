import { useState, useEffect } from "react";
import { Star, MessageSquare, Send, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { fetchReviews, submitReview, calculateStats, type Review, type ReviewStats } from "@/lib/api/reviews";

const ReviewsSection = () => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [stats, setStats] = useState<ReviewStats>({
    totalReviews: 0,
    averageRating: 0,
    fiveStarReviews: 0,
    fourStarReviews: 0,
    threeStarReviews: 0,
    twoStarReviews: 0,
    oneStarReviews: 0
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [newReview, setNewReview] = useState({
    name: '',
    email: '',
    location: '',
    rating: 5,
    text: '',
    review_text: '',
    property_type: ''
  });
  const { toast } = useToast();

  // Fetch reviews on component mount
  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      setLoading(true);
      const fetchedReviews = await fetchReviews();
      
      // Sort by date (newest first)
      const sortedReviews = fetchedReviews.sort((a, b) => {
        const dateA = new Date(a.created_at).getTime();
        const dateB = new Date(b.created_at).getTime();
        return dateB - dateA;
      });
      
      setReviews(sortedReviews);
      
      // Calculate stats
      const calculatedStats = calculateStats(sortedReviews);
      setStats(calculatedStats);
    } catch (error) {
      console.error('Error loading reviews:', error);
      toast({
        title: "Error loading reviews",
        description: "Unable to load reviews. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newReview.name || !newReview.email || !newReview.text) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setSubmitting(true);

    try {
      const result = await submitReview({
        name: newReview.name,
        email: newReview.email,
        location: newReview.location,
        rating: newReview.rating,
        review_text: newReview.text,
        property_type: newReview.property_type
      });

      if (result.success) {
        toast({
          title: "Review submitted!",
          description: result.message || "Thank you for your review. It will be displayed after approval.",
        });

        // Reset form
        setNewReview({
          name: '',
          email: '',
          location: '',
          rating: 5,
          text: '',
          review_text: '',
          property_type: ''
        });
        setShowReviewForm(false);

        // Reload reviews to show the new one (if approved)
        await loadReviews();
      }
    } catch (error: any) {
      toast({
        title: "Error submitting review",
        description: error.message || "Unable to submit review. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
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
            className="focus:outline-none transition-transform hover:scale-110"
            disabled={submitting}
          >
            <Star
              className={`h-6 w-6 transition-colors ${
                star <= currentRating
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300'
              } hover:text-yellow-400`}
            />
          </button>
        ))}
      </div>
    );
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
    } catch {
      return dateString;
    }
  };

  return (
    <section className="py-24 bg-gradient-to-br from-blue-50/30 via-slate-50/50 to-indigo-50/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-primary mb-3 sm:mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
            Real stories from satisfied clients across Pittsburgh. Share your experience!
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 animate-fade-in-up">
          <Card className="shadow-professional hover:shadow-professional-hover section-transition text-center p-6">
            <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-2">
              {loading ? <Loader2 className="h-8 w-8 animate-spin mx-auto" /> : stats.totalReviews}
            </CardTitle>
            <p className="text-muted-foreground">Total Reviews</p>
          </Card>
          <Card className="shadow-professional hover:shadow-professional-hover section-transition text-center p-6">
            <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-2">
              {loading ? <Loader2 className="h-8 w-8 animate-spin mx-auto" /> : stats.averageRating.toFixed(1)}
            </CardTitle>
            <p className="text-muted-foreground">Average Rating</p>
          </Card>
          <Card className="shadow-professional hover:shadow-professional-hover section-transition text-center p-6">
            <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-2">
              {loading ? <Loader2 className="h-8 w-8 animate-spin mx-auto" /> : stats.fiveStarReviews}
            </CardTitle>
            <p className="text-muted-foreground">5 Star Reviews</p>
          </Card>
          <Card className="shadow-professional hover:shadow-professional-hover section-transition text-center p-6">
            <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-2">
              {loading ? <Loader2 className="h-8 w-8 animate-spin mx-auto" /> : stats.fourStarReviews}
            </CardTitle>
            <p className="text-muted-foreground">4 Star Reviews</p>
          </Card>
        </div>

        {/* Reviews */}
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
        ) : reviews.length === 0 ? (
          <Card className="max-w-2xl mx-auto shadow-professional animate-fade-in-up">
            <CardContent className="p-12 text-center">
              <MessageSquare className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-primary mb-2">No Reviews Yet</h3>
              <p className="text-muted-foreground mb-6">
                Be the first to share your experience with Pitt Metro Realty!
              </p>
              <Button onClick={() => setShowReviewForm(true)}>
                <Send className="h-4 w-4 mr-2" />
                Write the First Review
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 animate-fade-in-up">
            {reviews.map((review, index) => (
              <Card 
                key={review.id} 
                className="shadow-professional hover:shadow-professional-hover section-transition group animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="flex">{renderStars(review.rating)}</div>
                    <span className="ml-auto text-xs text-muted-foreground">
                      {formatDate(review.created_at)}
                    </span>
                  </div>

                  <div className="relative mb-6">
                    <p className="text-muted-foreground italic leading-relaxed pl-6 relative">
                      <span className="absolute left-0 top-0 text-primary text-4xl font-serif leading-none">"</span>
                      {review.text || review.review_text}
                      <span className="absolute bottom-0 text-primary text-4xl font-serif leading-none">"</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-4 pt-4 border-t">
                    <div className="h-12 w-12 bg-gradient-to-br from-primary to-primary/80 text-white rounded-full flex items-center justify-center font-semibold text-sm shadow-md">
                      {review.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-primary truncate">{review.name}</h4>
                      {review.location && (
                        <p className="text-sm text-muted-foreground truncate">{review.location}</p>
                      )}
                      {review.property_type && (
                        <p className="text-xs text-primary font-medium mt-1 truncate">
                          {review.property_type}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Review Form */}
        <div className="text-center mt-16 animate-fade-in-up">
          {!showReviewForm ? (
            <Card className="inline-block shadow-professional hover:shadow-professional-hover section-transition animate-scale-in">
              <CardContent className="p-8">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <MessageSquare className="h-6 w-6 text-primary" />
                  <span className="font-semibold text-sm sm:text-base md:text-lg">Share Your Experience</span>
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
                        disabled={submitting}
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
                        disabled={submitting}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        placeholder="City, State (e.g., Pittsburgh, PA)"
                        value={newReview.location}
                        onChange={(e) => setNewReview({...newReview, location: e.target.value})}
                        disabled={submitting}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="property_type">Property Type</Label>
                      <Input
                        id="property_type"
                        placeholder="e.g., Purchased $650K Condo"
                        value={newReview.property_type}
                        onChange={(e) => setNewReview({...newReview, property_type: e.target.value})}
                        disabled={submitting}
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
                      onChange={(e) => setNewReview({...newReview, text: e.target.value, review_text: e.target.value})}
                      required
                      disabled={submitting}
                    />
                  </div>

                  <div className="flex gap-4 justify-end">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setShowReviewForm(false);
                        setNewReview({
                          name: '',
                          email: '',
                          location: '',
                          rating: 5,
                          text: '',
                          review_text: '',
                          property_type: ''
                        });
                      }}
                      disabled={submitting}
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit" 
                      className="bg-primary hover:bg-primary/90"
                      disabled={submitting}
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          Submit Review
                          <Send className="h-4 w-4 ml-2" />
                        </>
                      )}
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