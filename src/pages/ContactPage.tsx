import { memo } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Contact from "@/components/sections/Contact";
import Consultation from "@/components/sections/Consultation";
import SEOHead from "@/components/seo/SEOHead";
import { pageSEO } from "@/lib/seo-data";

const ContactPage = memo(() => {
    return (
        <div className="min-h-screen bg-background">
            <SEOHead {...pageSEO.contact} canonical="/contact" />
            <Header />
            <main className="pt-20">
                <Contact />
                <Consultation />
            </main>
            <Footer />
        </div>
    );
});

export default ContactPage;
