import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { BarChart, Bar, LineChart, Line, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

// 模拟数据
const efficiencyData = [
  { name: '人工编写', time: 180, quality: 70 },
  { name: 'AI生成', time: 1, quality: 90 },
];

const usageData = [
  { month: '1月', userTemplate: 120, mediaTemplate: 80, internalTemplate: 60 },
  { month: '2月', userTemplate: 150, mediaTemplate: 95, internalTemplate: 75 },
  { month: '3月', userTemplate: 180, mediaTemplate: 120, internalTemplate: 100 },
  { month: '4月', userTemplate: 220, mediaTemplate: 150, internalTemplate: 130 },
  { month: '5月', userTemplate: 260, mediaTemplate: 180, internalTemplate: 160 },
  { month: '6月', userTemplate: 300, mediaTemplate: 210, internalTemplate: 190 },
];

// 模板示例
const templates = [
  {
    id: 'user',
    title: '用户安抚版',
    icon: 'fa-user',
    color: 'text-yellow-400',
    examples: [
      "尊敬的用户，非常抱歉给您带来了不好的体验。我们高度重视您的反馈，已经安排专人处理您的问题。我们将在24小时内与您联系，给您一个满意的解决方案。感谢您的理解与支持。",
      "亲爱的用户，感谢您的反馈。对于您遇到的问题，我们深感抱歉。我们的客服团队正在加急处理，预计1-2小时内会与您取得联系。您的满意是我们最大的追求。"
    ]
  },
  {
    id: 'media',
    title: '媒体沟通版',
    icon: 'fa-newspaper',
    color: 'text-blue-400',
    examples: [
      "针对近期媒体关注的XX事件，我司高度重视。目前我们已成立专项工作组进行全面调查。我们始终将用户权益放在首位，会尽快公布调查结果，并采取相应措施。感谢媒体朋友的关注与监督。",
      "关于XX问题，我司在此说明：我们第一时间已启动内部核查程序。我们坚持透明公开的原则，相关情况一经确认，将及时向社会公布。再次感谢各界对我们的关注。"
    ]
  },
  {
    id: 'internal',
    title: '内部汇报版',
    icon: 'fa-briefcase',
    color: 'text-green-400',
    examples: [
      "各位同事，针对XX舆情事件，现将最新进展汇报如下：1.事件概况：XX时间发生于XX平台，目前已扩散至XX等平台；2.影响范围：已覆盖XX万用户，负面情绪占比XX%；3.应对措施：已启动XX级响应预案，相关部门正在协同处理；4.预计解决时间：XX小时内控制舆情，XX小时内给出官方回应。",
      "紧急通知：关于XX问题，经初步调查，事件起因是XX，目前已导致XX后果。建议采取以下措施：1.立即XX；2.同步XX；3.准备XX。请各相关部门迅速行动，密切配合。"
    ]
  }
];

// 打字机效果组件
const TypewriterText = ({ text, speed = 50 }: { text: string; speed?: number }) => {
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    let currentIndex = 0;
    setDisplayedText('');
    
    const timer = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText(prev => prev + text[currentIndex]);
        currentIndex++;
      } else {
        clearInterval(timer);
      }
    }, speed);
    
    return () => clearInterval(timer);
  }, [text, speed]);
  
  return <span>{displayedText}<span className="animate-pulse">|</span></span>;
};

