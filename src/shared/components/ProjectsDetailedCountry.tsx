import { useRef, useState } from "preact/hooks";
import ActionButtons from "@/shared/components/ActionButtons";
import CarouselImages from "@/shared/components/CarouselImages";
import { type Country, type Project } from "@/types/types";

interface ProjectsDetailedCountryProps {
  country: Country;
}

export default function ProjectsDetailedCountry({
  country,
}: ProjectsDetailedCountryProps) {
  const { projects } = country || {};
  const [projectSelected, setProjectSelected] = useState<Project | null>(
    projects[0]
  );
  const popupRef = useRef<HTMLDivElement>(null);

  const nextProject = () => {
    const index = projects.findIndex(
      ({ projectName }) => projectName === projectSelected?.projectName
    );
    const nextIndex = index + 1;
    if (nextIndex < projects.length) {
      debugger
      popupRef.current?.classList.add("opacity-0");
      setTimeout(() => {
        setProjectSelected(projects[nextIndex]);
        popupRef.current?.classList.remove("opacity-0");
      }, 500);
    }
  };

  const prevProject = () => {
    const index = projects.findIndex(
      ({ projectName }) => projectName === projectSelected?.projectName
    );
    const prevIndex = index - 1;
    if (prevIndex >= 0) {
      popupRef.current?.classList.add("opacity-0");
      setTimeout(() => {
        setProjectSelected(projects[prevIndex]);
        popupRef.current?.classList.remove("opacity-0");
      }, 500);
    }
  };

  const isDisabledBack = projectSelected && projects?.findIndex(({ projectName }) => projectName === projectSelected?.projectName) === 0;
  const isDisabledNext = projectSelected && projects?.findIndex(({ projectName }) => projectName === projectSelected.projectName) === projects?.length - 1;

  return (
    <div ref={popupRef}>
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
            <div className="flex flex-col gap-4">
              <div>
                <h3 className="text-secondary text-2xl font-bold">
                  {projectSelected.projectName}
                </h3>
              </div>
              {projectSelected.shortdescription && (
                <p
                  className="text-white pb-0 mb-0 max-w-[60ch] text-pretty"
                  dangerouslySetInnerHTML={{
                    __html: projectSelected.shortdescription,
                  }}
                />
              )}
            </div>
          </div>
          <div
            className={`flex-1 flex flex-col gap-2 justify-end max-w-none lg:max-w-80`}
          >
            {projects?.length > 1 && (
              <ActionButtons
                backButtonClicked={prevProject}
                nextButtonClicked={nextProject}
                className="absolute top-0 right-0 w-auto"
                isDisabledBack={isDisabledBack || false}
                isDisabledNext={isDisabledNext || false}
              />
            )}
            <div>
              {projectSelected.projectsCourts && (
                <div className="flex flex-col gap-2">
                  <h4 className="text-white text-xl font-bold">Projects courts</h4>
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
                  <p className="text-white">{projectSelected.constructionYear}</p>
                </div>
              )}
              {projectSelected.website && (
                <div className="flex flex-col gap-2">
                  <h4 className="text-white text-xl font-bold">Website</h4>
                  <a
                    href={projectSelected.website}
                    target="_blank"
                    className="text-white text__glowing"
                  >
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
    </div>
  );
}
