
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { UserPlus, Users, Star, MessageCircle, UserMinus, Search, Send } from 'lucide-react';

interface Friend {
  id: string;
  name: string;
  avatar: string;
  department: string;
  compatibility: number;
  lastMeal: string;
  totalMeals: number;
  status: 'online' | 'offline' | 'eating';
  dietType: string;
}

interface FriendRequest {
  id: string;
  from: string;
  avatar: string;
  department: string;
  message: string;
  timestamp: string;
}

const FriendsList = () => {
  const [friends, setFriends] = useState<Friend[]>([
    {
      id: '1',
      name: '오일남',
      avatar: '👨‍💻',
      department: '개발팀',
      compatibility: 95,
      lastMeal: '어제',
      totalMeals: 12,
      status: 'online',
      dietType: '건강식 선호'
    },
    {
      id: '2',
      name: '오이녀',
      avatar: '👩‍💼',
      department: '기획팀',
      compatibility: 88,
      lastMeal: '3일 전',
      totalMeals: 8,
      status: 'eating',
      dietType: '채식주의자'
    },
    {
      id: '3',
      name: '오삼남',
      avatar: '👨‍💼',
      department: '마케팅팀',
      compatibility: 82,
      lastMeal: '일주일 전',
      totalMeals: 5,
      status: 'offline',
      dietType: '단백질 위주'
    }
  ]);

  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([
    {
      id: '1',
      from: '오사남',
      avatar: '👨‍🔧',
      department: '영업팀',
      message: '같이 식사한 적이 있는데, 친구 신청드려요!',
      timestamp: '2시간 전'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'friends' | 'requests' | 'search'>('friends');

  const handleAcceptRequest = (requestId: string) => {
    const request = friendRequests.find(r => r.id === requestId);
    if (request) {
      const newFriend: Friend = {
        id: Date.now().toString(),
        name: request.from,
        avatar: request.avatar,
        department: request.department,
        compatibility: 75,
        lastMeal: '없음',
        totalMeals: 0,
        status: 'online',
        dietType: '아무거나 잘 먹음'
      };
      setFriends([...friends, newFriend]);
      setFriendRequests(friendRequests.filter(r => r.id !== requestId));
    }
  };

  const handleRejectRequest = (requestId: string) => {
    setFriendRequests(friendRequests.filter(r => r.id !== requestId));
  };

  const handleRemoveFriend = (friendId: string) => {
    setFriends(friends.filter(f => f.id !== friendId));
  };

  const handleInviteFriend = (friendId: string) => {
    const friend = friends.find(f => f.id === friendId);
    if (friend) {
      alert(`${friend.name}님에게 점심 초대를 보냈습니다!`);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-500';
      case 'eating': return 'text-orange-500';
      case 'offline': return 'text-gray-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'online': return '온라인';
      case 'eating': return '식사중';
      case 'offline': return '오프라인';
      default: return '알 수 없음';
    }
  };

  const suggestedFriends = [
    { id: '1', name: '오오남', avatar: '👨‍🎨', department: '디자인팀', reason: '비슷한 식사 시간' },
    { id: '2', name: '오육녀', avatar: '👩‍🔬', department: '연구팀', reason: '같은 건물 근무' },
    { id: '3', name: '오칠남', avatar: '👨‍🏫', department: '교육팀', reason: '건강식 선호' }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5 text-primary" />
            친구 관리
          </CardTitle>
          <div className="flex gap-2">
            <Button 
              variant={activeTab === 'friends' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setActiveTab('friends')}
            >
              내 친구 ({friends.length})
            </Button>
            <Button 
              variant={activeTab === 'requests' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setActiveTab('requests')}
            >
              친구 요청 ({friendRequests.length})
            </Button>
            <Button 
              variant={activeTab === 'search' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setActiveTab('search')}
            >
              친구 찾기
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {activeTab === 'friends' && (
            <div className="space-y-4">
              {friends.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">아직 친구가 없습니다.</p>
                  <p className="text-sm text-gray-400 mt-1">함께 식사한 사람들과 친구가 되어보세요!</p>
                </div>
              ) : (
                friends.map((friend) => (
                  <div key={friend.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="text-lg">{friend.avatar}</AvatarFallback>
                        </Avatar>
                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                          friend.status === 'online' ? 'bg-green-500' : 
                          friend.status === 'eating' ? 'bg-orange-500' : 'bg-gray-400'
                        }`}></div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{friend.name}</h3>
                          <Badge variant="outline" className="text-xs">{friend.department}</Badge>
                          <span className={`text-xs ${getStatusColor(friend.status)}`}>
                            {getStatusText(friend.status)}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 text-yellow-500" />
                            <span>궁합 {friend.compatibility}%</span>
                          </div>
                          <span>함께한 식사: {friend.totalMeals}회</span>
                          <span>최근: {friend.lastMeal}</span>
                        </div>
                        <div className="mt-1">
                          <Badge variant="secondary" className="text-xs">{friend.dietType}</Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleInviteFriend(friend.id)}
                        disabled={friend.status === 'eating'}
                      >
                        <Send className="h-3 w-3 mr-1" />
                        초대
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                      >
                        <MessageCircle className="h-3 w-3 mr-1" />
                        채팅
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleRemoveFriend(friend.id)}
                      >
                        <UserMinus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'requests' && (
            <div className="space-y-4">
              {friendRequests.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">새로운 친구 요청이 없습니다.</p>
                </div>
              ) : (
                friendRequests.map((request) => (
                  <div key={request.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>{request.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{request.from}</h3>
                          <Badge variant="outline" className="text-xs">{request.department}</Badge>
                          <p className="text-xs text-gray-500 mt-1">{request.timestamp}</p>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{request.message}</p>
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => handleAcceptRequest(request.id)}>
                        수락
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleRejectRequest(request.id)}>
                        거절
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'search' && (
            <div className="space-y-4">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="이름으로 검색..."
                    className="pl-10"
                  />
                </div>
                <Button variant="outline">검색</Button>
              </div>

              <div>
                <h4 className="font-medium mb-3">추천 친구</h4>
                <div className="space-y-3">
                  {suggestedFriends.map((person) => (
                    <div key={person.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>{person.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{person.name}</h3>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">{person.department}</Badge>
                            <span className="text-xs text-gray-500">{person.reason}</span>
                          </div>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        <UserPlus className="h-3 w-3 mr-1" />
                        친구 추가
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FriendsList;
