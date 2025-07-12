import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export const sendFriendRequest = async (receiver_id: string, sender_id: string) => {
    try {
      const { data, error } = await supabase
        .from('friend_requests')
        .insert({ receiver_id, sender_id })
  
      if (error) {
        return { success: false, error }
      }
  
      return { success: true, data }
    } catch (error) {
      return { success: false, error }
    }
  }

  export const handleRequestResponse = async (senderId: string, accept: boolean) => {
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      if (userError || !user) {
        return { success: false, error: userError || new Error('User not authenticated') }
      }
  
      // Update friend request status
      const { data: friend, error: updateError } = await supabase
        .from('friend_requests')
        .update({ status: accept ? 'accepted' : 'declined' })
        .eq('sender_id', senderId)
        .eq('receiver_id', user.id)
        .select()
  
      if (updateError) {
        return { success: false, error: updateError }
      }
  
      // If accepted, create friendship relationship
      if (accept) {
        // First insert - current user's perspective (allowed by RLS)
        const { error: friendError1 } = await supabase
          .from('friends')
          .insert({ user_id: user.id, friend_id: senderId })
  
        if (friendError1) {
          return { success: false, error: friendError1 }
        }
  
        // Second insert - friend's perspective
        // We need to use a stored procedure or function with SECURITY DEFINER
        // to bypass RLS for this operation
        const { error: rpcError } = await supabase.rpc('add_friend_reciprocal', {
          current_user_id: user.id,
          friend_id: senderId
        })
  
        if (rpcError) {
          // Rollback the first insert if the second fails
          await supabase
            .from('friends')
            .delete()
            .eq('user_id', user.id)
            .eq('friend_id', senderId)
          return { success: false, error: rpcError }
        }
      }
  
      return { success: true, data: friend }
  
    } catch (error) {
      console.error('Error responding to friend request:', error)
      return { 
        success: false, 
        error: error instanceof Error ? error : new Error('Unknown error') 
      }
    }
  }