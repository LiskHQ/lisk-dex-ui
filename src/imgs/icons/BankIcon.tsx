interface IProps {
  className?: string;
  width?: number;
  height?: number;
  fill?: string;
  onClick?: () => void;
}

export const BankIcon: React.FC<IProps> = (props) => {
  const { className, width = 56, height = 48, fill = "#322573", onClick } = props;
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 56 48"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <path d="M14.8934 17.9351H18.1538L18.6555 36.2651H14.4542L14.8934 17.934V17.9351ZM11.8196 36.925H44.1804V39.2833H46.1194V41.6417H48V44H8V41.6417H9.88057V39.2833H11.8196V36.925ZM45.8681 12.817L28 4L10.1309 12.817V14.2591H45.8681V12.817ZM13.576 14.9179H42.424V17.2762H13.576V14.9179ZM37.7825 17.9351H41.0441L41.5458 36.2662H37.3445L37.7825 17.9362V17.9351ZM30.1528 17.9351H33.4143L33.916 36.2651L29.7147 36.2662L30.1528 17.934V17.9351ZM22.5231 17.9351H25.7846L26.2863 36.2662H22.084L22.5231 17.9362V17.9351Z" />
    </svg>
  );
};
