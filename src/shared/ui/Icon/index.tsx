import { JSX, SVGProps } from "react";
import styles from "./index.module.scss";

type IconName = "edit" | "delete" | "add" | "close" | "done";

const ICONS: Record<IconName, (props: SVGProps<SVGSVGElement>) => JSX.Element> =
  {
    edit: (props) => (
      <svg {...props} viewBox="0 0 24 24" fill="none">
        <path
          d="M12 20H21"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16.5 3.5C16.9 3.1 17.44 2.88 18 2.88c.28 0 .55.05.81.16s.49.26.69.46c.2.2.36.43.47.69.11.26.17.54.17.81a2 2 0 0 1-.17.81c-.11.26-.27.49-.47.69L7 19l-4 1 1-4L16.5 3.5Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    delete: (props) => (
      <svg {...props} viewBox="0 0 24 24" fill="none">
        <path
          d="M3 6H5H21"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10 11v6"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14 11v6"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    add: (props) => (
      <svg {...props} viewBox="0 0 24 24" fill="none">
        <path
          d="M12 5v14M5 12h14"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    done: (props) => (
      <svg {...props} viewBox="0 0 24 24" fill="none">
        <path
          d="M5 13.5L10 18L19 7"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    close: (props) => (
      <svg {...props} viewBox="0 0 24 24" fill="none">
        <path
          d="M6 6L18 18"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M18 6L6 18"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  };

interface IIconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
}
const Icon: React.FC<IIconProps> = ({ name, className, ...svgProps }) => {
  const Component = ICONS[name];
  return <Component {...svgProps} className={`${styles.icon} ${className}}`} />;
};

export default Icon;
