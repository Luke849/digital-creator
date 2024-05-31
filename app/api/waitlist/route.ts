import { EmailTemplate } from "@/components/component/email-template";
import { createClient } from "@/utils/supabase/client";
import { NextResponse } from "next/server";
import { Resend } from 'resend';


async function saveEmailToWaitlist(email: string) {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from('waitlist')
      .insert([{ email }]);

    if (error) {
      throw error;
    }

    return { success: true, message: 'Email added to waitlist successfully' };
  } catch (error) {
    console.error('Error inserting email into waitlist:', error);
    return { success: false, message: 'Internal Server Error' };
  }
}



async function sendEmail(email: string) {

const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const { data, error } = await resend.emails.send({
      from: 'Digital Creator <onboarding@resend.dev>',
      to: [`${email}`],
      subject: 'Welcome to the Waitlist of Digtial Creator',
      react: EmailTemplate(),
    });

    if (error) {
      return { success: false, message: 'Internal Server Error' };
    }

    return { success: true, message: 'Email added to waitlist successfully' };
  } catch (error) {
    return { success: false, message: 'Internal Server Error' };
  }
}

export async function POST(request: Request) {
  const data = await request.json();
  const email = data.email;

  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
  }

  const saveEmailToWaitlistResult = await saveEmailToWaitlist(email);
  const sendEmailResult = await sendEmail(email);


  if (saveEmailToWaitlistResult.success) {
    return NextResponse.json({ message: saveEmailToWaitlistResult.message }, { status: 200 });
  } else if (sendEmailResult.success) {
    return NextResponse.json({ message: sendEmailResult.message }, { status: 200 });
  } else {
    return NextResponse.json({ error: saveEmailToWaitlistResult.message }, { status: 500 });
  }
}
