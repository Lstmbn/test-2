"use client";

import { useMemo, useState } from "react";

type Step = {
  id: string;
  section: string;
  title: string;
  subtitle?: string;
  type: "welcome" | "contact" | "single" | "multi" | "scale" | "text" | "summary";
  options?: string[];
};

const steps: Step[] = [
  {
    id: "welcome",
    section: "Welcome",
    title: "Let’s begin your design journey with GeTs Architects.",
    subtitle: "A short interactive brief to understand your project, lifestyle, spatial needs, and design preferences.",
    type: "welcome",
  },
  {
    id: "contact",
    section: "Project Basics",
    title: "First, tell us about you and your project.",
    type: "contact",
  },
  {
    id: "projectType",
    section: "Project Basics",
    title: "What type of project is this?",
    type: "single",
    options: ["New House", "Villa", "Renovation", "Commercial", "Hospitality", "Mixed Use"],
  },
  {
    id: "visionFeeling",
    section: "Project Vision",
    title: "What feeling should the project evoke?",
    type: "multi",
    options: ["Calm Sanctuary", "Warm Family Home", "Understated Luxury", "Resort Living", "Nature Connected", "Bold & Dramatic", "Minimal & Quiet"],
  },
  {
    id: "designDirection",
    section: "Architecture",
    title: "Which design direction resonates with you?",
    type: "multi",
    options: ["Modern Minimalist", "Tropical Modern", "Contemporary Pavilion", "Alpine Modern", "Japandi", "Resort Style", "Classic Contemporary"],
  },
  {
    id: "lifestyle",
    section: "Lifestyle",
    title: "What activities are important in this project?",
    type: "multi",
    options: ["Family Gathering", "Cooking", "Hosting Guests", "Working From Home", "Fitness", "Wellness / Spa", "Cinema / Entertainment", "Reading", "Art / Collecting", "Outdoor Living"],
  },
  {
    id: "hosting",
    section: "Hosting",
    title: "How often do you entertain guests?",
    type: "single",
    options: ["Rarely", "Monthly", "Weekly", "Very Frequently"],
  },
  {
    id: "household",
    section: "Household",
    title: "Who will regularly use the house?",
    type: "multi",
    options: ["Couple", "Children", "Parents / In-laws", "Helpers", "Driver", "Guests", "Pets"],
  },
  {
    id: "futureNeeds",
    section: "Household",
    title: "Should the house accommodate future needs?",
    type: "multi",
    options: ["Children", "Elderly Parents", "Accessibility Features", "Long-Term Family Home", "Flexible Rooms", "Not Sure Yet"],
  },
  {
    id: "privacy",
    section: "Privacy & Layout",
    title: "How important is privacy?",
    type: "scale",
    options: ["1", "2", "3", "4", "5"],
  },
  {
    id: "layout",
    section: "Privacy & Layout",
    title: "Which spatial layout do you prefer?",
    type: "multi",
    options: ["Open-plan spaces", "Semi-open layout", "Clearly separated rooms", "Indoor-outdoor flow", "Courtyard-focused layout", "View-oriented layout"],
  },
  {
    id: "sustainability",
    section: "Sustainability",
    title: "Which comfort or performance features are important?",
    type: "multi",
    options: ["Natural Light", "Garden Views", "Natural Ventilation", "Solar Panels", "Rainwater Harvesting", "Energy-efficient Systems", "Smart Home", "Acoustic Comfort"],
  },
  {
    id: "materials",
    section: "Materials",
    title: "Which material direction do you prefer?",
    type: "multi",
    options: ["Stone", "Timber", "Glass", "Concrete", "Natural Textures", "Warm Neutral Palette", "Dark Dramatic Palette", "Light Minimal Palette"],
  },
  {
    id: "outdoor",
    section: "Outdoor Areas",
    title: "What outdoor features would you like?",
    type: "multi",
    options: ["Swimming Pool", "Reflecting Pool", "Courtyard", "Outdoor Dining", "Terrace", "Garden", "BBQ Area", "Rooftop Lounge", "Kids Lawn", "Water Feature"],
  },
  {
    id: "rooms",
    section: "Room Requirements",
    title: "Which rooms should be included?",
    type: "multi",
    options: ["Living Room", "Dining Area", "Show Kitchen", "Dirty Kitchen", "Butler’s Pantry", "Master Bedroom", "Additional Bedrooms", "Guest Suite", "Home Office", "Cinema / Media Room", "Gym / Wellness", "Laundry", "Storage Room", "Garage", "Courtyard", "Terrace", "Pool", "Staff Area"],
  },
  {
    id: "bedrooms",
    section: "Bedrooms",
    title: "How many bedrooms are required?",
    type: "single",
    options: ["2", "3", "4", "5+"],
  },
  {
    id: "ensuite",
    section: "Bedrooms",
    title: "Should bedrooms be ensuite?",
    type: "single",
    options: ["All bedrooms", "Master only", "Some bedrooms", "Not required"],
  },
  {
    id: "kitchen",
    section: "Kitchen & Dining",
    title: "Which kitchen setup do you prefer?",
    type: "single",
    options: ["Show Kitchen Only", "Dirty Kitchen Only", "Both Show Kitchen + Dirty Kitchen", "Open Kitchen", "Closed Kitchen"],
  },
  {
    id: "cooking",
    section: "Kitchen & Dining",
    title: "What type of cooking do you usually do?",
    type: "multi",
    options: ["Daily Cooking", "Heavy Cooking", "Baking", "Entertaining Guests", "Light Cooking Only"],
  },
  {
    id: "dining",
    section: "Kitchen & Dining",
    title: "How many people should the dining area accommodate?",
    type: "single",
    options: ["4–6 people", "6–8 people", "8–10 people", "10–15 people", "More than 15 people"],
  },
  {
    id: "work",
    section: "Work & Hobbies",
    title: "Do you require a dedicated office space?",
    type: "single",
    options: ["No", "1 Office", "2 Offices", "More than 2"],
  },
  {
    id: "specialRooms",
    section: "Work & Hobbies",
    title: "Which special rooms would you like?",
    type: "multi",
    options: ["Gym", "Wellness Room", "Cinema", "Library", "Art Studio", "Music Room", "Gaming Room", "Wine Cellar", "Prayer / Meditation Room"],
  },
  {
    id: "garage",
    section: "Garage & Service",
    title: "How many vehicles need parking?",
    type: "single",
    options: ["1–2 Cars", "3 Cars", "4 Cars", "5+ Cars"],
  },
  {
    id: "ev",
    section: "Garage & Service",
    title: "Do you need EV charging?",
    type: "single",
    options: ["Yes", "No", "Maybe in the future"],
  },
  {
    id: "timeline",
    section: "Budget & Timeline",
    title: "When would you ideally like construction to begin?",
    type: "single",
    options: ["As soon as possible", "Within 6 months", "Within 12 months", "Next year", "Still flexible"],
  },
  {
    id: "budget",
    section: "Budget & Timeline",
    title: "Estimated construction budget",
    type: "single",
    options: ["Prefer not to disclose", "Under USD 500k", "USD 500k–1M", "USD 1M–3M", "USD 3M+", "Not sure yet"],
  },
  {
    id: "notes",
    section: "Additional Notes",
    title: "Is there anything else you would like us to know?",
    subtitle: "You can add links to Pinterest, Instagram, project references, site files, or any special request.",
    type: "text",
  },
  {
    id: "summary",
    section: "Submit",
    title: "Review your project brief.",
    subtitle: "Submit when everything looks good.",
    type: "summary",
  },
];

