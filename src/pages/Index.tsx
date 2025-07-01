
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import Header from '@/components/Header';
import UserProfile from '@/components/UserProfile';
import MenuRecommendation from '@/components/MenuRecommendation';
import MatchingSystem from '@/components/MatchingSystem';
import RestaurantInfo from '@/components/RestaurantInfo';
import ReviewSystem from '@/components/ReviewSystem';
import { User, Utensils, Users, Clock, MessageSquare, CloudSun } from 'lucide-react';

const Index = () => {
  const [userPreferences, setUserPreferences] = useState({
    healthyOnly: false,
    soloMode: false,
    location: '강남구 역삼동',
    lunchTime: '12:00-13:00'
  });

  const [matchingMode, setMatchingMode] = useState<'solo' | 'select' | 'random'>('random');
  const [weather] = useState({
    condition: '맑음',
    temperature: 23,
    icon: '☀️'
  });

  const handleMatchingModeChange = (mode: 'solo' | 'select' | 'random') => {
    setMatchingMode(mode);
    // 혼밥 모드 선택 시 preferences도 업데이트
    if (mode === 'solo') {
      const newPrefs = { ...userPreferences, soloMode: true };
      setUserPreferences(newPrefs);
    } else {
      const newPrefs = { ...userPreferences, soloMode: false };
      setUserPreferences(newPrefs);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🍽️ 점심메이트
          </h1>
          <p className="text-lg text-gray-600">
            바쁜 직장인을 위한 점심 추천 & 매칭 서비스
          </p>
        </div>

        {/* 날씨 및 매칭 방법 선택 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CloudSun className="h-5 w-5 text-primary" />
                오늘의 날씨
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{weather.temperature}°C</p>
                  <p className="text-gray-600">{weather.condition}</p>
                </div>
                <div className="text-4xl">{weather.icon}</div>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                좋은 날씨예요! 야외 식당도 추천드릴게요.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                매칭 방법 선택
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={matchingMode} onValueChange={handleMatchingModeChange}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="solo" id="solo" />
                  <Label htmlFor="solo" className="text-sm">혼밥 (조용히 식사)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="select" id="select" />
                  <Label htmlFor="select" className="text-sm">사람 선택 (직접 고르기)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="random" id="random" />
                  <Label htmlFor="random" className="text-sm">랜덤 매칭 (자동 매칭)</Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="recommendation" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:grid-cols-5">
            <TabsTrigger value="recommendation" className="flex items-center gap-2">
              <Utensils className="h-4 w-4" />
              <span className="hidden sm:inline">추천</span>
            </TabsTrigger>
            <TabsTrigger value="matching" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">매칭</span>
            </TabsTrigger>
            <TabsTrigger value="realtime" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span className="hidden sm:inline">실시간</span>
            </TabsTrigger>
            <TabsTrigger value="reviews" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">리뷰</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">프로필</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="recommendation" className="space-y-6">
            <MenuRecommendation preferences={userPreferences} weather={weather} />
          </TabsContent>

          <TabsContent value="matching" className="space-y-6">
            <MatchingSystem preferences={userPreferences} matchingMode={matchingMode} />
          </TabsContent>

          <TabsContent value="realtime" className="space-y-6">
            <RestaurantInfo />
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <ReviewSystem />
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <UserProfile onPreferencesChange={setUserPreferences} />
          </TabsContent>
        </Tabs>
      </main>

      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p className="mb-2">🍽️ 점심메이트 - 직장인을 위한 점심 솔루션</p>
            <p className="text-sm">바쁜 일상 속에서도 맛있고 건강한 점심을 즐기세요</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
