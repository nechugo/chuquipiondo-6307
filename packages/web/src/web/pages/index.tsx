import { SiteNav } from "../components/site/site-nav";
import { Hero, Stats } from "../components/site/hero";
import { Verdict } from "../components/site/verdict";
import { ComponentsGrid } from "../components/site/components-grid";
import { Findings } from "../components/site/findings";
import { Pending } from "../components/site/pending";
import { Verified } from "../components/site/verified";
import { Reproduce } from "../components/site/reproduce";
import { CtaBand } from "../components/site/cta-band";
import { SiteFooter } from "../components/site/site-footer";

function Index() {
  return (
    <div className="min-h-dvh bg-background">
      <SiteNav />
      <main>
        <Hero />
        <Stats />
        <Verdict />
        <ComponentsGrid />
        <Findings />
        <Pending />
        <Verified />
        <Reproduce />
        <CtaBand />
      </main>
      <SiteFooter />
    </div>
  );
}

export default Index;
