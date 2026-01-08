import Footer from "../component/Footer";
import Faq from "../component/FAQ";
import Feauters from "../component/Feautuers";
import AiHero from "../component/AICard";
import Items from "../component/Items";
import Hero from "../component/Heros";
export default function ClothingStoreHome() {
  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white text-gray-900 antialiased">
      <>
        <Hero />
        <Items />
        <Feauters />
        <AiHero />
        <Faq />
        <Footer />
      </>
    </div>
  );
}
