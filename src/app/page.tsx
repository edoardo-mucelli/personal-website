import Image from 'next/image';
import PartyParagraph from '@/components/PartyParagraph';
import PartyColors from '@/components/PartyColors';
import PartySvg from '@/components/PartySvg';
import { Button } from '@/components/ui/button';
import ScrollFadeAffordance from '@/components/ScrollFadeAffordance';
import GSAPScrollReveal from '@/components/GSAPScrollReveal';
export default function Home() {
  return (
    <main className="min-h-screen pb-[16px]" role="main">
      <PartyColors />
      <GSAPScrollReveal>
        <div className="w-4/5 max-w-[600px] mx-auto flex flex-col gap-y-20">

        <div className="relative text-[12px] font-light px-[20%] flex flex-col justify-center items-center gap-y-1 min-h-[100vh] min-h-[100svh] [padding-block:clamp(2rem,6vw,6rem)]">
          <Image
            src="/media/Memoji 1.png"
            alt="My Memoji"
            width={36} // Adjust based on desired size relative to text lines
            height={36} // Adjust based on desired size relative to text lines
            className="mb-2 h-auto" // float-left for left alignment, mr-4 for spacing
          />
          <PartyParagraph className="text-center">
            Hi! This is my website, made with love for people interested in me.
          </PartyParagraph>
          <div className="absolute bottom-10 left-0 w-full flex flex-col items-center justify-center text-inherit">
            <ScrollFadeAffordance />
          </div>
        </div>

        <div className="text-block">
          <PartyParagraph>
            I am <a href='https://www.linkedin.com/in/edoardomucelli'><u>Edoardo Mucelli</u></a>, an Interaction Designer curious about the relationships and reactions between humans, objects, and the systems they inhabit, including artificial ones.
          </PartyParagraph>
          <PartyParagraph>&nbsp;</PartyParagraph>
          <PartyParagraph>
            Connecting the dots between disciplines is the key to better design, and the reason I plan on staying a generalist as long as it keeps making my work sharper.
          </PartyParagraph>
          <PartyParagraph>&nbsp;</PartyParagraph>
          <PartyParagraph>I like experimenting with new tools and approaches, including how GenAI can be integrated meaningfully into a design process.</PartyParagraph>
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
          <PartyParagraph>Currently I am the Product Designer at <a href="https://www.alice.tech/" target="_blank" rel="noopener noreferrer"><u>Alice</u></a> (previously Alice.tech) shaping a more intelligent way for students to learn. I mix high-level strategy with the CEO and hands-on prototyping. My job is owning the big picture to ensure we’re always innovating and shipping the best UX.</PartyParagraph>
        </div>

        <div className="media-hug-content w-full">
          <PartySvg
            src="/media/alice-logo.svg"
            alt="Alice company logo"
            width={206}
            height={58}
            className="h-auto mx-auto"
            data-ai-hint="logo placeholder"
          />
        </div>

        <div className="text-block">
          <PartyParagraph>
            Formed as an Industrial and Interaction Designer, I have designed everything from bike frames to VR experiences and digital interfaces. Trained in <a href='https://www.design.unifi.it/'><u>Florence</u></a>, <a href='https://www.digitalinteractiondesign.polimi.it/'><u>Milan</u></a> and <a href='https://en.itu.dk/Programmes/MSc-Programmes/Digital-Design-and-Interactive-Technologies'><u>Copenhagen</u></a>, with permanent grease stains from tinkering prototypes.
          </PartyParagraph>
        </div>

        <div className="media-hug-content w-full">
          <PartySvg
            src="/media/academic-logos.svg"
            alt="Logos of all universities Edoardo attended"
            width={306}
            height={128}
            className="h-auto mx-auto"
            data-ai-hint="logo placeholder"
          />
        </div>

        <div className="text-block">
          <PartyParagraph>I work where human and machine intelligence meet, designing interfaces that allow both to coexist, adapt, and improve together. No grand revolutions, just daily interactions where technology respects human rhythms as much as humans learn its language.</PartyParagraph>
        </div>



        <div className="media-hug-content">
          <PartySvg
            src="/media/digital-humanism.svg"
            alt="Human hand and robot hand touching fingers like in the creation painting"
            width={220}
            height={128}
            className="h-auto mx-auto"
            data-ai-hint="logo placeholder"
          />
        </div>



        <div className="text-block">
          <PartyParagraph>
            I have gone deep in every phase: from user research and product discovery to testing complex interfaces. Shadowing real users, running interviews, then turning those insights into working systems. Built UI systems in Figma, prototyped interactions in Unity VR, and used GenAI to boost and accelerate my process along the way.
          </PartyParagraph>
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
          <PartyParagraph>
            My goal is to explore interactions where humans and technology co-adapt. From AI dialogues that feel less like commands and more like collaboration, to complex flows where the system needs to earn the user's trust by showing its reasoning, not just its output. My cross-disciplinary approach bridges theory and practice, treating user and system as equal partners in the exchange.
          </PartyParagraph>
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
          <PartyParagraph>
            A special thanks to those I have collaborated with and the mentors who have guided me along the way. Your perspectives have shaped how I see design.
          </PartyParagraph>
        </div>



        <div className="media-hug-content">
          <PartySvg
            src="/media/important-names.svg"
            alt="List of companies with which I've worked: EssilorLuxottica, Rayban Meta, Protezione Civile, Comune di Milano, EPFL + ECAL Lab"
            width={1873}
            height={744}
            className="h-auto mx-auto"
            data-ai-hint="logo placeholder"
          />
        </div>



        <div className="text-block">
          <PartyParagraph>This site is a bit of a mix. Built in Next.js, styled with Tailwind, animated with GSAP, and with a bit of AI assistance to move faster.</PartyParagraph>
        </div>

        <div className="text-block credits-text">
          <PartyParagraph><strong>Firebase</strong> Studio as IDE</PartyParagraph>
          <PartyParagraph><strong>DeepSeek</strong> as debug buddy</PartyParagraph>
          <PartyParagraph><strong>GSAP</strong> for custom SVG animations</PartyParagraph>
          <PartyParagraph><strong>Pixie.haus</strong> AI for the amazing character</PartyParagraph>
        </div>



        <div className="text-block text-[12px] footer-anim">
          <PartyParagraph>You can reach to me here :)</PartyParagraph>
          <PartyParagraph>
            <a href="https://www.linkedin.com/in/edoardomucelli"><u>LinkedIn</u></a>
            &nbsp;&nbsp;&nbsp;&nbsp; {/* Adding spacing */}
            <a href="https://www.instagram.com/edoardomucelli/"><u>Instagram</u></a>
            &nbsp;&nbsp;&nbsp;&nbsp; {/* Adding spacing */}
            <a href="mailto:edoardomucelli@gmail.com"><u>Mail</u></a>
          </PartyParagraph>
        </div>

        <div className="text-block text-[10px] font-light text-right footer-anim">
          <PartyParagraph>
            2026 Edoardo Mucelli. All rights reserved.
          </PartyParagraph>
        </div>

        </div>
      </GSAPScrollReveal>
    </main>
  );
}
