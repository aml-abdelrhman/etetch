import ClosedProjectsSection from "@/components/pages/home/closed-projects-section";
import HomeHeroSection from "@/components/pages/home/home-hero";
import LatestProjectsSection from "@/components/pages/home/latest-projects-section";
import MostSoldProjectsSection from "@/components/pages/home/most-sold-projects-section";
import NewsSection from "@/components/pages/home/news-section";
import StatisticsSection from "@/components/pages/home/statistics-section";
import SuccessPartnersSection from "@/components/pages/home/success-partners-section";

const HomePage = () => {
  return (
    <>
      <HomeHeroSection />
      <LatestProjectsSection />
      <MostSoldProjectsSection />
      <StatisticsSection />
      <SuccessPartnersSection />
      <ClosedProjectsSection />
      <NewsSection />
    </>
  );
};

export default HomePage;
