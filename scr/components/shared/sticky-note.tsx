'use client';

import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { StickyNote as StickyNoteIcon, GripVertical, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { motion, useDragControls } from 'framer-motion';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import { cn } from '@/lib/utils';

export default function StickyNote() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  const dragControls = useDragControls();
  const nodeRef = useRef(null);

  useEffect(() => {
    setIsMounted(true);
    try {
      const savedContent = localStorage.getItem('mapel-sticky-note');
      if (savedContent) {
        setContent(savedContent);
      }
    } catch (error) {
        console.error("Could not load sticky note from local storage", error)
    }
  }, []);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    try {
        localStorage.setItem('mapel-sticky-note', newContent);
    } catch (error) {
        console.error("Could not save sticky note to local storage", error)
    }
  };
  
  if (!isMounted || user?.role !== 'Student') {
    return null;
  }

  return (
    <>
      <motion.div
        drag
        dragMomentum={false}
        className="fixed bottom-6 right-6 z-50 cursor-grab"
        whileDrag={{ cursor: 'grabbing' }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          variant="default"
          size="icon"
          className="h-14 w-14 rounded-full shadow-lg bg-yellow-400 hover:bg-yellow-500 text-yellow-900"
          aria-label="Toggle Sticky Note"
        >
          <StickyNoteIcon className="h-7 w-7" />
        </Button>
      </motion.div>

      {isOpen && (
        <motion.div
            ref={nodeRef}
            drag
            dragListener={false}
            dragControls={dragControls}
            dragMomentum={false}
            className="fixed z-50"
            style={{ top: '30%', left: '30%' }}
        >
             <ResizableBox 
                height={350} 
                width={300}
                minConstraints={[250, 300]}
                maxConstraints={[600, 800]}
                className="relative"
            >
                <Card className="h-full w-full shadow-2xl bg-yellow-200/90 backdrop-blur-md border-yellow-400 flex flex-col">
                    <CardHeader 
                        className="py-2 px-3 flex-row items-center justify-between cursor-move"
                        onPointerDown={(e) => dragControls.start(e)}
                    >
                        <div className="flex items-center gap-2 text-yellow-900">
                             <GripVertical className="h-5 w-5" />
                            <CardTitle className="text-base font-bold">My Sticky Note</CardTitle>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-yellow-900 hover:bg-yellow-300"
                            onClick={() => setIsOpen(false)}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </CardHeader>
                    <CardContent className="p-0 flex-grow">
                        <Textarea
                        value={content}
                        onChange={handleContentChange}
                        placeholder="Jot down your thoughts..."
                        className="h-full w-full resize-none border-0 rounded-none bg-transparent focus-visible:ring-0 text-yellow-900 placeholder:text-yellow-800/70 p-3 font-handwritten text-lg"
                        />
                    </CardContent>
                </Card>
            </ResizableBox>
        </motion.div>
      )}
    </>
  );
}
