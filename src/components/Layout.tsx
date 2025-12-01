import React, { useState } from "react";
import { Link } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  color: string;
  showBackButton?: boolean;
  currentPath: string;
}

export default function Layout({ 
  children, 
  title, 
  color, 
  showBackButton = true, 
  currentPath 
}: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const menuItems = [
    { id: "home", label: "首页", path: "/" },
    { id: "realtime", label: "实时舆情监控", path: "/realtime-monitoring" },
    { id: "negative", label: "负面舆情识别", path: "/negative-recognition" },
    { id: "pr", label: "公关话术生成", path: "/pr-speech-generator" },
    { id: "crisis", label: "危机响应预案", path: "/crisis-response" },
  ];

  return (
    <div className="min-h-screen min-w-screen bg-gradient-to-br from-gray-900 via-gray-800 to-slate-900 text-white relative overflow-hidden">
      {/* 背景网格 */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(66,86,119,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(66,86,119,0.1)_1px,transparent_1px)] bg-[size:20px_20px] z-0"></div>
      
      {/* 移动端菜单按钮 */}
      <button 
        className="md:hidden fixed top-4 right-4 z-50 p-2 bg-gray-800/80 backdrop-blur-sm rounded-lg border border-gray-700"
        onClick={toggleMobileMenu}
      >
        <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
      </button>
      
      {/* 移动端侧边栏菜单 */}
      <div 
        className={`fixed inset-y-0 right-0 w-64 bg-gray-900/95 backdrop-blur-md z-40 transform transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden`}
      >
        <div className="pt-16 px-4 pb-4">
          <h3 className="text-lg font-semibold mb-6 text-white">菜单导航</h3>
          <div className="space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className={`block py-3 px-4 rounded-lg transition-colors duration-200 ${
                  currentPath === item.path 
                    ? `bg-${color}-900/50 text-${color}-400 border-l-4 border-${color}-400` 
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
      
      {/* 主容器 - 全屏自适应 */}
      <div className="relative w-full mx-auto p-6 pt-8 md:pt-6 pb-20">
        {/* 标题栏 */}
        <div className="flex justify-between items-center mb-8">
          {showBackButton && (
            <Link 
              to="/" 
              className={`${color} hover:${color.replace('text-', 'text-').replace('400', '300')} transition-colors flex items-center gap-2`}
            >
              <span className="text-xl">←</span> <span className="text-lg md:inline hidden">返回首页</span>
            </Link>
          )}
          <h1 className={`text-2xl md:text-3xl font-bold ${color}`}>{title}</h1>
          <div className="hidden md:flex items-center gap-2">
            <div className="text-sm text-gray-400 flex items-center gap-2">
              <i className="far fa-clock text-xl"></i>
              <span>{new Date().toLocaleTimeString()}</span>
            </div>
          </div>
        </div>
        
        {/* 桌面端导航 */}
        <div className="hidden md:flex justify-center mb-8 overflow-x-auto">
          <div className="flex gap-2 bg-gray-800/60 backdrop-blur-sm rounded-full p-1 border border-gray-700">
            {menuItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className={`px-4 py-2 rounded-full text-sm transition-colors duration-200 ${
                  currentPath === item.path 
                    ? `${color.replace('text-', 'bg-').replace('400', '900/70')} ${color} font-medium` 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        
        {/* 页面内容 */}
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </div>
  );
}