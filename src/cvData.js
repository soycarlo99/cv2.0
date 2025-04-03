export const cvData = {
  name: "Carlo K",
  contact: {
    location: "Halmstad · Sweden",
    phone: "+46 73-483 22 71",
    email: "carlodelos90@gmail.com",
    linkedin: "https://www.linkedin.com/in/carlo-k",
  },
  about: {
    id: "about",
    title: "~/about.md",
    content: `Finding solutions to challenges is what I enjoy most. I build software and tackle technical problems using C/C#, Python and JavaScript. I've worked on many projects from start to finish, handling both frontend interfaces and backend systems. My approach combines what I learned in university with skills I've picked up working on personal projects. What keeps me engaged is seeing an idea transform into working software that solves actual problems.`,
  },
  experience: {
    id: "experience",
    title: "~/experience.log",
    jobs: [
      {
        title: "Technical Advisor",
        company: "Webhelp",
        period: "Dec 2020 - Apr 2024",
        description:
          "My responsibilities included diagnosing and troubleshooting software issues, configuring and maintaining computer systems, helping businesses select and implement new technology solutions, and providing training and support to end users. Worked with a variety of technologies and systems, including operating systems, networking equipment, and software applications.",
      },
      {
        title: "Assistant Manager",
        company: "Nordic Service Partners",
        period: "Dec 2018 - Mar 2020",
        description:
          "Oversaw daily operations of a high-volume, fast-paced restaurant, including staff management, customer service, and financial reporting. Developed and implemented systems for inventory management, food safety, and cost control. Trained and motivated a team of 20 employees, resulting in an increase in customer satisfaction ratings. Created and executed marketing campaigns to attract new customers and increase brand awareness. Collaborated with the kitchen team to develop and update the menu.",
      },
    ],
  },
  education: {
    id: "education",
    title: "~/education.edu",
    entries: [
      {
        institution: "NBI",
        degree: "Higher vocational education (YH)",
        field: "Software development with focus on AI",
        period: "August 2024 - May 2026",
      },
      {
        institution: "NTI Gymnasiet",
        degree: "High School Diploma",
        field: "Computer Programming",
        period: "August 2016 - May 2020",
      },
    ],
  },
  skills: {
    id: "skills",
    title: "~/skills.list",
    languagesTools: [
      // --- Most important ---
      "react",
      "dot-net",
      "python",
      "javascript",
      "git",
      "postgresql",
      "c",
      "csharp",
      "neovim",
      "npm",
      "docker",
      // --- Moderately important ---
      "nodejs",
      "figma",
      "pytorch",
      "tensorflow",
      "unity",
      "jquery",
      "html5",
      "css3",
      "github",
      "vscode",
      "aws",
      "jupyter",
      "datagrip",
      "rider",
      // --- Foundational / Less focus ---
      "sqlite",
      "anaconda",
      "raspberrypi",
      "arduino",
      "devicon",
      // --- Least important ---
    ],
    workflow: [
      "Data-Driven Development",
      "Object-Oriented Design and Development",
      "AI and Machine Learning Integration",
      "Agile/Scrum Methodologies",
      "CI/CD Pipeline Implementation",
      "Test-Driven Development (TDD)",
      "Behavior-Driven Development (BDD)",
      "DevOps Practices",
      "RESTful API Design",
      "Code Reviews and Pair Programming",
      "Responsive Design Principles",
      "Cross-Platform Development",
    ],
  },
  interests: {
    id: "interests",
    title: "~/interests.txt",
    content:
      "I enjoy traveling, videography, and learning new languages. I like the strategic thinking involved in chess and competitive programming, and I’m also interested in gaming and game development. These hobbies keep me engaged and help me build a mix of creative and technical skills.",
  },
  awards: {
    id: "awards",
    title: "~/awards.cert",
    entries: [
      "SQL Intermediate - certificate (SoloLearn)",
      "Python developer - certificate (SoloLearn)",
    ],
  },
  projects: [
    {
      id: "proj1",
      title: "CRM WebApp",
      screenshotUrl:
        "https://github.com/soycarlo99/alcorel/blob/main/src/logotype/Screenshot.png?raw=true",
      description:
        "A customer realtion management system that different businesses can use to manage customer's tickets",
      projectLink: "https://github.com/soycarlo99/alcorel",
    },
    {
      id: "proj2",
      title: "Echo Words",
      screenshotUrl:
        "https://github.com/soycarlo99/echowords/blob/main/wwwroot/photos/echowords%20screen.png?raw=true",
      description: "A word-chain game with multi-player ability",
      projectLink: "https://github.com/soycarlo99/echowords",
    },
    {
      id: "proj3",
      title: "AI Chatbot Interface",
      screenshotUrl:
        "https://via.placeholder.com/400x250/445533/ffffff?text=Project+Gamma+Screenshot",
      description: "A sleek frontend for interacting with an AI model.",
      projectLink: "https://github.com/yourusername/project-gamma",
      position: { bottom: "80px", right: "50px" },
    },
  ],
};

export const getDeviconClass = (skillName) => {
  const map = {
    "dot-net": "dot-net-plain",
    aws: "amazonwebservices-plain-wordmark",
    nodejs: "nodejs-plain-wordmark",
    npm: "npm-original-wordmark",
    tensorflow: "tensorflow-original",
  };
  return map[skillName] || `${skillName}-plain`;
};
