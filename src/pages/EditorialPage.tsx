import { memo } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import EditorialBoardSection from "@/components/sections/EditorialBoardSection";
import ReviewerCommunity from "@/components/sections/ReviewerCommunity";
import SEOHead from "@/components/seo/SEOHead";
import { pageSEO } from "@/lib/seo-data";

const EditorialPage = memo(() => {
    return (
        <div className="min-h-screen bg-background">
            <SEOHead {...pageSEO.editorial} canonical="/editorial-board" />
            <Header />
            <main className="pt-20">
                <EditorialBoardSection />
                <ReviewerCommunity />
            </main>
            <Footer />
        </div>
    );
});

export default EditorialPage;
