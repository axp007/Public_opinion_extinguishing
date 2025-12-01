import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// 动态火焰组件
const AnimatedFlame = () => {
  return (
    <div className="relative w-[280px] h-[360px] flex items-end justify-center">
      {/* 火焰底部发光效果 */}
      <motion.div 
        className="absolute -bottom-4 w-[120px] h-[30px] rounded-full bg-gradient-to-r from-red-500/60 via-orange-500/60 to-red-500/60 blur-md"
        animate={{ 
          scale: [1, 1.1, 0.95, 1],
          opacity: [0.6, 0.8, 0.5, 0.6]
        }}
        transition={{ 
          duration: 2.5,
          repeat: Infinity,
          repeatType: "loop"
        }}
      />
      
      {/* 火焰基座 */}
      <div className="absolute bottom-0 w-[100px] h-[40px] rounded-t-[30%] bg-gradient-to-t from-gray-700 to-gray-600 border border-gray-800 overflow-hidden">
        {/* 基座发光边缘 */}
        <div className="absolute top-0 left-0 right-0 h-[10px] bg-gradient-to-r from-transparent via-orange-400 to-transparent opacity-60"></div>
      </div>
      
      {/* 火焰主体 */}
      <motion.div 
        className="absolute bottom-8 w-[80px] h-[180px] rounded-t-[60%] bg-gradient-to-t from-red-600 via-orange-400 to-yellow-300"
        animate={{ 
          scaleX: [1, 1.12, 0.98, 1.08, 1],
          scaleY: [1, 1.05, 1, 1.03, 1],
          rotateZ: [0, -0.5, 0.5, -0.2, 0],
          y: [-5, 0, -6, 0, -5]
        }}
        transition={{ 
          duration: 2.2,
          repeat: Infinity,
          repeatType: "loop"
        }}
      />
      
      {/* 火焰内焰 */}
      <motion.div 
        className="absolute bottom-16 w-[50px] h-[150px] rounded-t-[50%] bg-gradient-to-t from-orange-400 via-yellow-300 to-yellow-200"
        animate={{ 
          scaleX: [1, 1.18, 1.03, 1.12, 1],
          scaleY: [1, 1.08, 1.01, 1.05, 1],
          rotateZ: [0, 0.8, -0.8, 0.4, 0],
          y: [-8, 0, -9, 0, -8]
        }}
        transition={{ 
          duration: 1.8,
          repeat: Infinity,
          repeatType: "loop",
          delay: 0.3
        }}
      />
      
      {/* 火焰核心 */}
      <motion.div 
        className="absolute bottom-28 w-[30px] h-[100px] rounded-t-[50%] bg-gradient-to-t from-yellow-300 to-white"
        animate={{ 
          scaleX: [1, 1.25, 1.05, 1.18, 1],
          scaleY: [1, 1.12, 1.03, 1.1, 1],
          y: [-10, 0, -11, 0, -10]
        }}
        transition={{ 
          duration: 1.5,
          repeat: Infinity,
          repeatType: "loop",
          delay: 0.6
        }}
      />
      
      {/* 火焰顶部亮点 */}
      <motion.div 
        className="absolute top-20 w-[24px] h-[24px] rounded-full bg-white/70 blur-sm"
        animate={{ 
          scale: [1, 1.3, 1.05, 1.2, 1],
          opacity: [0.6, 0.9, 0.5, 0.7, 0.6]
        }}
        transition={{ 
          duration: 1.2,
          repeat: Infinity,
          repeatType: "loop",
          delay: 0.9
        }}
      />
      
      {/* 火焰发光效果 */}
      <motion.div 
        className="absolute -bottom-12 w-[140px] h-[200px] rounded-full bg-orange-400/20 blur-2xl"
        animate={{ 
          scale: [1, 1.12, 0.96, 1.08, 1],
          opacity: [0.4, 0.6, 0.35, 0.5, 0.4]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          repeatType: "loop"
        }}
      />
      
      {/* 动态烟雾效果 */}
      <motion.div 
        className="absolute top-0 w-[50px] h-[80px] bg-gradient-to-t from-orange-500/20 to-transparent blur-md"
        animate={{ 
          y: [-80, -200],
          opacity: [0.3, 0],
          scale: [1, 1.5]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          repeatType: "loop",
          delay: 1
        }}
      />
    </div>
  );
};

