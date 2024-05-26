import { createClient } from "@/utils/supabase/client";
import { NextResponse } from "next/server"

export async function POST(request: Request) {
    const data = await request.json();
    const email = data.email;

    if (!email || !email.includes('@')) {
        return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }
    
    const supabase = createClient();

    try {
        const { data, error } = await supabase
          .from('waitlist')
          .insert([{ email }])
  
        if (error) {
          throw error
        }

        return NextResponse.json({ message: 'Email added to waitlist successfully' }, { status: 200 })
      } catch (error) {
        console.error('Error inserting email into waitlist:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
      }
}