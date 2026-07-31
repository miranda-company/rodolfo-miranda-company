import { useRef, useState, type KeyboardEvent } from "react";
import { Link, createBrowserRouter } from "react-router";

type Kind = "yo" | "notas" | "biblioteca" | "contacto";
type Panel = { index: string; title: string; description: string; metadata: string; reveal: string; to: string; kind: Kind };

const panels: Panel[] = [
  { index: "01", title: "Yo", description: "Trayectoria, proyectos y forma de trabajar.", metadata: "PERFIL · EN EVOLUCIÓN", reveal: "ARCHIVO PERSONAL · 18 ENTRADAS", to: "/yo", kind: "yo" },
  { index: "02", title: "Notas", description: "Ideas en proceso, conexiones y apuntes.", metadata: "ÚLTIMA NOTA · 31.07.2026", reveal: "27 HILOS ACTIVOS · VER ÍNDICE", to: "/notas", kind: "notas" },
  { index: "03", title: "Biblioteca", description: "Libros, referencias y recomendaciones.", metadata: "LECTURAS · REFERENCIAS", reveal: "ESTANTE ACTUAL · 04 / 12", to: "/biblioteca", kind: "biblioteca" },
  { index: "04", title: "Contáctame", description: "Cuéntame qué quieres construir.", metadata: "DISPONIBLE PARA CONVERSAR", reveal: "BARCELONA + REMOTO · ESCRÍBEME", to: "/contacto", kind: "contacto" },
];

