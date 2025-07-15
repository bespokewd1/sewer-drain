// src/components/ServicesTabs.tsx
"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { cn } from "../../lib/utils";

interface Service {
  name: string;
  title: string;
  text: string;
}

const services: Service[] = [
  {
    name: 'Unclogging',
    title: 'Plugged Toilets, Sinks, Laundry Lines & Drains',
    text: 'For professional assistance with unclogging and restoring proper drainage, our experienced team offers efficient and reliable services. Trust us to quickly resolve any plumbing issues and ensure your facilities remain functioning smoothly.',
  },
  {
    name: 'Flushing',
    title: 'Flushing Drain Lines',
    text: 'We offer high-pressure flushing of drain lines to efficiently remove blockages and debris, ensuring optimal performance and preventing future issues. Our service utilizes advanced equipment to deliver thorough cleaning and restore proper flow in your drainage system.',
  },
  {
    name: 'Root Cutting',
    title: 'Root Cutting Services',
    text: 'We specialize in mainline and root-cutting services to efficiently clear blockages in plumbing systems, allowing for proper water flow and drainage. Our skilled technicians use advanced equipment to effectively remove roots and debris, restoring your pipes to optimal condition.',
  },
  {
    name: 'Video Inspection',
    title: 'Video Inspection',
    text: 'Our business specializes in video inspection and locating of drain lines, providing accurate and efficient solutions for identifying and resolving plumbing issues. With state-of-the-art technology and experienced professionals, we offer thorough inspections to detect blockages, leaks, or other problems within your drainage system.',
  },
  {
    name: 'Stack Cleaning',
    title: 'Stack Cleaning',
    text: "Our skilled technicians use industry-leading equipment and techniques to effectively remove debris, buildup, and blockages in sewer stacks, helping to prevent potential clogs and backups. Trust us to deliver thorough and reliable stack cleaning solutions that will keep your building's sewer system running smoothly.",
  },
  {
    name: 'Thawing frozen lines',
    title: 'Thawing out frozen drain lines',
    text: 'a quick and efficient service that helps prevent potential water damage and restores proper drainage functionality to your home or business. Our experienced team utilizes specialized equipment and techniques to safely and effectively eliminate blockages caused by freezing temperatures, ensuring that your plumbing system runs smoothly again.',
  },
  {
    name: 'Corrosion Removal',
    title: 'Corrosion Removal',
    text: 'We specialize in professional scraping services for sewer pipes, focusing on efficient and effective removal of tough built-up lines and corrosion. With years of experience and advanced equipment, we are able to tackle even the most challenging obstructions in sewer systems. Our expert team is dedicated to ensuring optimal flow and function in sewer pipes, allowing for seamless operation and reducing the risk of backups and blockages. Trust us to deliver high-quality scraping services that exceed your expectations and keep your sewer system running smoothly.',
  },
];

type Tab = {
  title: string;
  value: string;
  content: React.ReactNode;
};

export default function ServicesTabs() {
  const tabs: Tab[] = services.map((service) => ({
    title: service.name,
    value: service.name.toLowerCase().replace(/\s+/g, '-'),
    content: (
      <div className="w-full overflow-hidden relative h-full rounded-2xl p-6 md:p-10 text-white bg-gradient-to-br from-purple-700 to-violet-900">
        <h3 className="text-xl md:text-3xl font-bold mb-4">{service.title}</h3>
        <p className="text-sm md:text-base">{service.text}</p>
      </div>
    ),
  }));

  return (
    <section className="relative">
     <div className="h-[30rem] md:h-[40rem] [perspective:1000px] relative flex flex-col max-w-5xl mx-auto w-full items-start justify-start py-20">
          <Tabs tabs={tabs} />
      </div>

    <picture
        className="cs-background absolute left-0 top-0 block h-full w-full -z-[1]"
      >
        <source
          media="(max-width: 1023px)"
          srcSet="https://csimg.nyc3.cdn.digitaloceanspaces.com/Images/Graphics/dotted-texture-m.png"
        />
        <source
          media="(min-width: 1024px)"
          srcSet="https://csimg.nyc3.cdn.digitaloceanspaces.com/Images/Graphics/dotted-texture.png"
        />
        <img
          loading="lazy"
          decoding="async"
          src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Images/Graphics/dotted-texture.png"
          alt="dotted texture"
          width="1920"
          height="600"
          className="absolute left-0 top-0 h-full w-full object-cover opacity-[0.32]"
        />
      </picture>
    </section>
  );
}

// Copy of Tabs component from Aceternity UI
type TabsProps = {
  tabs: Tab[];
  containerClassName?: string;
  activeTabClassName?: string;
  tabClassName?: string;
  contentClassName?: string;
};

const Tabs: React.FC<TabsProps> = ({
  tabs: propTabs,
  containerClassName,
  activeTabClassName,
  tabClassName,
  contentClassName,
}) => {
  const [active, setActive] = useState<Tab>(propTabs[0]);
  const [tabs, setTabs] = useState<Tab[]>(propTabs);

  const moveSelectedTabToTop = (idx: number) => {
    const newTabs = [...propTabs];
    const selectedTab = newTabs.splice(idx, 1);
    newTabs.unshift(selectedTab[0]);
    setTabs(newTabs);
    setActive(newTabs[0]);
  };

  const [hovering, setHovering] = useState(false);

  return (
    <>
      <div
        className={cn(
          "flex flex-row items-center justify-center backdrop-blur-sm [perspective:1000px] relative overflow-auto sm:overflow-visible no-visible-scrollbar max-w-full w-full",
          containerClassName
        )}
      >
        {propTabs.map((tab, idx) => (
          <button
            key={tab.value}
            onClick={() => moveSelectedTabToTop(idx)}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            className={cn("relative px-4 py-2 rounded-full", tabClassName)}
            style={{ transformStyle: "preserve-3d" }}
          >
            {active.value === tab.value && (
              <motion.div
                layoutId="clickedbutton"
                transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                className={cn(
                  "absolute inset-0 bg-gray-200 dark:bg-zinc-800 rounded-full",
                  activeTabClassName
                )}
              />
            )}
            <span className="relative block text-black dark:text-white">
              {tab.title}
            </span>
          </button>
        ))}
      </div>

      <FadeInDiv
        tabs={tabs}
        active={active}
        key={active.value}
        hovering={hovering}
        className={cn("mt-12", contentClassName)}
      />
    </>
  );
};

const FadeInDiv = ({
  tabs,
  active,
  hovering,
  className,
}: {
  tabs: Tab[];
  active: Tab;
  hovering?: boolean;
  className?: string;
}) => {
  const isActive = (tab: Tab) => tab.value === tabs[0].value;

  return (
    <div className="relative w-full h-full">
      {tabs.map((tab, idx) => (
        <motion.div
          key={tab.value}
          layoutId={tab.value}
          style={{
            scale: 1 - idx * 0.1,
            top: hovering ? idx * -50 : 0,
            zIndex: -idx,
            opacity: idx < 3 ? 1 - idx * 0.1 : 0,
          }}
          animate={{
            y: isActive(tab) ? [0, 40, 0] : 0,
          }}
          className={cn("w-full h-full absolute top-0 left-0", className)}
        >
          {tab.content}
        </motion.div>
      ))}
    </div>
  );
};
