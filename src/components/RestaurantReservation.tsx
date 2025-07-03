
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, Clock, Users, Phone, CheckCircle, X } from 'lucide-react';

interface Restaurant {
  id: string;
  name: string;
  image: string;
}

interface RestaurantReservationProps {
  restaurant: Restaurant;
  onClose: () => void;
  onSuccess: () => void;
}

const RestaurantReservation = ({ restaurant, onClose, onSuccess }: RestaurantReservationProps) => {
  const [reservationData, setReservationData] = useState({
    date: '',
    time: '',
    people: '2',
    name: '최승연',
    phone: '010-1234-5678',
    requests: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const timeSlots = [
    '11:30', '12:00', '12:30', '13:00', '13:30', '14:00'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 예약 처리 시뮬레이션
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        onSuccess();
      }, 2000);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <Card className="max-w-md mx-auto">
        <CardContent className="text-center py-8">
          <div className="text-6xl mb-4">🎉</div>
          <div className="text-green-600 mb-2">
            <CheckCircle className="h-6 w-6 mx-auto mb-2" />
            <h3 className="text-lg font-semibold">예약 완료!</h3>
          </div>
          <p className="text-gray-600 mb-4">
            {restaurant.name} 예약이 성공적으로 완료되었습니다.
          </p>
          <div className="text-sm text-gray-500 space-y-1">
            <p>📅 {reservationData.date}</p>
            <p>🕐 {reservationData.time}</p>
            <p>👥 {reservationData.people}명</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <div className="text-2xl">{restaurant.image}</div>
            <div>
              <h3 className="font-semibold">{restaurant.name}</h3>
              <p className="text-sm text-gray-600">테이블 예약</p>
            </div>
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                날짜
              </Label>
              <Input
                id="date"
                type="date"
                value={reservationData.date}
                onChange={(e) => setReservationData(prev => ({ ...prev, date: e.target.value }))}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>
            <div>
              <Label htmlFor="time" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                시간
              </Label>
              <Select 
                value={reservationData.time} 
                onValueChange={(value) => setReservationData(prev => ({ ...prev, time: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="시간 선택" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((time) => (
                    <SelectItem key={time} value={time}>{time}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="people" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              인원
            </Label>
            <Select 
              value={reservationData.people} 
              onValueChange={(value) => setReservationData(prev => ({ ...prev, people: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1명</SelectItem>
                <SelectItem value="2">2명</SelectItem>
                <SelectItem value="3">3명</SelectItem>
                <SelectItem value="4">4명</SelectItem>
                <SelectItem value="5">5명 이상</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="name">예약자명</Label>
            <Input
              id="name"
              value={reservationData.name}
              onChange={(e) => setReservationData(prev => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>

          <div>
            <Label htmlFor="phone" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              연락처
            </Label>
            <Input
              id="phone"
              type="tel"
              value={reservationData.phone}
              onChange={(e) => setReservationData(prev => ({ ...prev, phone: e.target.value }))}
              required
            />
          </div>

          <div>
            <Label htmlFor="requests">요청사항</Label>
            <Textarea
              id="requests"
              value={reservationData.requests}
              onChange={(e) => setReservationData(prev => ({ ...prev, requests: e.target.value }))}
              placeholder="특별한 요청사항이 있으시면 입력해주세요"
              rows={3}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button 
              type="submit" 
              disabled={isSubmitting || !reservationData.date || !reservationData.time}
              className="flex-1"
            >
              {isSubmitting ? '예약 중...' : '예약하기'}
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              취소
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default RestaurantReservation;
