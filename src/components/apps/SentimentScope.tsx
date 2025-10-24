import { Smile, Frown, Meh, TrendingDown, AlertTriangle } from 'lucide-react';
import { MetricCard } from '../int-os/MetricCard';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Alert, AlertDescription } from '../ui/alert';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

export function SentimentScope() {
  const sentimentData = Array.from({ length: 24 }, (_, i) => ({
    hour: `${i}:00`,
    positive: Math.floor(Math.random() * 30) + 50,
    neutral: Math.floor(Math.random() * 20) + 20,
    negative: Math.floor(Math.random() * 15) + 5,
  }));

  const topicsData = [
    { topic: 'Product Quality', positive: 85, negative: 15, total: 247 },
    { topic: 'Customer Support', positive: 92, negative: 8, total: 189 },
    { topic: 'Pricing', positive: 67, negative: 33, total: 156 },
    { topic: 'Delivery Speed', positive: 78, negative: 22, total: 134 },
    { topic: 'User Interface', positive: 88, negative: 12, total: 98 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="mb-6">SentimentScope</h1>
        
        {/* Alert for sentiment dip */}
        <Alert className="mb-6 bg-[#E74C3C]/10 border-[#E74C3C]/30">
          <AlertTriangle className="h-4 w-4 text-[#E74C3C]" />
          <AlertDescription className="text-[#E74C3C]">
            <strong>Sentiment Alert:</strong> Negative sentiment increased by 12% in the last hour. 
            Primary concern: "Pricing" topic.
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            label="Overall Sentiment"
            value="82%"
            change="-3%"
            trend="down"
            icon={<Smile className="w-5 h-5" />}
          />
          <MetricCard
            label="Positive Mentions"
            value="1,847"
            change="+8%"
            trend="up"
            icon={<Smile className="w-5 h-5" />}
          />
          <MetricCard
            label="Neutral"
            value="423"
            change="+2%"
            trend="neutral"
            icon={<Meh className="w-5 h-5" />}
          />
          <MetricCard
            label="Negative"
            value="127"
            change="+12%"
            trend="down"
            icon={<Frown className="w-5 h-5" />}
          />
        </div>
      </div>

      <Card className="p-6 card-gradient border-white/10">
        <h3 className="text-lg font-medium mb-4">24-Hour Sentiment Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={sentimentData}>
            <defs>
              <linearGradient id="colorPositive" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2ECC71" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#2ECC71" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorNegative" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#E74C3C" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#E74C3C" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="hour" stroke="#A8B2C1" />
            <YAxis stroke="#A8B2C1" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#172235',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
              }}
            />
            <Area
              type="monotone"
              dataKey="positive"
              stroke="#2ECC71"
              strokeWidth={2}
              fill="url(#colorPositive)"
            />
            <Area
              type="monotone"
              dataKey="negative"
              stroke="#E74C3C"
              strokeWidth={2}
              fill="url(#colorNegative)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 card-gradient border-white/10">
          <h3 className="text-lg font-medium mb-4">Sentiment by Topic</h3>
          <div className="space-y-4">
            {topicsData.map((topic) => (
              <div key={topic.topic}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{topic.topic}</span>
                  <span className="text-xs text-[#A8B2C1]">{topic.total} mentions</span>
                </div>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#2ECC71]"
                        style={{ width: `${topic.positive}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex gap-2 text-xs">
                    <span className="text-[#2ECC71]">{topic.positive}%</span>
                    <span className="text-[#E74C3C]">{topic.negative}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 card-gradient border-white/10">
          <h3 className="text-lg font-medium mb-4">Recent Feedback</h3>
          <div className="space-y-3">
            {[
              { text: 'Love the new dashboard! So much easier to use.', sentiment: 'positive' },
              { text: 'Response time has been excellent lately.', sentiment: 'positive' },
              { text: 'The pricing seems a bit high for what we get.', sentiment: 'negative' },
              { text: 'Integration with our tools works perfectly.', sentiment: 'positive' },
            ].map((feedback, i) => (
              <div
                key={i}
                className="p-3 bg-white/5 border border-white/10 rounded-lg"
              >
                <div className="flex items-start gap-3">
                  {feedback.sentiment === 'positive' ? (
                    <Smile className="w-4 h-4 text-[#2ECC71] flex-shrink-0 mt-0.5" />
                  ) : (
                    <Frown className="w-4 h-4 text-[#E74C3C] flex-shrink-0 mt-0.5" />
                  )}
                  <p className="text-sm flex-1">{feedback.text}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
