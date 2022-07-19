import React from "react";
import { getSrc } from "gatsby-plugin-image";
import { ImageDataLike } from "gatsby-plugin-image/dist/src/components/hooks";

type Props = {
  logo_image: ImageDataLike;
  logo_alt: string;
  description: string;
};

export default class Header extends React.Component<Props, {}> {
  render() {
    const props = this.props;
    const logo_image_src = getSrc(props.logo_image) ?? "";

    return (
      <header id="header">
        <div className="content">
          <div className="inner">
            <img src={logo_image_src} alt={"logo"} />
            <p>{props.description}</p>
          </div>
        </div>
      </header>
    );
  }
}
