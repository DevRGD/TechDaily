import Image from 'next/image';
import Typography from '@/components/ui/Typography';
import Button from '@/components/ui/Button';

export default function AboutPage() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24 space-y-12">
          <div className="space-y-6 text-left">
            <Typography variant="h1" className="uppercase text-left">
              Our Mission
            </Typography>
            <Typography variant="lead" className="max-w-3xl text-left">
              Leading the conversation on the intersection of technology, humanity, and the future. Our mission is to
              provide deep insights and rigorous analysis in a digital-first era.
            </Typography>
          </div>

          <div className="relative aspect-16/6 bg-secondary rounded-sm overflow-hidden shadow-lg grayscale hover:grayscale-0 transition-all duration-700">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqogRt46Gbu4dIWiS625-Bj-pQWkTxJ3urfQ9YY7BHs_Cy4bjRTe-Ny-UKqqy4K544MKQi_lUa_ORGbtLUaUeFb9osXu6lQNuq0f1u_2rkJsiW3rpJ53XiWCxX6TZYjdcExj7o6rtYH6_1F_Rk7p0Gmn2rQDAKPvgBPmFMBim50vBwygXcAwTeLWPxaNjakXgdBNn38WGymeO50ZCAbZPLMmFpEfYjG84SkrZ0HZcljx6WT3t5TceT6r95pKQsXYMQQwID2xapO1rB"
              className="object-cover"
              alt="TechDaily Office"
              fill
              priority
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 journal-body">
            <div className="space-y-6">
              <Typography variant="h2">The TechDaily Story</Typography>
              <p>
                Founded in 2012, TechDaily was born out of a desire for a different kind of technology journalism. We
                didn&apos;t want to just report on specs and product launches; we wanted to explore the structural
                changes technology was weaving into the fabric of society.
              </p>
              <p>
                Today, with a global team of journalists, analysts, and researchers, we serve as the definitive
                authority for anyone navigating the complex landscape of AI, hardware innovation, and digital policy.
              </p>
            </div>
            <div className="space-y-6">
              <Typography variant="h2">Editorial Standards</Typography>
              <p>
                Integrity is the foundation of our work. Our journalists adhere to a strict ethical framework to ensure
                unbiased, fact-based reporting. We do not accept pay-for-play coverage, and our corrections policy is
                transparent and swift.
              </p>
              <Button className="uppercase tracking-widest font-bold">View Ethics Statement</Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
