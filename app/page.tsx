'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import {MotionProps, animate, easeInOut, motion, useAnimation, useInView} from 'framer-motion'
import { Footer } from "@/components/component/footer"
import { twMerge } from "tailwind-merge"

const PreorderForm = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isTop, setIsTop] = useState(true);
  const [isLayoutHover, setIsLayoutHover] = useState(false);
  const ref = useRef(null);
  const layoutRef = useRef<HTMLDivElement>(null);
  const layout = layoutRef.current;
  const isInView = useInView(ref, { once: true })
  const mainControls = useAnimation();
  const layoutControls = useAnimation();

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setDarkMode(darkModeMediaQuery.matches);
    const handleChange = (e: any) => setDarkMode(e.matches);
    darkModeMediaQuery.addEventListener('change', handleChange);
    return () => darkModeMediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsTop(window.scrollY < 10);
    };

    if (isInView) {
      mainControls.start("animate");
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isInView, mainControls]);

  useEffect(() => {
    const handleMouseEnter = () => setIsLayoutHover(true);
    const handleMouseLeave = () => setIsLayoutHover(false);

    const layout = layoutRef.current;
    if (layout) {
      layout.addEventListener('mouseenter', handleMouseEnter);
      layout.addEventListener('mouseleave', handleMouseLeave);
    }
    return () => {
      if (layout) {
        layout.removeEventListener('mouseenter', handleMouseEnter);
        layout.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  useEffect(() => {
    if (isLayoutHover) {
      layoutControls.start("animate");
    } else {
      layoutControls.start("initial");
    }
  }, [isLayoutHover, layoutControls]);

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
    <div className={`${darkMode && "dark"} dark-mode`}>
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
          <section className="relative top-[50vh] translate-y-[-50%] w-full h-screen flex items-center justify-center z-10">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="space-y-2 animate-slideInFromBottom">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none dark:text-zinc-50">
                    Digital <span className="drop-shadow-sm-primary dark:drop-shadow-md-primary text-primary-blue">Creator</span>
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
            {isTop && (
              <div className="rounded-sm absolute bottom-[75px] animate-bounce">
                <a href="#bento" className={`scroll-link ${!isTop ? 'animate-fadeOut' : ''}`}>
                  <svg className="dark:fill-zinc-50 fill-zinc-800 w-[30px]"xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/></svg>
                </a>
              </div>
            )}
          </section>
          <section className="my-[15vh] z-20 relative" id="bento">
            <div ref={ref}>
            <motion.div
            initial="initial"
            animate={mainControls}
            transition={{
              staggerChildren: 0.1
            }}
            className="mx-20 grid grid-cols-12 grid-rows-4 gap-4 text-center h-[70vh] my-10 backdrop-blur-sm">
              <Block className="col-span-3 group">
                <div className="flex justify-between items-center h-full">
                  <div className="w-[50%] text-sm text-left">
                    <h2 className="text-xl font-bold dark:text-zinc-50">Website Copy</h2>
                    <p className="text-zinc-500">
                      <span className="dark:text-primary-blue text-primary-blue font-semibold">We</span> generate exciting and tailored content for your digital courses or products.
                    </p>
                  </div>
                  <div className="flex justify-center float-right">
                    <svg width="2500" height="2500" fill="none" xmlns="http://www.w3.org/2000/svg" stroke-width="1.5" className="h-32 w-32 dark:text-zinc-50 text-zinc-900 group-hover:drop-shadow-md-primary group-hover:stroke-primary-blue stroke-1 group-hover:animate-fadeIn animate-fadeOut" viewBox="-0.17090198558635983 0.482230148717937 41.14235318283891 40.0339509076386"><text x="-9999" y="-9999">ChatGPT</text><path className="w-32 h-32" d="M37.532 16.87a9.963 9.963 0 0 0-.856-8.184 10.078 10.078 0 0 0-10.855-4.835A9.964 9.964 0 0 0 18.306.5a10.079 10.079 0 0 0-9.614 6.977 9.967 9.967 0 0 0-6.664 4.834 10.08 10.08 0 0 0 1.24 11.817 9.965 9.965 0 0 0 .856 8.185 10.079 10.079 0 0 0 10.855 4.835 9.965 9.965 0 0 0 7.516 3.35 10.078 10.078 0 0 0 9.617-6.981 9.967 9.967 0 0 0 6.663-4.834 10.079 10.079 0 0 0-1.243-11.813zM22.498 37.886a7.474 7.474 0 0 1-4.799-1.735c.061-.033.168-.091.237-.134l7.964-4.6a1.294 1.294 0 0 0 .655-1.134V19.054l3.366 1.944a.12.12 0 0 1 .066.092v9.299a7.505 7.505 0 0 1-7.49 7.496zM6.392 31.006a7.471 7.471 0 0 1-.894-5.023c.06.036.162.099.237.141l7.964 4.6a1.297 1.297 0 0 0 1.308 0l9.724-5.614v3.888a.12.12 0 0 1-.048.103l-8.051 4.649a7.504 7.504 0 0 1-10.24-2.744zM4.297 13.62A7.469 7.469 0 0 1 8.2 10.333c0 .068-.004.19-.004.274v9.201a1.294 1.294 0 0 0 .654 1.132l9.723 5.614-3.366 1.944a.12.12 0 0 1-.114.01L7.04 23.856a7.504 7.504 0 0 1-2.743-10.237zm27.658 6.437l-9.724-5.615 3.367-1.943a.121.121 0 0 1 .113-.01l8.052 4.648a7.498 7.498 0 0 1-1.158 13.528v-9.476a1.293 1.293 0 0 0-.65-1.132zm3.35-5.043c-.059-.037-.162-.099-.236-.141l-7.965-4.6a1.298 1.298 0 0 0-1.308 0l-9.723 5.614v-3.888a.12.12 0 0 1 .048-.103l8.05-4.645a7.497 7.497 0 0 1 11.135 7.763zm-21.063 6.929l-3.367-1.944a.12.12 0 0 1-.065-.092v-9.299a7.497 7.497 0 0 1 12.293-5.756 6.94 6.94 0 0 0-.236.134l-7.965 4.6a1.294 1.294 0 0 0-.654 1.132l-.006 11.225zm1.829-3.943l4.33-2.501 4.332 2.5v5l-4.331 2.5-4.331-2.5V18z" fill="currentColor"/></svg>
                  </div>
                </div>
              </Block>
              <Block className="col-span-4">
                <div className="flex justify-between items-center h-full" ref={layoutRef}>
                  <div className="w-[30%] text-sm text-left">
                    <h2 className="text-xl font-bold dark:text-zinc-50">Layout</h2>
                    <p className="text-zinc-500">
                      <span className="dark:text-primary-blue text-primary-blue font-semibold">We</span> designs the perfect layouts for your digital products.
                    </p>
                  </div>
                  <div className="flex justify-center float-right">
                    <div className="w-60 h-40 bg-zinc-200 dark:bg-zinc-800 rounded-md p-3">
                      <div className="flex justify-between">
                        <motion.div
                          variants={{
                            initial: {
                              y: 0,
                              x: 0,
                            },
                            animate: {
                              y: 56,
                              x: 72,
                            }
                          }}
                          transition={{ duration: 0.4 }}
                          initial="initial"
                          animate={layoutControls}
                          className="w-36 h-20 bg-zinc-900 rounded-md"/>
                        <motion.div
                          variants={{
                            initial: {
                              y: 0,
                              x: 0,
                            },
                            animate: {
                              y: 56,
                              x: -160,
                            }
                          }}
                          transition={{ duration: 0.4, delay: 0.01 }}
                          initial="initial"
                          animate={layoutControls}
                          className="w-14 h-20 bg-zinc-900 rounded-md"/>
                      </div>
                      <motion.div
                        variants={{
                          initial: {
                            y: 0,
                          },
                          animate: {
                            y: -92,
                          }
                        }}
                        transition={{ duration: 0.4, delay: 0.01 }}
                        initial="initial"
                      animate={layoutControls}
                        className="w-full h-11 mt-3 bg-zinc-900 rounded-md"></motion.div>
                    </div>
                  </div>
                </div>
              </Block>
              <Block className="col-span-2 row-span-2"/>
              <Block className="col-span-3 cursor-blue">
                <div className="text-sm text-left w-44">
                      <h2 className="text-xl font-bold dark:text-zinc-50">Export</h2>
                      <p className="text-zinc-500">
                        <span className="dark:text-primary-blue text-primary-blue font-semibold">You</span> can export your digital products to Notion or as HTML, CSS, and JS files.
                      </p>
                </div>
                <div className="absolute min-full bottom-8 left-1/2 -translate-x-1/2">
                  <Button className="w-36 h-17 font-bold text-xl cursor-blue dark:hover:shadow-lg-white dark:shadow-md-white hover:shadow-lg shadow-md">export</Button>
                </div>
              </Block>
              <Block className="col-span-7 row-span-3"/>
              <Block className="col-span-3 row-span-3"/>
              <Block className="col-span-2 row-span-2"/>
            </motion.div>
            </div>
          </section>
        </main>
        <div className="animate-none">
          <div className="absolute top-[30vh] left-[30vw] w-60 h-60 bg-primary-blue rounded-full filter blur-3xl dark:opacity-40 opacity-70 -z-10 dark:z-0"></div>
          <div className="absolute top-[40vh] right-[15vw] w-80 h-80 bg-primary-blue rounded-full filter blur-3xl dark:opacity-30 opacity-50 -z-10 dark:z-0"></div>
          <div className="absolute top-[65vh] left-[35vw] w-80 h-80 bg-primary-blue rounded-full filter blur-3xl opacity-60 -z-10 dark:z-0"></div>
          <div className="absolute top-[105vh] left-[15vw] w-80 h-80 bg-primary-blue rounded-full filter blur-3xl opacity-70 -z-10 dark:z-0"></div>
          <div className="absolute top-[130vh] right-[10vw] w-80 h-80 bg-primary-blue rounded-full filter blur-3xl opacity-50 -z-10 dark:z-0"></div>
        </div>
        <Footer/>
      </div>
    </div>
  )
}

type Props = {
  className?: string,
} & MotionProps;


const Block = ({ className, ...rest }: Props) => {
  return (
    <motion.div
      variants={{
        initial: {
          scale:0.5,
          y: 50,
          opacity: 0,
        },
        animate: {
          scale:1,
          y: 0,
          opacity: 1,
        }
      }}
      className={twMerge(
        "animate-none col-span-4 rounded-lg border dark:border-zinc-700 border-zinc-300 dark:bg-zinc-800 bg-zinc-200 p-6 backdrop-blur-sm bg-opacity-20 dark:bg-opacity-60 dark:hover:border-zinc-600 hover:border-zinc-400",
        className
      )}
      {...rest}
    />
  );
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

export default PreorderForm