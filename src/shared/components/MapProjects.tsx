import { useEffect, useState, useRef } from "preact/hooks";
import "ol/ol.css";
import Map from "ol/Map";
import Feature from "ol/Feature";
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";
import Vector from "ol/layer/Vector";
import View from "ol/View";
import { fromLonLat } from "ol/proj";
import Point from "ol/geom/Point";
import { Select } from "ol/interaction";
import { click } from "ol/events/condition";
import { ZoomSlider } from "ol/control";
import { Fill, Stroke, Style, Icon } from "ol/style";
import countries from "@/shared/data/countries.json";
import { type Country, type Project } from "@/types/types";
import CarouselImages from "@/shared/components/CarouselImages";
import Styles from "@/shared/styles/MapProjects.module.css";
import ActionButtons from "@/shared/components/ActionButtons";
import { toContext } from "ol/render";

// Estilo de la capa vectorial
const fill = new Fill({
  color: "#151a34",
});

const stroke = new Stroke({
  color: "#b7e4fd",
  width: 1,
});

// Crear la capa vectorial
const vectorLayer = new Vector({
  source: new VectorSource({
    url: "/countries.geojson",
    format: new GeoJSON(),
    wrapX: false,
  }),
});

// Crear el mapa
const map = new Map({
  layers: [vectorLayer],
  view: new View({
    center: fromLonLat([0, 0]), // Centro del mapa (longitud, latitud)
    zoom: 2.9, // Nivel de zoom inicial
    minZoom: 2.9, // Nivel mínimo de zoom
    maxZoom: 5, // Nivel máximo de zoom
    multiWorld: false,
    constrainOnlyCenter: true, // Restringe el desplazamiento solo al centro del mapa
    // extent: [-200000, -1000000, 1200000, 7000000],
    // extent: [-180, -90, 180, 90],
    // enableRotation: false,
    constrainResolution: true,
  }),
});

function getWindowSize() {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}

// Cargar los datos del GeoJSON
vectorLayer.getSource().on("change", function (e) {
  if (vectorLayer.getSource().getState() === "ready") {
    // Obtener el extent del GeoJSON cargado
    const extent = vectorLayer.getSource().getExtent();

    // Establecer el extent como el extent inicial de la vista del mapa
    map.getView().fit(extent);
    map.updateSize();
    // actualizamos el center
    const size = getWindowSize();
    if (size.width <= 767) {
      map.getView().setCenter(fromLonLat([20, 50]));
    } else if (size.width <= 1024) {
      map.getView().setCenter(fromLonLat([30, 50]));
    } else if (size.width <= 1440) {
      map.getView().setCenter(fromLonLat([40, 50]));
    } else {
      map.getView().setCenter(fromLonLat([35, 15]));
    }
  }
});

const features = countries.map(
  ({ coordinates, country, projects }) =>
    new Feature({
      geometry: new Point(fromLonLat(coordinates)),
      name: country,
    })
);

features.forEach((feature) => {
  const { projects } =
    countries.find((item) => item.country === feature.getProperties().name) ||
    {};
  feature.setStyle(
    new Style({
      image: new Icon({
        src: projects ? "/padel-ball.png" : "/padel-disabled.png",
      }),
    })
  );
});

// Crear la capa vectorial de marcadores
const markerStyle = new Style({
  image: new Icon({
    src: "https://porticosport.com/wp-content/uploads/2023/05/padel-ball.png",
  }),
});

// Añadir la capa vectorial de marcadores al mapa
const markerLayer = new Vector({
  source: new VectorSource({
    features,
  }),
});

// Añadir la capa de los marcadores al mapa
map.addLayer(markerLayer);

// Interacción de selección de marcadores al hacer clic
const selectInteraction = new Select({
  condition: click,
});

map.addInteraction(selectInteraction);
map.addControl(new ZoomSlider());

map.on('loadstart', function () {
  map.getTargetElement().classList.add(Styles.spinner);
});
map.on('loadend', function () {
  map.getTargetElement().classList.remove(Styles.spinner);
});

map.updateSize();

