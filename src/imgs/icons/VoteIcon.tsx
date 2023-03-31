interface IProps {
  className?: string;
  width?: number;
  height?: number;
  fill?: string;
  onClick?: () => void;
}

const VoteIcon: React.FC<IProps> = (props) => {
  return (
    <svg
      width="83"
      height="96"
      viewBox="0 0 83 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M81.8208 39.5273V94.2689H0.894531V39.5273L14.8733 25.5237H39.5662C35.3019 24.6335 32.0994 20.8566 32.0994 16.3313C32.0994 11.1421 36.309 6.9375 41.5031 6.9375C46.6973 6.9375 50.9069 11.1421 50.9069 16.3313C50.9069 20.8566 47.7043 24.6335 43.4401 25.5237H67.8445L81.8208 39.5273Z" fill="#D4CFEF" />
      <path d="M53.2111 61.2338H43.4195C42.7929 61.2338 42.2857 61.741 42.2857 62.3626C42.2857 62.9867 42.7929 63.4915 43.4195 63.4915H47.184V73.84C47.184 74.4617 47.6912 74.9664 48.3153 74.9664C48.9369 74.9664 49.4441 74.4617 49.4441 73.84V63.4915H53.2111C53.8352 63.4915 54.3424 62.9867 54.3424 62.3626C54.3424 61.741 53.8352 61.2338 53.2111 61.2338ZM66.8418 72.7112H58.179V69.2302H64.4399C65.064 69.2302 65.5712 68.7229 65.5712 68.1013C65.5712 67.4772 65.064 66.9725 64.4399 66.9725H58.179V63.4915H66.8418C67.4659 63.4915 67.9706 62.9867 67.9706 62.3626C67.9706 61.741 67.4659 61.2338 66.8418 61.2338H57.0477C56.4236 61.2338 55.9188 61.741 55.9188 62.3626V73.84C55.9188 74.4617 56.4236 74.9664 57.0477 74.9664H66.8418C67.4659 74.9664 67.9706 74.4617 67.9706 73.84C67.9706 73.2135 67.4659 72.7112 66.8418 72.7112ZM38.4491 64.3617C38.4491 63.8818 38.0612 63.4915 37.5813 63.4915H31.7879C31.308 63.4915 30.9152 63.8818 30.9152 64.3617V71.841C30.9152 72.3183 31.308 72.7112 31.7879 72.7112H37.5813C38.0612 72.7112 38.4491 72.3183 38.4491 71.841V64.3617ZM40.7093 64.3617V71.841C40.7093 73.5641 39.3069 74.9664 37.5813 74.9664H31.7879C30.0623 74.9664 28.6575 73.5641 28.6575 71.841V64.3617C28.6575 62.6386 30.0623 61.2338 31.7879 61.2338H37.5813C39.3069 61.2338 40.7093 62.6386 40.7093 64.3617ZM49.372 16.3311C49.372 11.9848 45.8487 8.46396 41.4999 8.46396C37.1512 8.46396 33.6254 11.9848 33.6254 16.3311C33.6254 20.6724 37.1512 24.1957 41.4999 24.1957C45.8487 24.1957 49.372 20.6724 49.372 16.3311ZM56.3763 31.5332H26.6211V1.12646H56.3763V31.5332ZM26.9891 62.8052L22.0932 74.2826C21.9167 74.6979 21.5064 74.9664 21.0539 74.9664C20.6014 74.9664 20.1911 74.6979 20.0146 74.2826L15.1188 62.8052C14.8726 62.2308 15.1411 61.5694 15.713 61.3233C16.2874 61.0796 16.9513 61.3457 17.1974 61.92L21.0539 70.9583L24.9129 61.92C25.1541 61.3457 25.8204 61.0796 26.3923 61.3233C26.9667 61.5694 27.2352 62.2308 26.9891 62.8052Z" fill="#322573" />
      <path d="M36.6402 18.4345C36.2001 17.9919 36.2001 17.2783 36.6402 16.8382C37.0828 16.3956 37.7964 16.3956 38.239 16.8382L39.982 18.5787L44.761 13.8047C45.2036 13.3622 45.9172 13.3622 46.3598 13.8047C46.8023 14.2448 46.8023 14.9584 46.3598 15.401L40.7827 20.9732C40.5589 21.1944 40.2705 21.3039 39.982 21.3039C39.6936 21.3039 39.4027 21.1944 39.1839 20.9732L36.6402 18.4345ZM80.7398 93.2218H2.26018V40.636H80.7398V93.2218ZM14.8689 26.5254H25.491V30.4042H19.7473C19.1232 30.4042 18.6185 30.9115 18.6185 31.5331C18.6185 32.1572 19.1232 32.6619 19.7473 32.6619H63.2527C63.8743 32.6619 64.3815 32.1572 64.3815 31.5331C64.3815 30.9115 63.8743 30.4042 63.2527 30.4042H57.5065V26.5254H68.1286L79.2604 38.3758H3.73961L14.8689 26.5254ZM27.7537 2.2552H55.2488V30.4042H27.7537V2.2552ZM83 39.4922C82.9975 39.4251 82.9925 39.3604 82.9776 39.2933C82.9751 39.2759 82.9677 39.2585 82.9652 39.2411C82.9528 39.1938 82.9403 39.1466 82.9204 39.1018C82.913 39.0794 82.9055 39.0596 82.8956 39.0397C82.8757 38.9924 82.8483 38.9452 82.821 38.8979C82.8135 38.8905 82.8085 38.8805 82.8036 38.8681C82.7712 38.8209 82.7339 38.7761 82.6942 38.7338L69.4439 24.6233C69.2301 24.3945 68.9317 24.2677 68.6184 24.2677H57.5065V1.12636C57.5065 0.504748 57.0017 0 56.3776 0H26.6224C25.9983 0 25.491 0.504748 25.491 1.12636V24.2677H14.3791C14.0683 24.2677 13.7699 24.3945 13.5561 24.6233L0.305833 38.7338C0.26605 38.7761 0.228753 38.8209 0.196429 38.8681C0.18897 38.8805 0.186483 38.8905 0.179024 38.8979C0.149186 38.9452 0.124322 38.9924 0.101944 39.0397C0.0919984 39.0596 0.0845393 39.0794 0.0770798 39.0993C0.0596751 39.1466 0.044756 39.1938 0.0348102 39.2411C0.029837 39.2585 0.0248643 39.2759 0.022378 39.2933C0.00745902 39.3604 0.00248629 39.4251 0 39.4922C0 39.4972 0 39.4997 0 39.5071V94.3506C0 94.9722 0.504748 95.4795 1.12885 95.4795H81.8687C82.4952 95.4795 83 94.9722 83 94.3506V39.4922Z" fill="#2D2166" />
      <path d="M54.9491 16.1645C54.9491 16.6021 54.9267 17.0372 54.8844 17.4748C54.8422 17.91 54.7775 18.3426 54.693 18.7703C54.606 19.2004 54.5015 19.6256 54.3747 20.0433C54.2454 20.4635 54.0987 20.8738 53.9321 21.2791C53.7631 21.6844 53.5766 22.0797 53.3702 22.4651C53.1638 22.8505 52.94 23.226 52.6964 23.589C52.4527 23.9545 52.1916 24.3051 51.9156 24.6433C51.6371 24.9814 51.3437 25.3047 51.0329 25.6155C50.7246 25.9238 50.4014 26.2197 50.0632 26.4957C49.7226 26.7741 49.372 27.0352 49.009 27.2789C48.6435 27.5201 48.2705 27.7463 47.8826 27.9527C47.4972 28.1591 47.1019 28.3456 46.6966 28.5122C46.2938 28.6812 45.881 28.8279 45.4633 28.9548C45.0431 29.0816 44.6204 29.1885 44.1902 29.273C43.7601 29.36 43.3275 29.4222 42.8923 29.467C42.4572 29.5092 42.0196 29.5316 41.582 29.5316C41.1444 29.5316 40.7067 29.5092 40.2716 29.467C39.8365 29.4222 39.4038 29.36 38.9737 29.273C38.546 29.1885 38.1208 29.0816 37.7006 28.9548C37.2829 28.8279 36.8702 28.6812 36.4674 28.5122C36.0621 28.3456 35.6667 28.1591 35.2813 27.9527C34.8934 27.7463 34.5205 27.5201 34.155 27.2789C33.7919 27.0352 33.4413 26.7741 33.1032 26.4957C32.7626 26.2197 32.4393 25.9238 32.131 25.6155C31.8202 25.3047 31.5268 24.9814 31.2483 24.6433C30.9723 24.3051 30.7112 23.9545 30.4676 23.589C30.2239 23.226 30.0001 22.8505 29.7937 22.4651C29.5874 22.0797 29.4009 21.6844 29.2318 21.2791C29.0652 20.8738 28.9185 20.4635 28.7892 20.0433C28.6624 19.6256 28.558 19.2004 28.4709 18.7703C28.3864 18.3426 28.3218 17.91 28.2795 17.4748C28.2372 17.0372 28.2148 16.6021 28.2148 16.1645C28.2148 15.7244 28.2372 15.2893 28.2795 14.8541C28.3218 14.4165 28.3864 13.9839 28.4709 13.5562C28.558 13.1261 28.6624 12.7009 28.7892 12.2831C28.9185 11.8654 29.0652 11.4527 29.2318 11.0474C29.4009 10.6446 29.5874 10.2492 29.7937 9.86135C30.0001 9.47595 30.2239 9.1005 30.4676 8.73748C30.7112 8.37197 30.9723 8.02138 31.2483 7.68323C31.5268 7.34507 31.8202 7.02183 32.131 6.71103C32.4393 6.40271 32.7626 6.10931 33.1032 5.83083C33.4413 5.55234 33.7919 5.29127 34.155 5.05008C34.5205 4.80641 34.8934 4.58014 35.2813 4.37377C35.6667 4.16739 36.0621 3.98091 36.4674 3.81432C36.8702 3.64524 37.2829 3.49854 37.7006 3.37173C38.1208 3.24492 38.546 3.13801 38.9737 3.05347C39.4038 2.96893 39.8365 2.90428 40.2716 2.85952C40.7067 2.81725 41.1444 2.79736 41.582 2.79736C42.0196 2.79736 42.4572 2.81725 42.8923 2.85952C43.3275 2.90428 43.7601 2.96893 44.1902 3.05347C44.6204 3.13801 45.0431 3.24492 45.4633 3.37173C45.881 3.49854 46.2938 3.64524 46.6966 3.81432C47.1019 3.98091 47.4972 4.16739 47.8826 4.37377C48.2705 4.58014 48.6435 4.80641 49.009 5.05008C49.372 5.29127 49.7226 5.55234 50.0632 5.83083C50.4014 6.10931 50.7246 6.40271 51.0329 6.71103C51.3437 7.02183 51.6371 7.34507 51.9156 7.68323C52.1916 8.02138 52.4527 8.37197 52.6964 8.73748C52.94 9.1005 53.1638 9.47595 53.3702 9.86135C53.5766 10.2492 53.7631 10.6446 53.9321 11.0474C54.0987 11.4527 54.2454 11.8654 54.3747 12.2831C54.5015 12.7009 54.606 13.1261 54.693 13.5562C54.7775 13.9839 54.8422 14.4165 54.8844 14.8541C54.9267 15.2893 54.9491 15.7244 54.9491 16.1645Z" fill="#322573" />
      <path d="M39.914 23.9045L41.9578 21.5871C41.9927 21.5523 41.9703 21.4951 41.9131 21.4951H39.6629C39.6504 21.4951 39.6281 21.4827 39.6156 21.4727L37.711 19.317C37.7011 19.2946 37.6886 19.2697 37.7011 19.2474L40.8912 13.7225C40.9011 13.7001 40.9011 13.6777 40.8912 13.6653L39.5709 11.3728C39.5485 11.338 39.4913 11.338 39.4664 11.3728L34.7496 19.5482C34.7397 19.5731 34.7397 19.5955 34.7496 19.6178L38.539 23.9144C38.5489 23.9268 38.5614 23.9393 38.5837 23.9393H39.8692C39.8817 23.9268 39.904 23.9144 39.914 23.9045Z" fill="white" />
      <path d="M41.3161 8.17566L39.9859 10.4706C39.9735 10.493 39.9735 10.5154 39.9859 10.5278L41.3634 12.9123L45.011 19.2378C45.0234 19.2602 45.0234 19.2826 45.001 19.3075L43.0716 21.4831L41.0178 23.8229C40.983 23.8577 41.0078 23.9173 41.065 23.9173H44.1407C44.1507 23.9173 44.1731 23.9049 44.1855 23.8925L47.9723 19.5959C47.9848 19.5735 47.9947 19.5487 47.9848 19.5263L41.4081 8.17566C41.3957 8.1309 41.3385 8.1309 41.3161 8.17566Z" fill="white" />
    </svg>
  );
};

export default VoteIcon;