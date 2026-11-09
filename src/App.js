import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import Chat from "./Chat";
import { APP_NAME, APP_STORE_URL, FOUNDERS, TAGLINE } from "./config";

function initials(name) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);
}

function Home() {
  return (
    <main className="page">
      <section className="half half-app" aria-labelledby="app-title">
        <img className="logo" src="/logo192.png" alt="" width="88" height="88" />
        <h1 id="app-title">Get the app</h1>
        <p className="lead">
          {APP_NAME}. {TAGLINE}
        </p>
        <a className="btn btn-primary" href={APP_STORE_URL}>
          Download on the App Store
        </a>
      </section>

      <section className="half half-founders" aria-labelledby="founders-title">
        <h2 id="founders-title">
          <Link className="title-link" to="/chat">
            Find and talk with the founders <span aria-hidden="true">→</span>
          </Link>
        </h2>
        <p className="lead">We're here at GoTech. Come say hi, or message us.</p>
        <Link className="btn btn-primary btn-chat" to="/chat">
          Open the chat
        </Link>
        <ul className="founders">
          {FOUNDERS.map((founder) => (
            <li className="founder" key={founder.name}>
              <span className="avatar" aria-hidden="true">
                {initials(founder.name)}
              </span>
              <div className="founder-info">
                <strong>{founder.name}</strong>
                <span>{founder.role}</span>
              </div>
              <div className="founder-links">
                {founder.links.map((link) => (
                  <a className="btn btn-light" key={link.label} href={link.href}>
                    {link.label}
                  </a>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  );
}
