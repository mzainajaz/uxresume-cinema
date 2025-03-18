
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ContentRow from '@/components/ContentRow';
import ProfileCard from '@/components/ProfileCard';
import ExperienceCard from '@/components/ExperienceCard';
import SkillCard from '@/components/SkillCard';
import ProjectCard from '@/components/ProjectCard';
import Footer from '@/components/Footer';

const Index = () => {
  // Profile data for Zain Mir
  const profile = {
    name: "Zain Mir",
    title: "Head of Performance Marketing",
    email: "m.zainajaz@gmail.com",
    phone: "+971554082897",
    location: "Dubai, United Arab Emirates",
    experience: "10+ Years in Marketing",
    education: "MBA - Marketing & B.Tech Honors",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=1000"
  };
  
  const experiences = [
    {
      company: "Creo Global",
      position: "Head of Performance Marketing",
      period: "Mar 2024 - Present",
      description: [
        "As the Head of Performance Marketing, I bring a proven track record of strategic leadership and a deep, comprehensive understanding of digital marketing to drive measurable growth.",
        "Successfully led cross-functional teams to achieve high-impact results and exceed business objectives.",
        "Specialize in designing data-driven campaigns that align with brand goals.",
        "Leverage multi-channel marketing expertise spanning paid search, social media, programmatic advertising, and SEO.",
        "Translate complex data into actionable insights resulting in increased ROI and enhanced customer acquisition."
      ],
      logo: "https://images.unsplash.com/photo-1496065187959-7f07b8353c55?q=80&w=2070",
      companyUrl: "https://example.com"
    },
    {
      company: "Meydan Free Zone",
      position: "Digital Marketing Manager",
      period: "Jan 2022 - Dec 2024",
      description: [
        "Led the management and growth of 360-degree digital marketing and transformation efforts.",
        "Developed the road map and spearheaded the implementation of an in-house chat bot powered by GPT-4 and custom model on replit.",
        "Achieved a 3X increase in qualified lead count within one year by strategically leveraging first-party data via CRM and CDP.",
        "Successfully implemented a CDP to enhance user tracking, attribution, and Pfmax-based conversions.",
        "Developed process workflows for the WhatsApp Business API, streamlining multiple processes."
      ],
      logo: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070",
      companyUrl: "https://example.com"
    },
    {
      company: "Home of Performance [HOP]",
      position: "Head of Performance Marketing",
      period: "Aug 2021 - Dec 2021",
      description: [
        "Led and managed the performance marketing team at the agency, overseeing growth and development.",
        "Strategized campaign strategies for e-commerce clients, delivering incremental ROAS for luxury clients and FMCG brands including Tavola, Nicoli, Washmen, and FreshExpress.",
        "Achieved Preferred Marketing Partner status with Facebook and Google by scaling agency business.",
        "Implemented automated reports with advanced dashboards to streamline reporting processes.",
        "Received the Best Localized Search Award in MENA for The Healthy Home."
      ],
      logo: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070",
      companyUrl: "https://example.com"
    },
    {
      company: "Home of Performance [HOP]",
      position: "Digital Account Manager",
      period: "Dec 2020 - Aug 2021",
      description: [
        "Managed and cultivated relationships with key clients, resulting in a 20% increase in client retention rates.",
        "Developed and implemented digital marketing strategies driving a 30% increase in online engagement.",
        "Increased user acquisition for Flog App by 150%, Alsaree3 Food Delivery App by 53%, and a car rental service in the UAE by 400%.",
        "Played a key role in achieving 300% growth (150k MAU) for a new entrant in the grocery segment market.",
        "Conducted regular performance analysis and optimization of digital advertising campaigns."
      ],
      logo: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070",
      companyUrl: "https://example.com"
    },
    {
      company: "Lqvd Asia",
      position: "Media Manager",
      period: "Feb 2020 - Dec 2020",
      description: [
        "Directed SEM, app, and paid social campaigns across the agency.",
        "Launched IPL awareness and performance campaigns for Royal Challengers Bangalore (RCB) in partnership with Optimum Nutrition.",
        "Spearheaded brand and performance marketing for 'Academy for Digital Marketing,' a new entrant in the Ed-Tech space.",
        "Planned and executed paid marketing campaigns for TSSS, Glanbia Optimum Nutrition, ADMC, and JIVA Ayurveda.",
        "Automated all reports across the agency, significantly increasing work efficiency."
      ],
      logo: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015",
      companyUrl: "https://example.com"
    },
    {
      company: "Publicis Media - Performics",
      position: "Assistant Manager",
      period: "Jun 2017 - Feb 2020",
      description: [
        "Scaled Facebook app campaigns for Wynk Music to align with Google UAC campaigns, enhancing installs delivery and stream quality.",
        "Launched paid media acquisition campaigns for Airtel Global Calling App, expanding business in the ME and Europe.",
        "Managed performance marketing for Uber India App's rides business through Facebook campaigns.",
        "Achieved a 30% increase in streams on Facebook app campaigns through A/B testing with different songs for each age group.",
        "Successfully launched B2B business acquisition campaigns in Africa for NIIT Ltd using LinkedIn."
      ],
      logo: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070",
      companyUrl: "https://example.com"
    }
  ];
  
  const skills = [
    {
      title: "Marketing Strategy",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      level: 5,
      description: "Expert in developing comprehensive marketing strategies that drive business growth. Specializing in aligning marketing initiatives with broader business objectives.",
      tags: ["Brand Strategy", "Market Research", "Campaign Planning", "Growth Marketing"]
    },
    {
      title: "Digital Marketing",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      level: 5,
      description: "Comprehensive expertise in all aspects of digital marketing including PPC, SEM, social media advertising, and app marketing campaigns.",
      tags: ["PPC", "SEM", "App Marketing", "Social Media Ads"]
    },
    {
      title: "Performance Marketing",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
      level: 5,
      description: "Skilled in driving measurable results through data-driven performance marketing campaigns across multiple channels.",
      tags: ["ROI Optimization", "Conversion Rate", "Attribution", "Analytics"]
    },
    {
      title: "E-commerce Marketing",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg",
      level: 4,
      description: "Experience developing and implementing e-commerce marketing strategies for luxury and FMCG brands, driving incremental ROAS.",
      tags: ["ROAS", "Customer Acquisition", "Retention", "Shopping Campaigns"]
    },
    {
      title: "CRM & CDP Implementation",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
      level: 5,
      description: "Expert in implementing and leveraging Customer Relationship Management and Customer Data Platform systems to enhance marketing efforts.",
      tags: ["First-Party Data", "User Segmentation", "Lead Management", "Customer Journey"]
    },
    {
      title: "Project Management",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg",
      level: 5,
      description: "Strong project management skills with experience leading cross-functional teams and managing complex marketing initiatives.",
      tags: ["Team Leadership", "Process Optimization", "Resource Allocation", "Stakeholder Management"]
    }
  ];
  
  const projects = [
    {
      title: "ChatBot Implementation",
      description: "Developed and implemented an in-house chat bot powered by GPT-4 and custom model on replit for Meydan Free Zone, streamlining customer interactions.",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2070",
      technologies: ["GPT-4", "Custom ML Model", "Replit", "API Integration"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/example/project"
    },
    {
      title: "WhatsApp Business API Workflow",
      description: "Created process workflows for WhatsApp Business API to streamline pre-qualification, post-qualification, sales, and after-sales service processes.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015",
      technologies: ["WhatsApp Business API", "Process Automation", "CRM Integration", "User Journey Mapping"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/example/project"
    },
    {
      title: "CDP Implementation",
      description: "Successfully implemented a Customer Data Platform to enhance user tracking, attribution, and Pfmax-based conversions, improving user segmentation.",
      image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070",
      technologies: ["CDP", "Data Analytics", "User Segmentation", "Attribution Modeling"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/example/project"
    },
    {
      title: "Automated Reporting System",
      description: "Designed and implemented automated reporting systems with advanced dashboards to streamline reporting processes and improve team efficiency.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070",
      technologies: ["Data Visualization", "Automation", "Dashboard Design", "KPI Tracking"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/example/project"
    }
  ];

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-netflix-black min-h-screen">
      <Navbar />
      <Hero />
      
      <div className="netflix-container mt-10">
        {/* About Section with Profile Card */}
        <section className="netflix-row py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="flex flex-col justify-center">
              <span className="inline-block px-3 py-1 bg-netflix-red rounded text-sm font-medium mb-4">
                About Me
              </span>
              <h2 className="netflix-title mb-4">My Story</h2>
              <p className="text-netflix-light/80 mb-6">
                With over a decade of experience in marketing, I specialize in app marketing, e-commerce, PPC, strategy, market
                research, social ads, content strategy, CRM, CDP, and workflow automation.
              </p>
              <p className="text-netflix-light/80 mb-6">
                I have successfully collaborated with more than 100 clients, developing tailored marketing strategies that drive substantial growth.
                My expertise spans across multiple industries and markets including GCC, UK, Spain, and US.
              </p>
              <p className="text-netflix-light/80">
                When I'm not working on marketing strategies, you can find me exploring AI Automation, practicing Calligraphy, 
                working on Video Editing projects, or capturing moments through Photography.
              </p>
            </div>
            <div className="flex justify-center items-center">
              <ProfileCard {...profile} />
            </div>
          </div>
        </section>
        
        {/* Experience Section */}
        <ContentRow title="Experience" id="experience">
          {experiences.map((exp, index) => (
            <ExperienceCard key={index} {...exp} />
          ))}
        </ContentRow>
        
        {/* Skills Section */}
        <ContentRow title="Skills & Expertise" id="skills">
          {skills.map((skill, index) => (
            <SkillCard key={index} {...skill} />
          ))}
        </ContentRow>
        
        {/* Projects Section */}
        <ContentRow title="Featured Projects" id="projects">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </ContentRow>
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
