
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';
import { Clock, Users, MessageCircle, UserCheck, Shuffle, X, Filter, Settings } from 'lucide-react';
import GroupChat from './GroupChat';
import MatchingConditionsDialog from './MatchingConditionsDialog';

interface User {
  id: string;
  name: string;
  role: string;
  lunchTime: string;
  interests: string[];
  avatar: string;
  status: 'available' | 'matched' | 'eating';
  selected?: boolean;
  ageGroup: string;
  gender: string;
  location: string;
  eatingStyle: string;
  allergies: string[];
  dislikes: string[];
  dietType: string;
}

interface MatchingSystemProps {
  preferences: any;
  matchingMode: 'solo' | 'select' | 'random';
}

interface MatchingConditions {
  ageGroups: string[];
  gender: string;
  location: string[];
  eatingStyle: string[];
}

const MatchingSystem = ({ preferences, matchingMode }: MatchingSystemProps) => {
  const [availableUsers, setAvailableUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]); // 선택된 사용자 ID들
  const [matchedUsers, setMatchedUsers] = useState<User[]>([]);
  const [matchingStatus, setMatchingStatus] = useState<'idle' | 'searching' | 'matched'>('idle');
  const [maxGroupSize, setMaxGroupSize] = useState(3);
  const [showGroupChat, setShowGroupChat] = useState(false);
  const [showConditionsDialog, setShowConditionsDialog] = useState(false);
  const [matchingConditions, setMatchingConditions] = useState<MatchingConditions>({
    ageGroups: [],
    gender: '상관없음',
    location: [],
    eatingStyle: []
  });

  const mockUsers: User[] = [
    {
      id: '1',
      name: '오일남',
      role: '개발팀',
      lunchTime: '12:00-13:00',
      interests: ['이탈리안', '샐러드/건강식', '카페'],
      avatar: '👨‍💻',
      status: 'available',
      ageGroup: '20대',
      gender: '남성',
      location: '강남 근처',
      eatingStyle: '조용한 식사 선호',
      allergies: ['견과류'],
      dislikes: ['매운음식'],
      dietType: '건강식 선호'
    },
    {
      id: '2',
      name: '오이남',
      role: '디자인팀',
      lunchTime: '12:30-13:30',
      interests: ['일식/라멘', '카페', '트렌디'],
      avatar: '👨‍🎨',
      status: 'available',
      ageGroup: '30대',
      gender: '남성',
      location: '내 위치 반경 3km',
      eatingStyle: '말 많은 사람',
      allergies: [],
      dislikes: ['생선'],
      dietType: '아무거나 잘 먹음'
    },
    {
      id: '3',
      name: '오삼남',
      role: '마케팅팀',
      lunchTime: '11:30-12:30',
      interests: ['한정식', '도시락/간편식', '혼밥'],
      avatar: '👨‍💼',
      status: 'available',
      ageGroup: '40대 이상',
      gender: '남성',
      location: '같은 건물',
      eatingStyle: '빠른 식사 선호',
      allergies: ['갑각류'],
      dislikes: [],
      dietType: '단백질 위주'
    },
    {
      id: '4',
      name: '오사남',
      role: '영업팀',
      lunchTime: '12:00-13:00',
      interests: ['샐러드/건강식', '한정식', '건강식'],
      avatar: '👨‍🔧',
      status: 'available',
      ageGroup: '30대',
      gender: '남성',
      location: '도보 10분 이내',
      eatingStyle: '맛집 탐방 좋아함',
      allergies: [],
      dislikes: ['매운음식'],
      dietType: '다이어트 중'
    },
    {
      id: '5',
      name: '오일녀',
      role: '기획팀',
      lunchTime: '12:15-13:15',
      interests: ['베트남음식', '샌드위치', '디저트'],
      avatar: '👩‍💼',
      status: 'available',
      ageGroup: '20대',
      gender: '여성',
      location: '강남 근처',
      eatingStyle: '말 많은 사람',
      allergies: ['유제품'],
      dislikes: ['내장류'],
      dietType: '채식주의자'
    },
    {
      id: '6',
      name: '오이녀',
      role: '인사팀',
      lunchTime: '11:45-12:45',
      interests: ['중식', '분식', '커피'],
      avatar: '👩‍💻',
      status: 'available',
      ageGroup: '30대',
      gender: '여성',
      location: '내 위치 반경 3km',
      eatingStyle: '조용한 식사 선호',
      allergies: [],
      dislikes: ['향신료'],
      dietType: '아무거나 잘 먹음'
    },
    {
      id: '7',
      name: '오삼녀',
      role: '재무팀',
      lunchTime: '12:45-13:45',
      interests: ['양식', '샐러드/건강식', '주스'],
      avatar: '👩‍🎨',
      status: 'available',
      ageGroup: '20대',
      gender: '여성',
      location: '같은 건물',
      eatingStyle: '맛집 탐방 좋아함',
      allergies: ['계란'],
      dislikes: [],
      dietType: '건강식 선호'
    },
    {
      id: '8',
      name: '오사녀',
      role: '고객지원팀',
      lunchTime: '12:30-13:30',
      interests: ['한식', '국밥', '차'],
      avatar: '👩‍🔧',
      status: 'available',
      ageGroup: '40대 이상',
      gender: '여성',
      location: '도보 10분 이내',
      eatingStyle: '빠른 식사 선호',
      allergies: ['대두'],
      dislikes: ['파'],
      dietType: '단백질 위주'
    }
  ];

  useEffect(() => {
    if (matchingMode !== 'solo') {
      setAvailableUsers(mockUsers);
    } else {
      setAvailableUsers([]);
      setMatchedUsers([]);
      setSelectedUsers([]);
    }
  }, [matchingMode]);

  // selectedUsers가 변경될 때마다 matchedUsers 업데이트
  useEffect(() => {
    const matched = availableUsers.filter(user => selectedUsers.includes(user.id));
    setMatchedUsers(matched);
    setMatchingStatus(matched.length > 0 ? 'matched' : 'idle');
  }, [selectedUsers, availableUsers]);

  const filterUsersByConditions = (users: User[]): User[] => {
    return users.filter(user => {
      // 나이대 필터
      if (matchingConditions.ageGroups.length > 0 && !matchingConditions.ageGroups.includes(user.ageGroup)) {
        return false;
      }
      
      // 성별 필터
      if (matchingConditions.gender !== '상관없음' && user.gender !== matchingConditions.gender) {
        return false;
      }
      
      // 위치 필터
      if (matchingConditions.location.length > 0 && !matchingConditions.location.includes(user.location)) {
        return false;
      }
      
      // 식사 스타일 필터
      if (matchingConditions.eatingStyle.length > 0 && !matchingConditions.eatingStyle.includes(user.eatingStyle)) {
        return false;
      }
      
      return true;
    });
  };

  const startRandomMatching = () => {
    setMatchingStatus('searching');
    setTimeout(() => {
      const filteredUsers = filterUsersByConditions(availableUsers);
      const shuffledUsers = [...filteredUsers].sort(() => Math.random() - 0.5);
      const selectedUserIds = shuffledUsers.slice(0, Math.min(maxGroupSize, shuffledUsers.length)).map(u => u.id);
      setSelectedUsers(selectedUserIds);
      setMatchingStatus('matched');
    }, 2000);
  };

  const handleUserSelect = (userId: string, checked: boolean) => {
    console.log('handleUserSelect 호출:', userId, checked, '현재 선택된 수:', selectedUsers.length, '최대:', maxGroupSize);
    
    if (checked) {
      if (selectedUsers.length < maxGroupSize) {
        const newSelectedUsers = [...selectedUsers, userId];
        console.log('사용자 추가:', newSelectedUsers);
        setSelectedUsers(newSelectedUsers);
      } else {
        console.log('그룹 크기 초과');
        alert(`최대 ${maxGroupSize}명까지만 선택할 수 있습니다.`);
        return false;
      }
    } else {
      const newSelectedUsers = selectedUsers.filter(id => id !== userId);
      console.log('사용자 제거:', newSelectedUsers);
      setSelectedUsers(newSelectedUsers);
    }
    return true;
  };

  const removeUser = (userId: string) => {
    const newSelectedUsers = selectedUsers.filter(id => id !== userId);
    setSelectedUsers(newSelectedUsers);
  };

  const cancelMatching = () => {
    setSelectedUsers([]);
    setMatchedUsers([]);
    setMatchingStatus('idle');
    setShowGroupChat(false);
  };

  const startGroupChat = () => {
    if (matchedUsers.length === 0) {
      alert('그룹채팅을 시작하려면 최소 1명 이상의 메이트를 선택해주세요.');
      return;
    }
    console.log('그룹채팅 시작:', matchedUsers.map(u => u.name));
    setShowGroupChat(true);
  };

  const handleConditionsApply = (conditions: MatchingConditions) => {
    setMatchingConditions(conditions);
  };

  const getActiveConditionsCount = () => {
    let count = 0;
    if (matchingConditions.ageGroups.length > 0) count++;
    if (matchingConditions.gender !== '상관없음') count++;
    if (matchingConditions.location.length > 0) count++;
    if (matchingConditions.eatingStyle.length > 0) count++;
    return count;
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
    console.log('그룹채팅 렌더링:', matchedUsers.map(u => u.name));
    return (
      <GroupChat 
        matchedUsers={matchedUsers}
        onClose={() => {
          console.log('그룹채팅 닫기');
          setShowGroupChat(false);
        }}
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
                    {/* 상대방 알러지 정보 표시 */}
                    {user.allergies.length > 0 && (
                      <div className="mt-2">
                        <p className="text-xs text-red-600 font-medium">
                          ⚠️ {user.name}님은 {user.allergies.join(', ')}을(를) 못 먹어요
                        </p>
                      </div>
                    )}
                    {user.dislikes.length > 0 && (
                      <div className="mt-1">
                        <p className="text-xs text-orange-600">
                          🚫 기피: {user.dislikes.join(', ')}
                        </p>
                      </div>
                    )}
                    <Badge variant="outline" className="text-xs mt-1">
                      {user.dietType}
                    </Badge>
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
                  <Button 
                    className="flex-1" 
                    onClick={startGroupChat}
                    disabled={matchedUsers.length === 0}
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    그룹 채팅 시작 ({matchedUsers.length}명)
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
                <div className="flex justify-center gap-3 mb-4">
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
                  <Button 
                    variant="outline"
                    onClick={() => setShowConditionsDialog(true)}
                    className="relative"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    조건 설정
                    {getActiveConditionsCount() > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs">
                        {getActiveConditionsCount()}
                      </Badge>
                    )}
                  </Button>
                </div>
                
                {getActiveConditionsCount() > 0 && (
                  <div className="p-3 bg-blue-50 rounded-lg mb-4">
                    <p className="text-sm font-medium text-blue-800 mb-2">활성 조건:</p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {matchingConditions.ageGroups.map(age => (
                        <Badge key={age} variant="outline" className="text-xs">{age}</Badge>
                      ))}
                      {matchingConditions.gender !== '상관없음' && (
                        <Badge variant="outline" className="text-xs">{matchingConditions.gender}</Badge>
                      )}
                      {matchingConditions.location.map(loc => (
                        <Badge key={loc} variant="outline" className="text-xs">{loc}</Badge>
                      ))}
                      {matchingConditions.eatingStyle.map(style => (
                        <Badge key={style} variant="outline" className="text-xs">{style}</Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                <p className="text-sm text-gray-500">
                  {getActiveConditionsCount() > 0 
                    ? '설정된 조건에 맞는 동료와 자동 매칭'
                    : '비슷한 점심시간을 가진 동료와 자동 매칭'
                  }
                </p>
              </div>
            )}

            {(matchingMode === 'select' || matchingMode === 'random') && (
              <div className={matchingMode === 'random' ? 'border-t pt-6' : ''}>
                {matchingMode === 'random' && <h4 className="font-medium mb-4">또는 직접 선택하기</h4>}
                {matchingMode === 'select' && (
                  <div className="mb-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium mb-2">점심 메이트 선택</h4>
                        <p className="text-sm text-gray-600">
                          원하는 그룹 크기를 선택한 후, 함께 점심 먹을 메이트들을 클릭해주세요!
                        </p>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setShowConditionsDialog(true)}
                        className="relative"
                      >
                        <Filter className="h-4 w-4 mr-1" />
                        필터
                        {getActiveConditionsCount() > 0 && (
                          <Badge className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 text-xs">
                            {getActiveConditionsCount()}
                          </Badge>
                        )}
                      </Button>
                    </div>
                  </div>
                )}
                
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="text-sm text-gray-600">그룹 크기: {selectedUsers.length}/{maxGroupSize}</p>
                      {selectedUsers.length >= maxGroupSize && (
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
                  {selectedUsers.length > 0 && (
                    <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
                      <p className="text-sm font-medium text-primary mb-2">
                        선택된 메이트 ({selectedUsers.length}명)
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {matchedUsers.map((user) => (
                          <Badge key={user.id} variant="default" className="text-xs flex items-center gap-1">
                            <span>{user.avatar}</span>
                            {user.name}
                            <button
                              onClick={() => removeUser(user.id)}
                              className="ml-1 hover:bg-primary/20 rounded-full w-4 h-4 flex items-center justify-center text-xs"
                            >
                              ×
                            </button>
                          </Badge>
                        ))}
                      </div>
                      <div className="mt-2">
                        <Button 
                          size="sm" 
                          onClick={startGroupChat}
                          className="w-full"
                        >
                          <MessageCircle className="h-3 w-3 mr-1" />
                          그룹 채팅 시작
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filterUsersByConditions(availableUsers).map((user) => {
                    const isSelected = selectedUsers.includes(user.id);
                    return (
                      <div 
                        key={user.id}
                        className={`p-4 border rounded-lg transition-all hover-lift ${
                          isSelected 
                            ? 'border-primary bg-primary/5 shadow-md' 
                            : 'hover:border-primary/50 hover:shadow-sm'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <Checkbox
                            checked={isSelected}
                            onCheckedChange={(checked) => {
                              console.log('체크박스 클릭:', user.name, checked);
                              if (typeof checked === 'boolean') {
                                handleUserSelect(user.id, checked);
                              }
                            }}
                            disabled={selectedUsers.length >= maxGroupSize && !isSelected}
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
                            {/* 알러지 정보 표시 */}
                            {user.allergies.length > 0 && (
                              <div className="mt-1">
                                {user.allergies.map(allergy => (
                                  <Badge key={allergy} variant="destructive" className="text-xs mr-1">
                                    ⚠️ {allergy}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>
                          <div className="text-right">
                            <Badge 
                              variant={user.status === 'available' ? 'default' : 'secondary'}
                              className="text-xs mb-1"
                            >
                              {user.status === 'available' ? '가능' : '식사중'}
                            </Badge>
                            <div className="text-xs text-gray-500">
                              {user.ageGroup} · {user.gender}
                            </div>
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
      
      <MatchingConditionsDialog
        isOpen={showConditionsDialog}
        onClose={() => setShowConditionsDialog(false)}
        onApply={handleConditionsApply}
        currentConditions={matchingConditions}
      />
    </div>
  );
};

export default MatchingSystem;
