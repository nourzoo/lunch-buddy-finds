
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';
import { Users, MessageSquare, MapPin, Clock, Utensils, Sparkles, UserCheck } from 'lucide-react';
import GroupChat from './GroupChat';

interface MatchingUser {
  id: string;
  name: string;
  role: string;
  avatar: string;
  preferences: string[];
  distance: string;
  compatibility: number;
  status: string;
  introduction: string;
}

interface MatchingSystemProps {
  preferences: {
    healthyOnly: boolean;
    soloMode: boolean;
    location: string;
    lunchTime: string;
  };
  matchingMode: 'solo' | 'select' | 'random';
}

const MatchingSystem = ({ preferences, matchingMode }: MatchingSystemProps) => {
  const [isMatching, setIsMatching] = useState(false);
  const [matchedUsers, setMatchedUsers] = useState<MatchingUser[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [showGroupChat, setShowGroupChat] = useState(false);
  const [matchingStep, setMatchingStep] = useState<'waiting' | 'matched' | 'confirmed'>('waiting');

  const availableUsers: MatchingUser[] = [
    {
      id: '1',
      name: '오일남',
      role: '개발팀 대리',
      avatar: '👨‍💻',
      preferences: ['건강식', '빠른식사'],
      distance: '50m',
      compatibility: 95,
      status: '매칭 대기중',
      introduction: '맛있는 점심 함께 해요! 건강한 음식 좋아해요 😊'
    },
    {
      id: '2',
      name: '오이녀',
      role: '기획팀 과장',
      avatar: '👩‍💼',
      preferences: ['채식주의', '조용한곳'],
      distance: '120m',
      compatibility: 88,
      status: '매칭 대기중',
      introduction: '채식 위주로 드시는 분들과 같이 하고 싶어요 🥗'
    },
    {
      id: '3',
      name: '오삼남',
      role: '마케팅팀 사원',
      avatar: '👨‍💼',
      preferences: ['매운음식', '활발한대화'],
      distance: '200m',
      compatibility: 82,
      status: '매칭 대기중',
      introduction: '매운 음식과 즐거운 대화 좋아합니다! 🌶️'
    },
    {
      id: '4',
      name: '오사녀',
      role: '디자인팀 주임',
      avatar: '👩‍🎨',
      preferences: ['인스타감성', '브런치'],
      distance: '300m',
      compatibility: 75,
      status: '매칭 대기중',
      introduction: '예쁜 카페나 브런치 맛집 탐방해요 📸'
    }
  ];

  const handleUserSelection = (userId: string, checked: boolean) => {
    if (checked) {
      setSelectedUsers([...selectedUsers, userId]);
    } else {
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    }
  };

  const startMatching = () => {
    setIsMatching(true);
    setMatchingStep('waiting');
    
    setTimeout(() => {
      let matched: MatchingUser[] = [];
      
      if (matchingMode === 'solo') {
        // 혼밥 모드
        setMatchingStep('confirmed');
        return;
      } else if (matchingMode === 'select') {
        // 사용자가 선택한 사람들
        matched = availableUsers.filter(user => selectedUsers.includes(user.id));
      } else {
        // 랜덤 매칭
        const shuffled = [...availableUsers].sort(() => 0.5 - Math.random());
        matched = shuffled.slice(0, Math.floor(Math.random() * 3) + 1);
      }
      
      setMatchedUsers(matched);
      setMatchingStep('matched');
      setIsMatching(false);
    }, 3000);
  };

  const confirmMatching = () => {
    setMatchingStep('confirmed');
    if (matchedUsers.length > 0) {
      setShowGroupChat(true);
    }
  };

  const resetMatching = () => {
    setMatchingStep('waiting');
    setMatchedUsers([]);
    setSelectedUsers([]);
    setShowGroupChat(false);
  };

  if (showGroupChat) {
    return <GroupChat matchedUsers={matchedUsers} onClose={() => setShowGroupChat(false)} />;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            {matchingMode === 'solo' ? '혼밥 모드' : 
             matchingMode === 'select' ? '사람 선택' : '랜덤 매칭'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {matchingMode === 'solo' ? (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">🍽️</div>
              <h3 className="text-lg font-semibold mb-2">조용한 혼밥 시간</h3>
              <p className="text-gray-600 mb-4">
                오늘은 혼자만의 시간을 가져보세요. 추천 식당을 확인하고 편안하게 식사하세요.
              </p>
              <Button onClick={startMatching} disabled={isMatching}>
                {isMatching ? '준비중...' : '혼밥 시작하기'}
              </Button>
            </div>
          ) : (
            <>
              {/* 현재 설정 정보 */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span>{preferences.lunchTime}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span>{preferences.location.split(' ').slice(-1)[0]}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Utensils className="h-4 w-4 text-gray-500" />
                  <span>{preferences.healthyOnly ? '건강식만' : '모든 음식'}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span>{matchingMode === 'select' ? '직접 선택' : '자동 매칭'}</span>
                </div>
              </div>

              {matchingStep === 'waiting' && (
                <>
                  {matchingMode === 'select' && (
                    <div className="space-y-4 mb-6">
                      <h3 className="font-semibold">함께 식사할 사람을 선택하세요</h3>
                      <div className="grid gap-4">
                        {availableUsers.map((user) => (
                          <div key={user.id} className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50">
                            <Checkbox
                              id={user.id}
                              checked={selectedUsers.includes(user.id)}
                              onCheckedChange={(checked) => handleUserSelection(user.id, checked as boolean)}
                            />
                            <Avatar className="h-12 w-12">
                              <AvatarFallback className="text-lg">{user.avatar}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <h4 className="font-semibold">{user.name}</h4>
                                <Badge variant="outline" className="text-xs">{user.role}</Badge>
                                <div className="flex items-center gap-1">
                                  <Sparkles className="h-3 w-3 text-yellow-500" />
                                  <span className="text-sm">{user.compatibility}%</span>
                                </div>
                              </div>
                              <p className="text-sm text-gray-600 mb-1">{user.introduction}</p>
                              <div className="flex items-center gap-2">
                                <MapPin className="h-3 w-3 text-gray-400" />
                                <span className="text-xs text-gray-500">{user.distance}</span>
                                <div className="flex gap-1">
                                  {user.preferences.slice(0, 2).map((pref, index) => (
                                    <Badge key={index} variant="secondary" className="text-xs">
                                      {pref}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {matchingMode === 'random' && (
                    <div className="space-y-4 mb-6">
                      <h3 className="font-semibold">매칭 가능한 사람들</h3>
                      <div className="grid gap-3">
                        {availableUsers.slice(0, 3).map((user) => (
                          <div key={user.id} className="flex items-center space-x-4 p-3 border rounded-lg">
                            <Avatar className="h-10 w-10">
                              <AvatarFallback>{user.avatar}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <h4 className="font-medium">{user.name}</h4>
                                <Badge variant="outline" className="text-xs">{user.role}</Badge>
                                <div className="flex items-center gap-1">
                                  <Sparkles className="h-3 w-3 text-yellow-500" />
                                  <span className="text-xs">{user.compatibility}%</span>
                                </div>
                              </div>
                              <p className="text-xs text-gray-600">{user.introduction}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <Button 
                    onClick={startMatching} 
                    disabled={isMatching || (matchingMode === 'select' && selectedUsers.length === 0)}
                    className="w-full"
                  >
                    {isMatching ? '매칭중...' : 
                     matchingMode === 'select' ? `선택한 ${selectedUsers.length}명과 매칭` : '랜덤 매칭 시작'}
                  </Button>
                </>
              )}

              {matchingStep === 'matched' && (
                <div className="text-center space-y-6">
                  <div className="text-6xl">🎉</div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">매칭 성공!</h3>
                    <p className="text-gray-600">
                      {matchedUsers.length}명의 점심 메이트를 찾았습니다
                    </p>
                  </div>
                  
                  <div className="grid gap-3">
                    {matchedUsers.map((user) => (
                      <div key={user.id} className="flex items-center space-x-4 p-4 border rounded-lg bg-green-50">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="text-lg">{user.avatar}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 text-left">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold">{user.name}</h4>
                            <Badge variant="outline" className="text-xs">{user.role}</Badge>
                            <div className="flex items-center gap-1">
                              <Sparkles className="h-3 w-3 text-yellow-500" />
                              <span className="text-sm">{user.compatibility}%</span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600">{user.introduction}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <Button onClick={confirmMatching} className="flex-1">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      그룹 채팅 시작
                    </Button>
                    <Button variant="outline" onClick={resetMatching}>
                      다시 매칭
                    </Button>
                  </div>
                </div>
              )}

              {matchingStep === 'confirmed' && matchingMode === 'solo' && (
                <div className="text-center space-y-6">
                  <div className="text-6xl">✨</div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">혼밥 준비 완료!</h3>
                    <p className="text-gray-600">
                      추천 식당을 확인하고 편안한 점심시간을 보내세요
                    </p>
                  </div>
                  <Button onClick={resetMatching} className="w-full">
                    다른 매칭 방식 시도
                  </Button>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MatchingSystem;
