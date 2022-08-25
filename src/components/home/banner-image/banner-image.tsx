import { createStyles, makeStyles } from "@material-ui/core/styles";
import Image from "next/image";
import myPic from "../../../imgs/Group7.png";

const BannerImage = (props) => {
  return (
    <Image
      src={myPic}
      alt="SwapTokenComponent.png"
      width="491px"
      height="393px"
    />
  );
};
export default BannerImage;
