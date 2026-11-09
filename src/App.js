import "./App.css";
import { APP_NAME, APP_STORE_URL, FOUNDERS, TAGLINE } from "./config";

function initials(name) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);
}

export default function App() {
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
        <h2 id="founders-title">Find and talk with the founders</h2>
        <p className="lead">We're here at GoTech. Come say hi, or message us.</p>
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
