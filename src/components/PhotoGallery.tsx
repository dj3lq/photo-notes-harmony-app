
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, Image as ImageIcon, Music, MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Photo {
  id: string;
  url: string;
  caption: string;
  date: string;
  notes: string[];
  song?: {
    title: string;
    artist: string;
  };
}

const PhotoGallery = () => {
  const { toast } = useToast();
  const [photos, setPhotos] = useState<Photo[]>([
    {
      id: '1',
      url: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=faces',
      caption: 'Our first coffee date ☕',
      date: '2024-01-15',
      notes: ['You looked so beautiful in this light', 'I knew I was falling for you'],
      song: {
        title: 'Perfect',
        artist: 'Ed Sheeran'
      }
    },
    {
      id: '2',
      url: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=400&fit=crop',
      caption: 'Cozy Sunday morning 💕',
      date: '2024-02-03',
      notes: ['Home feels like home with you'],
    }
  ]);

  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newPhoto: Photo = {
          id: Date.now().toString(),
          url: e.target?.result as string,
          caption: '',
          date: new Date().toISOString().split('T')[0],
          notes: []
        };
        setPhotos(prev => [newPhoto, ...prev]);
        toast({
          title: "Photo uploaded! 📸",
          description: "Your memory has been added to the gallery.",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-romantic p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 bg-clip-text text-transparent mb-2">
            Our Memories 💕
          </h1>
          <p className="text-muted-foreground">A collection of our beautiful moments together</p>
        </div>

        {/* Upload Section */}
        <Card className="glass-effect mb-8 p-6">
          <div className="text-center">
            <label htmlFor="photo-upload" className="cursor-pointer">
              <div className="border-2 border-dashed border-pink-300 rounded-xl p-8 hover:border-pink-400 transition-colors">
                <Upload className="w-12 h-12 mx-auto mb-4 text-pink-500" />
                <p className="text-lg font-medium text-gray-700 mb-2">Upload a new memory</p>
                <p className="text-sm text-gray-500">Click to add photos from your adventures together</p>
              </div>
            </label>
            <input
              id="photo-upload"
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
        </Card>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo) => (
            <Card 
              key={photo.id} 
              className="glass-effect overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
              onClick={() => setSelectedPhoto(photo)}
            >
              <div className="aspect-square relative overflow-hidden">
                <img 
                  src={photo.url} 
                  alt={photo.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Icons overlay */}
                <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {photo.song && (
                    <div className="bg-white/90 rounded-full p-2">
                      <Music className="w-4 h-4 text-pink-600" />
                    </div>
                  )}
                  {photo.notes.length > 0 && (
                    <div className="bg-white/90 rounded-full p-2">
                      <MessageSquare className="w-4 h-4 text-purple-600" />
                    </div>
                  )}
                </div>
              </div>
              
              <div className="p-4">
                <p className="font-medium text-gray-800 mb-1">{photo.caption || 'Untitled memory'}</p>
                <p className="text-sm text-gray-500">{new Date(photo.date).toLocaleDateString('en-US', { 
                  month: 'long', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}</p>
                {photo.song && (
                  <div className="mt-2 text-xs text-pink-600 flex items-center gap-1">
                    <Music className="w-3 h-3" />
                    {photo.song.title} - {photo.song.artist}
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Photo Detail Modal */}
        {selectedPhoto && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50" onClick={() => setSelectedPhoto(null)}>
            <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="aspect-square relative">
                <img 
                  src={selectedPhoto.url} 
                  alt={selectedPhoto.caption}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{selectedPhoto.caption || 'Untitled memory'}</h3>
                <p className="text-sm text-gray-500 mb-4">{new Date(selectedPhoto.date).toLocaleDateString()}</p>
                
                {selectedPhoto.song && (
                  <div className="mb-4 p-3 bg-pink-50 rounded-lg">
                    <div className="flex items-center gap-2 text-pink-700">
                      <Music className="w-4 h-4" />
                      <span className="font-medium">{selectedPhoto.song.title}</span>
                      <span>by {selectedPhoto.song.artist}</span>
                    </div>
                  </div>
                )}
                
                {selectedPhoto.notes.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-700 flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      Our thoughts about this moment:
                    </h4>
                    {selectedPhoto.notes.map((note, index) => (
                      <p key={index} className="text-gray-600 bg-purple-50 p-3 rounded-lg italic">
                        "{note}"
                      </p>
                    ))}
                  </div>
                )}
                
                <div className="mt-6 flex gap-2">
                  <Button className="flex-1 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600">
                    Add Note
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Add Song
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoGallery;
