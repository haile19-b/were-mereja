import { createClient } from "@/utils/supabase/client";
import { useErrorStore, useUserStore } from "../store/zustand";

const {setAllUsers} = useUserStore();
const {setError} = useErrorStore();

export const Starter = async()=>{

    const supabase = createClient();

    const fetchAllUsers = async()=>{
        try {
            const {data, error} = await supabase.from('profiles').select('*')
            if(error){
                return {error:error,success:false}
            }
    
            if(!data || data.length === 0){
                setError("there is no user in the data")
            }
    
            setAllUsers(data)
    
        } catch (error) {
            return {error:error,success:false}
        }
    }

    fetchAllUsers();

    
}