
import React from 'react';
import { Button } from '@/components/ui/button';
import { Image as ImageIcon, MessageSquare, Music, Upload } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navigation = ({ activeTab, onTabChange }: NavigationProps) => {
  const tabs = [
    { id: 'gallery', label: 'Gallery', icon: ImageIcon },
    { id: 'chat', label: 'Chat', icon: MessageSquare },
    { id: 'music', label: 'Music', icon: Music }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-pink-200 p-4 z-40">
      <div className="max-w-md mx-auto">
        <div className="flex justify-around">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "ghost"}
                className={`flex-1 mx-1 flex flex-col items-center gap-1 h-auto py-3 ${
                  activeTab === tab.id 
                    ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white' 
                    : 'text-gray-600 hover:text-pink-600 hover:bg-pink-50'
                }`}
                onClick={() => onTabChange(tab.id)}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium">{tab.label}</span>
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Navigation;
