'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useState } from "react"
import {motion} from 'framer-motion'
import { Footer } from "@/components/component/footer"

const preorderForm = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const postEmailToApi = async () => {
    try{
      setLoading(true);
      const response = await fetch("/api/waitlist",{
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
          email: userEmail,
        })
      });
    }
    catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
      setUserEmail("")
    }
  }

  const sendConfiramtionMail = async () => {

  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    postEmailToApi();
    sendConfiramtionMail();
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  }

  return (
    <div className={`${darkMode && "dark"}`}>
      <div className="relativ flex flex-col min-h-screen animate-fadeIn dark:bg-zinc-900">
        <header className="px-4 lg:px-6 h-14 pt-4 flex items-center animate-slideInFromTop">
          <Link className="flex items-center justify-center" href="/">
            <MountainIcon className="h-6 w-6 dark:text-zinc-50" />
            <p className="sr-only text-slate-950">Digital Creator</p>
          </Link>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <div 
            onClick={toggleDarkMode}
            className="flex h-6 w-12 cursor-pointer rounded-full border p-[1px] border-zinc-900 bg-zinc-900 dark:order-zinc-50 dark:bg-zinc-50 justify-start dark:justify-end">
              <motion.div 
                className="h-5 w-5 rounded-full bg-zinc-50 dark:bg-zinc-900"
                layout
                transition={{
                    type:'spring',
                    stiffness: 700,
                    damping: 30
                  }}
                />
            </div>
          </nav>
        </header>
        <main className="flex-1">
          <section className="w-full flex items-center justify-center py-12 md:py-24 lg:py-32 xl:py-48">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="space-y-2 animate-slideInFromBottom">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none dark:text-zinc-50">
                    Digital Creator
                  </h1>
                  <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-zinc-400 z-10">
                    Digital Creator helps you make online courses and products easily. Our tool makes it 
                    simple and fun to build what you need. Join the waitlist now to be one of the first
                     to try it out!
                  </p>
                  <h3 className="font-bold text-xl dark:text-zinc-50">Join our waitlist now</h3>
                </div>
                <div className="w-full max-w-md space-y-4">
                  <form className="grid gap-4 mt-10" onSubmit={handleSubmit}>
                    <div className="grid gap-2">
                    <Input 
                        id="email" 
                        placeholder="Email" 
                        type="email" 
                        value={userEmail} 
                        onChange={(e) => setUserEmail(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit" disabled={loading}>
                      {loading ? "Loading..." : "Join waitlist"}
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </main>
        <div className="animate-none">
          <div className="absolute top-[25vh] left-[25vw] w-80 h-80 bg-zinc-500 rounded-full filter blur-3xl opacity-60 z-0"></div>
          <div className="absolute top-[55vh] right-[40vw] w-80 h-80 bg-zinc-500 rounded-full filter blur-3xl opacity-90 z-0"></div>
          <div className="absolute top-[40vh] right-[15vw] w-80 h-80 bg-zinc-500 rounded-full filter blur-3xl opacity-70 z-0"></div>
        </div>
        <Footer/>
      </div>
    </div>
  )
}


function MountainIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}

export default preorderForm