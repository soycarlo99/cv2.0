import React, { useState, useEffect, useRef, useMemo } from "react";
import "./App.css";
import { cvData, getDeviconClass } from "./cvData";

function App() {
  const sectionOrder = useMemo(
    () => ["about", "education", "skills", "experience", "interests", "awards"],
    [],
  );
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const sectionRefs = useRef({});

  const lastGPressTime = useRef(0);

  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const handleKeyDown = (event) => {
      const now = Date.now();
      const doublePressThreshold = 350;

      if (event.key === "j") {
        setActiveSectionIndex((prevIndex) =>
          Math.min(prevIndex + 1, sectionOrder.length - 1),
        );
        lastGPressTime.current = 0;
      } else if (event.key === "k") {
        if (activeSectionIndex === 0) {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        } else {
          setActiveSectionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
        }
        lastGPressTime.current = 0;
      } else if (event.key === "G") {
        setActiveSectionIndex(sectionOrder.length - 1);
        lastGPressTime.current = 0;
      } else if (event.key === "g") {
        if (now - lastGPressTime.current < doublePressThreshold) {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
          setActiveSectionIndex(0);
          lastGPressTime.current = 0;
        } else {
          lastGPressTime.current = now;
        }
      } else if (event.key === "f" || event.key === "F") {
        toggleFullScreen();
        lastGPressTime.current = 0;
      } else {
        lastGPressTime.current = 0;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [sectionOrder, activeSectionIndex]);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  };

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const activeSectionId = sectionOrder[activeSectionIndex];
    const activeRef = sectionRefs.current[activeSectionId];

    if (activeRef) {
      activeRef.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [activeSectionIndex, sectionOrder]);

  const assignRef = (id) => (el) => {
    sectionRefs.current[id] = el;
  };

  const renderAbout = (section) => (
    <>
      <h2>{section.title}</h2>
      <p>{section.content}</p>
      <div className="links">
        <a href={`mailto:${cvData.contact.email}`}>{cvData.contact.email}</a>
        <span> | </span>
        <a
          href={cvData.contact.linkedin}
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
        <span> | </span>
        <span>{cvData.contact.phone}</span>
        <span> | </span>
        <span>{cvData.contact.location}</span>
      </div>
    </>
  );

  const renderExperience = (section) => (
    <>
      <h2>{section.title}</h2>
      {section.jobs.map((job, index) => (
        <div key={index} className="job-item">
          <h3>
            {job.title} - <span className="company">{job.company}</span>
          </h3>
          <div className="period">{job.period}</div>
          <p>{job.description}</p>
        </div>
      ))}
    </>
  );

  const renderEducation = (section) => (
    <>
      <h2>{section.title}</h2>
      {section.entries.map((edu, index) => (
        <div key={index} className="edu-item">
          <h3>{edu.institution}</h3>
          <div className="subheading">
            {edu.degree} - {edu.field}
          </div>
          <div className="period">{edu.period}</div>
        </div>
      ))}
    </>
  );

  const renderSkills = (section) => {
    const totalSkills = section.languagesTools.length;
    const maxOpacity = 1.0;
    const minOpacity = 0.1;

    const opacityStep =
      totalSkills <= 1 ? 0 : (maxOpacity - minOpacity) / (totalSkills - 1);

    return (
      <>
        <h2>{section.title}</h2>
        <div className="subheading">Languages &amp; Tools:</div>
        <ul className="skills-list">
          {section.languagesTools.map((skill, index) => {
            const calculatedOpacity = maxOpacity - index * opacityStep;
            const finalOpacity = Math.max(minOpacity, calculatedOpacity);

            return (
              <li
                key={index}
                className="skill-item"
                style={{ opacity: finalOpacity }}
              >
                <i
                  className={`devicon-${getDeviconClass(skill)} colored`}
                  id="rotation"
                ></i>
                <span>{skill}</span>
              </li>
            );
          })}
        </ul>
        <div className="subheading">Workflow:</div>
        <ul className="workflow-list">
          {section.workflow.map((item, index) => (
            <li key={index}> ✓ {item}</li>
          ))}
        </ul>
      </>
    );
  };

  const renderInterests = (section) => (
    <>
      <h2>{section.title}</h2>
      <p>{section.content}</p>
    </>
  );

  const renderAwards = (section) => (
    <>
      <h2>{section.title}</h2>
      <ul className="awards-list">
        {section.entries.map((award, index) => (
          <li key={index}>🏆 {award}</li>
        ))}
      </ul>
    </>
  );

  const sectionRenderers = {
    about: renderAbout,
    experience: renderExperience,
    education: renderEducation,
    skills: renderSkills,
    interests: renderInterests,
    awards: renderAwards,
  };

  return (
    <div className="app-container">
      <div className="terminal-window">
        <div className="terminal-header">
          <span className="dot red"></span>
          <span className="dot yellow"></span>
          <span className="dot green"></span>
          <span className="terminal-title">
            vim - Carlo_k_cv - ~ —{" "}
            {windowSize.width && windowSize.height
              ? `${windowSize.width}x${windowSize.height}`
              : ""}
          </span>
        </div>

        <div className="terminal-body">
          <div className="intro">
            <h1 className="main-name">
              {cvData.name}
              <span className="cursor"></span>
            </h1>
            <div className="vim-hints">
              <p>f: fullscreen</p>
              <p>j: scroll down</p>
              <p>k: scroll up</p>
              <p>G: to bottom</p>
              <p>gg: to top</p>
            </div>
          </div>

          <hr className="separator" />

          {sectionOrder.map((id, index) => {
            const section = cvData[id];
            const renderer = sectionRenderers[id];
            const isActive = index === activeSectionIndex;

            return (
              <section
                key={id}
                id={id}
                ref={assignRef(id)}
                className={`cv-section ${isActive ? "active" : ""}`}
                aria-label={section.title}
              >
                {renderer ? (
                  renderer(section)
                ) : (
                  <p>Content definition missing for {id}.</p>
                )}
                <hr className="separator" />
              </section>
            );
          })}
          <footer className="escape-solutions-footer">
            <p>
              © {new Date().getFullYear()}{" "}
              <a
                href="https://www.linkedin.com/in/carlo-k/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Escape Solutions
              </a>
              . All rights reserved.
            </p>
          </footer>
        </div>

        <div className="status-bar">
          <span>NORMAL</span>
          <span className="section-indicator">
            {cvData[sectionOrder[activeSectionIndex]]?.title || ""}
          </span>
          <span>
            {activeSectionIndex + 1}/{sectionOrder.length}
          </span>
        </div>
      </div>{" "}
      <div className="project-showcase-area">
        {cvData.projects?.map((project) => (
          <a
            key={project.id}
            href={project.projectLink}
            target="_blank"
            rel="noopener noreferrer"
            className="project-peek"
            style={{
              backgroundImage: `url(${project.screenshotUrl})`,
            }}
            title={`View Project: ${project.title}`}
          >
            <div className="project-details">
              <h4>{project.title}</h4>
              <p>{project.description}</p>
              <span>View on GitHub &rarr;</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default App;
