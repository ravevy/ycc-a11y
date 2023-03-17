import { useState, useEffect } from "react";

export default function Navbar(): JSX.Element {
  const [serviceExpand, setServiceExpand] = useState<boolean>(false);
  const [aboutExpand, setAboutExpand] = useState<boolean>(false);

  function expandingServiceDropdown(input: boolean): void {
    setServiceExpand(input);
    setAboutExpand(false);
  }
  function expandingAboutDropdown(input: boolean): void {
    setAboutExpand(input);
    setServiceExpand(false);
  }
  function closeAllDropdowns(): void {
    setAboutExpand(false);
    setServiceExpand(false);
  }

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      e.preventDefault();
      let target = e.target as HTMLElement;

      if (target.className.includes("dropdown")) {
        if (target.className.includes("services")) {
          expandingServiceDropdown(!serviceExpand);
        } else if (target.className.includes("about")) {
          expandingAboutDropdown(!aboutExpand);
        }
      } else {
        closeAllDropdowns();
      }
    };

    document.addEventListener("click", handleClick);

    const handleKeyup = (e: KeyboardEvent) => {
      const key = e.key;
      const target = e.target as HTMLElement;

      if (key === "Tab") {
        if (!target.className.includes("services") && serviceExpand) {
          setServiceExpand(false);
        }
        if (!target.className.includes("about") && aboutExpand) {
          setAboutExpand(false);
        }
      }
      if (key === "Enter") {
        if (target.className.includes("services")) {
          expandingServiceDropdown(true);
        }
        if (target.className.includes("about")) {
          expandingAboutDropdown(true);
        }
      }
      if (key === "Escape") {
        closeAllDropdowns();
      }
    };
    document.addEventListener("keyup", handleKeyup);

    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keyup", handleKeyup);
    };
  }, [aboutExpand, serviceExpand]);

  return (
    <nav className="navbar">
      <ul>
        <li>
          <a href="#home">Home</a>
        </li>
        <li>
          <a href="#services" className="dropdown services">
            Services
          </a>
          <ul id="services" aria-expanded={serviceExpand}>
            <li>
              <a className="services" href="#service-one">
                Service 1
              </a>
            </li>
            <li>
              <a className="services" href="#service-two">
                Service 2
              </a>
            </li>
          </ul>
        </li>
        <li>
          <a href="#about" className="dropdown about">
            About
          </a>
          <ul aria-expanded={aboutExpand}>
            <li>
              <a className="about" href="#history">
                History
              </a>
            </li>
            <li>
              <a className="about" href="#members">
                Members
              </a>
            </li>
          </ul>
        </li>
        <li>
          <a href="#contact">Contact</a>
        </li>
      </ul>
    </nav>
  );
}
