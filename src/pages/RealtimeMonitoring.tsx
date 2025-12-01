import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { AreaChart, Area, PieChart, Pie, Cell, ResponsiveContainer, XAxis, Tooltip } from "recharts";

// 模拟数据
const sentimentData = [
  { time: '00:00', positive: 65, neutral: 25, negative: 10 },
  { time: '04:00', positive: 62, neutral: 28, negative: 10 },
  { time: '08:00', positive: 58, neutral: 30, negative: 12 },
  { time: '12:00', positive: 50, neutral: 25, negative: 25 },
  { time: '16:00', positive: 45, neutral: 30, negative: 25 },
  { time: '20:00', positive: 52, neutral: 33, negative: 15 },
];

const platformData = [
  { name: '微博', value: 35 },
  { name: '抖音', value: 25 },
  { name: '公众号', value: 15 },
  { name: '小红书', value: 10 },
  { name: '新闻', value: 10 },
  { name: '论坛', value: 5 },
];

const trendingTopics = [
  { id: 1, topic: '#品牌邮寄问题#', sentiment: 'negative',热度: 95 },
  { id: 2, topic: '#品牌客服态度#', sentiment: 'negative',热度: 85 },
  { id: 3, topic: '#品牌新品发布#', sentiment: 'positive',热度: 78 },
  { id: 4, topic: '#品牌促销活动#', sentiment: 'neutral',热度: 65 },
	{ id: 5, topic: '#品牌质量问题#', sentiment: 'negative',热度: 55 },
	{ id: 6, topic: '#品牌退换问题#', sentiment: 'neutral',热度: 62 },
	{ id: 7, topic: '#品牌体验问题#', sentiment: 'negative',热度: 53 },
	{ id: 8, topic: '#品牌优惠问题#', sentiment: 'positive',热度: 58 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

// 动态数字组件
const AnimatedNumber = ({ value, duration = 2000 }: { value: number; duration?: number }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let startTime: number;
    let animationFrameId: number;
    
    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * value));
      
      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateCount);
      }
    };
    
    animationFrameId = requestAnimationFrame(updateCount);
    
    return () => cancelAnimationFrame(animationFrameId);
  }, [value, duration]);
  
  return <span>{count}</span>;
};

