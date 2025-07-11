import { useEffect } from 'react';
import { createClient } from "@/utils/supabase/client";
import { useErrorStore, User, useUserStore } from "../store/zustand";

export const useStarter = () => {
    const { user, setUser, allUsers, setAllUsers, setMyFriends, setRequestSenders } = useUserStore();
    const { setError } = useErrorStore();
    const supabase = createClient();

    const fetchFriendRequests = async (userId: string, users: User[]) => {
        try {
            const { data: requestData, error: requestError } = await supabase
                .from('friend_requests')
                .select('sender_id')
                .eq('receiver_id', userId)
                .eq('status', 'pending');
    
            if (requestError) throw requestError;
            
            const senderIds = requestData?.map(r => r.sender_id) || [];
            
            const requestSenders = users.filter(u => senderIds.includes(u.id));
            setRequestSenders(requestSenders);
            
            console.log("Processed request senders:", requestSenders);
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Failed to fetch requests';
            setError(message);
            setRequestSenders([]);
        }
    };

    const initialize = async () => {
        console.log("Initialization started");

        try {
            // 1. Get current user
            const { data: { user }, error: authError } = await supabase.auth.getUser();
            
            if (authError) throw authError;
            if (!user) {
                setError("No user exists!");
                return false;
            }

            // 2. Set user data in store
            setUser({
                id: user.id,
                email: user.email || "",
                full_name: user.user_metadata?.full_name || "",
                avatar_url: user.user_metadata?.avatar_url || "",
                username: user.user_metadata?.username || "",
                headline: user.user_metadata?.headline || "",
                bio: user.user_metadata?.bio || "",
                created_at: user.created_at,
            });

            // 3. Fetch all users
            const { data: profiles, error: profilesError } = await supabase
                .from('profiles')
                .select('*');

            if (profilesError) throw profilesError;
            if (!profiles || profiles.length === 0) {
                setError("No users found in database");
                return false;
            }

            setAllUsers(profiles);
            // 4. Fetch friends
            const { data: friendIds, error: friendsError } = await supabase
                .from('friends')
                .select('friend_id')
                .eq('user_id', user.id);

            if (friendsError) throw friendsError;

            const friends = profiles.filter(profile => 
                friendIds?.some(friend => friend.friend_id === profile.id)
            );
            setMyFriends(friends || []);

            // 5. Fetch friend requests
            await fetchFriendRequests(user.id, profiles); 

            return true;
        } catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            setError(message);
            console.error("Initialization error:", error);
            return false;
        }
    };

    // Run initialization on mount
    useEffect(() => {
        initialize();
    }, []);

    return { initialize };
};