import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { BarChart, Bar, LineChart, Line, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

// 模拟数据
const crisisLevelData = [
  { name: '0级(安全)', value: 65, color: '#22c55e' },
  { name: '1级(关注)', value: 20, color: '#3b82f6' },
  { name: '2级(警告)', value: 10, color: '#eab308' },
  { name: '3级(危机)', value: 5, color: '#ef4444' },
];

const responseTimeData = [
  { month: '1月', manualResponse: 240, autoResponse: 10 },
  { month: '2月', manualResponse: 210, autoResponse: 8 },
  { month: '3月', manualResponse: 180, autoResponse: 7 },
  { month: '4月', manualResponse: 150, autoResponse: 6 },
  { month: '5月', manualResponse: 120, autoResponse: 5 },
  { month: '6月', manualResponse: 90, autoResponse: 4 },
];

// 危机预案详情
const crisisPlans = [
  {
    level: 0,
    title: "0级 (安全状态)",
    color: "bg-green-500",
    description: "舆情处于可控范围，无明显负面趋势",
    measures: [
      "保持常规监测频率",
      "关注关键意见领袖动态","准备基础回应素材"
    ]
  },
  {
    level: 1,
    title: "1级 (关注状态)",
    color: "bg-blue-500",
    description: "出现少量负面信息，尚未形成规模",
    measures: [
      "增加监测频率至每小时一次",
      "分析负面信息来源和传播路径",
      "准备针对性回应话术",
      "密切关注话题发展趋势"
    ]
  },
  {
    level: 2,
    title: "2级 (警告状态)",
    color: "bg-yellow-500",
    description: "负面信息快速增加，有扩散风险",
    measures: [
      "启动每30分钟一次的密集监测",
      "成立专项应对小组",
      "制定详细的回应策略和时间表",
      "准备媒体沟通材料",
      "评估可能的品牌影响"
    ]
  },
  {
    level: 3,
    title: "3级 (危机状态)",
    color: "bg-red-500",
    description: "负面信息广泛传播，已对品牌造成显著影响",
    measures: [
      "全天候24小时监测",
      "启动最高级应急响应",
      "CEO亲自牵头应对小组",
      "快速发布官方声明",
      "协调各部门资源全力应对",
      "准备媒体发布会",
      "制定长期修复品牌形象计划"
    ]
  }
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
export default function CrisisResponse() {
  const [selectedLevel, setSelectedLevel] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // 更新当前时间
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  // 获取当前选中的预案
  const currentPlan = crisisPlans.find(plan => plan.level === selectedLevel) || crisisPlans[0];
  
  return (
    <Layout 
      title="危机响应预案" 
      color="text-red-400" 
      currentPath="/crisis-response"
    >
      {/* 统计数据卡片 - 响应式网格 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        <motion.div 
          className="bg-gray-800/60 backdrop-blur-sm p-4 md:p-5 rounded-xl border-2 border-gray-700 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ y: -4, boxShadow: "0 10px 30px rgba(239, 68, 68, 0.2)" }}
        >
          <p className="text-gray-400 text-sm mb-3">预案覆盖</p>
          <div className="flex items-end gap-2">
            <p className="text-3xl font-bold text-white">4级</p>
            <p className="text-sm text-red-400 mb-1.5">全场景</p>
          </div>
        </motion.div>
        
        <motion.div 
          className="bg-gray-800/60 backdrop-blur-sm p-4 md:p-5 rounded-xl border-2 border-gray-700 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          whileHover={{ y: -4, boxShadow: "0 10px 30px rgba(239, 68, 68, 0.2)" }}
        >
          <p className="text-gray-400 text-sm mb-3">响应时间</p>
          <div className="flex items-end gap-2">
            <p className="text-3xl font-bold text-white"><AnimatedNumber value={4} />秒</p>
            <p className="text-sm text-green-400 mb-1.5">↓ 2秒</p>
          </div>
        </motion.div>
        
        <motion.div 
          className="bg-gray-800/60 backdrop-blur-sm p-4 md:p-5 rounded-xl border-2 border-gray-700 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ y: -4, boxShadow: "0 10px 30px rgba(239, 68, 68, 0.2)" }}
        >
          <p className="text-gray-400 text-sm mb-3">预案完整度</p>
          <div className="flex items-end gap-2">
            <p className="text-3xl font-bold text-white"><AnimatedNumber value={98} />%</p>
            <p className="text-sm text-green-400 mb-1.5">优秀</p>
          </div>
        </motion.div>
        
        <motion.div 
          className="bg-gray-800/60 backdrop-blur-sm p-4 md:p-5 rounded-xl border-2 border-gray-700 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          whileHover={{ y: -4, boxShadow: "0 10px 30px rgba(239, 68, 68, 0.2)" }}
        >
          <p className="text-gray-400 text-sm mb-3">成功案例</p>
          <div className="flex items-end gap-2">
            <p className="text-3xl font-bold text-white"><AnimatedNumber value={127} /></p>
            <p className="text-sm text-green-400 mb-1.5">↑ 8%</p>
          </div>
        </motion.div>
      </div>
      
      {/* 危机等级选择器 */}
      <div className="flex gap-3 mb-8 overflow-x-auto pb-3">
        {crisisPlans.map((plan) => (
          <motion.button
            key={plan.level}
            className={`flex-1 min-w-[100px] py-3 rounded-xl flex items-center justify-center transition-all duration-300 ${
              selectedLevel === plan.level 
                ? `${plan.color} text-white shadow-lg` 
                : 'bg-gray-800/60 border-2 border-gray-700 text-gray-400 hover:text-white hover:border-gray-500'
            }`}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedLevel(plan.level)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-xs md:text-sm font-semibold text-center">{plan.title}</span>
          </motion.button>
        ))}
      </div>
      
      {/* 危机预案详情 */}
      <motion.div 
        className="bg-gray-800/60 backdrop-blur-sm p-4 md:p-6 rounded-xl border-2 border-gray-700 shadow-lg mb-8 min-h-[280px]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex items-center gap-3 mb-5">
          <div className={`w-4 h-4 rounded-full ${currentPlan.color}`}></div>
          <h3 className="text-xl font-bold text-white">{currentPlan.title}</h3>
        </div>
        
        <p className="text-base md:text-lg text-gray-300 mb-5">{currentPlan.description}</p>
        
        <div className="space-y-3">
          {currentPlan.measures.map((measure, index) => (
            <div key={index} className="flex items-start gap-3 text-sm md:text-base text-gray-300">
              <i className="fas fa-check-circle text-green-400 mt-1 text-lg"></i>
              <span>{measure}</span>
            </div>
          ))}
        </div>
      </motion.div>
      
      {/* 图表区域 - 响应式布局 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 危机等级分布 */}
        <motion.div 
          className="bg-gray-800/60 backdrop-blur-sm p-4 md:p-5 rounded-xl border-2 border-gray-700 shadow-lg h-[300px]"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="text-base font-medium text-white mb-4">危机等级分布</h3>
          <ResponsiveContainer width="100%" height="80%">
            <BarChart data={crisisLevelData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#9ca3af' }} />
              <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', borderRadius: '0.5rem' }}
                itemStyle={{ color: '#e5e7eb' }}
              />
              <Bar dataKey="value" fill={(entry) => entry.color} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
        
        {/* 响应时间对比 */}
        <motion.div 
          className="bg-gray-800/60 backdrop-blur-sm p-4 md:p-5 rounded-xl border-2 border-gray-700 shadow-lg h-[300px]"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h3 className="text-base font-medium text-white mb-4">响应时间对比(分钟)</h3>
          <ResponsiveContainer width="100%" height="80%">
            <LineChart data={responseTimeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#9ca3af' }} />
              <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', borderRadius: '0.5rem' }}
                itemStyle={{ color: '#e5e7eb' }}
              />
              <Line type="monotone" dataKey="manualResponse" stroke="#ef4444" strokeWidth="2" dot={{ fill: '#ef4444' }} />
              <Line type="monotone" dataKey="autoResponse" stroke="#22c55e" strokeWidth="2" dot={{ fill: '#22c55e' }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </Layout>
  );
}