import Image from 'next/image';

export default function Home() {
  return (
    <main className="min-h-screen py-20">
      <div className="w-full max-w-[600px] mx-auto flex flex-col gap-y-20">
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

        <div className="media-hug-content">
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

        <div className="media-hug-content">
          <Image
            src="/media/academic-logos.svg"
            alt="Logos of all universities Edoardo attended"
            width={306}
            height={128}
            className="w-full h-auto"
            data-ai-hint="logo placeholder"
          />
        </div>

        <div className="text-block">
          <p>
            I work where human and machine intelligence meet, designing interfaces that allow both to coexist, adapt, and incrementally improve together. No grand revolutions, just daily interactions where technology respects human rhythms as much as humans learn its language.
          </p>
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
          <Image
            src="/media/digital-interfaces-carousel.gif"
            alt="Video carousel of digital interfaces creted by Edoardo"
            width={1280}
            height={720}
            className="w-full h-auto"
            data-ai-hint="logo placeholder"
          />
        </div>

        <div className="text-block">
          <p>
            I explore interaction frontiers where humans and technology co-adapt — from prototyping AR interfaces to designing AI dialogues that feel less like commands, more like collaboration. My cross-disciplinary approach bridges theory and practice: currently researching natural interaction models for automotive contexts, while crafting data visualizations and prototypes that treat user and system as equal partners in the exchange.
          </p>
        </div>
      </div>
    </main>
  );
}
