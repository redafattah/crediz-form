import Contact from "@/components/home/Contact";
import FAQ from "@/components/home/FAQ";
import Hero from "@/components/home/Hero";
import LoansListings from "@/components/home/LoanListings";
import Services from "@/components/home/Services";
import Testimonial from "@/components/home/Testimonial";


export default function HomePage() {
  return (
    <div
    className="min-h-screen text-gray-900"
    style={{
      backgroundColor: "#f9fafb",
      backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.04) 1px, transparent 1px)",
      backgroundSize: "20px 20px",
    }}
  >
     
      <Hero />
      <LoansListings />
      <Services />
      <Testimonial />
      <FAQ />
      <Contact />
     
    </div>
  )
}
