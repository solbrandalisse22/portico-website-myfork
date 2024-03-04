import Styles from '@/shared/styles/LogoCircles.module.css';
import { type VNode } from 'preact';

export default function LogoCircles({ className, children, reverse, stopAnimation }: { className?: string, children: VNode, reverse?: boolean, stopAnimation?: boolean}) {
  return (
    <div className={`${stopAnimation ? '' : Styles['logo-circle']} relative flex justify-center items-center ${className} ${reverse ? Styles.reverse : ''}`}>
      <svg className={Styles['circle']} viewBox="0 0 485 500" xmlns="http://www.w3.org/2000/svg">
        <path d="M 242.567 0.659 C 357.162 0.659 453.973 78.213 485.138 184.587 L 472.748 184.587 C 441.745 85.767 350.828 14.207 243.498 14.207 C 136.165 14.207 45.247 85.767 14.246 184.587 L 0 184.587 C 31.165 78.213 127.972 0.659 242.567 0.659 Z" style="fill: white;"/>
        <path d="M 242.435 22.206 C 347.026 22.206 435.204 90.996 462.347 184.887 L 454.122 184.887 C 427.216 95.323 342.625 29.94 242.435 29.94 C 142.248 29.94 57.655 95.323 30.749 184.887 L 22.524 184.887 C 49.667 90.996 137.847 22.206 242.435 22.206 Z" style="fill: white;"/>
        <path d="M 242.571 499.341 C 135.583 499.341 44.096 431.742 7.06 336.202 L 19.955 336.202 C 56.494 424.113 141.996 485.793 241.64 485.793 C 341.288 485.793 426.789 424.113 463.329 336.202 L 478.078 336.202 C 441.042 431.742 349.559 499.341 242.571 499.341 Z" style="fill: white;"/>
        <path d="M 242.702 477.794 C 146.077 477.794 63.459 419.084 30.035 336.108 L 38.553 336.108 C 71.547 414.714 150.522 470.06 242.702 470.06 C 334.881 470.06 413.858 414.714 446.852 336.108 L 455.37 336.108 C 421.946 419.084 339.326 477.794 242.702 477.794 Z" style="fill: white;"/>
      </svg>
      <div className="content absolute">
        {children}
      </div>
    </div>
  );
}