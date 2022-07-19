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
          "flex max-w-full flex-col items-center text-center text-frontpagePrimary transition ease-in-out"
        }
      >
        <div className="relative mt-0 max-h-160 max-w-full overflow-hidden border-t border-b border-solid border-frontpagePrimary px-8 pb-12 pt-4 transition ease-in-out ">
          <div className="flex flex-col items-center justify-center transition-all delay-250">
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
