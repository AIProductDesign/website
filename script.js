/* ---------------------------------
   TETRA: AI Powered Product Design
   Minimal client-side JS:
   - mobile nav toggle
   - accordion data render
   - search + filter
------------------------------------ */

const mappingData = [
  {
    phase: "Productdefinitiefase – Ideegeneratie",
    items: [
      {
        step: "Zoekvelden & opportuniteiten",
        usecases: "Trends, marktonderzoek, competitor scan, white spots vinden, regulering samenvatten",
        tooltypes: "Research/insight copilots, web-LLM’s, agents voor periodieke monitoring",
        examples: "ChatGPT/Claude/Gemini met web, Perplexity, Elicit, Connected Papers, Lens.org, eigen RAG/agent-workflows"
      },
      {
        step: "Productideeën",
        usecases: "Brainstormen van veel ideeën, varianten genereren, scenario’s & customer journeys schrijven, eerste visualisaties",
        tooltypes: "Tekst-LLM’s, beeldgeneratie, AI-whiteboards, agentische ideation-workflows",
        examples: "ChatGPT/Claude/Gemini, Miro AI, FigJam AI, DALL·E, Midjourney, Stable Diffusion, Adobe Firefly/Photoshop, eigen LangChain/OpenAI agents"
      }
    ]
  },
  {
    phase: "Productdefinitiefase – Product definitie",
    items: [
      {
        step: "Productdefinitie (specificaties, TOI, architecturen)",
        usecases: "User needs → requirements, structureren & prioriteren eisen, opzetten van productarchitectuur, check vs. regelgeving & normen",
        tooltypes: "Requirement-copilots, knowledge copilots boven document-repo’s, systeem/architectuur-assistenten",
        examples: "Notion AI, Confluence AI, Jira AI, SharePoint/Teams copilots, eigen RAG-assistent voor normen & eerdere projecten, MBSE/SysML-tools met LLM-plug-ins"
      }
    ]
  },
  {
    phase: "Ontwerpfase – Systeem Ontwerpen",
    items: [
      {
        step: "Systeemontwerpen (principe-oplossingen)",
        usecases: "Functie-structuren genereren, systeemconcepten & blokdiagrammen, technologie-opties verkennen, linken naar referentie-oplossingen",
        tooltypes: "System design copilots, engineering QA-assistents op eigen kennisbank, concept-agents",
        examples: "LLM-assistent boven MBSE/SysML-diagrammen, RAG over interne rapporten/datasheets, agents die alternatieve actuatie-/sensortechnologieën voorstellen en vergelijken"
      }
    ]
  },
  {
    phase: "Ontwerpfase – Concept Ontwerpen",
    items: [
      {
        step: "Conceptontwerpen (productoplossingen, materialen & technieken)",
        usecases: "Snel veel vormgevings- en lay-outvarianten genereren, AI-ondersteunde 3D-modellen, materiaal- & proceskeuze, UX/UI-concepten",
        tooltypes: "Generative design in CAD, topology optimization, image→3D tools, UX/UI-AI, materiaalkeuze-assistenten",
        examples: "Autodesk Fusion/Inventor generative design, nTopology, Siemens NX met AI-functies, Onshape/SolidWorks AI, Figma AI, Uizard, Galileo AI, LLM + Granta/MatWeb voor materiaalkeuze"
      }
    ]
  },
  {
    phase: "Ontwerpfase – Detail Ontwerpen",
    items: [
      {
        step: "Detailontwerpen (kwalificatie, technische plannen)",
        usecases: "Snellere, foutarmere CAD-detailing, tolerantie- en maakbaarheidsvoorstellen, automatische tekeningen/BOM/manuals, AI in PCB/embedded software, documentatie",
        tooltypes: "CAD-copilots, AI in CAM/CAE/EDA, code-copilots, documentatie-agents",
        examples: "AI-assistenten in CAD (auto-dimension, feature-suggesties), Altium/Cadence met AI-routing, GitHub Copilot/Codeium, agents die uit CAD/BOM automatisch datasheets, montage- en testinstructies genereren"
      }
    ]
  },
  {
    phase: "Overkoepelend doorheen alle fasen",
    items: [
      {
        step: "Project- & kennismanagement",
        usecases: "Meeting notes → acties, risico’s, beslissingen destilleren; taken plannen; lessons learned borgen; 1 zoekinterface op alle projectdata",
        tooltypes: "PM-copilots, kennis-copilots (RAG), agentische pipelines",
        examples: "Notion/Asana/Jira AI, eigen “design knowledge co-pilot” boven PLM/SharePoint/Confluence, agent pipelines (LangChain, OpenAI Agents, CrewAI…)"
      }
    ]
  }
];

