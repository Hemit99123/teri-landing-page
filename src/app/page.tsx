import { ArrowRight, Target, Zap, RefreshCw } from "lucide-react"
import Image from "next/image"
import Link from "next/link";
import { ReactNode } from "react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md">
        <div className="container mx-auto flex items-center justify-between py-4">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-white rounded-full"></div>
            <span className="text-xl font-bold">TERI</span>
          </div>
          <div className="hidden md:flex space-x-6">
            <a href="#about" className="hover:text-gray-300">
              About
            </a>
            <a href="#approach" className="hover:text-gray-300">
              Our Approach
            </a>
            <a href="#impact" className="hover:text-gray-300">
              Impact
            </a>
          </div>
          <button className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-200">Get Involved</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <video autoPlay loop muted className="absolute w-auto min-w-full min-h-full max-w-none">
          <source src="/placeholder.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="relative z-10 text-center px-4">
          <h1 className="mb-6 text-5xl font-bold leading-tight md:text-7xl">Redefining DEI for True Equity</h1>
          <p className="mb-8 text-xl md:text-2xl max-w-3xl mx-auto">
            The Equitable Research Initiative (TERI) is revolutionizing DEI policies to create genuinely inclusive
            workplaces where everyone thrives.
          </p>
          <Link 
  href="/reports/comingsoon" 
  className="mt-6 w-1/2 bg-white text-black px-6 py-3 text-lg font-semibold rounded-lg hover:bg-gray-200 transition flex items-center justify-center text-center mx-auto"
>
  Read our report <ArrowRight className="ml-2" />
</Link>

        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white text-black">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">Reforming DEI for a Better Future</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg mb-6">
                At TERI, we believe that true equity goes beyond diversity quotas. We&apos;re committed to reshaping DEI
                policies to focus on meaningful inclusivity and equitable opportunities for all.
              </p>
              <p className="text-lg mb-6">
                Our research-driven approach addresses the shortcomings of traditional DEI initiatives, ensuring that
                marginalized communities gain equal chances without disadvantaging others.
              </p>
            </div>
            <div className="relative h-96">
              <Image
                src="/image/diverse-team.png"
                alt="Diverse team collaborating"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section id="approach" className="py-20 bg-black text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">Our Revolutionary Approach</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Target className="h-12 w-12" />}
              title="Holistic Assessment"
              description="We go beyond diversity percentages to measure true inclusivity and equity in the workplace."
            />
            <FeatureCard
              icon={<Zap className="h-12 w-12" />}
              title="Innovative Strategies"
              description="Develop cutting-edge DEI strategies that foster genuine inclusion and equal opportunities."
            />
            <FeatureCard
              icon={<RefreshCw className="h-12 w-12" />}
              title="Continuous Improvement"
              description="Implement feedback loops and data-driven adjustments to ensure lasting positive change."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <div>
          <div className="mt-8 mb-8 pt-8 border-t border-gray-800 text-center">
            <p>&copy; {new Date().getFullYear()} The Equitable Research Initiative (TERI). All rights reserved.</p>
          </div>
        </div>
    </div>
  )
}

type FeatureCardProps = {
  icon: ReactNode;
  title: string;
  description: string;
};

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-gray-900 p-6 rounded-lg text-center">
      <div className="mb-4 flex justify-center">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  );
};
