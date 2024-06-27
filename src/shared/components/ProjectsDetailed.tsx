import { useRef, useEffect, useState } from "preact/hooks";
import { type Country, type Project } from "@/types/types";
import ProjectsDetailedCountry from "./ProjectsDetailedCountry";
import countriesList from "@/shared/data/countries.json";

const continents = [
  {
    name: "Europe",
    countries: countriesList
      .filter((country) => country.continent === "Europe")
      .map(({ country }) => country),
  },
  {
    name: "America",
    countries: countriesList
      .filter((country) => country.continent === "America")
      .map(({ country }) => country),
  },
  {
    name: "Oceania",
    countries: countriesList
      .filter((country) => country.continent === "Oceania")
      .map(({ country }) => country),
  },
  {
    name: "Africa",
    countries: countriesList
      .filter((country) => country.continent === "Africa")
      .map(({ country }) => country),
  },
];

export default function ProjectsDetailed() {
  const popupRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null)
  const [continent, setContinent] = useState<string | null>(null);
  const [country, setCountry] = useState<Country | null>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (e.target && (e.target as HTMLElement).getAttribute("data-type") === "continent") {
        setContinent(continent === ((e.target as HTMLElement).getAttribute("name") as string) ? null : ((e.target as HTMLElement).getAttribute("name") as string));
      } else {
        setContinent(null);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  function openPopup() {
    if (backdropRef.current) {
      backdropRef.current.classList.remove("hidden");
    }
    if (popupRef.current) {
      popupRef.current.style.transform = "translate(-50%, -50%) scale(1)";
      popupRef.current.style.opacity = "1";
    }
  }

  function closePopup() {
    if (popupRef.current) {
      popupRef.current.style.transform = "translate(-50%, -50%) scale(0)";
      setTimeout(() => {
        if (popupRef.current) {
          popupRef.current.style.opacity = "0";
        }
      }, 500);
    }
    if (backdropRef.current) {
      backdropRef.current.classList.add("hidden");
    }
  }

  useEffect(() => {
    if (country) {
      openPopup();
    } else {
      closePopup();
    }
  }, [country]);

  return (
    <>
      <div
        ref={backdropRef}
        onClick={() => setCountry(null)}
        class="backdrop fixed z-40 left-0 top-0 bottom-0 right-0 hidden"
      />
      <div
        ref={popupRef}
        class={`fixed w-[90%] max-w-[1600px] min-h-[400px] scale-0 bg-black/90 rounded-xl border border-primary origin-center z-50 flex flex-col top-1/2 left-1/2 transition-transform`}
        style={{
          transform: "translate(-50%, -50%) scale(0)",
        }}
      >
        <header class="flex justify-between items-center p-4 border-b border-primary">
          <h2
            id="header-title"
            class="text-white text-2xl font-bold transition-opacity"
          >
            {country?.country}
          </h2>
          <button
            onClick={() => setCountry(null)}
            id="close-popup"
            class={`flex justify-center items-center text-white border border-white aspect-square w-8 h-8 rounded-full text-2xl font-bold`}
          >
            x
          </button>
        </header>
        <div class="p-6 flex flex-col gap-6 flex-1 overflow-auto transition-opacity relative">
          {
            country ? ( <ProjectsDetailedCountry country={country} /> ) : null
          }
        </div>
      </div>
      <div class="flex font-thin gap-10 justify-center mb-8 mx-auto text-xl flex-wrap items-center relative">
        {continents.map(({ name, countries }) => (
          <div class="relative">
            <button
              name={name}
              data-type="continent"
              class="border font-bold px-4 py-1 rounded-xl uppercase text__glowing"
            >
              {name}
            </button>
            {continent === name && (
              <ul
                id={`contries-${name}`}
                class="absolute bg-black/90 border border-primary rounded-xl top-10 z-10 left-1/2 -translate-x-1/2 w-52 max-h-48 overflow-auto"
              >
                {countries.map((country) => {
                  const countrySelected = countriesList.find(
                    (item) => item.country === country
                  );
                  return (
                    <>
                      <li>
                        <button
                          data-type="country"
                          class="px-4 py-2 text__glowing text-left uppercase w-full font-bold"
                          onClick={() => setCountry(countrySelected as unknown as Country | null)}
                        >
                          {country}
                        </button>
                      </li>
                    </>
                  );
                })}
              </ul>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
