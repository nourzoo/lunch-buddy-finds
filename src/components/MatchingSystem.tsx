import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';
import { Clock, Users, MessageCircle, UserCheck, Shuffle, X } from 'lucide-react';
import GroupChat from './GroupChat';

interface User {
  id: string;
  name: string;
  role: string;
  lunchTime: string;
  interests: string[];
  avatar: string;
  status: 'available' | 'matched' | 'eating';
  selected?: boolean;
}

interface MatchingSystemProps {
  preferences: any;
  matchingMode: 'solo' | 'select' | 'random';
}

const MatchingSystem = ({ preferences, matchingMode }: MatchingSystemProps) => {
  const [availableUsers, setAvailableUsers] = useState<User[]>([]);
  const [matchedUsers, setMatchedUsers] = useState<User[]>([]);
  const [matchingStatus, setMatchingStatus] = useState<'idle' | 'searching' | 'matched'>('idle');
  const [maxGroupSize, setMaxGroupSize] = useState(3);
  const [showGroupChat, setShowGroupChat] = useState(false);

  const mockUsers: User[] = [
    {
      id: '1',
      name: '오일남',
      role: '개발팀',
      lunchTime: '12:00-13:00',
      interests: ['이탈리안', '샐러드/건강식', '카페'],
      avatar: '👨‍💻',
      status: 'available'
    },
    {
      id: '2',
      name: '오이남',
      role: '디자인팀',
      lunchTime: '12:30-13:30',
      interests: ['일식/라멘', '카페', '트렌디'],
      avatar: '👨‍🎨',
      status: 'available'
    },
    {
      id: '3',
      name: '오삼남',
      role: '마케팅팀',
      lunchTime: '11:30-12:30',
      interests: ['한정식', '도시락/간편식', '혼밥'],
      avatar: '👨‍💼',
      status: 'available'
    },
    {
      id: '4',
      name: '오사남',
      role: '영업팀',
      lunchTime: '12:00-13:00',
      interests: ['샐러드/건강식', '한정식', '건강식'],
      avatar: '👨‍🔧',
      status: 'available'
    },
    {
      id: '5',
      name: '오일녀',
      role: '기획팀',
      lunchTime: '12:15-13:15',
      interests: ['베트남음식', '샌드위치', '디저트'],
      avatar: '👩‍💼',
      status: 'available'
    },
    {
      id: '6',
      name: '오이녀',
      role: '인사팀',
      lunchTime: '11:45-12:45',
      interests: ['중식', '분식', '커피'],
      avatar: '👩‍💻',
      status: 'available'
    },
    {
      id: '7',
      name: '오삼녀',
      role: '재무팀',
      lunchTime: '12:45-13:45',
      interests: ['양식', '샐러드/건강식', '주스'],
      avatar: '👩‍🎨',
      status: 'available'
    },
    {
      id: '8',
      name: '오사녀',
      role: '고객지원팀',
      lunchTime: '12:30-13:30',
      interests: ['한식', '국밥', '차'],
      avatar: '👩‍🔧',
      status: 'available'
    }
  ];

  useEffect(() => {
    if (matchingMode !== 'solo') {
      setAvailableUsers(mockUsers);
    } else {
      setAvailableUsers([]);
      setMatchedUsers([]);
    }
  }, [matchingMode]);

  const startRandomMatching = () => {
    setMatchingStatus('searching');
    setTimeout(() => {
      const shuffledUsers = [...availableUsers].sort(() => Math.random() - 0.5);
      const selectedUsers = shuffledUsers.slice(0, Math.min(maxGroupSize, shuffledUsers.length));
      setMatchedUsers(selectedUsers);
      setMatchingStatus('matched');
    }, 2000);
  };

  const selectUser = (user: User, checked: boolean) => {
    if (checked) {
      // 체크박스가 체크된 경우 사용자 추가
      if (matchedUsers.length < maxGroupSize) {
        setMatchedUsers([...matchedUsers, user]);
        setMatchingStatus('matched');
      }
    } else {
      // 체크박스가 해제된 경우 사용자 제거
      setMatchedUsers(matchedUsers.filter(u => u.id !== user.id));
      if (matchedUsers.length <= 1) {
        setMatchingStatus('idle');
      }
    }
  };

  const removeUser = (userId: string) => {
    setMatchedUsers(matchedUsers.filter(u => u.id !== userId));
    if (matchedUsers.length <= 1) {
      setMatchingStatus('idle');
    }
  };

  const cancelMatching = () => {
    setMatchedUsers([]);
    setMatchingStatus('idle');
    setShowGroupChat(false);
  };

  const startGroupChat = () => {
    setShowGroupChat(true);
  };

  if (matchingMode === 'solo') {
    return (
      <Card className="animate-fade-in">
        <CardContent className="p-8 text-center">
          <div className="text-6xl mb-4">🧘‍♀️</div>
          <h3 className="text-xl font-semibold mb-2">혼밥 모드</h3>
          <p className="text-gray-600">
            조용하고 편안한 혼밥 타임을 즐기세요.<br />
            추천된 식당에서 나만의 시간을 가져보세요.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (showGroupChat) {
    return (
      <GroupChat 
        matchedUsers={matchedUsers}
        onClose={() => setShowGroupChat(false)}
      />
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {matchingStatus === 'matched' && matchedUsers.length > 0 ? (
        <Card className="border-primary animate-scale-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <UserCheck className="h-5 w-5" />
              매칭 완료! ({matchedUsers.length}명)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {matchedUsers.map((user) => (
                <div key={user.id} className="flex items-center space-x-4 p-4 bg-primary/5 rounded-lg">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="text-2xl">
                      {user.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold">{user.name}</h3>
                    <p className="text-sm text-gray-600">{user.role}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="h-3 w-3" />
                      <span className="text-xs">{user.lunchTime}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => removeUser(user.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              <div className="mt-4">
                <p className="text-sm font-medium mb-2">그룹 채팅 시작하기:</p>
                <div className="flex gap-2">
                  <Button className="flex-1" onClick={startGroupChat}>
                    <MessageCircle className="h-4 w-4 mr-2" />
                    그룹 채팅 시작
                  </Button>
                  <Button variant="outline" onClick={cancelMatching}>
                    취소
                  </Button>
                </div>
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
              {matchingMode === 'random' && <Badge variant="secondary">랜덤 매칭</Badge>}
              {matchingMode === 'select' && <Badge variant="secondary">직접 선택</Badge>}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {matchingMode === 'random' && (
              <div className="text-center mb-6">
                <Button 
                  onClick={startRandomMatching}
                  disabled={matchingStatus === 'searching'}
                  className="bg-gradient-to-r from-orange-500 to-red-500 text-white hover:opacity-90 transition-opacity"
                >
                  {matchingStatus === 'searching' ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      매칭 중...
                    </>
                  ) : (
                    <>
                      <Shuffle className="h-4 w-4 mr-2" />
                      랜덤 매칭 시작
                    </>
                  )}
                </Button>
                <p className="text-sm text-gray-500 mt-2">
                  비슷한 점심시간을 가진 동료와 자동 매칭
                </p>
              </div>
            )}

            {(matchingMode === 'select' || matchingMode === 'random') && (
              <div className={matchingMode === 'random' ? 'border-t pt-6' : ''}>
                {matchingMode === 'random' && <h4 className="font-medium mb-4">또는 직접 선택하기</h4>}
                {matchingMode === 'select' && (
                  <div className="mb-4">
                    <h4 className="font-medium mb-2">점심 메이트 선택</h4>
                    <p className="text-sm text-gray-600">
                      원하는 그룹 크기를 선택한 후, 함께 점심 먹을 메이트들을 클릭해주세요!
                    </p>
                  </div>
                )}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="text-sm text-gray-600">그룹 크기: {matchedUsers.length}/{maxGroupSize}</p>
                      {matchedUsers.length >= maxGroupSize && (
                        <p className="text-xs text-orange-600 mt-1">
                          최대 그룹 크기에 도달했습니다. 더 선택하려면 그룹 크기를 늘려주세요.
                        </p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setMaxGroupSize(Math.max(1, maxGroupSize - 1))}
                        disabled={maxGroupSize <= 1}
                      >
                        -
                      </Button>
                      <span className="px-2 py-1 text-sm">{maxGroupSize}</span>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setMaxGroupSize(Math.min(8, maxGroupSize + 1))}
                        disabled={maxGroupSize >= 8}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                  <div className="flex gap-2 mb-3">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setMaxGroupSize(2)}
                      className={maxGroupSize === 2 ? 'bg-primary text-white' : ''}
                    >
                      2명 그룹
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setMaxGroupSize(3)}
                      className={maxGroupSize === 3 ? 'bg-primary text-white' : ''}
                    >
                      3명 그룹
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setMaxGroupSize(4)}
                      className={maxGroupSize === 4 ? 'bg-primary text-white' : ''}
                    >
                      4명 그룹
                    </Button>
                  </div>
                  {matchedUsers.length > 0 && (
                    <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
                      <p className="text-sm font-medium text-primary mb-2">
                        선택된 메이트 ({matchedUsers.length}명)
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {matchedUsers.map((user) => (
                          <Badge key={user.id} variant="default" className="text-xs">
                            {user.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {availableUsers.map((user) => {
                    const isSelected = matchedUsers.find(u => u.id === user.id);
                    const isDisabled = !isSelected && matchedUsers.length >= maxGroupSize;
                    return (
                      <div 
                        key={user.id}
                        className={`p-4 border rounded-lg transition-all hover-lift ${
                          isSelected 
                            ? 'border-primary bg-primary/5 shadow-md' 
                            : isDisabled
                            ? 'border-gray-200 bg-gray-50 opacity-60'
                            : 'hover:border-primary/50 hover:shadow-sm'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <Checkbox
                            checked={!!isSelected}
                            onCheckedChange={(checked) => {
                              if (!isDisabled && typeof checked === 'boolean') {
                                selectUser(user, checked);
                              }
                            }}
                            disabled={isDisabled}
                          />
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
                          <div className="text-right">
                            <Badge 
                              variant={user.status === 'available' ? 'default' : 'secondary'}
                              className="text-xs mb-1"
                            >
                              {user.status === 'available' ? '가능' : '식사중'}
                            </Badge>
                            {isDisabled && !isSelected && (
                              <div className="text-gray-400 text-xs">그룹 가득참</div>
                            )}
                          </div>
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
                    );
                  })}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MatchingSystem;
