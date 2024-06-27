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
  const [isCustomHover, setIsCustomHover] = useState(false);
  const ref = useRef(null);
  const layoutRef = useRef<HTMLDivElement>(null);
  const customRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true })
  const mainControls = useAnimation();
  const layoutControls = useAnimation();
  const customControls = useAnimation();

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

  useEffect(() => {
    const handleMouseEnter = () => setIsCustomHover(true);
    const handleMouseLeave = () => setIsCustomHover(false);

    const custom = customRef.current;
    if (custom) {
      custom.addEventListener('mouseenter', handleMouseEnter);
      custom.addEventListener('mouseleave', handleMouseLeave);
    }
    return () => {
      if (custom) {
        custom.removeEventListener('mouseenter', handleMouseEnter);
        custom.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  useEffect(() => {
    if (isCustomHover) {
      customControls.start("animate");
    } else {
      customControls.start("initial");
    }
  }, [isCustomHover, customControls]);

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
            className="mx-20 pt-20 grid grid-cols-12 grid-rows-4 gap-4 text-center lg:h-[80vh] my-10 backdrop-blur-sm">
              <Block className="col-span-4 group">
                <div className="flex justify-between items-center h-full">
                  <div className="w-[50%] text-sm text-left">
                    <h2 className="text-xl font-bold dark:text-zinc-50">Website Copy</h2>
                    <p className="text-zinc-500">
                      <span className="dark:text-primary-blue text-primary-blue font-semibold">We</span> generate exciting and tailored content for your digital products.
                    </p>
                  </div>
                  <div className="flex justify-center float-right">
                    <svg  width="156" height="139" viewBox="0 0 156 139" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path className="fill-zinc-950 dark:fill-zinc-50 group-hover:animate-flicker group-hover:duration-700 group-hover:drop-shadow-lg-primary" d="M91.451 62.8907C99.4968 55.392 102.956 46.2199 103.765 36.0001C103.905 34.2324 103.952 32.458 104.102 30.6911C104.24 29.0612 105.143 27.9651 106.976 28.0008C108.822 28.0368 109.651 29.2581 109.781 30.8179C110.032 33.8522 109.935 36.8946 110.385 39.9343C113.053 57.9439 126.621 70.8046 145.902 73.5621C148.014 73.8641 150.128 73.9477 152.24 74.1416C154.672 74.3649 156.008 75.448 156 77.1096C155.992 78.7642 154.672 79.5794 152.071 79.7568C138.171 80.7051 126.234 85.2718 117.87 96.2228C113.487 101.961 111.395 108.516 110.422 115.422C110.106 117.67 109.894 119.926 109.927 122.206C109.963 124.688 108.842 126.048 107.004 125.999C105.274 125.952 104.234 124.61 104.205 122.272C104.134 116.565 103.354 110.961 101.349 105.551C96.8409 93.3897 87.7512 85.6858 74.7399 81.8263C70.4434 80.5519 66.038 79.8958 61.5387 79.7295C59.1521 79.6413 57.9414 78.7066 58.0022 76.9723C58.0721 74.9753 59.4542 74.3963 61.3579 74.2826C69.4197 73.8009 77.091 72.0466 84.1096 68.1492C86.7394 66.6889 89.1274 64.9585 91.451 62.8907Z" fill="black"/>
                      <path className="fill-zinc-950 dark:fill-zinc-50 group-hover:animate-flicker group-hover:delay-200 group-hover:duration-700 group-hover:drop-shadow-lg-primary" d="M45.1955 46.5123C42.9562 36.9009 36.2213 31.264 25.9348 30.235C25.0053 30.142 24.067 30.0734 23.1546 29.8954C21.8996 29.6507 21.128 28.9051 21.0134 27.6758C20.8973 26.4302 21.5386 25.5788 22.7722 25.2088C23.5115 24.9871 24.3136 24.8947 25.0938 24.8554C36.6183 24.2746 45.2415 16.0186 45.6288 5.17541C45.6624 4.23214 45.6182 3.27637 45.7692 2.34917C46.0022 0.918257 46.9185 -0.0453681 48.5201 0.00164728C50.1039 0.0481404 50.9467 0.960666 51.0741 2.48252C51.4177 6.58424 51.7652 10.6952 53.9106 14.4179C57.7024 20.9976 63.8816 24.0432 71.5648 24.8359C71.993 24.8801 72.4282 24.8618 72.8577 24.8983C74.6246 25.0483 76.0367 25.7488 75.9993 27.5724C75.963 29.3402 74.6222 30.2011 72.8269 30.2377C68.7812 30.3202 64.9972 31.2935 61.5073 33.1572C54.3665 36.9707 51.6265 43.1675 51.0543 50.486C51.0017 51.1577 51.0771 51.8413 50.9862 52.5066C50.8089 53.804 50.2466 54.9128 48.6616 54.9949C47.0209 55.0798 46.1573 54.1028 45.862 52.7045C45.4431 50.7207 45.8665 48.6514 45.1955 46.5123Z" fill="black"/>
                      <path className="fill-zinc-950 dark:fill-zinc-50 group-hover:animate-flicker group-hover:delay-300 group-hover:duration-700 group-hover:drop-shadow-lg-primary" d="M54.0499 106.303C57.6399 106.506 58.8869 107.2 58.9936 108.982C59.1028 110.808 57.8304 111.586 54.5638 111.935C45.7706 112.874 38.5761 116.196 34.6528 124.094C32.9769 127.467 32.2686 131.087 32.1883 134.802C32.1511 136.523 32.1668 138.298 29.763 138.579C27.9293 138.794 26.6669 137.39 26.5204 134.869C26.3184 131.394 25.9702 127.964 24.5036 124.721C20.8417 116.625 13.9216 112.867 4.93253 111.877C4.01642 111.776 3.07368 111.777 2.18803 111.567C0.633791 111.197 -0.158476 110.156 0.0264257 108.673C0.20073 107.276 1.19877 106.49 2.69708 106.437C5.02422 106.355 7.28615 105.926 9.51774 105.374C19.2632 102.963 25.7824 95.3903 26.3508 85.9044C26.4284 84.6096 26.5729 83.3174 26.7218 82.0276C26.895 80.5277 27.7749 79.5929 29.4179 79.6006C31.138 79.6087 32.0982 80.5426 32.2723 82.1497C32.4975 84.2273 32.5099 86.3455 32.9648 88.3774C35.2415 98.5477 41.8042 104.355 52.7252 106.037C53.1048 106.096 53.4783 106.189 54.0499 106.303Z" fill="black"/>
                    </svg>
                  </div>
                </div>
              </Block>
              <Block className="col-span-5">
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
                          className="w-36 h-20 bg-zinc-50 dark:bg-zinc-900 rounded-md"/>
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
                          className="w-14 h-20 bg-zinc-50 dark:bg-zinc-900 rounded-md"/>
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
                        className="w-full h-11 mt-3 bg-zinc-50 dark:bg-zinc-900 rounded-md"></motion.div>
                    </div>
                  </div>
                </div>
              </Block>
              <Block className="col-span-3 row-span-3"> 
                <div className="flex flex-col items-center justify-center min-h-full dark:text-zinc-50 font-semibold">
                  <div>Mobile Mockup</div>
                  <div>coming soon...</div>
                </div>
              </Block>
              <Block className="col-span-7 row-span-3">
                <div className="flex flex-col items-center justify-center min-h-full dark:text-zinc-50 font-semibold">
                  <div>Desktop Mockup</div>
                  <div>coming soon...</div>
                </div>
              </Block>
              <Block className="col-span-2 row-span-3 p-0">
                <div className="w-full h-full" ref={customRef}>
                  <div className="text-sm text-left w-44 p-6">
                  <h2 className="text-xl font-bold dark:text-zinc-50">Customize</h2>
                  <p className="text-zinc-500">
                    <span className="dark:text-primary-blue text-primary-blue font-semibold">You</span> can easily customize every page to align with your unique brand.
                  </p>
                </div>
                <div className="mt-[3vh] p-0 h-96">
                  <div className="relative flex items-center justify-center w-full bg-transparent">
                    <motion.div
                    variants={{
                      "initial": { width: '33%', height: '10vh'},
                      "animate": { width: '50%', height: '30vh'}
                    }}
                     animate={customControls}
                    className="absolute w-1/3 h-[10vh] border border-dashed border-zinc-950 dark:border-zinc-50 top-0 left-6">
                      <span className="absolute -top-1 -left-1 w-2 h-2 bg-zinc-950 dark:bg-zinc-50 rounded-sm"></span>
                      <span className="absolute -top-1 -right-1 w-2 h-2 bg-zinc-950 dark:bg-zinc-50 rounded-sm"></span>
                      <span className="absolute -bottom-1 -left-1 w-2 h-2 bg-zinc-950 dark:bg-zinc-50 rounded-sm"></span>
                      <span className="absolute -bottom-1 -right-1 w-2 h-2 bg-zinc-950 dark:bg-zinc-50 rounded-sm"></span>
                      <div className="absolute bottom-0 right-0 translate-x-full translate-y-full">
                        <img src="cursor.png" alt="cursor" className="bg-transparent"/>
                      </div>
                    </motion.div>
                  </div>
                </div>
                </div>
                
              </Block>
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