export default function Home() {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [contact, setContact] = useState({ name: "", email: "", phone: "", location: "" });
  const [submitted, setSubmitted] = useState(false);
  const [responseId, setResponseId] = useState("");

  const step = steps[index];
  const progress = Math.round(((index + 1) / steps.length) * 100);

  const summary = useMemo(() => {
    const lines = [
      `Client: ${contact.name || "-"}`,
      `Email: ${contact.email || "-"}`,
      `Phone: ${contact.phone || "-"}`,
      `Project Location: ${contact.location || "-"}`,
      "",
      ...steps
        .filter((s) => !["welcome", "contact", "summary"].includes(s.id))
        .map((s) => `${s.section} — ${s.title}\n${formatAnswer(answers[s.id])}`)
    ];
    return lines.join("\n\n");
  }, [answers, contact]);

  function formatAnswer(value: any) {
    if (!value || (Array.isArray(value) && value.length === 0)) return "-";
    if (Array.isArray(value)) return value.join(", ");
    return String(value);
  }

  function choose(option: string) {
    if (step.type === "multi") {
      const current = Array.isArray(answers[step.id]) ? answers[step.id] : [];
      const exists = current.includes(option);
      setAnswers({ ...answers, [step.id]: exists ? current.filter((x: string) => x !== option) : [...current, option] });
    } else {
      setAnswers({ ...answers, [step.id]: option });
    }
  }

  async function submit() {
    const res = await fetch("/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contact, answers, summary }),
    });
    const data = await res.json();
    setResponseId(data.responseId || "");
    setSubmitted(true);
  }

  const canNext = step.type === "welcome" || step.type === "text" || step.type === "summary" || step.type === "contact" || !!answers[step.id];

  if (submitted) {
    return (
      <main className="page">
        <section className="shell">
          <div className="content">
            <div className="eyebrow">Submitted</div>
            <h1>Thank you.</h1>
            <p className="subtitle">We look forward to beginning the design journey with you.</p>
            <p className="small">Response ID: {responseId}</p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="page">
      <section className="shell">
        <div className="topbar">
          <div className="logo">GeTs Architects</div>
          <div className="progress"><span style={{ width: `${progress}%` }} /></div>
        </div>

        <div className="content">
          <div className="eyebrow">{step.section}</div>
          {step.type === "welcome" ? <h1>{step.title}</h1> : <h2>{step.title}</h2>}
          {step.subtitle && <p className="subtitle">{step.subtitle}</p>}

          {step.type === "contact" && (
            <div className="inputGrid">
              <div className="field"><label>Name</label><input value={contact.name} onChange={(e) => setContact({ ...contact, name: e.target.value })} /></div>
              <div className="field"><label>Email</label><input value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} /></div>
              <div className="field"><label>Phone / WhatsApp</label><input value={contact.phone} onChange={(e) => setContact({ ...contact, phone: e.target.value })} /></div>
              <div className="field"><label>Project Location</label><input value={contact.location} onChange={(e) => setContact({ ...contact, location: e.target.value })} /></div>
            </div>
          )}

          {(step.type === "single" || step.type === "multi" || step.type === "scale") && (
            <div className="grid">
              {step.options?.map((option) => {
                const selected = Array.isArray(answers[step.id]) ? answers[step.id].includes(option) : answers[step.id] === option;
                return (
                  <button key={option} className={`card ${selected ? "selected" : ""}`} onClick={() => choose(option)}>
                    {option}
                  </button>
                );
              })}
            </div>
          )}

          {step.type === "text" && (
            <textarea
              style={{ marginTop: 30, width: "100%" }}
              value={answers[step.id] || ""}
              onChange={(e) => setAnswers({ ...answers, [step.id]: e.target.value })}
              placeholder="Write here..."
            />
          )}

          {step.type === "summary" && <div className="summary">{summary}</div>}
        </div>

        <div className="nav">
          <button className="btn secondary" disabled={index === 0} onClick={() => setIndex(index - 1)}>Back</button>
          {step.type === "summary" ? (
            <button className="btn" onClick={submit}>Submit Project Brief</button>
          ) : (
            <button className="btn" disabled={!canNext} onClick={() => setIndex(index + 1)}>
              {step.type === "welcome" ? "Start Project Brief" : "Next"}
            </button>
          )}
        </div>
      </section>
    </main>
  );
}
