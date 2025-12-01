import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip } from "recharts";

// 模拟数据
const riskLevelData = [
  { name: '红色警报', value: 15, color: '#ef4444' },
  { name: '橙色预警', value: 25, color: '#f97316' },
  { name: '黄色注意', value: 35, color: '#eab308' },
  { name: '蓝色正常', value: 25, color: '#3b82f6' },
];

const riskTypeData = [
  { subject: '投诉', A: 80, fullMark: 100 },
  { subject: '攻击', A: 65, fullMark: 100 },
  { subject: '谣言', A: 45, fullMark: 100 },
  { subject: '危机', A: 30, fullMark: 100 },
  { subject: '品牌事件', A: 70, fullMark: 100 },
];

const recentEvents = [
  { id: 1, title: "用户投诉产品质量问题", level: "high", time: "10分钟前", platform: "微博" },
  { id: 2, title: "竞争对手恶意抹黑", level: "medium", time: "30分钟前", platform: "抖音" },
  { id: 3, title: "不实信息在论坛传播", level: "medium", time: "1小时前", platform: "论坛" },
  { id: 4, title: "用户反馈服务态度问题", level: "low", time: "2小时前", platform: "小红书" },
];

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
export default function NegativeRecognition() {
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
      title="负面舆情识别引擎" 
      color="text-orange-400" 
      currentPath="/negative-recognition"
    >
      <motion.button
        className="md:hidden mb-6 px-5 py-3 text-sm bg-orange-900/50 hover:bg-orange-800/50 rounded-full flex items-center justify-center gap-2 border-2 border-orange-700 w-full"
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
          whileHover={{ y: -4, boxShadow: "0 10px 30px rgba(249, 115, 22, 0.3)" }}
        >
          <p className="text-gray-400 text-sm mb-3">今日识别</p>
          <div className="flex items-end gap-2">
            <p className="text-3xl font-bold text-white"><AnimatedNumber value={1258} /></p>
            <p className="text-sm text-orange-400 mb-1">条信息</p>
          </div>
        </motion.div>
        
        <motion.div 
          className="bg-gray-800/60 backdrop-blur-sm p-4 md:p-5 rounded-xl border-2 border-gray-700 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          whileHover={{ y: -4, boxShadow: "0 10px 30px rgba(249, 115, 22, 0.3)" }}
        >
          <p className="text-gray-400 text-sm mb-3">NLP准确率</p>
          <div className="flex items-end gap-2">
            <p className="text-3xl font-bold text-white"><AnimatedNumber value={96} />%</p>
            <p className="text-sm text-green-400 mb-1">↑ 2%</p>
          </div>
        </motion.div>
        
        <motion.div 
          className="bg-gray-800/60 backdrop-blur-sm p-4 md:p-5 rounded-xl border-2 border-gray-700 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ y: -4, boxShadow: "0 10px 30px rgba(249, 115, 22, 0.3)" }}
        >
          <p className="text-gray-400 text-sm mb-3">预警准确率</p>
          <div className="flex items-end gap-2">
            <p className="text-3xl font-bold text-white"><AnimatedNumber value={92} />%</p>
            <p className="text-sm text-green-400 mb-1">↑ 1%</p>
          </div>
        </motion.div>
        
        <motion.div 
          className="bg-gray-800/60 backdrop-blur-sm p-4 md:p-5 rounded-xl border-2 border-gray-700 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          whileHover={{ y: -4, boxShadow: "0 10px 30px rgba(249, 115, 22, 0.3)" }}
        >
          <p className="text-gray-400 text-sm mb-3">实时响应</p>
          <div className="flex items-end gap-2">
            <p className="text-3xl font-bold text-white">0秒</p>
            <p className="text-sm text-green-400 mb-1">↓ 0.1秒</p>
          </div>
        </motion.div>
      </div>
      
      {/* 图表区域 - 响应式布局 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* 风险等级分布 */}
        <motion.div 
          className="bg-gray-800/60 backdrop-blur-sm p-4 md:p-5 rounded-xl border-2 border-gray-700 shadow-lg h-[350px] md:h-[500px]"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="text-lg font-medium text-white mb-4">风险等级分布</h3>
          <ResponsiveContainer width="100%" height="88%">
            <PieChart>
              <Pie
                data={riskLevelData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelStyle={{ fontSize: '12px', fill: '#ffffff' }}
              >
                {riskLevelData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', borderRadius: '0.5rem' }}
                itemStyle={{ color: '#e5e7eb' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
        
        {/* 风险类型雷达图 */}
        <motion.div 
          className="bg-gray-800/60 backdrop-blur-sm p-4 md:p-5 rounded-xl border-2 border-gray-700 shadow-lg h-[350px] md:h-[500px]"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h3 className="text-lg font-medium text-white mb-4">风险类型分布</h3>
          <ResponsiveContainer width="100%" height="88%">
            <RadarChart outerRadius={100} data={riskTypeData}>
              <PolarGrid stroke="#4b5563" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#9ca3af', fontSize: 11 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#9ca3af' }} />
              <Radar name="风险指数" dataKey="A" stroke="#f97316" fill="#f97316" fillOpacity={0.6} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', borderRadius: '0.5rem' }}
                itemStyle={{ color: '#e5e7eb' }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
      
      {/* 最近预警事件 */}
      <motion.div 
        className="bg-gray-800/60 backdrop-blur-sm p-4 md:p-5 rounded-xl border-2 border-gray-700 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <h3 className="text-lg font-medium text-white mb-4">最近预警事件</h3>
        <div className="space-y-3 md:space-y-4">
          {recentEvents.map((event) => (
            <div 
              key={event.id} 
              className="flex items-center justify-between text-sm p-3 rounded-lg bg-gray-700/50"
            >
              <div className="flex items-center gap-3">
                <span className={`w-3 h-3 rounded-full ${
                  event.level === 'high' ? 'bg-red-500' : 
                  event.level === 'medium' ? 'bg-orange-500' : 'bg-yellow-500'
                }`}></span>
                <span className="text-gray-300 truncate max-w-[200px] md:max-w-[500px]">{event.title}</span>
              </div>
              <div className="flex items-center gap-3 md:gap-6">
                <span className="text-cyan-400 font-semibold">{event.platform}</span>
                <span className="text-gray-400">{event.time}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </Layout>
  );
}