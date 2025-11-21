'use client';

import { PageHeader } from "@/components/shared/page-header";
import RoomManager from "@/components/study-room/room-manager";
import MyRoomsList from "@/components/study-room/my-rooms-list";
import { useAuth } from "@/hooks/use-auth";

export default function StudyRoomPage() {
    const { user } = useAuth();
    const isStudent = user?.role === 'Student';
    
    return (
        <div>
            <PageHeader 
                title={isStudent ? "Study Rooms" : "Doubt Solving Rooms"}
                subtitle="Squad up. Solve doubts together. Achieve more."
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <h2 className="text-2xl font-bold mb-4">My Rooms</h2>
                    <MyRoomsList />
                </div>
                <div>
                    <h2 className="text-2xl font-bold mb-4">Join or Create</h2>
                    <RoomManager />
                </div>
            </div>
        </div>
    );
}