// 功能卡片组件 - 响应式版本
const FeatureCard = ({ 
  title, 
  description, 
  color, 
  path,
  cardBg
}: { 
  title: string; 
  description: string; 
  color: string; 
  path: string;
  cardBg: string;
}) => {
  return (
    <Link to={path}>
      <motion.div
        className={`w-full h-[150px] rounded-xl p-5 ${cardBg} bg-opacity-85 backdrop-blur-sm border border-white/20 flex flex-col justify-between cursor-pointer shadow-2xl`}
        whileHover={{ 
          y: -8, 
          boxShadow: "0 18px 40px rgba(255, 255, 255, 0.25)",
          scale: 1.03
        }}
        whileTap={{ scale: 0.99 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${color}`}></div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
        </div>
        <p className="text-xs text-white/80 mt-2">{description}</p>
      </motion.div>
    </Link>
  );
};

// 主组件
export default function Home() {
  return (
    <div className="min-h-screen min-w-screen bg-gradient-to-br from-slate-900 via-black to-slate-800 text-white relative overflow-hidden">
      {/* 背景环形效果 */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* 外环形 */}
        <div className="absolute w-[700px] h-[700px] rounded-full border-8 border-slate-700/50 border-dashed hidden md:block"></div>
        {/* 中环形 */}
        <div className="absolute w-[500px] h-[500px] rounded-full border-4 border-blue-500/40 blur-sm hidden md:block"></div>
        {/* 内环形 */}
        <div className="absolute w-[350px] h-[350px] rounded-full border border-orange-500/30 blur-sm hidden md:block"></div>
      </div>
      
      {/* 标题文字 */}
      <div className="absolute top-[60px] md:top-[120px] left-0 right-0 text-center z-20 px-4">
        <h1 className="text-[clamp(1.5rem,5vw,3.5rem)] font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-yellow-300 to-orange-400">
          舆情灭火先锋
        </h1>
        <p className="mt-3 text-sm text-white/70 max-w-md mx-auto">
          企业级全场景舆情监测与危机响应AI系统
        </p>
      </div>
      
      {/* 桌面端布局 - 中心火焰和四周卡片 */}
      <div className="hidden md:flex flex-col items-center justify-center min-h-screen relative z-10 px-8">
        {/* 中央平台 */}
        <div className="relative z-10 mb-16">
          {/* 平台顶部 */}
          <div className="w-[320px] h-[320px] rounded-full bg-gradient-to-br from-slate-800/70 to-slate-900/70 border-2 border-white/10 backdrop-blur-sm relative overflow-hidden">
            {/* 平台发光边框 */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 via-orange-500/20 to-blue-500/20 blur-md opacity-60"></div>
            
            {/* 平台中心 */}
            <div className="absolute inset-[10px] rounded-full bg-slate-900/80 border border-white/10"></div>
            
            {/* 动态火焰 */}
            <div className="absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]">
              <AnimatedFlame />
            </div>
          </div>
          
          {/* 平台底部发光 */}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-[280px] h-[280px] rounded-full bg-gradient-to-r from-blue-500/15 via-orange-500/15 to-blue-500/15 blur-2xl"></div>
        </div>
        
        {/* 功能卡片网格 - 桌面端 */}
        <div className="grid grid-cols-2 gap-6 w-[560px] relative z-10">
          <FeatureCard 
            title="实时舆情监控" 
            description="支持多平台覆盖、关键词实时追踪、趋势分析预测" 
            color="bg-blue-400" 
            path="/realtime-monitoring"
            cardBg="bg-gradient-to-br from-blue-600 to-blue-900"
          />
          <FeatureCard 
            title="负面舆情识别" 
            description="AI智能识别、精准分级、快速定位、风险预警" 
            color="bg-yellow-400" 
            path="/negative-recognition"
            cardBg="bg-gradient-to-br from-yellow-500 to-yellow-700"
          />
          <FeatureCard 
            title="公关话术生成" 
            description="多场景适配、专业语气、快速生成、一键导出" 
            color="bg-orange-400" 
            path="/pr-speech-generator"
            cardBg="bg-gradient-to-br from-orange-500 to-orange-800"
          />
          <FeatureCard 
            title="危机响应预案" 
            description="智能分级预案、多部门协同、实时调整、效果评估" 
            color="bg-blue-400" 
            path="/crisis-response"
            cardBg="bg-gradient-to-br from-blue-500 to-blue-800"
          />
        </div>
        
        {/* 提示文字 */}
        <div className="absolute bottom-[80px] text-center z-20">
          <p className="text-xs text-white/50">点击功能卡片进入详情页</p>
        </div>
      </div>
      
      {/* 移动端布局 - 垂直排列 */}
      <div className="md:hidden flex flex-col items-center justify-center min-h-screen px-4 py-20 relative z-10">
        {/* 中央平台 */}
        <div className="relative z-10 mb-12">
          {/* 平台顶部 - 移动端缩小尺寸 */}
          <div className="w-[280px] h-[280px] rounded-full bg-gradient-to-br from-slate-800/70 to-slate-900/70 border-2 border-white/10 backdrop-blur-sm relative overflow-hidden">
            {/* 平台发光边框 */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 via-orange-500/20 to-blue-500/20 blur-md opacity-60"></div>
            
            {/* 平台中心 */}
            <div className="absolute inset-[10px] rounded-full bg-slate-900/80 border border-white/10"></div>
            
            {/* 动态火焰 */}
            <div className="absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]">
              <AnimatedFlame />
            </div>
          </div>
          
          {/* 平台底部发光 */}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-[240px] h-[240px] rounded-full bg-gradient-to-r from-blue-500/15 via-orange-500/15 to-blue-500/15 blur-2xl"></div>
        </div>
        
        {/* 功能卡片网格 - 移动端单列 */}
        <div className="grid grid-cols-1 gap-4 w-full max-w-md relative z-10">
          <FeatureCard 
            title="实时舆情监控" 
            description="支持多平台覆盖、关键词实时追踪、趋势分析预测" 
            color="bg-blue-400" 
            path="/realtime-monitoring"
            cardBg="bg-gradient-to-br from-blue-600 to-blue-900"
          />
          <FeatureCard 
            title="负面舆情识别" 
            description="AI智能识别、精准分级、快速定位、风险预警" 
            color="bg-yellow-400" 
            path="/negative-recognition"
            cardBg="bg-gradient-to-br from-yellow-500 to-yellow-700"
          />
          <FeatureCard 
            title="公关话术生成" 
            description="多场景适配、专业语气、快速生成、一键导出" 
            color="bg-orange-400" 
            path="/pr-speech-generator"
            cardBg="bg-gradient-to-br from-orange-500 to-orange-800"
          />
          <FeatureCard 
            title="危机响应预案" 
            description="智能分级预案、多部门协同、实时调整、效果评估" 
            color="bg-blue-400" 
            path="/crisis-response"
            cardBg="bg-gradient-to-br from-blue-500 to-blue-800"
          />
        </div>
        
        {/* 提示文字 */}
        <div className="mt-8 text-center z-20">
          <p className="text-xs text-white/50">点击功能卡片进入详情页</p>
        </div>
      </div>
      
      {/* AI生成标识 */}
      <div className="absolute bottom-4 right-4 z-20">
        <p className="text-xs text-white/40">AI生成</p>
      </div>
    </div>
  );
}