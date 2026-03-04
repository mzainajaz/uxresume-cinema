import React, { useEffect } from 'react';
import AnyflowNavbar from '@/components/AnyflowNavbar';
import AnyflowHero from '@/components/AnyflowHero';
import AnyflowMarquee from '@/components/AnyflowMarquee';
import AnyflowValueProp from '@/components/AnyflowValueProp';
import AnyflowServices from '@/components/AnyflowServices';
import AnyflowWork from '@/components/AnyflowWork';
import AnyflowProcess from '@/components/AnyflowProcess';
import AnyflowBrandValues from '@/components/AnyflowBrandValues';
import AnyflowContact from '@/components/AnyflowContact';
import AnyflowFooter from '@/components/AnyflowFooter';
import AnyflowCursor from '@/components/AnyflowCursor';

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-anyflow-black min-h-screen">
      <AnyflowCursor />
      <AnyflowNavbar />

      <main>
        <AnyflowHero />
        <AnyflowMarquee />
        <AnyflowValueProp />
        <AnyflowServices />
        <AnyflowWork />
        <AnyflowProcess />
        <AnyflowBrandValues />
        <AnyflowContact />
      </main>

      <AnyflowFooter />
    </div>
  );
};

export default Index;
