
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
  // Sample data for the resume - replace with your own
  const profile = {
    name: "Your Name",
    title: "Full Stack Developer",
    email: "your.email@example.com",
    phone: "+1 (123) 456-7890",
    location: "San Francisco, CA",
    experience: "5+ Years Experience",
    education: "B.S. Computer Science",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1964"
  };
  
  const experiences = [
    {
      company: "Tech Company A",
      position: "Senior Developer",
      period: "Jan 2020 - Present",
      description: [
        "Led the development of a complex web application that increased user engagement by 40%.",
        "Designed and implemented RESTful APIs with Node.js and Express.",
        "Mentored junior developers and conducted code reviews.",
        "Optimized application performance, reducing load time by 30%."
      ],
      logo: "https://images.unsplash.com/photo-1496065187959-7f07b8353c55?q=80&w=2070",
      companyUrl: "https://example.com"
    },
    {
      company: "Agency B",
      position: "Front-end Developer",
      period: "Mar 2018 - Dec 2019",
      description: [
        "Developed responsive interfaces for multiple client projects using React and Vue.js.",
        "Collaborated with designers to implement pixel-perfect UIs.",
        "Integrated third-party APIs and services.",
        "Improved site SEO and accessibility."
      ],
      logo: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070",
      companyUrl: "https://example.com"
    },
    {
      company: "Startup C",
      position: "Full Stack Developer",
      period: "Jun 2016 - Feb 2018",
      description: [
        "Built a comprehensive SaaS platform from the ground up.",
        "Implemented payment processing and user authentication.",
        "Developed containerized microservices architecture.",
        "Participated in agile development process, daily standups, and sprint planning."
      ],
      logo: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070",
      companyUrl: "https://example.com"
    }
  ];
  
  const skills = [
    {
      title: "React",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      level: 5,
      description: "Advanced proficiency in React, including hooks, context API, and state management solutions like Redux and Zustand.",
      tags: ["Hooks", "Context API", "Redux", "Next.js"]
    },
    {
      title: "Node.js",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      level: 4,
      description: "Strong experience building RESTful APIs, middleware, and server-side applications with Express.",
      tags: ["Express", "REST API", "Middleware", "Authentication"]
    },
    {
      title: "TypeScript",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
      level: 4,
      description: "Extensive use of TypeScript for type-safe applications, interfaces, and generics.",
      tags: ["Types", "Interfaces", "Generics", "Type Guards"]
    },
    {
      title: "CSS/SCSS",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg",
      level: 5,
      description: "Expert in CSS, SCSS, and modern CSS frameworks like Tailwind CSS. Strong focus on responsive design and animations.",
      tags: ["Tailwind", "Animations", "Flexbox", "Grid"]
    },
    {
      title: "MongoDB",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
      level: 4,
      description: "Skilled in MongoDB database design, queries, aggregation pipeline, and integration with Node.js applications.",
      tags: ["NoSQL", "Mongoose", "Aggregation", "Atlas"]
    },
    {
      title: "AWS",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg",
      level: 3,
      description: "Experience with various AWS services including EC2, S3, Lambda, and CloudFront for scalable cloud applications.",
      tags: ["EC2", "S3", "Lambda", "CloudFront"]
    }
  ];
  
  const projects = [
    {
      title: "E-commerce Platform",
      description: "A full-featured e-commerce platform with product listings, cart functionality, payment processing, and admin dashboard.",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2070",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/yourusername/project"
    },
    {
      title: "Social Media Dashboard",
      description: "Analytics dashboard for social media managers with real-time data visualization and reporting tools.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015",
      technologies: ["Vue.js", "D3.js", "Firebase", "Express"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/yourusername/project"
    },
    {
      title: "Fitness Tracking App",
      description: "Mobile-first application for tracking workouts, nutrition, and fitness goals with progress visualization.",
      image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070",
      technologies: ["React Native", "GraphQL", "PostgreSQL", "JWT"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/yourusername/project"
    },
    {
      title: "Task Management System",
      description: "Collaborative project management tool with real-time updates, task assignment, and progress tracking.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070",
      technologies: ["Angular", "NestJS", "Socket.io", "MySQL"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/yourusername/project"
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
                I'm a passionate full stack developer with expertise in creating modern, 
                responsive web applications. With a strong foundation in both front-end and 
                back-end technologies, I strive to build elegant solutions that solve 
                real-world problems.
              </p>
              <p className="text-netflix-light/80 mb-6">
                My journey in tech began at [Your University], where I earned my degree in 
                Computer Science. Since then, I've worked with various companies and clients, 
                continuously expanding my skills and embracing new technologies.
              </p>
              <p className="text-netflix-light/80">
                When I'm not coding, you can find me exploring new hiking trails, experimenting 
                with photography, or diving into sci-fi novels. I'm always open to new opportunities 
                and collaborations.
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