// 主组件
export default function RealtimeMonitoring() {
  // 模拟数据刷新
  const [refreshing, setRefreshing] = useState(false);
  
  const refreshData = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };
  
  useEffect(() => {
    // 定期自动刷新数据
    const interval = setInterval(refreshData, 8000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <Layout 
      title="实时舆情监控" 
      color="text-cyan-400" 
      currentPath="/realtime-monitoring"
    >
      <motion.button
        className="md:hidden mb-6 px-5 py-3 text-sm bg-cyan-900/50 hover:bg-cyan-800/50 rounded-full flex items-center justify-center gap-2 border-2 border-cyan-700 w-full"
        whileTap={{ scale: 0.95 }}
        onClick={refreshData}
      >
        <span className={`${refreshing ? 'animate-spin' : ''}`}>↻</span>
        <span className="font-medium">刷新数据</span>
      </motion.button>
      
      {/* 统计数据卡片 - 响应式网格 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        <motion.div 
          className="bg-gray-800/60 backdrop-blur-sm p-4 md:p-5 rounded-xl border-2 border-gray-700 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ y: -4, boxShadow: "0 10px 30px rgba(0, 200, 255, 0.3)" }}
        >
          <p className="text-gray-400 text-sm mb-3">监测帖子</p>
          <div className="flex items-end gap-2">
            <p className="text-3xl font-bold text-white"><AnimatedNumber value={12580} /></p>
            <p className="text-sm text-green-400 mb-1">↑ 12%</p>
          </div>
        </motion.div>
        
        <motion.div 
          className="bg-gray-800/60 backdrop-blur-sm p-4 md:p-5 rounded-xl border-2 border-gray-700 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          whileHover={{ y: -4, boxShadow: "0 10px 30px rgba(0, 200, 255, 0.3)" }}
        >
          <p className="text-gray-400 text-sm mb-3">活跃平台</p>
          <div className="flex items-end gap-2">
            <p className="text-3xl font-bold text-white">6</p>
            <p className="text-sm text-cyan-400 mb-1">全平台覆盖</p>
          </div>
        </motion.div>
        
        <motion.div 
          className="bg-gray-800/60 backdrop-blur-sm p-4 md:p-5 rounded-xl border-2 border-gray-700 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ y: -4, boxShadow: "0 10px 30px rgba(0, 200, 255, 0.3)" }}
        >
          <p className="text-gray-400 text-sm mb-3">负面占比</p>
          <div className="flex items-end gap-2">
            <p className="text-3xl font-bold text-red-400"><AnimatedNumber value={25} />%</p>
            <p className="text-sm text-red-400 mb-1">↑ 5%</p>
          </div>
        </motion.div>
        
        <motion.div 
          className="bg-gray-800/60 backdrop-blur-sm p-4 md:p-5 rounded-xl border-2 border-gray-700 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          whileHover={{ y: -4, boxShadow: "0 10px 30px rgba(0, 200, 255, 0.3)" }}
        >
          <p className="text-gray-400 text-sm mb-3">传播速度</p>
          <div className="flex items-end gap-2">
            <p className="text-3xl font-bold text-yellow-400">高</p>
            <p className="text-sm text-yellow-400 mb-1">1.2x 阈值</p>
          </div>
        </motion.div>
      </div>
      
      {/* 图表区域 - 响应式布局 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* 情绪波动图表 */}
        <motion.div 
          className="bg-gray-800/60 backdrop-blur-sm p-4 md:p-5 rounded-xl border-2 border-gray-700 shadow-lg h-[350px] md:h-[500px]"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="text-lg font-medium text-white mb-4">情绪波动趋势</h3>
          <ResponsiveContainer width="100%" height="88%">
            <AreaChart data={sentimentData}>
              <defs>
                <linearGradient id="colorPositive" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorNeutral" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorNegative" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="time" tick={{ fontSize: 12, fill: '#9ca3af' }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', borderRadius: '0.5rem' }}
                itemStyle={{ color: '#e5e7eb' }}
              />
              <Area type="monotone" dataKey="positive" stroke="#22c55e" fillOpacity={1} fill="url(#colorPositive)" />
              <Area type="monotone" dataKey="neutral" stroke="#3b82f6" fillOpacity={1} fill="url(#colorNeutral)" />
              <Area type="monotone" dataKey="negative" stroke="#ef4444" fillOpacity={1} fill="url(#colorNegative)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
        
        {/* 平台分布图表 */}
        <motion.div 
          className="bg-gray-800/60 backdrop-blur-sm p-4 md:p-5 rounded-xl border-2 border-gray-700 shadow-lg h-[350px] md:h-[500px]"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h3 className="text-lg font-medium text-white mb-4">平台分布</h3>
          <ResponsiveContainer width="100%" height="88%">
            <PieChart>
              <Pie
                data={platformData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelStyle={{ fontSize: '12px', fill: '#ffffff' }}
              >
                {platformData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', borderRadius: '0.5rem' }}
                itemStyle={{ color: '#e5e7eb' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
      
      {/* 热门话题 - 响应式布局 */}
      <motion.div 
        className="bg-gray-800/60 backdrop-blur-sm p-4 md:p-5 rounded-xl border-2 border-gray-700 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <h3 className="text-lg font-medium text-white mb-4">热门话题</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {trendingTopics.map((topic) => (
            <div 
              key={topic.id} 
              className="flex items-center justify-between text-sm p-3 rounded-lg bg-gray-700/50"
            >
              <div className="flex items-center gap-3">
                <span className={`w-3 h-3 rounded-full ${
                  topic.sentiment === 'positive' ? 'bg-green-400' : 
                  topic.sentiment === 'negative' ? 'bg-red-400' : 'bg-blue-400'
                }`}></span>
                <span className="text-gray-300 truncate max-w-[200px] md:max-w-[350px]">{topic.topic}</span>
              </div>
              <span className="text-yellow-400 font-semibold">热度 {topic.热度}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </Layout>
  );
}