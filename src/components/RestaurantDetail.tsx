import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  ArrowLeft, 
  Star, 
  MapPin, 
  Clock, 
  Phone, 
  Navigation, 
  Users, 
  MessageSquare,
  ThumbsUp,
  AlertTriangle
} from 'lucide-react';
import RestaurantReservation from './RestaurantReservation';

interface Restaurant {
  id: string;
  name: string;
  category: string;
  rating: number;
  distance: string;
  waitTime: string;
  priceRange: string;
  specialMenu: string;
  image: string;
  reviewCount: number;
  tags: string[];
  allergyWarning?: string[];
  reason?: string;
  phone?: string;
  address?: string;
  openHours?: string;
  description?: string;
}

interface RestaurantDetailProps {
  restaurant: Restaurant | null;
  onBack: () => void;
}

const RestaurantDetail = ({ restaurant, onBack }: RestaurantDetailProps) => {
  const [activeTab, setActiveTab] = useState<'info' | 'menu' | 'reviews' | 'reservation'>('info');
  const [showReservation, setShowReservation] = useState(false);

  if (!restaurant) {
    return (
      <div className="p-4">
        <p>식당 정보를 불러올 수 없습니다.</p>
        <Button onClick={onBack} className="mt-2">
          <ArrowLeft className="h-4 w-4 mr-2" />
          돌아가기
        </Button>
      </div>
    );
  }

  const mockMenus = [
    { name: '시저 샐러드', price: '12,000원', description: '신선한 로메인과 치킨', popular: true },
    { name: '그릴드 치킨 샐러드', price: '14,000원', description: '단백질이 풍부한 건강 샐러드', popular: false },
    { name: '아보카도 샐러드', price: '13,000원', description: '크리미한 아보카도와 견과류', popular: false }
  ];

  const mockReviews = [
    {
      id: '1',
      userName: '김직장인',
      rating: 5,
      comment: '정말 신선하고 맛있어요! 다이어트에 도움이 많이 됩니다.',
      date: '2024-01-15',
      likes: 12
    },
    {
      id: '2',
      userName: '박건강',
      rating: 4,
      comment: '가격대비 양도 많고 맛도 좋네요. 자주 올 것 같아요.',
      date: '2024-01-14',
      likes: 8
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* 헤더 */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onBack}
              className="p-2"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <div className="text-4xl">{restaurant.image}</div>
                <div>
                  <CardTitle className="text-xl">{restaurant.name}</CardTitle>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline">{restaurant.category}</Badge>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="font-medium">{restaurant.rating}</span>
                      <span className="text-sm text-gray-500">({restaurant.reviewCount})</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* 기본 정보 */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span>{restaurant.distance}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-500" />
              <span>대기 {restaurant.waitTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-gray-500" />
              <span>{restaurant.priceRange}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-gray-500" />
              <span>예약 가능</span>
            </div>
          </div>

          {restaurant.allergyWarning && restaurant.allergyWarning.length > 0 && (
            <div className="mt-4 p-3 bg-red-50 rounded-lg border border-red-200">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <span className="text-sm font-medium text-red-800">
                  알러지 주의: {restaurant.allergyWarning.join(', ')}
                </span>
              </div>
            </div>
          )}

          <div className="flex gap-2 mt-4">
            <Button className="flex-1">
              <Phone className="h-4 w-4 mr-2" />
              전화주문
            </Button>
            <Button variant="outline" className="flex-1">
              <Navigation className="h-4 w-4 mr-2" />
              길찾기
            </Button>
            <Button 
              variant="secondary" 
              className="flex-1"
              onClick={() => setShowReservation(true)}
            >
              예약하기
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 예약 모달 */}
      {showReservation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <RestaurantReservation
            restaurant={{
              id: restaurant.id,
              name: restaurant.name,
              image: restaurant.image
            }}
            onClose={() => setShowReservation(false)}
            onSuccess={() => {
              setShowReservation(false);
              // 예약 성공 후 처리
            }}
          />
        </div>
      )}

      {/* 탭 메뉴 */}
      <Card>
        <CardHeader>
          <div className="flex gap-1">
            <Button 
              variant={activeTab === 'info' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('info')}
            >
              정보
            </Button>
            <Button 
              variant={activeTab === 'menu' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('menu')}
            >
              메뉴
            </Button>
            <Button 
              variant={activeTab === 'reviews' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('reviews')}
            >
              리뷰 ({restaurant.reviewCount})
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {activeTab === 'info' && (
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">대표 메뉴</h4>
                <p className="text-gray-600">{restaurant.specialMenu}</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">태그</h4>
                <div className="flex flex-wrap gap-2">
                  {restaurant.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              {restaurant.reason && (
                <div className="p-3 bg-blue-50 rounded-lg">
                  <h4 className="font-medium mb-1">추천 이유</h4>
                  <p className="text-sm text-blue-800">{restaurant.reason}</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'menu' && (
            <div className="space-y-3">
              {mockMenus.map((menu, index) => (
                <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{menu.name}</h4>
                      {menu.popular && (
                        <Badge variant="destructive" className="text-xs">인기</Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{menu.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{menu.price}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-4">
              {mockReviews.map((review) => (
                <div key={review.id} className="border-b pb-4">
                  <div className="flex items-start gap-3">
                    <Avatar>
                      <AvatarFallback>
                        {review.userName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{review.userName}</span>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-3 w-3 ${
                                star <= review.rating 
                                  ? 'fill-yellow-400 text-yellow-400' 
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-500">{review.date}</span>
                      </div>
                      <p className="text-sm text-gray-700 mb-2">{review.comment}</p>
                      <Button variant="ghost" size="sm" className="p-0 h-auto">
                        <ThumbsUp className="h-3 w-3 mr-1" />
                        {review.likes}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                <MessageSquare className="h-4 w-4 mr-2" />
                리뷰 작성하기
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RestaurantDetail;
