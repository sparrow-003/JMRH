import { memo } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AboutSection from "@/components/sections/AboutSection";
import VisionMission from "@/components/sections/VisionMission";
import Mentorship from "@/components/sections/Mentorship";
import SEOHead from "@/components/seo/SEOHead";
import { pageSEO } from "@/lib/seo-data";

const AboutPage = memo(() => {
    return (
        <div className="min-h-screen bg-background">
            <SEOHead {...pageSEO.about} canonical="/about" />
            <Header />
            <main className="pt-20">
                <AboutSection />
                <VisionMission />
                <Mentorship />
            </main>
            <Footer />
        </div>
    );
});

export default AboutPage;