export default function MapProjects() {
  const [countrySelected, setCountry] = useState() as [Country, any];
  const [projectSelected, setProject] = useState() as [Project, any];
  const mapRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  const openPopoup = () => {
    const $popup = popupRef.current;
    if ($popup) {
      $popup.classList.add(Styles.open);
    }
  };

  const closePopup = () => {
    const $popup = popupRef.current;
    $popup?.classList.remove(Styles.open);
    selectInteraction.getFeatures().clear();
    setCountry(null);
    setProject(null);
  };

  const nextProject = () => {
    const { projects } = countrySelected;
    const index = projects.findIndex(
      ({ projectName }) => projectName === projectSelected.projectName
    );
    const nextIndex = index + 1;
    if (nextIndex < projects.length) {
      popupRef.current?.querySelector("body")?.classList.add("opacity-0");
      setTimeout(() => {
        setProject(projects[nextIndex]);
        popupRef.current?.querySelector("body")?.classList.remove("opacity-0");
      }, 500);
    }
  };

  const prevProject = () => {
    const { projects } = countrySelected;
    const index = projects.findIndex(
      ({ projectName }) => projectName === projectSelected.projectName
    );
    const prevIndex = index - 1;
    if (prevIndex >= 0) {
      popupRef.current?.querySelector("body")?.classList.add("opacity-0");
      setTimeout(() => {
        setProject(projects[prevIndex]);
        popupRef.current?.querySelector("body")?.classList.remove("opacity-0");
      }, 500);
    }
  };

  useEffect(() => {
    const $popup = popupRef.current;
    const $map = mapRef.current;
    if (mapRef.current) {
      map.setTarget(mapRef.current);
    }
    // Añadir la interacción al mapa
    selectInteraction.on("select", (event) => {
      var selectedFeature = event.selected[0];
      selectInteraction.getFeatures().clear();
      if (selectedFeature) {
        const name = selectedFeature.getProperties().name;
        const country = countries.find(({ country }) => country === name);
        if (country && $map && $popup && country.projects) {
          selectedFeature.setStyle(markerStyle);
          const { projects } = country;
          const [project] = projects || {};
          // Set the country
          setCountry(country);
          if (project) {
            setProject(project);
          }
          // get position of the country in window
          const { coordinates } = country;
          const position = fromLonLat(coordinates);
          const pixel = map.getPixelFromCoordinate(position);
          const mapRect = $map.getBoundingClientRect();
          const x = pixel[0] + mapRect.left;
          const y = pixel[1] + mapRect.top;
          $popup.style.left = `${x}px`;
          $popup.style.top = `${y}px`;
          setTimeout(() => {
            openPopoup();
          }, 500);
        }
      } else {
        selectInteraction.getFeatures().clear();
      }
    });
  }, []);

  const isDisabledBack =
    projectSelected &&
    countrySelected?.projects?.findIndex(
      ({ projectName }) => projectName === projectSelected.projectName
    ) === 0;
  const isDisabledNext =
    projectSelected &&
    countrySelected?.projects?.findIndex(
      ({ projectName }) => projectName === projectSelected.projectName
    ) ===
      countrySelected?.projects?.length - 1;

  return (
    <>
      <div
        id="map"
        ref={mapRef}
        className={`map relative w-full h-[500px] md:h-[600px] lg:h-[700px] xl:h-[800px] 2xl:h-[900px]`}
        tabindex={0}
      >
      </div>
      {countrySelected && (
        <div
          onClick={() => closePopup}
          className="backdrop fixed z-40 left-0 top-0 bottom-0 right-0"
        />
      )}
      <div
        ref={popupRef}
        className={`${Styles.popup} fixed w-[90%] min-h-[400px] scale-0 bg-black/90 rounded-xl border border-primary origin-center z-50 flex flex-col`}
        style={{
          transform: "translate(-50%, -50%) scale(0)",
        }}
      >
        <header className="flex justify-between items-center p-4 border-b border-primary">
          <h2
            id="header-title"
            className="text-white text-2xl font-bold transition-opacity"
          >
            {countrySelected?.country}
          </h2>
          <button
            onClick={closePopup}
            className={`${Styles.close} flex justify-center items-center text-white border border-white aspect-square w-8 h-8 rounded-full text-2xl font-bold`}
          >
            x
          </button>
        </header>
        <body className="p-6 flex flex-col gap-6 flex-1 overflow-auto transition-opacity relative">
          {projectSelected && (
            <div className="flex flex-col lg:flex-row gap-6 flex-1 justify-between">
              <div className="flex flex-col justify-between">
                {projectSelected.projectLogo && (
                  <img
                    className="rounded-full border-secondary border-4 object-cover"
                    src={projectSelected.projectLogo}
                    alt={projectSelected.projectName}
                    width={150}
                    height={150}
                  />
                )}
                <div class="flex flex-col gap-4">
                  <div>
                    {
                      projectSelected.projectCountry && (<span className="text-primary text-sm">
                      {projectSelected.projectCity}
                    </span>)
                    }
                    <h3 className="text-secondary text-2xl font-bold">
                      {projectSelected.projectName}
                    </h3>
                  </div>
                  {
                    projectSelected.shortdescription && (<p
                      className="text-white pb-0 mb-0 max-w-[60ch] text-pretty"
                      dangerouslySetInnerHTML={{
                        __html: projectSelected.shortdescription,
                      }}
                    />)
                  }
                </div>
              </div>
              <div
                className={`flex-1 flex flex-col gap-2 justify-end max-w-none lg:max-w-80`}
              >
                {countrySelected?.projects?.length > 1 && (
                  <ActionButtons
                    backButtonClicked={prevProject}
                    nextButtonClicked={nextProject}
                    className="absolute top-0 right-0 w-auto"
                    isDisabledBack={isDisabledBack}
                    isDisabledNext={isDisabledNext}
                  />
                )}
                <div>
                  {projectSelected.projectsCourts && (
                    <div className="flex flex-col gap-2">
                      <h4 className="text-white text-xl font-bold">
                        Projects courts
                      </h4>
                      <p
                        className="text-white"
                        dangerouslySetInnerHTML={{
                          __html: projectSelected.projectsCourts,
                        }}
                      />
                    </div>
                  )}
                  {projectSelected.constructionYear && (
                    <div className="flex flex-col gap-2">
                      <h4 className="text-white text-xl font-bold">
                        Construction Year
                      </h4>
                      <p className="text-white">
                        {projectSelected.constructionYear}
                      </p>
                    </div>
                  )}
                  {projectSelected.website && (
                    <div className="flex flex-col gap-2">
                      <h4 className="text-white text-xl font-bold">Website</h4>
                      <a href={projectSelected.website} target="_blank" className="text-white text__glowing">
                        {projectSelected.website}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          {projectSelected?.images?.length && (
            <div className="py-6 border-t border-primary">
              <CarouselImages images={projectSelected?.images || []} />
            </div>
          )}
        </body>
      </div>
    </>
  );
}
