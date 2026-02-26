import { memo } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Ethics from "@/components/sections/Ethics";
import ReviewPolicy from "@/components/sections/ReviewPolicy";
import SEOHead from "@/components/seo/SEOHead";
import { pageSEO } from "@/lib/seo-data";

const EthicsPage = memo(() => {
    return (
        <div className="min-h-screen bg-background">
            <SEOHead {...pageSEO.ethics} canonical="/ethics-policy" />
            <Header />
            <main className="pt-20">
                <Ethics />
                <ReviewPolicy />
            </main>
            <Footer />
        </div>
    );
});

export default EthicsPage;
