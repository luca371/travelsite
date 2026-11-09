import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { signInAnonymously } from "firebase/auth";
import {
  addDoc,
  collection,
  limitToLast,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "./firebase";
import "./Chat.css";

const NAME_KEY = "travelsite-chat-name";
const MAX_TEXT = 300;
const MAX_NAME = 24;

export default function Chat() {
  const [uid, setUid] = useState(null);
  const [name, setName] = useState(() => localStorage.getItem(NAME_KEY) || "");
  const [nameDraft, setNameDraft] = useState("");
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const endRef = useRef(null);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => setUid(user ? user.uid : null));
    signInAnonymously(auth).catch(() => setError("Couldn't connect. Check your internet and reload."));
    return unsub;
  }, []);

  useEffect(() => {
    if (!uid) return undefined;
    const q = query(collection(db, "messages"), orderBy("createdAt"), limitToLast(100));
    return onSnapshot(
      q,
      (snap) => setMessages(snap.docs.map((d) => ({ id: d.id, ...d.data() }))),
      () => setError("Couldn't load messages.")
    );
  }, [uid]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function saveName(e) {
    e.preventDefault();
    const trimmed = nameDraft.trim().slice(0, MAX_NAME);
    if (!trimmed) return;
    localStorage.setItem(NAME_KEY, trimmed);
    setName(trimmed);
  }

  async function send(e) {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed || !uid) return;
    setText("");
    try {
      await addDoc(collection(db, "messages"), {
        text: trimmed.slice(0, MAX_TEXT),
        name,
        uid,
        createdAt: serverTimestamp(),
      });
      setError("");
    } catch {
      setText(trimmed);
      setError("Message not sent. Try again.");
    }
  }

  if (!name) {
    return (
      <main className="chat chat-join">
        <Link className="back" to="/">← Back</Link>
        <h1>Join the chat</h1>
        <p>Pick a name. Everyone here can see your messages.</p>
        <form onSubmit={saveName}>
          <input
            autoFocus
            value={nameDraft}
            maxLength={MAX_NAME}
            placeholder="Your name"
            onChange={(e) => setNameDraft(e.target.value)}
          />
          <button type="submit" disabled={!nameDraft.trim()}>Join</button>
        </form>
      </main>
    );
  }

  return (
    <main className="chat">
      <header className="chat-head">
        <Link className="back" to="/">←</Link>
        <div>
          <strong>Founders chat</strong>
          <span>Open to everyone at GoTech</span>
        </div>
      </header>

      <ol className="chat-list">
        {messages.length === 0 && <li className="empty">No messages yet. Say hi!</li>}
        {messages.map((m) => (
          <li key={m.id} className={m.uid === uid ? "msg mine" : "msg"}>
            {m.uid !== uid && <span className="msg-name">{m.name}</span>}
            <p>{m.text}</p>
          </li>
        ))}
        <li ref={endRef} aria-hidden="true" />
      </ol>

      {error && <p className="chat-error" role="alert">{error}</p>}
      <form className="chat-form" onSubmit={send}>
        <input
          value={text}
          maxLength={MAX_TEXT}
          placeholder="Message"
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit" disabled={!text.trim() || !uid}>Send</button>
      </form>
    </main>
  );
}
