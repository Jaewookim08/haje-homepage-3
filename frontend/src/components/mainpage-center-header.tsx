import React from "react";
import { getSrc } from "gatsby-plugin-image";
import { ImageDataLike } from "gatsby-plugin-image/dist/src/components/hooks";

type Props = {
  logoImage: ImageDataLike;
  logoAlt: string;
  description: string;
  isLoading: boolean;
};

export default class Header extends React.Component<Props, {}> {
  render() {
    const props = this.props;
    const logoImageSrc = getSrc(props.logoImage) ?? "";

    return (
      <header
        id="header"
        className={
          "flex max-w-full flex-col items-center text-center text-frontpagePrimary transition duration-1000 ease-in-out"
        }
      >
        <div
          className={`relative mt-0 max-w-full 
          border-t border-b border-solid border-frontpagePrimary 
          transition duration-[5s] ease-in-out 
          ${this.props.isLoading ? "" : ""}`}
        >
          <div
            className={`ease flex flex-col items-center justify-center overflow-hidden px-8  transition-all delay-200 duration-[1s] ${
              this.props.isLoading
                ? "max-h-0 py-0 opacity-0"
                : "max-h-160 pt-6 pb-12"
            }`}
          >
            <img
              className="h-32 object-contain pb-6"
              src={logoImageSrc}
              alt={"logo"}
            />
            <p className={"mb-0 text-xl leading-loose tracking-[0.2rem]"}>
              {props.description}
            </p>
          </div>
        </div>
      </header>
    );
  }
}
