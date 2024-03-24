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
import Styles from '@/shared/styles/MapProjects.module.css';
import ActionButtons from "@/shared/components/ActionButtons";
import useDeviceDetection from '@/shared/hooks/useDeviceDetection';
import { toContext } from 'ol/render';

let zoom = 3;


// Estilo de la capa vectorial
const fill = new Fill({
  color: "#151a34",
});

const stroke = new Stroke({
  color: "#b7e4fd",
  width: 1,
})

const style = new Style({
  renderer(pixelCoordinates, state) {
    const { context, pixelRatio } = state;
    const geometry = state.geometry.clone();
    geometry.setCoordinates(pixelCoordinates);
    const grad = context.createLinearGradient(298, 200, 302, 1);
      grad.addColorStop(0, 'rgba(0, 255, 235, 1)');
      grad.addColorStop(1, 'rgba(7, 58, 187, 1)');

    // Stitch out country shape from the blue canvas
    context.save();
    context.shadowBlur = 200;
    context.shadowColor = 'rgba(183, 253, 251, 1)';

    const renderContext = toContext(context, { pixelRatio });

    // context.fillStyle = grad;

    renderContext.setFillStrokeStyle(fill, stroke);
    // context.fill();
    renderContext.drawGeometry(geometry);
    context.clip();
    context.restore();
  }
});

// Crear la capa vectorial
const vectorLayer = new Vector({
  source: new VectorSource({
    url: "/countries.geojson",
    format: new GeoJSON(),
    wrapX: false,
  }),
  style,
});

// Crear el mapa
const map = new Map({
  layers: [vectorLayer],
  view: new View({
    center: fromLonLat([20, 20.0]), // Centro del mapa (longitud, latitud)
    zoom: 3, // Nivel de zoom inicial
    minZoom: 3, // Nivel mínimo de zoom
    maxZoom: 5, // Nivel máximo de zoom
    constrainOnlyCenter: true, // Restringe el desplazamiento solo al centro del mapa
    extent: [-2000000, -1000000, 1200000, 7000000],
    multiWorld: false,
  }),
});

const features = countries.map(({ coordinates, country, projects }) =>
    new Feature({
      geometry: new Point(fromLonLat(coordinates)),
      name: country,
    })
);

features.forEach((feature) => {
  const { projects } = countries.find(item => item.country === feature.getProperties().name) || {};
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
  })
});

// Añadir la capa de los marcadores al mapa
map.addLayer(markerLayer);

// Interacción de selección de marcadores al hacer clic
const selectInteraction = new Select({
  condition: click,
});

map.addInteraction(selectInteraction);
map.addControl(new ZoomSlider());

map.updateSize()

export default function MapProjects() {
  const [countrySelected, setCountry] = useState() as [Country, any];
  const [projectSelected, setProject] = useState() as [Project, any];
  const device = useDeviceDetection()
  const mapRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (device === 'Mobile') {
      zoom = 0.2;
    } else {
      zoom = 3;
    }
    map.getView().setZoom(zoom);
  }, [device])

  const openPopoup = () => {
    const $popup = popupRef.current;
    if ($popup) {
      $popup.classList.add(Styles.open);
    }
  };

  const closePopoup = () => {
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
      popupRef.current?.querySelector('body')?.classList.add('opacity-0');
      setTimeout(() => {
        setProject(projects[nextIndex]);
        popupRef.current?.querySelector('body')?.classList.remove('opacity-0');
      }, 500)
    }
  }

  const prevProject = () => {
    const { projects } = countrySelected;
    const index = projects.findIndex(
      ({ projectName }) => projectName === projectSelected.projectName
    );
    const prevIndex = index - 1;
    if (prevIndex >= 0) {
      popupRef.current?.querySelector('body')?.classList.add('opacity-0');
      setTimeout(() => {
        setProject(projects[prevIndex]);
        popupRef.current?.querySelector('body')?.classList.remove('opacity-0');
      }, 500)
    }
  }

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

  const isDisabledBack = projectSelected && countrySelected?.projects?.findIndex(({ projectName }) => projectName === projectSelected.projectName) === 0;
  const isDisabledNext = projectSelected && countrySelected?.projects?.findIndex(({ projectName }) => projectName === projectSelected.projectName) === countrySelected?.projects?.length - 1;

  return (
    <>
      <div
        id="map"
        ref={mapRef}
        className={`map relative w-full ${device === 'Mobile' ? 'h-[500px]' : ''} ${device === 'Tablet' ? 'h-[800px]' : ''} ${device === 'Desktop' ? 'h-[1000px]' : ''}`}
        tabindex={0}
      />
      {countrySelected && (
        <div
          onMouseDown={closePopoup}
          className="fixed z-40 left-0 top-0 bottom-0 right-0"
        />
      )}
      <div
        ref={popupRef}
        className={`${Styles.popup} fixed w-[90%] h-[90%] scale-0 bg-black/90 rounded-xl border border-primary origin-center z-50 flex flex-col`}
        style={{
          transform: "translate(-50%, -50%) scale(0)",
        }}
      >
        <header className="flex justify-between items-center p-4 border-b border-primary">
          <h2 id="header-title" className="text-white text-2xl font-bold transition-opacity">
            {countrySelected?.country}
          </h2>
          <button
            onClick={closePopoup}
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
                    <span className="text-primary text-sm">{projectSelected.projectCity}</span>
                    <h3 className="text-secondary text-2xl font-bold">
                      {projectSelected.projectName}
                    </h3>
                  </div>
                  <p
                    className="text-white pb-0 mb-0 max-w-[60ch] text-pretty"
                    dangerouslySetInnerHTML={{
                      __html: projectSelected.shortdescription,
                    }}
                  />
                </div>
              </div>
              <div className={`flex-1 flex flex-col gap-2 justify-end max-w-80`}>
                {
                  countrySelected?.projects?.length > 1 && (
                    <ActionButtons backButtonClicked={prevProject} nextButtonClicked={nextProject} className="absolute top-0 right-0 w-auto" isDisabledBack={isDisabledBack} isDisabledNext={isDisabledNext} />
                  )
                }
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
                      <a href={projectSelected.website} className="text-white">
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
              <CarouselImages
                images={projectSelected?.images || []}
              />
            </div>
          )}
        </body>
      </div>
    </>
  );
}
