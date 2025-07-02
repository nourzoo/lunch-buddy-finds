
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Star, ThumbsUp, MessageSquare, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Review {
  id: string;
  userName: string;
  userRole: string;
  rating: number;
  comment: string;
  date: string;
  restaurant: string;
  tags: string[];
  likes: number;
  avatar: string;
}

const ReviewSystem = () => {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: '1',
      userName: '김개발',
      userRole: '백엔드팀',
      rating: 5,
      comment: '샐러드야 정말 좋아요! 샐러드가 신선하고 양도 충분해서 든든했습니다. 다이어트 중인 분들께 강추!',
      date: '2024-01-15',
      restaurant: '샐러드야',
      tags: ['신선함', '건강식', '양많음'],
      likes: 12,
      avatar: '👨‍💻'
    },
    {
      id: '2',
      userName: '박디자이너',
      userRole: 'UI/UX팀',
      rating: 4,
      comment: '놀링파스타 분위기도 좋고 맛도 괜찮았어요. 다만 대기시간이 좀 길어서 시간 여유있을 때 가는게 좋을것 같아요.',
      date: '2024-01-14',
      restaurant: '놀링파스타',
      tags: ['분위기좋음', '맛있음', '대기시간'],
      likes: 8,
      avatar: '👩‍🎨'
    },
    {
      id: '3',
      userName: '최팀장',
      userRole: '마케팅팀',
      rating: 5,
      comment: '푸근한한식집은 정말 맛있어요. 영양균형도 잘 맞춰져 있고, 혼밥하기에도 편안한 분위기입니다.',
      date: '2024-01-13',
      restaurant: '푸근한한식집',
      tags: ['영양균형', '혼밥추천', '맛집'],
      likes: 15,
      avatar: '👨‍💼'
    }
  ]);

  const [newReview, setNewReview] = useState({
    restaurant: '',
    rating: 0,
    comment: '',
    tags: [] as string[]
  });

  const [showReviewForm, setShowReviewForm] = useState(false);
  const { toast } = useToast();

  const handleSubmitReview = () => {
    if (!newReview.restaurant || !newReview.comment || newReview.rating === 0) {
      toast({
        title: "리뷰 작성 오류",
        description: "모든 필드를 채워주세요.",
        variant: "destructive"
      });
      return;
    }

    const review: Review = {
      id: Date.now().toString(),
      userName: '나',
      userRole: '개발팀',
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString().split('T')[0],
      restaurant: newReview.restaurant,
      tags: newReview.tags,
      likes: 0,
      avatar: '👤'
    };

    setReviews([review, ...reviews]);
    setNewReview({ restaurant: '', rating: 0, comment: '', tags: [] });
    setShowReviewForm(false);
    
    toast({
      title: "리뷰가 등록되었습니다!",
      description: "다른 동료들에게 도움이 될 거예요."
    });
  };

  const renderStars = (rating: number, interactive: boolean = false, onRatingChange?: (rating: number) => void) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating 
                ? 'fill-yellow-400 text-yellow-400' 
                : 'text-gray-300'
            } ${interactive ? 'cursor-pointer hover:text-yellow-400' : ''}`}
            onClick={interactive && onRatingChange ? () => onRatingChange(star) : undefined}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              식당 리뷰 ({reviews.length})
            </CardTitle>
            <Button 
              onClick={() => setShowReviewForm(!showReviewForm)}
              size="sm"
            >
              <Plus className="h-4 w-4 mr-2" />
              리뷰 작성
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {showReviewForm && (
            <Card className="mb-6 border-primary/20 animate-scale-in">
              <CardHeader>
                <CardTitle className="text-lg">새 리뷰 작성</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">식당 선택</label>
                  <select 
                    className="w-full p-2 border rounded-lg"
                    value={newReview.restaurant}
                    onChange={(e) => setNewReview({...newReview, restaurant: e.target.value})}
                  >
                    <option value="">식당을 선택하세요</option>
                    <option value="샐러드야">샐러드야</option>
                    <option value="놀링파스타">놀링파스타</option>
                    <option value="푸근한한식집">푸근한한식집</option>
                    <option value="라멘이지만예">라멘이지만예</option>
                    <option value="지글지글">지글지글</option>
                    <option value="다도한방카페">다도한방카페</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">평점</label>
                  {renderStars(newReview.rating, true, (rating) => 
                    setNewReview({...newReview, rating})
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">리뷰 내용</label>
                  <Textarea
                    placeholder="식당에 대한 솔직한 후기를 남겨주세요..."
                    value={newReview.comment}
                    onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                  />
                </div>

                <div className="flex gap-2">
                  <Button onClick={handleSubmitReview}>
                    리뷰 등록
                  </Button>
                  <Button variant="outline" onClick={() => setShowReviewForm(false)}>
                    취소
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="space-y-4">
            {reviews.map((review, index) => (
              <Card key={review.id} className="hover-lift animate-slide-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <Avatar>
                      <AvatarFallback className="text-lg">
                        {review.avatar}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-medium">{review.userName}</h4>
                          <p className="text-sm text-gray-600">{review.userRole}</p>
                        </div>
                        <div className="text-right">
                          {renderStars(review.rating)}
                          <p className="text-xs text-gray-500 mt-1">{review.date}</p>
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <Badge variant="outline" className="mb-2">
                          {review.restaurant}
                        </Badge>
                        <p className="text-sm">{review.comment}</p>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-1">
                          {review.tags.map((tag, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-gray-500 hover:text-primary"
                        >
                          <ThumbsUp className="h-4 w-4 mr-1" />
                          {review.likes}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewSystem;
