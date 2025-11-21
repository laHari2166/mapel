
'use client';

import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { usePersonalNotes } from '@/hooks/use-personal-notes';
import { PlusCircle, Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from 'react';

function PublishNoteTab() {
  const { toast } = useToast();

  const handlePublish = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const title = formData.get('title');
    toast({
      title: 'Note Published!',
      description: `Your note "${title}" has been successfully saved.`,
    });
    (event.target as HTMLFormElement).reset();
  };

  return (
    <form onSubmit={handlePublish}>
      <Card>
        <CardContent className="p-6 space-y-4">
          <Input name="title" placeholder="Note Title (e.g., Key Concepts in Thermodynamics)" required />
          <Textarea
            name="content"
            placeholder="Start writing your note here. You can use markdown for formatting..."
            className="min-h-[40vh]"
            required
          />
        </CardContent>
        <CardFooter>
          <Button type="submit">Publish Note</Button>
        </CardFooter>
      </Card>
    </form>
  );
}

function PersonalNotesTab() {
    const { personalNotes, addNote, updateNote, deleteNote } = usePersonalNotes();
    const [selectedNote, setSelectedNote] = useState<typeof personalNotes[0] | null>(null);

    const handleSave = () => {
        if (selectedNote) {
            if (selectedNote.id) {
                updateNote(selectedNote.id, selectedNote);
            } else {
                addNote(selectedNote.title, selectedNote.content);
            }
            setSelectedNote(null);
        }
    }

    const handleNewNote = () => {
        setSelectedNote({ id: '', title: '', content: '', createdAt: Date.now() });
    }

    if (selectedNote) {
        return (
             <Card className="bg-white text-black">
                <CardContent className="p-6 space-y-4">
                    <Input 
                        placeholder="Note Title"
                        value={selectedNote.title}
                        onChange={(e) => setSelectedNote({...selectedNote, title: e.target.value})}
                        className="bg-yellow-100/50 border-yellow-300 focus-visible:ring-yellow-500 font-sans"
                    />
                    <Textarea
                        placeholder="Start writing your note here..."
                        className="min-h-[40vh] bg-transparent font-handwritten text-lg"
                        value={selectedNote.content}
                        onChange={(e) => setSelectedNote({...selectedNote, content: e.target.value})}
                    />
                </CardContent>
                <CardFooter className='justify-between'>
                    <Button onClick={handleSave} variant="secondary">Save Note</Button>
                    <Button variant="ghost" onClick={() => setSelectedNote(null)}>Cancel</Button>
                </CardFooter>
            </Card>
        )
    }

    return (
        <div className='space-y-4'>
            <div className='text-right'>
                <Button onClick={handleNewNote}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    New Note
                </Button>
            </div>
            {personalNotes.length === 0 ? (
                <Card className="flex items-center justify-center h-48 border-dashed">
                    <div className="text-center text-muted-foreground">
                        <p>You have no personal notes yet.</p>
                        <p>Create one to get started!</p>
                    </div>
                </Card>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {personalNotes.map(note => (
                        <Card key={note.id} className="flex flex-col">
                            <CardHeader>
                                <CardTitle className="line-clamp-2">{note.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex-grow" onClick={() => setSelectedNote(note)}>
                               <p className="text-sm text-muted-foreground line-clamp-4 cursor-pointer">{note.content || "No content"}</p>
                            </CardContent>
                            <CardFooter className="flex justify-between items-center text-xs text-muted-foreground">
                                <span>{new Date(note.createdAt).toLocaleDateString()}</span>
                                 <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                         <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <Trash2 className="h-4 w-4 text-destructive" />
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. This will permanently delete your note.
                                        </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => deleteNote(note.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                                            Delete
                                        </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}


export default function NotesPage() {
  return (
    <div>
      <PageHeader
        title="Notes"
        subtitle="Share your knowledge or keep it for yourself."
      />
      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
          <TabsTrigger value="personal">My Personal Notes</TabsTrigger>
          <TabsTrigger value="publish">Publish a Note</TabsTrigger>
        </TabsList>
        <TabsContent value="personal" className="mt-6">
            <PersonalNotesTab />
        </TabsContent>
        <TabsContent value="publish" className="mt-6">
            <PublishNoteTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
