import { useState } from "react";
import {
  MessageCircle,
  Send,
  X,
  Share2,
  Bot,
} from "lucide-react";

const company = {
  name: "Adimaya Buildcon LLP",
  short: "Adimaya Group",
  founded: "2024",
  founders: "Mr. Manoj Ganesh Pawar and Mr. Swapnil Mahajan",
  legacy: "G.S. Pawar Construction (1998) and Pawar Construction (2019)",

  services: [
    "RCC works using high-quality ply & Aluform shuttering",
    "Residential apartments & housing projects",
    "Commercial complexes & office spaces",
    "High-rise towers",
    "Sustainable & eco-friendly construction solutions",
  ],

  achievements:
    "50+ successfully completed projects, including 20+ storey high-rise towers and 7+ storey residential & commercial buildings, with over 2 million sq. ft. of built-up area delivered.",

  vision:
    "To be the most trusted contracting partner, delivering landmark projects through engineering excellence, innovation, and uncompromising quality.",

  mission:
    "To execute complex construction projects with precision, safety, and efficiency; provide reliable contracting solutions; and build long-term partnerships based on transparency, trust, and timely delivery.",

  values:
    "Integrity, Quality, Innovation, Customer Focus, and Timely Delivery.",

  address:
    "Gravitas Residency, Chandrabhaga Corner, Near Shubharambh Clara, Ravet, Pune - 412101",

  email: "adimayabuildconllp@gmail.com",

  phone: "9156100136",
};

const quickQuestions = [
  "What does Adimaya do?",
  "Tell me about the company",
  "What services do you offer?",
  "What are your achievements?",
  "Who are the founders?",
  "What is your vision and mission?",
  "Where is your office?",
  "How can I contact you?",
];

function answerQuestion(question) {
  const q = question.toLowerCase();

  if (
    q.includes("hello") ||
    q.includes("hi") ||
    q.includes("welcome")
  ) {
    return `Hello! 👋 Welcome to ${company.short}. I can answer simple questions about our company, services, projects, achievements and contact details.`;
  }

  if (
    q.includes("founder") ||
    q.includes("owner")
  ) {
    return `The founders are ${company.founders}.`;
  }

  if (
    q.includes("service") ||
    q.includes("do you do") ||
    q.includes("offer")
  ) {
    return `We offer ${company.services.join("; ")}.`;
  }

  if (
    q.includes("achievement") ||
    q.includes("experience") ||
    q.includes("project") ||
    q.includes("25 year") ||
    q.includes("how many")
  ) {
    return company.achievements;
  }

  if (q.includes("vision")) {
    return company.vision;
  }

  if (q.includes("mission")) {
    return company.mission;
  }

  if (
    q.includes("value") ||
    q.includes("integrity") ||
    q.includes("quality")
  ) {
    return `Our core values are ${company.values}`;
  }

  if (
    q.includes("address") ||
    q.includes("office") ||
    q.includes("location") ||
    q.includes("where")
  ) {
    return `Our office is at ${company.address}.`;
  }

  if (
    q.includes("email") ||
    q.includes("mail")
  ) {
    return `You can email us at ${company.email}.`;
  }

  if (
    q.includes("phone") ||
    q.includes("mobile") ||
    q.includes("contact") ||
    q.includes("call")
  ) {
    return `You can contact Adimaya Buildcon LLP at ${company.phone} or ${company.email}.`;
  }

  if (
    q.includes("about") ||
    q.includes("company") ||
    q.includes("adimaya")
  ) {
    return `${company.name} is a professionally managed construction and real estate development firm established in ${company.founded}. It focuses on residential, commercial and infrastructure projects, building on the legacy of ${company.legacy}.`;
  }

  if (
    q.includes("rcc") ||
    q.includes("aluform") ||
    q.includes("shuttering")
  ) {
    return company.services[0] + ".";
  }

  return "I can help with basic questions about Adimaya Group. Try one of the quick questions below, such as services, founders, projects, vision, office or contact.";
}

export default function SupportChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: `Hi! 👋 Welcome to ${company.short}. How can I help you today?`,
    },
  ]);

  const ask = (question) => {
    if (!question.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        from: "user",
        text: question,
      },
      {
        from: "bot",
        text: answerQuestion(question),
      },
    ]);

    setInput("");
  };

  const shareSite = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: company.short,
          text: "Visit Adimaya Group",
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(
          window.location.href
        );
      }
    } catch (_) {}
  };

  return (
    <>
      <div
        className={`support-chat ${
          open ? "support-chat--open" : ""
        }`}
      >

        {/* =====================================
            CHAT PANEL
        ===================================== */}
        {open && (
          <div
            className="support-chat__panel"
            role="dialog"
            aria-label="Adimaya Group support chat"
          >

            {/* Header */}
            <div className="support-chat__header">

              <div className="support-chat__brand">

                <div className="support-chat__avatar">
                  <Bot size={21} />
                </div>

                <div>
                  <strong>Adimaya Group</strong>

                  <span>
                    <i />
                    Online now
                  </span>
                </div>

              </div>

              <button
                className="support-chat__close"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
              >
                <X size={19} />
              </button>

            </div>


            {/* Chat Body */}
            <div className="support-chat__body">

              <div className="support-chat__messages">

                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={`support-chat__bubble support-chat__bubble--${m.from}`}
                  >
                    {m.text}
                  </div>
                ))}

              </div>


              {/* Quick Questions */}
              <div className="support-chat__quick-title">
                Quick questions
              </div>

              <div className="support-chat__quick">

                {quickQuestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => ask(q)}
                  >
                    {q}
                  </button>
                ))}

              </div>

            </div>


            {/* Input */}
            <div className="support-chat__input">

              <input
                value={input}
                onChange={(e) =>
                  setInput(e.target.value)
                }
                onKeyDown={(e) =>
                  e.key === "Enter" && ask(input)
                }
                placeholder="Type your message..."
                aria-label="Type your message"
              />

              <button
                onClick={() => ask(input)}
                aria-label="Send"
              >
                <Send size={18} />
              </button>

            </div>


            {/* Share Website */}
            <div className="support-chat__actions">

              <button onClick={shareSite}>
                <Share2 size={16} />
                Share Website
              </button>

            </div>

          </div>
        )}


        {/* =====================================
            CHAT LAUNCHER
        ===================================== */}
        <button
          className="support-chat__launcher"
          onClick={() => setOpen((v) => !v)}
          aria-label={
            open
              ? "Close support chat"
              : "Open support chat"
          }
        >

          {open ? (
            <X size={25} />
          ) : (
            <MessageCircle size={25} />
          )}

          {!open && (
            <span>
              Chat with us
            </span>
          )}

        </button>

      </div>
    </>
  );
}