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

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "j") {
        setActiveSectionIndex((prevIndex) =>
          Math.min(prevIndex + 1, sectionOrder.length - 1),
        );
      } else if (event.key === "k") {
        setActiveSectionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
      }
      // Add 'gg' and 'G' later if desired
      // else if (event.key === 'g' && event.shiftKey === false) {  // needs more logic
      // } else if (event.key === 'G' && event.shiftKey === true) {
      //     setActiveSectionIndex(sectionOrder.length - 1);
      // }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [sectionOrder]);

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
    <div className="terminal-window">
      <div className="terminal-header">
        <span className="dot red"></span>
        <span className="dot yellow"></span>
        <span className="dot green"></span>
        <span className="terminal-title">Carlo_k_cv - ~</span>
      </div>

      <div className="terminal-body">
        <h1 className="main-name">
          {cvData.name}
          <span className="cursor"></span>
        </h1>
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
    </div>
  );
}

export default App;
