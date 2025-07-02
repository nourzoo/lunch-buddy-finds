import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Send, Users, MapPin, Clock, Utensils } from 'lucide-react';

interface ChatMessage {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  message: string;
  timestamp: Date;
  type: 'text' | 'location' | 'restaurant' | 'system';
}

interface GroupChatProps {
  matchedUsers: Array<{
    id: string;
    name: string;
    role: string;
    avatar: string;
  }>;
  onClose: () => void;
}

const GroupChat = ({ matchedUsers, onClose }: GroupChatProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      userId: 'system',
      userName: '시스템',
      userAvatar: '🤖',
      message: `${matchedUsers.map(u => u.name).join(', ')}님이 그룹 채팅을 시작했습니다!`,
      timestamp: new Date(),
      type: 'system'
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const message: ChatMessage = {
      id: Date.now().toString(),
      userId: 'me',
      userName: '나',
      userAvatar: '👤',
      message: newMessage,
      timestamp: new Date(),
      type: 'text'
    };

    setMessages([...messages, message]);
    setNewMessage('');
    setIsTyping(true);

    // 다른 사용자들의 응답 시뮬레이션
    setTimeout(() => {
      const responses = [
        '좋아요! 어디로 갈까요?',
        '저도 괜찮아요 😊',
        '맛있는 곳 추천해주세요!',
        '빨리 가요 배고파요 😋'
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      const randomUser = matchedUsers[Math.floor(Math.random() * matchedUsers.length)];

      const responseMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        userId: randomUser.id,
        userName: randomUser.name,
        userAvatar: randomUser.avatar,
        message: randomResponse,
        timestamp: new Date(),
        type: 'text'
      };

      setMessages(prev => [...prev, responseMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const shareLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const locationMessage: ChatMessage = {
            id: Date.now().toString(),
            userId: 'me',
            userName: '나',
            userAvatar: '👤',
            message: `📍 내 위치: ${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`,
            timestamp: new Date(),
            type: 'location'
          };
          setMessages([...messages, locationMessage]);
        },
        () => {
          alert('위치를 가져올 수 없습니다.');
        }
      );
    }
  };

  const suggestRestaurant = () => {
    const restaurants = ['샐러드야', '놀링파스타', '푸근한한식집', '라멘이지예'];
    const randomRestaurant = restaurants[Math.floor(Math.random() * restaurants.length)];
    
    const restaurantMessage: ChatMessage = {
      id: Date.now().toString(),
      userId: 'me',
      userName: '나',
      userAvatar: '👤',
      message: `🍽️ ${randomRestaurant} 어때요?`,
      timestamp: new Date(),
      type: 'restaurant'
    };
    setMessages([...messages, restaurantMessage]);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ko-KR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            그룹 채팅 ({matchedUsers.length}명)
          </CardTitle>
          <Button variant="outline" size="sm" onClick={onClose}>
            닫기
          </Button>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Clock className="h-4 w-4" />
          <span>점심시간: 12:00-13:00</span>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0">
        {/* 참여자 목록 */}
        <div className="px-6 py-3 bg-gray-50 border-b">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">참여자:</span>
            {matchedUsers.map((user) => (
              <Badge key={user.id} variant="secondary" className="flex items-center gap-1">
                <Avatar className="h-4 w-4">
                  <AvatarFallback className="text-xs">{user.avatar}</AvatarFallback>
                </Avatar>
                {user.name}
              </Badge>
            ))}
          </div>
        </div>

        {/* 메시지 영역 */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${
                message.userId === 'me' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              <Avatar className="h-8 w-8">
                <AvatarFallback className="text-sm">
                  {message.userAvatar}
                </AvatarFallback>
              </Avatar>
              <div
                className={`max-w-[70%] ${
                  message.userId === 'me'
                    ? 'bg-primary text-primary-foreground'
                    : message.type === 'system'
                    ? 'bg-gray-100 text-gray-600'
                    : 'bg-gray-200'
                } rounded-lg p-3`}
              >
                {message.type !== 'system' && (
                  <div className="text-xs font-medium mb-1">
                    {message.userName}
                  </div>
                )}
                <div className="text-sm">{message.message}</div>
                <div className="text-xs opacity-70 mt-1">
                  {formatTime(message.timestamp)}
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex gap-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="text-sm">👤</AvatarFallback>
              </Avatar>
              <div className="bg-gray-200 rounded-lg p-3">
                <div className="text-sm">입력 중...</div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* 빠른 액션 버튼 */}
        <div className="px-4 py-2 bg-gray-50 border-t">
          <div className="flex gap-2 mb-2">
            <Button
              variant="outline"
              size="sm"
              onClick={shareLocation}
              className="text-xs"
            >
              <MapPin className="h-3 w-3 mr-1" />
              위치 공유
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={suggestRestaurant}
              className="text-xs"
            >
              <Utensils className="h-3 w-3 mr-1" />
              식당 추천
            </Button>
          </div>
        </div>

        {/* 메시지 입력 */}
        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="메시지를 입력하세요..."
              className="flex-1"
            />
            <Button onClick={sendMessage} disabled={!newMessage.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GroupChat; 