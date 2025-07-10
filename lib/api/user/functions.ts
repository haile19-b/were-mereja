import { useUserStore } from "@/lib/store/zustand";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

const {setAllUsers} = useUserStore();

export const fetchAllUsers = async()=>{
    try {
        const {data, error} = await supabase.from('profiles').select('*')
        if(error){
            return {error:error,success:false}
        }

        console.log(data)

        setAllUsers(data)

        return {data:data,success:true};

    } catch (error) {
        return {error:error,success:false}
    }
}

const Initialise = ()=>{
    
}