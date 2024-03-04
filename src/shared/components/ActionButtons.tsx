import LogoCircles from "@/shared/components/logos/LogoCircles";

export default function ActionButtons ({ backButtonClicked, nextButtonClicked, className, isDisabledBack, isDisabledNext }: { backButtonClicked: () => void, nextButtonClicked: () => void, className?: string, isDisabledBack?: boolean, isDisabledNext?: boolean}) {
  return (
    <div class={`flex justify-center items-center w-full gap-6 p-4 ${className}`}>
        <button disabled={isDisabledBack} onClick={backButtonClicked} class={`w-10 h-10 flex justify-center items-center rounded-full ${isDisabledBack ? 'opacity-25' : 'opacity-100'}`}>
          <LogoCircles className="w-12" reverse stopAnimation={isDisabledBack}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-chevron-left"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M15 6l-6 6l6 6" />
            </svg>
          </LogoCircles>
        </button>
        <button disabled={isDisabledNext} onClick={nextButtonClicked} class={`w-10 h-10 flex justify-center items-center rounded-full ${isDisabledNext ? 'opacity-25' : 'opacity-100'}`}>
          <LogoCircles className="w-12" stopAnimation={isDisabledNext}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-chevron-right"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M9 6l6 6l-6 6" />
            </svg>
          </LogoCircles>
        </button>
      </div>
  )}