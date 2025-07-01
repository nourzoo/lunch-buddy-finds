
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Clock, Users, MessageCircle, UserCheck, Shuffle } from 'lucide-react';

interface User {
  id: string;
  name: string;
  role: string;
  lunchTime: string;
  interests: string[];
  avatar: string;
  status: 'available' | 'matched' | 'eating';
}

interface MatchingSystemProps {
  preferences: any;
}

const MatchingSystem = ({ preferences }: MatchingSystemProps) => {
  const [availableUsers, setAvailableUsers] = useState<User[]>([]);
  const [matchedUser, setMatchedUser] = useState<User | null>(null);
  const [matchingStatus, setMatchingStatus] = useState<'idle' | 'searching' | 'matched'>('idle');

  const mockUsers: User[] = [
    {
      id: '1',
      name: '이민수',
      role: '마케팅팀',
      lunchTime: '12:00-13:00',
      interests: ['이탈리안', '건강식', '카페'],
      avatar: '🧑‍💼',
      status: 'available'
    },
    {
      id: '2',
      name: '박지영',
      role: '디자인팀',
      lunchTime: '12:30-13:30',
      interests: ['아시안', '디저트', '트렌디'],
      avatar: '👩‍💻',
      status: 'available'
    },
    {
      id: '3',
      name: '김철수',
      role: '개발팀',
      lunchTime: '11:30-12:30',
      interests: ['한식', '간편식', '혼밥'],
      avatar: '👨‍💻',
      status: 'available'
    },
    {
      id: '4',
      name: '최수연',
      role: '영업팀',
      lunchTime: '12:00-13:00',
      interests: ['건강식', '샐러드', '브런치'],
      avatar: '👩‍💼',
      status: 'available'
    }
  ];

  useEffect(() => {
    if (!preferences.soloMode) {
      setAvailableUsers(mockUsers);
    } else {
      setAvailableUsers([]);
      setMatchedUser(null);
    }
  }, [preferences.soloMode]);

  const startRandomMatching = () => {
    setMatchingStatus('searching');
    setTimeout(() => {
      const randomUser = availableUsers[Math.floor(Math.random() * availableUsers.length)];
      setMatchedUser(randomUser);
      setMatchingStatus('matched');
    }, 2000);
  };

  const selectUser = (user: User) => {
    setMatchedUser(user);
    setMatchingStatus('matched');
  };

  const cancelMatching = () => {
    setMatchedUser(null);
    setMatchingStatus('idle');
  };

  if (preferences.soloMode) {
    return (
      <Card className="animate-fade-in">
        <CardContent className="p-8 text-center">
          <div className="text-6xl mb-4">🧘‍♂️</div>
          <h3 className="text-xl font-semibold mb-2">혼밥 모드</h3>
          <p className="text-gray-600">
            조용하고 편안한 혼밥 타임을 즐기세요.<br />
            추천된 식당에서 나만의 시간을 가져보세요.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {matchingStatus === 'matched' && matchedUser ? (
        <Card className="border-primary animate-scale-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <UserCheck className="h-5 w-5" />
              매칭 완료!
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4 p-4 bg-primary/5 rounded-lg">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="text-2xl">
                  {matchedUser.avatar}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="font-semibold">{matchedUser.name}</h3>
                <p className="text-sm text-gray-600">{matchedUser.role}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Clock className="h-3 w-3" />
                  <span className="text-xs">{matchedUser.lunchTime}</span>
                </div>
              </div>
              <div className="text-right">
                <Button size="sm" className="mb-2">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  채팅하기
                </Button>
                <Button variant="outline" size="sm" onClick={cancelMatching}>
                  취소
                </Button>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium mb-2">공통 관심사:</p>
              <div className="flex flex-wrap gap-2">
                {matchedUser.interests.map((interest, i) => (
                  <Badge key={i} variant="secondary">
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              점심 메이트 찾기
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-6">
              <Button 
                onClick={startRandomMatching}
                disabled={matchingStatus === 'searching'}
                className="gradient-orange text-white hover:opacity-90 transition-opacity"
              >
                {matchingStatus === 'searching' ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    매칭 중...
                  </>
                ) : (
                  <>
                    <Shuffle className="h-4 w-4 mr-2" />
                    랜덤 매칭
                  </>
                )}
              </Button>
              <p className="text-sm text-gray-500 mt-2">
                비슷한 점심시간을 가진 동료와 자동 매칭
              </p>
            </div>

            <div className="border-t pt-6">
              <h4 className="font-medium mb-4">직접 선택하기</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {availableUsers.map((user) => (
                  <div 
                    key={user.id}
                    className="p-4 border rounded-lg cursor-pointer hover:border-primary transition-colors hover-lift"
                    onClick={() => selectUser(user)}
                  >
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarFallback className="text-lg">
                          {user.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <h5 className="font-medium truncate">{user.name}</h5>
                        <p className="text-sm text-gray-600">{user.role}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Clock className="h-3 w-3 text-gray-400" />
                          <span className="text-xs text-gray-500">{user.lunchTime}</span>
                        </div>
                      </div>
                      <Badge 
                        variant={user.status === 'available' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {user.status === 'available' ? '가능' : '식사중'}
                      </Badge>
                    </div>
                    <div className="mt-3">
                      <div className="flex flex-wrap gap-1">
                        {user.interests.slice(0, 3).map((interest, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {interest}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MatchingSystem;