function Mark() { return <span className="rm-mark" aria-hidden="true"><i /><b>R</b><em>M</em></span>; }
function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const indexButtonRef = useRef<HTMLButtonElement>(null);
  const closeMenu = () => {
    setMenuOpen(false);
    window.requestAnimationFrame(() => indexButtonRef.current?.focus());
  };
  const toggleMenu = () => menuOpen ? closeMenu() : setMenuOpen(true);
  return <header className={`site-header ${menuOpen ? "menu-open" : ""}`}>
    <Link className="brand" to="/" aria-label="Rodolfo Miranda Company, inicio" onClick={closeMenu}><Mark /><span>Rodolfo Miranda Company</span></Link>
    <nav className="desktop-nav" aria-label="Navegación principal"><Link to="/#indice">Índice</Link><Link to="/experimentos">Experimentos</Link><Link to="/#ahora">Ahora</Link></nav>
    <button ref={indexButtonRef} className="mobile-index-button" type="button" aria-expanded={menuOpen} aria-controls="mobile-menu" onClick={toggleMenu}>{menuOpen ? "Cerrar" : "Índice"}</button>
    {menuOpen && <nav className="mobile-menu" id="mobile-menu" aria-label="Índice móvil"><button type="button" className="menu-close" onClick={closeMenu}>Cerrar menú</button><Link to="/yo" onClick={closeMenu}>Yo</Link><Link to="/notas" onClick={closeMenu}>Notas</Link><Link to="/biblioteca" onClick={closeMenu}>Biblioteca</Link><Link to="/experimentos" onClick={closeMenu}>Experimentos</Link><Link to="/#ahora" onClick={closeMenu}>Ahora</Link><Link to="/contacto" onClick={closeMenu}>Contacto</Link></nav>}
  </header>;
}
function Artwork({ kind }: { kind: Kind }) {
  if (kind === "yo") return <div className="art art-portrait"><div className="portrait-head" /><div className="portrait-shoulder" /><span>ESTUDIO / 2026</span></div>;
  if (kind === "notas") return <div className="art art-notes"><span className="node n1" /><span className="node n2" /><span className="node n3" /><span className="node n4" /><i className="path p1" /><i className="path p2" /><i className="path p3" /><b>01. pensar<br />en voz baja</b><em>margen ↗</em></div>;
  if (kind === "biblioteca") return <div className="art art-library"><span /><span /><span /><span /><i>R.M.</i></div>;
  return <div className="art art-contact"><i /><b>→</b><em>señal abierta</em></div>;
}
function ArchivePanel({ panel }: { panel: Panel }) {
  const [pressed, setPressed] = useState(false);
  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => { if (event.key === "Enter" || event.key === " ") event.currentTarget.querySelector<HTMLAnchorElement>("a")?.click(); };
  return <article className={`archive-panel ${panel.kind} ${pressed ? "is-pressed" : ""}`} onKeyDown={onKeyDown} onPointerDown={() => setPressed(true)} onPointerUp={() => setPressed(false)} onPointerLeave={() => setPressed(false)}><Link className="panel-link" to={panel.to} aria-label={`Ir a ${panel.title}`}><div className="panel-top"><span>{panel.index}</span><span className="panel-arrow">↗</span></div><Artwork kind={panel.kind} /><div className="panel-copy"><h2>{panel.title}</h2><p>{panel.description}</p><small>{panel.metadata}</small><small className="reveal">{panel.reveal}</small></div></Link></article>;
}
function NotesList() { return <ol className="latest-notes" aria-label="Últimas tres notas"><li><time dateTime="2026-07-31">31.07.2026</time><Link to="/notas#umbral">El umbral entre una idea y un sistema</Link></li><li><time dateTime="2026-07-18">18.07.2026</time><Link to="/notas#margen">Diseñar el margen: lo que una interfaz deja fuera</Link></li><li><time dateTime="2026-06-29">29.06.2026</time><Link to="/notas#archivo">El archivo no es una estantería</Link></li></ol>; }
function BooksList() { return <ol className="latest-books" aria-label="Últimos tres libros leídos"><li><Link to="/biblioteca#modulor"><span className="book-cover cover-modulor"><i>LE<br />MODULOR</i></span><span>El Modulor</span></Link></li><li><Link to="/biblioteca#cosas"><span className="book-cover cover-cosas"><i>LAS<br />COSAS</i></span><span>Las cosas</span></Link></li><li><Link to="/biblioteca#orden"><span className="book-cover cover-orden"><i>EL<br />ORDEN<br />DEL<br />TIEMPO</i></span><span>El orden del tiempo</span></Link></li></ol>; }
function Home() { return <main className="page-shell"><Header /><section className="hero" id="inicio" aria-labelledby="hero-title"><div className="hero-grid"><h1 id="hero-title">Rodolfo<br />Miranda</h1><p className="positioning">Estratega digital, diseñador y creador de sistemas útiles.</p></div><div className="connection"><span>ARCHIVO VIVO / 2026</span><i /></div></section><section className="panel-section" id="indice" aria-label="Archivo principal"><div className="section-label"><span>ÍNDICE DE CAMPOS</span><span>04 / 04</span></div><div className="panels">{panels.map((panel) => <ArchivePanel panel={panel} key={panel.index} />)}</div></section><section className="growing-section" id="ahora" aria-labelledby="growing-title"><div className="section-label"><span>ACTUALIZACIÓN DEL ARCHIVO</span><span>JULIO / 2026</span></div><h2 id="growing-title">Ahora está creciendo</h2><div className="growing-grid"><div className="preview-column"><h3>Últimas notas</h3><NotesList /><Link className="archive-link" to="/notas">Ver todas las notas ↗</Link></div><div className="preview-column"><h3>En la biblioteca</h3><BooksList /><Link className="archive-link" to="/biblioteca">Abrir biblioteca ↗</Link></div><div className="preview-column process-preview"><h3>En proceso</h3><div className="process-field"><span>07</span><i /><b>Cartografía<br />de ideas</b><em>Experimento en crecimiento · Julio 2026</em></div><Link className="archive-link" to="/experimentos">Ver experimentos ↗</Link></div></div></section></main>; }
function Detail({ title, index, children }: { title: string; index: string; children: React.ReactNode }) { return <main className="page-shell detail-page"><Header /><section className="detail-header"><span>{index} / ARCHIVO VIVO</span><h1>{title}</h1><Link to="/">← Volver al índice</Link></section><section className="detail-content">{children}</section></main>; }
function Yo() { return <Detail title="Yo" index="01"><p className="detail-lead">Edad: 39 años<br />Mexicano / Español<br />Ubicación: Barcelona</p><p>Trayectoria, proyectos y una forma de trabajar que organiza lo digital para que sea útil, legible y humano.</p></Detail>; }
function Notas() { return <Detail title="Notas" index="02"><NotesList /><p className="detail-lead">Ideas en proceso, conexiones y apuntes que siguen cambiando con el tiempo.</p></Detail>; }
function Biblioteca() { return <Detail title="Biblioteca" index="03"><BooksList /><p className="detail-lead">Libros, referencias y recomendaciones que acompañan el trabajo.</p></Detail>; }
function Contacto() { return <Detail title="Contáctame" index="04"><p className="detail-lead">Escríbeme a: <a href="mailto:hi@rodolfomiranda.company">hi@rodolfomiranda.company</a></p><p>Disponible para conversar sobre sistemas, experiencias y proyectos con una pregunta interesante detrás.</p></Detail>; }
function Experimentos() { return <Detail title="Experimentos" index="07"><div className="process-field detail-process"><span>07</span><i /><b>Cartografía<br />de ideas</b><em>Experimento en crecimiento · Julio 2026</em></div></Detail>; }
export const router = createBrowserRouter([{ path: "/", Component: Home }, { path: "/yo", Component: Yo }, { path: "/notas", Component: Notas }, { path: "/biblioteca", Component: Biblioteca }, { path: "/contacto", Component: Contacto }, { path: "/experimentos", Component: Experimentos }]);
