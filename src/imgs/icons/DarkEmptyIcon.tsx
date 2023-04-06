interface IProps {
  className?: string;
  width?: number;
  height?: number;
  fill?: string;
  onClick?: () => void;
}

const DarkEmptyIcon: React.FC<IProps> = (props) => {
  return (
    <svg
      width="211"
      height="128"
      viewBox="0 0 211 128"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M57.9228 107.032C55.5851 107.032 53.3431 106.103 51.6901 104.45C50.0371 102.797 49.1084 100.555 49.1084 98.2172C49.1084 95.8795 50.0371 93.6375 51.6901 91.9845C53.3431 90.3315 55.5851 89.4029 57.9228 89.4029H8.81434C6.47663 89.4029 4.23467 88.4742 2.58166 86.8212C0.92865 85.1682 0 82.9262 0 80.5885C0 78.2508 0.92865 76.0089 2.58166 74.3559C4.23467 72.7029 6.47663 71.7742 8.81434 71.7742H59.182C61.5197 71.7742 63.7616 70.8456 65.4146 69.1925C67.0677 67.5395 67.9963 65.2976 67.9963 62.9599C67.9963 60.6222 67.0677 58.3802 65.4146 56.7272C63.7616 55.0742 61.5197 54.1455 59.182 54.1455H27.7022C25.3645 54.1455 23.1225 53.2169 21.4695 51.5639C19.8165 49.9109 18.8879 47.6689 18.8879 45.3312C18.8879 42.9935 19.8165 40.7515 21.4695 39.0985C23.1225 37.4455 25.3645 36.5169 27.7022 36.5169H78.0698C75.7321 36.5169 73.4902 35.5882 71.8372 33.9352C70.1841 32.2822 69.2555 30.0402 69.2555 27.7025C69.2555 25.3648 70.1841 23.1229 71.8372 21.4698C73.4902 19.8168 75.7321 18.8882 78.0698 18.8882H201.471C203.808 18.8882 206.05 19.8168 207.703 21.4698C209.356 23.1229 210.285 25.3648 210.285 27.7025C210.285 30.0402 209.356 32.2822 207.703 33.9352C206.05 35.5882 203.808 36.5169 201.471 36.5169H151.103C153.441 36.5169 155.683 37.4455 157.336 39.0985C158.989 40.7515 159.917 42.9935 159.917 45.3312C159.917 47.6689 158.989 49.9109 157.336 51.5639C155.683 53.2169 153.441 54.1455 151.103 54.1455H178.805C181.143 54.1455 183.385 55.0742 185.038 56.7272C186.691 58.3802 187.619 60.6222 187.619 62.9599C187.619 65.2976 186.691 67.5395 185.038 69.1925C183.385 70.8456 181.143 71.7742 178.805 71.7742H165.994C159.856 71.7742 154.88 75.7205 154.88 80.5885C154.88 85.4566 162.436 89.4029 162.436 89.4029C164.773 89.4029 167.015 90.3315 168.668 91.9845C170.321 93.6375 171.25 95.8795 171.25 98.2172C171.25 100.555 170.321 102.797 168.668 104.45C167.015 106.103 164.773 107.032 162.436 107.032H57.9228ZM192.656 62.9599C192.656 61.2166 193.173 59.5124 194.142 58.0629C195.11 56.6134 196.487 55.4836 198.097 54.8165C199.708 54.1493 201.48 53.9748 203.19 54.3149C204.9 54.655 206.471 55.4945 207.703 56.7272C208.936 57.9599 209.775 59.5305 210.115 61.2403C210.456 62.9501 210.281 64.7224 209.614 66.333C208.947 67.9436 207.817 69.3202 206.368 70.2887C204.918 71.2572 203.214 71.7742 201.471 71.7742C199.133 71.7742 196.891 70.8456 195.238 69.1925C193.585 67.5395 192.656 65.2976 192.656 62.9599Z" fill="#372E6A" />
      <path d="M142.699 117.239L68.96 126.293C67.6342 126.456 66.2979 126.086 65.2453 125.263C64.1926 124.441 63.5098 123.234 63.347 121.908L51.9944 29.4486C51.913 28.7856 52.0983 28.1175 52.5095 27.5912C52.9207 27.0649 53.5242 26.7235 54.1871 26.6421L54.2134 26.6388L60.3302 25.9525L65.2768 25.3959L68.8285 24.9991L134.32 17.6289L146.032 103.056L147.084 111.626C147.247 112.952 146.876 114.288 146.054 115.341C145.231 116.394 144.024 117.077 142.699 117.239Z" fill="#A8A0D9" stroke="#2D2166" strokeWidth="2.5" strokeMiterlimit="10" strokeLinecap="round" />
      <path d="M131.127 23.0049L141.729 100.424L142.683 108.192C142.76 108.783 142.719 109.383 142.563 109.958C142.408 110.534 142.14 111.073 141.776 111.545C141.412 112.017 140.958 112.412 140.441 112.708C139.924 113.005 139.353 113.196 138.762 113.272L72.7275 121.38C72.1356 121.449 71.5357 121.402 70.9622 121.239C70.3887 121.077 69.8529 120.803 69.3854 120.433C68.9179 120.063 68.5279 119.605 68.2377 119.084C67.9476 118.564 67.763 117.991 67.6944 117.399L57.432 33.8182C57.3506 33.1553 57.5359 32.4871 57.9471 31.9608C58.3583 31.4345 58.9618 31.0931 59.6247 31.0117L67.7934 30.0087" fill="#B1A9DE" />
      <path d="M154.474 104.198H80.1815C78.2721 104.198 76.7188 102.645 76.7188 100.735V5.03699C76.7188 3.12762 78.2721 1.57422 80.1815 1.57422H137.546C138.471 1.57422 139.34 1.93414 139.994 2.58769L156.922 19.5048C157.576 20.1589 157.937 21.0288 157.937 21.9541V100.735C157.937 102.645 156.383 104.198 154.474 104.198Z" fill="#B1A9DE" />
      <path d="M80.1774 2.64798C78.8598 2.64798 77.7886 3.71914 77.7886 5.03676V100.735C77.7886 102.053 78.8598 103.124 80.1774 103.124H154.47C155.787 103.124 156.858 102.053 156.858 100.735V21.9539C156.858 21.3165 156.609 20.7148 156.158 20.2642L139.231 3.34712L138.877 3.70078L139.231 3.34712C138.78 2.89694 138.179 2.64798 137.542 2.64798H80.1774ZM80.1774 0.5H137.542C138.745 0.5 139.898 0.977586 140.749 1.8278L157.677 18.7449C158.528 19.5958 159.006 20.7502 159.006 21.9539V100.735C159.006 103.241 156.975 105.272 154.47 105.272H80.1774C77.6718 105.272 75.6406 103.241 75.6406 100.735V5.03676C75.6406 2.53118 77.6718 0.5 80.1774 0.5Z" fill="#2D2166" stroke="#2D2166" />
      <path d="M138.102 3.02588V17.6325C138.102 18.6344 138.5 19.5952 139.208 20.3036C139.916 21.0121 140.877 21.4101 141.879 21.4101H151.87" stroke="#2D2166" strokeWidth="2.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export default DarkEmptyIcon;