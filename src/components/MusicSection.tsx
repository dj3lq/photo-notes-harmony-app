
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Music, Upload } from 'lucide-react';

const MusicSection = () => {
  const [connectedToSpotify, setConnectedToSpotify] = useState(false);

  const handleSpotifyConnect = () => {
    // This would integrate with Spotify API in the future
    setConnectedToSpotify(true);
  };

  return (
    <div className="min-h-screen bg-gradient-romantic p-4 pb-24">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 bg-clip-text text-transparent mb-2 flex items-center justify-center gap-2">
            <Music className="w-8 h-8 text-pink-500" />
            Our Soundtrack
          </h1>
          <p className="text-muted-foreground">Songs that tell our story 🎵</p>
        </div>

        {/* Spotify Connection */}
        <Card className="glass-effect p-6 mb-8">
          <div className="text-center">
            {!connectedToSpotify ? (
              <div>
                <Music className="w-16 h-16 mx-auto mb-4 text-pink-500" />
                <h3 className="text-xl font-semibold mb-2">Connect to Spotify</h3>
                <p className="text-gray-600 mb-4">
                  Link your Spotify account to add songs to your photos and create shared playlists
                </p>
                <Button 
                  onClick={handleSpotifyConnect}
                  className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full font-medium"
                >
                  Connect Spotify
                </Button>
                <p className="text-xs text-gray-500 mt-2">
                  Secure connection - we only access what you allow
                </p>
              </div>
            ) : (
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-green-500 rounded-full flex items-center justify-center">
                  <Music className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-green-700">Connected to Spotify! 🎉</h3>
                <p className="text-gray-600">You can now add songs to your memories</p>
              </div>
            )}
          </div>
        </Card>

        {/* Recent Songs */}
        <Card className="glass-effect p-6">
          <h3 className="text-lg font-semibold mb-4">Songs Added to Memories</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-4 p-3 bg-white/50 rounded-lg">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-rose-500 rounded-lg flex items-center justify-center">
                <Music className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Perfect</p>
                <p className="text-sm text-gray-600">Ed Sheeran</p>
              </div>
              <div className="text-xs text-gray-500">Coffee Date Photo</div>
            </div>
            
            <div className="flex items-center gap-4 p-3 bg-white/50 rounded-lg opacity-50">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center">
                <Music className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Connect Spotify to add more songs</p>
                <p className="text-sm text-gray-600">Your memories deserve a soundtrack</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MusicSection;
