import Image from 'next/image';

export default function Home() {
  return (
    <main className="min-h-screen py-20">
      <div className="w-full max-w-[600px] mx-auto flex flex-col gap-y-20">
        
        <div className="px-[10%]">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi.
          </p>
        </div>

        <div className="px-[10%]">
          <p>
            Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue.
          </p>
        </div>

        <div>
          <Image
            src="https://placehold.co/600x450.png"
            alt="A generic placeholder logo"
            width={600}
            height={450}
            className="w-full h-auto"
            data-ai-hint="logo placeholder"
          />
        </div>

        <div className="px-[10%]">
          <p>
            Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales.
          </p>
        </div>

        <div>
          <Image
            src="https://placehold.co/600x450.png"
            alt="A generic placeholder logo"
            width={600}
            height={450}
            className="w-full h-auto"
            data-ai-hint="logo placeholder"
          />
        </div>

        <div className="px-[10%]">
          <p>
            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh. Mauris ac mauris sed pede pellentesque fermentum. Maecenas adipiscing ante non diam.
          </p>
        </div>

      </div>
    </main>
  );
}
