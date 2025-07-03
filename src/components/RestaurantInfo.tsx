
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Clock, Users, MapPin, Phone, Star, TrendingUp, Calendar, ArrowLeft } from 'lucide-react';
import RestaurantDetail from './RestaurantDetail';

interface RestaurantWaitInfo {
  id: string;
  name: string;
  category: string;
  currentWait: number;
  estimatedTime: string;
  distance: string;
  rating: number;
  reviewCount: number;
  priceRange: string;
  image: string;
  trend: 'up' | 'down' | 'stable';
  trendPercentage: number;
  hourlyData: { hour: string; wait: number }[];
  phone?: string;
  address?: string;
  openHours?: string;
  description?: string;
  tags: string[];
  allergyWarning?: string[];
  reason?: string;
  specialMenu: string;
}

interface RestaurantInfoProps {
  onClose: () => void;
}

const RestaurantInfo = ({ onClose }: RestaurantInfoProps) => {
  const [selectedRestaurant, setSelectedRestaurant] = useState<RestaurantWaitInfo | null>(null);

  const waitingData: RestaurantWaitInfo[] = [
    {
      id: '1',
      name: '샐러드야',
      category: '샐러드/건강식',
      currentWait: 12,
      estimatedTime: '15-20분',
      distance: '50m',
      rating: 4.5,
      reviewCount: 324,
      priceRange: '₩₩',
      image: '🥗',
      trend: 'up',
      trendPercentage: 15,
      hourlyData: [
        { hour: '11:00', wait: 3 },
        { hour: '11:30', wait: 8 },
        { hour: '12:00', wait: 12 },
        { hour: '12:30', wait: 15 },
        { hour: '13:00', wait: 8 }
      ],
      phone: '02-123-4567',
      address: '서울특별시 강남구 역삼동 123-45',
      openHours: '11:00-21:00',
      description: '신선한 유기농 채소로 만든 건강한 샐러드 전문점',
      tags: ['건강식', '다이어트', '비건옵션'],
      allergyWarning: ['견과류'],
      reason: '건강한 식단을 원하시는 분들께 추천',
      specialMenu: '아보카도 치킨 샐러드'
    },
    {
      id: '2',
      name: '놀링파스타',
      category: '이탈리안',
      currentWait: 8,
      estimatedTime: '10-15분',
      distance: '120m',
      rating: 4.3,
      reviewCount: 256,
      priceRange: '₩₩',
      image: '🍝',
      trend: 'down',
      trendPercentage: 10,
      hourlyData: [
        { hour: '11:00', wait: 15 },
        { hour: '11:30', wait: 12 },
        { hour: '12:00', wait: 8 },
        { hour: '12:30', wait: 10 },
        { hour: '13:00', wait: 5 }
      ],
      phone: '02-234-5678',
      address: '서울특별시 강남구 역삼동 234-56',
      openHours: '11:30-22:00',
      description: '정통 이탈리안 파스타와 피자를 맛볼 수 있는 곳',
      tags: ['파스타', '피자', '이탈리안'],
      specialMenu: '트러플 크림 파스타'
    },
    {
      id: '3',
      name: '푸근한한식집',
      category: '한식',
      currentWait: 20,
      estimatedTime: '25-30분',
      distance: '200m',
      rating: 4.7,
      reviewCount: 189,
      priceRange: '₩₩₩',
      image: '🍲',
      trend: 'stable',
      trendPercentage: 0,
      hourlyData: [
        { hour: '11:00', wait: 18 },
        { hour: '11:30', wait: 20 },
        { hour: '12:00', wait: 20 },
        { hour: '12:30', wait: 22 },
        { hour: '13:00', wait: 15 }
      ],
      phone: '02-345-6789',
      address: '서울특별시 강남구 역삼동 345-67',
      openHours: '11:00-21:30',
      description: '집밥 같은 정갈한 한식을 맛볼 수 있는 곳',
      tags: ['한식', '집밥', '정갈한'],
      specialMenu: '된장찌개 정식'
    },
    {
      id: '4',
      name: '라멘이지예',
      category: '일식/라멘',
      currentWait: 5,
      estimatedTime: '5-10분',
      distance: '300m',
      rating: 4.2,
      reviewCount: 412,
      priceRange: '₩₩',
      image: '🍜',
      trend: 'down',
      trendPercentage: 25,
      hourlyData: [
        { hour: '11:00', wait: 12 },
        { hour: '11:30', wait: 8 },
        { hour: '12:00', wait: 5 },
        { hour: '12:30', wait: 7 },
        { hour: '13:00', wait: 3 }
      ],
      phone: '02-456-7890',
      address: '서울특별시 강남구 역삼동 456-78',
      openHours: '11:00-22:00',
      description: '진한 돈코츠 라멘과 차슈가 유명한 라멘 전문점',
      tags: ['라멘', '일식', '돈코츠'],
      specialMenu: '특제 돈코츠 라멘'
    }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-red-500" />;
      case 'down': return <TrendingUp className="h-4 w-4 text-green-500 rotate-180" />;
      default: return <div className="w-4 h-4 bg-gray-400 rounded-full" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-red-500';
      case 'down': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  const getWaitColor = (wait: number) => {
    if (wait <= 5) return 'text-green-600';
    if (wait <= 15) return 'text-yellow-600';
    return 'text-red-600';
  };

  const handleRestaurantClick = (restaurant: RestaurantWaitInfo) => {
    // RestaurantWaitInfo를 Restaurant 타입으로 변환
    const restaurantForDetail = {
      id: restaurant.id,
      name: restaurant.name,
      category: restaurant.category,
      rating: restaurant.rating,
      distance: restaurant.distance,
      waitTime: restaurant.estimatedTime,
      priceRange: restaurant.priceRange,
      specialMenu: restaurant.specialMenu,
      image: restaurant.image,
      reviewCount: restaurant.reviewCount,
      tags: restaurant.tags,
      allergyWarning: restaurant.allergyWarning,
      reason: restaurant.reason,
      phone: restaurant.phone,
      address: restaurant.address,
      openHours: restaurant.openHours,
      description: restaurant.description
    };
    setSelectedRestaurant(restaurantForDetail as any);
  };

  if (selectedRestaurant) {
    return (
      <RestaurantDetail 
        restaurant={selectedRestaurant as any}
        onBack={() => setSelectedRestaurant(null)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              실시간 대기 정보
            </CardTitle>
            <Button variant="outline" size="sm" onClick={onClose}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              돌아가기
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 text-sm mb-4">
            현재 시간 기준 근처 식당들의 실시간 대기 현황입니다
          </p>
          
          <div className="space-y-4">
            {waitingData.map((restaurant) => (
              <Card 
                key={restaurant.id} 
                className="hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleRestaurantClick(restaurant)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="text-3xl">{restaurant.image}</div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{restaurant.name}</h3>
                          <Badge variant="outline" className="text-xs">
                            {restaurant.category}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 text-yellow-500 fill-current" />
                            <span className="text-sm">{restaurant.rating}</span>
                            <span className="text-xs text-gray-500">({restaurant.reviewCount})</span>
                          </div>
                          <span className="text-xs text-gray-500">•</span>
                          <span className="text-xs text-gray-500">{restaurant.distance}</span>
                          <span className="text-xs text-gray-500">•</span>
                          <span className="text-xs text-gray-500">{restaurant.priceRange}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-2xl font-bold ${getWaitColor(restaurant.currentWait)}`}>
                          {restaurant.currentWait}
                        </span>
                        <div className="flex items-center gap-1">
                          {getTrendIcon(restaurant.trend)}
                          <span className={`text-xs ${getTrendColor(restaurant.trend)}`}>
                            {restaurant.trendPercentage}%
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500">대기 {restaurant.estimatedTime}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">대기 현황</span>
                      <span className={`font-medium ${getWaitColor(restaurant.currentWait)}`}>
                        {restaurant.currentWait <= 5 ? '여유' : 
                         restaurant.currentWait <= 15 ? '보통' : '혼잡'}
                      </span>
                    </div>
                    <Progress 
                      value={Math.min(restaurant.currentWait * 4, 100)} 
                      className="h-2"
                    />
                  </div>

                  {/* 시간대별 대기 추이 */}
                  <div className="mt-3 pt-3 border-t">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-3 w-3 text-gray-400" />
                      <span className="text-xs text-gray-500">오늘 대기 추이</span>
                    </div>
                    <div className="flex justify-between items-end h-8">
                      {restaurant.hourlyData.map((data, index) => (
                        <div key={index} className="flex flex-col items-center text-xs">
                          <div 
                            className="bg-primary opacity-60 w-3 mb-1"
                            style={{ height: `${Math.max(data.wait * 2, 4)}px` }}
                          />
                          <span className="text-gray-400">{data.hour.split(':')[0]}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 mt-3">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Phone className="h-3 w-3 mr-1" />
                      전화
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <MapPin className="h-3 w-3 mr-1" />
                      길찾기
                    </Button>
                    <Button size="sm" className="flex-1">
                      예약하기
                    </Button>
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

export default RestaurantInfo;