// 主组件
export default function PrSpeechGenerator() {
  const [selectedTemplate, setSelectedTemplate] = useState('user');
  const [showExampleIndex, setShowExampleIndex] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  
  // 模拟生成过程
  const generateSpeech = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setShowExampleIndex(prev => (prev + 1) % 2);
    }, 1500);
  };
  
  // 获取当前选中的模板
  const currentTemplate = templates.find(t => t.id === selectedTemplate) || templates[0];
  
  return (
    <Layout 
      title="公关话术包自动生成" 
      color="text-yellow-400" 
      currentPath="/pr-speech-generator"
    >
      {/* 模板选择器 */}
      <div className="flex gap-3 overflow-x-auto pb-3 mb-8">
        {templates.map((template) => (
          <motion.button
            key={template.id}
            className={`flex-1 min-w-[120px] py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 ${
              selectedTemplate === template.id 
                ? `${template.color} bg-gray-800 border-2 border-yellow-700 shadow-lg` 
                : 'bg-gray-800/60 border-2 border-gray-700 text-gray-400 hover:text-white hover:border-yellow-600'
            }`}
            whileHover={{ y: -4, boxShadow: "0 8px 20px rgba(234, 179, 8, 0.2)" }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setSelectedTemplate(template.id)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <i className={`fas ${template.icon} text-lg md:text-xl`}></i>
            <span className="text-xs md:text-sm font-semibold whitespace-nowrap">{template.title}</span>
          </motion.button>
        ))}
      </div>
      
      {/* 话术生成区域 */}
      <motion.div 
        className="bg-gray-800/60 backdrop-blur-sm p-4 md:p-6 rounded-xl border-2 border-gray-700 shadow-lg mb-8 min-h-[280px]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h3 className={`text-lg font-medium mb-4 flex items-center gap-3 ${currentTemplate.color}`}>
          <i className={`fas ${currentTemplate.icon} text-xl`}></i>
          <span>{currentTemplate.title}</span>
        </h3>
        
        <div className="bg-gray-700/50 p-4 rounded-xl min-h-[140px] flex items-center justify-center text-sm md:text-base text-gray-300">
          {isGenerating ? (
            <div className="flex flex-col items-center gap-4">
              <div className="w-10 h-10 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-base md:text-lg">正在生成专业话术...</p>
            </div>
          ) : (
            <TypewriterText text={currentTemplate.examples[showExampleIndex]} speed={30} />
          )}
        </div>
        
        <motion.button
          className="mt-5 w-full py-3 md:py-4 bg-yellow-600 hover:bg-yellow-700 text-white rounded-xl text-base font-semibold flex items-center justify-center gap-3 transition-all duration-300"
          whileTap={{ scale: 0.98 }}
          onClick={generateSpeech}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>生成中...</span>
            </>
          ) : (
            <>
              <i className="fas fa-magic text-xl"></i>
              <span>一键生成新话术</span>
            </>
          )}
        </motion.button>
      </motion.div>
      
      {/* 图表区域 - 响应式布局 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 效率对比 */}
        <motion.div 
          className="bg-gray-800/60 backdrop-blur-sm p-4 md:p-5 rounded-xl border-2 border-gray-700 shadow-lg h-[300px]"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="text-base font-medium text-white mb-4">生成效率对比(分钟)</h3>
          <ResponsiveContainer width="100%" height="80%">
            <BarChart data={efficiencyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#9ca3af' }} />
              <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', borderRadius: '0.5rem' }}
                itemStyle={{ color: '#e5e7eb' }}
              />
              <Bar dataKey="time" fill="#eab308" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
        
        {/* 模板使用趋势 */}
        <motion.div 
          className="bg-gray-800/60 backdrop-blur-sm p-4 md:p-5 rounded-xl border-2 border-gray-700 shadow-lg h-[300px]"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h3 className="text-base font-medium text-white mb-4">模板使用趋势</h3>
          <ResponsiveContainer width="100%" height="80%">
            <LineChart data={usageData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#9ca3af' }} />
              <YAxis hide={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', borderRadius: '0.5rem' }}
                itemStyle={{ color: '#e5e7eb' }}
              />
              <Line type="monotone" dataKey="userTemplate" stroke="#eab308" strokeWidth={2} dot={{ fill: '#eab308' }} />
              <Line type="monotone" dataKey="mediaTemplate" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6' }} />
              <Line type="monotone" dataKey="internalTemplate" stroke="#22c55e" strokeWidth={2} dot={{ fill: '#22c55e' }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </Layout>
  );
}