function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  Object.entries(attrs).forEach(([k, v]) => {
    if (k === "class") node.className = v;
    else if (k.startsWith("data-")) node.setAttribute(k, v);
    else if (k === "html") node.innerHTML = v;
    else node.setAttribute(k, v);
  });
  (Array.isArray(children) ? children : [children]).forEach((c) => {
    if (c === null || c === undefined) return;
    node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
  });
  return node;
}

function renderAccordion(filtered) {
  const root = document.getElementById("mapping-accordion");
  root.innerHTML = "";

  const flatCount = filtered.reduce((acc, group) => acc + group.items.length, 0);
  if (flatCount === 0) {
    root.appendChild(
      el("div", { class: "card subtle" }, [
        el("h3", {}, "Geen resultaten"),
        el("p", { class: "muted" }, "Pas je zoekterm aan of kies een andere filter.")
      ])
    );
    return;
  }

  filtered.forEach((group, groupIndex) => {
    group.items.forEach((item, itemIndex) => {
      const details = el("details", {
        "data-phase": group.phase,
        "data-search": `${group.phase} ${item.step} ${item.usecases} ${item.tooltypes} ${item.examples}`.toLowerCase()
      });

      const summary = el("summary", {}, [
        el("div", { class: "acc-title" }, [
          el("strong", {}, item.step),
          el("span", {}, group.phase)
        ]),
        el("span", { class: "acc-chevron", "aria-hidden": "true" })
      ]);

      const body = el("div", { class: "acc-body" }, [
        el("div", { class: "acc-grid" }, [
          el("div", {}, [
            el("div", { class: "acc-k" }, "Typische AI-use-cases"),
            el("div", { class: "acc-v" }, item.usecases)
          ]),
          el("div", {}, [
            el("div", { class: "acc-k" }, "Type AI-tools"),
            el("div", { class: "acc-v" }, item.tooltypes)
          ]),
          el("div", {}, [
            el("div", { class: "acc-k" }, "Voorbeelden"),
            el("div", { class: "acc-v" }, item.examples)
          ])
        ])
      ]);

      details.appendChild(summary);
      details.appendChild(body);

      // Open the first item by default for scan-ability
      if (groupIndex === 0 && itemIndex === 0) details.open = true;

      root.appendChild(details);
    });
  });
}

function getActiveFilter() {
  const active = document.querySelector(".chip.active");
  return active ? active.dataset.filter : "all";
}

function applyFilters() {
  const q = (document.getElementById("mapping-search").value || "").trim().toLowerCase();
  const phase = getActiveFilter();

  const filteredGroups = mappingData
    .filter(g => phase === "all" || g.phase === phase)
    .map(g => ({
      ...g,
      items: g.items.filter(it => {
        const hay = `${g.phase} ${it.step} ${it.usecases} ${it.tooltypes} ${it.examples}`.toLowerCase();
        return q === "" || hay.includes(q);
      })
    }))
    .filter(g => g.items.length > 0);

  renderAccordion(filteredGroups);
}

/* Mobile nav */
function setupNav() {
  const btn = document.querySelector(".nav-toggle");
  const nav = document.getElementById("site-nav");
  if (!btn || !nav) return;

  btn.addEventListener("click", () => {
    const expanded = btn.getAttribute("aria-expanded") === "true";
    btn.setAttribute("aria-expanded", String(!expanded));
    nav.classList.toggle("open", !expanded);
  });

  nav.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      btn.setAttribute("aria-expanded", "false");
      nav.classList.remove("open");
    });
  });

  // Close on outside click
  document.addEventListener("click", (e) => {
    if (!nav.classList.contains("open")) return;
    if (nav.contains(e.target) || btn.contains(e.target)) return;
    btn.setAttribute("aria-expanded", "false");
    nav.classList.remove("open");
  });
}

/* Filter + search */
function setupMapping() {
  const search = document.getElementById("mapping-search");
  const chips = document.querySelectorAll(".chip");

  search.addEventListener("input", applyFilters);
  chips.forEach((c) => {
    c.addEventListener("click", () => {
      chips.forEach(x => x.classList.remove("active"));
      c.classList.add("active");
      applyFilters();
    });
  });

  applyFilters();
}

/* Footer year */
function setupYear() {
  const elYear = document.getElementById("year");
  if (elYear) elYear.textContent = String(new Date().getFullYear());
}

setupNav();
setupMapping();
setupYear();
