
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import UserProfile from '@/components/UserProfile';
import MenuRecommendation from '@/components/MenuRecommendation';
import MatchingSystem from '@/components/MatchingSystem';
import RestaurantInfo from '@/components/RestaurantInfo';
import ReviewSystem from '@/components/ReviewSystem';
import { User, Utensils, Users, Clock, MessageSquare } from 'lucide-react';

const Index = () => {
  const [userPreferences, setUserPreferences] = useState({
    healthyOnly: false,
    soloMode: false,
    location: '강남구 역삼동',
    lunchTime: '12:00-13:00'
  });

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

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:grid-cols-5">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">프로필</span>
            </TabsTrigger>
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
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <UserProfile onPreferencesChange={setUserPreferences} />
          </TabsContent>

          <TabsContent value="recommendation" className="space-y-6">
            <MenuRecommendation preferences={userPreferences} />
          </TabsContent>

          <TabsContent value="matching" className="space-y-6">
            <MatchingSystem preferences={userPreferences} />
          </TabsContent>

          <TabsContent value="realtime" className="space-y-6">
            <RestaurantInfo />
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <ReviewSystem />
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
