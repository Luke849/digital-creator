import { EmailTemplate } from "@/components/component/email-template";
import { createClient } from "@/utils/supabase/client";
import { NextResponse } from "next/server";
import { mailOptions, transporter } from '@/config/nodemailer';



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
  try {
    await transporter.sendMail({
      ...mailOptions,
      to: email,
      subject: "Welcome to the Waitlist of Digtial Creator",
      html: "<h1>HTML</h1>"
    })

    return { success: true, message: 'Sent welcome email successfully' };
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
  const senWelcomeEmail = await sendEmail(email);
  
  if (saveEmailToWaitlistResult.success) {
    return NextResponse.json({ message: saveEmailToWaitlistResult.message }, { status: 200 });
  } else if (!senWelcomeEmail.success) {
    return NextResponse.json({ message: senWelcomeEmail.message }, { status: 500 });
  } else {
    return NextResponse.json({ error: saveEmailToWaitlistResult.message }, { status: 500 });
  }
}
