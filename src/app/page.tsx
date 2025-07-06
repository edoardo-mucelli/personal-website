import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <main className="min-h-screen py-20" role="main">
      <div className="w-4/5 max-w-[600px] mx-auto flex flex-col gap-y-20">

        <div className="text-[12px] font-light px-[20%] mt-40 flex flex-col items-start gap-y-1">
           <Image
 src="/media/Memoji 1.png"
 alt="My Memoji"
 width={36} // Adjust based on desired size relative to text lines
 height={36} // Adjust based on desired size relative to text lines
 className="mb-2 h-auto" // float-left for left alignment, mr-4 for spacing
           />
          <p className="text-center">
            Hi! This is my website, made with love for people interested on me.
            Scrolling down there&apos;s my quick story but if you are here for
            direct information, the buttons below will guide you to my Resume
            and full case studies.
          </p>
        </div>

        <div className="flex justify-center gap-4 mb-40">
          <Button variant="outline" size="default" asChild aria-label="View Resume PDF">
 <a href="/media/Resume_Edoardo Mucelli.pdf" target="_blank" rel="noopener noreferrer">
            Resume
 </a>
          </Button>
          <Button variant="outline" size="default" asChild aria-label="View Case Studies on Notion">
            <a href="https://edoardomucelli.notion.site/Portfolio-content-manager-1a8c727fd3ff808ab12fe647e888e809?source=copy_link" target="_blank" rel="noopener noreferrer">
              Case Studies</a></Button>
        </div>


        <div className="text-block">
          <p>
            I am <a href='https://www.linkedin.com/in/edoardomucelli'><u>Edoardo Mucelli</u></a> an Interaction Designer curious about relationships and reactions between humans, objects, nature (even artificial entities).
          </p>
          <p>&nbsp;</p>
          <p>
            Connecting the dots between different disciplines is the key to better design and the reason why I plan on being a generalist on my career as much as I can.
          </p>
          <p>&nbsp;</p>
          <p>At heart, I consider myself a builder. I like to figure out how things work and make the best out of them.</p>
        </div>



        <div className="media-hug-content w-full">
          <Image
            src="/media/pixel-character.png"
            alt="My Pixel art character"
            width={128}
            height={128}
            className="h-auto mx-auto"
            data-ai-hint="logo placeholder"
          />
        </div>



        <div className="text-block">
          <p>
            Formed as Industrial + Interaction Designer, I designed everything from bike frames to VR experiences and digital interfaces. Trained in <a href='https://www.design.unifi.it/'><u>Florence</u></a>, <a href='https://www.digitalinteractiondesign.polimi.it/'><u>Milan</u></a> and <a href='https://en.itu.dk/Programmes/MSc-Programmes/Digital-Design-and-Interactive-Technologies'><u>Copenhagen</u></a> with permanent grease stains from tinkering prototypes.
          </p>
        </div>



        <div className="media-hug-content w-full">
          <Image
            src="/media/academic-logos.svg"
            alt="Logos of all universities Edoardo attended"
            width={306}
            height={128}
            className="h-auto mx-auto"
            data-ai-hint="logo placeholder"
          />
        </div>



        <div className="text-block">
          <p>I work where human and machine intelligence meet, designing interfaces that allow both to coexist, adapt, and incrementally improve together. No grand revolutions, just daily interactions where technology respects human rhythms as much as humans learn its language.</p>
        </div>



        <div className="media-hug-content">
          <Image
            src="/media/digital-humanism.svg"
            alt="Human hand and robot hand touching fingers like in the creation painting"
            width={220}
            height={128}
            className="h-auto mx-auto"
            data-ai-hint="logo placeholder"
          />
        </div>



        <div className="text-block">
          <p>
            I've gone deep in every phase: from user research and product discovery to testing complex interfaces. Shadowing real users, running interviews, then turning those insights into working systems. Built UI systems in Figma, prototyped interactions through in Unity VR, and yes, even wrestled Arduino into submission when needed with a bit of vibecoding and GenAI to boost my process.
          </p>
        </div>



        <div className="media-hug-content">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-auto"
            data-ai-hint="video carousel"
            width={1280}  // Optional: ensures proper layout in Next.js
            height={720}
          >
            <source 
              src="/media/digital-interfaces-carousel.mp4" 
              type="video/mp4" 
            />
          </video>
        </div>



        <div className="text-block">
          <p>
            My goal is to explore interactions where humans and technology co-adapt. From prototyping AR interfaces to designing AI dialogues that feel less like commands, more like collaboration. My cross-disciplinary approach bridges theory and practice: currently researching natural interaction models for automotive contexts, while crafting data visualizations and prototypes that treat user and system as equal partners in the exchange.
          </p>
        </div>



        <div className="media-hug-content">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-auto"
            data-ai-hint="video carousel"
            width={1280}  // Optional: ensures proper layout in Next.js
            height={720}
          >
            <source 
              src="/media/interaction-design-carousel.mp4" 
              type="video/mp4" 
            />
          </video>
        </div>



        <div className="text-block">
        <p> Between finishing my MSc thesis on Natural Interaction in automotive AI and prepping for publication, I'm actively exploring creative and research roles where I can apply my experience to real design challenges.</p>        
        <p>&nbsp;</p>
          <p>
          A special thanks to those I've collaborated with and mentors who've guided me along the way. Your perspectives have shaped how I see design.</p>
        </div>



        <div className="media-hug-content">
          <Image
            src="/media/important-names.svg"
            alt="List of companies with which I've worked: EssilorLuxottica, Rayban Meta, Protezione Civile, Comune di Milano, EPFL + ECAL Lab"
            width={1873}
            height={744}
            className="h-auto mx-auto"
            data-ai-hint="logo placeholder"
          />
        </div>



        <div className="text-block">
        <p>You’ve probably noticed this site is a bit of a mix. I wanted to test the waters and see how I’d do (since vibe coding is everywhere anyway, why not embrace it?)</p>
        </div>

        <div className="text-block credits-text">
          <p><strong>Figma</strong> for concept</p>
          <p><strong>Firebase</strong> Studio as IDE</p>
          <p><strong>DeepSeek</strong> as debug buddy</p>
          <p><strong>GSAP</strong> for custom SVG animations</p>
          <p><strong>Pixie.haus</strong> AI for the amazing character</p>
        </div>



        <div className="text-block text-[12px]">
          <p>You can reach to me here :)</p>
          <p>
            <a href="https://www.linkedin.com/in/edoardomucelli"><u>LinkedIn</u></a>
            &nbsp;&nbsp;&nbsp;&nbsp; {/* Adding spacing */}
            <a href="https://www.instagram.com/edoardomucelli/"><u>Instagram</u></a>
            &nbsp;&nbsp;&nbsp;&nbsp; {/* Adding spacing */} 
            <a href="mailto:edoardomucelli@gmail.com"><u>Mail</u></a>
          </p>
        </div>

        <div className="text-block text-[10px] font-light text-right">
          <p>
            2025 Edoardo Mucelli. All rights reserved.
          </p>
        </div>

      </div>
    </main>
  );
}
