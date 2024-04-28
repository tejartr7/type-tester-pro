import { user } from '@/utils/supabase/server';

const userdetails = async()=>{
    const userdetails = await user();
    return userdetails;
}
export {userdetails};