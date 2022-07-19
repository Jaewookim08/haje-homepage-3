import React from "react";
import Header from "../components/mainpage-center-header";
import Seo from "../components/seo";
import { graphql } from "gatsby";
import { StrapiImageQuery } from "../helpers/strapi-image-query";
import { BgImage } from "gbimage-bridge";
import { getImage } from "gatsby-plugin-image";
import BackgroundImage from "gatsby-background-image";
type Props = {
  data: {
    strapiFrontPage: {
      description: string;
      logo: StrapiImageQuery;
      background: StrapiImageQuery;
    };
  };
};

type State = {
  isLoading: boolean;
};

export default class FrontPage extends React.Component<Props, State> {
  public state: State = {
    isLoading: true,
  };
  private timeoutId: NodeJS.Timeout | undefined;

  componentDidMount() {
    this.timeoutId = setTimeout(() => {
      this.setState({ isLoading: false });
    }, 100);
  }

  componentWillUnmount() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  render() {
    const seo = {}; // Todo: seo
    const page = this.props.data.strapiFrontPage;

    return (
      <div>
        <Seo seo={seo} />
        <div>
          <div
            id={"wrapper"}
            className={
              "relative z-30 flex min-h-screen w-full flex-col items-center justify-between p-4 md:py-8 md:px-4 xl:py-12 xl:px-8 2xl:py-16 2xl:px-8"
            }
          >
            <div /> {/* flex 위치조정용 */}
            <Header
              description={page.description}
              logoImage={page.logo.localFile}
              logoAlt={page.logo.alternativeText}
              isLoading={this.state.isLoading}
            />
            <div className={"mt-8 block h-4 w-full max-w-full text-center"}>
              {/* 나중에 footer 추가? */}
            </div>
          </div>
          {/* background */}
          <BackgroundImage />
          <BgImage
            image={getImage(page.background.localFile)}
            style={{
              position: "fixed",
            }}
            className={`left-0 top-0 z-10 h-screen w-full bg-cover bg-center`}
          />
          {/* 배경 어둡게 앞에서 가려주는 놈*/}
          <div
            className={`fixed left-0 top-0 z-20 z-10 h-screen w-full bg-gradient-to-r delay-700 duration-[2.5s] ease-in-out ${
              this.state.isLoading ? "bg-black" : "bg-black/30"
            }`}
          />
        </div>
      </div>
    );
  }
}

export const query = graphql`
  query {
    strapiFrontPage {
      description
      logo {
        alternativeText
        localFile {
          childImageSharp {
            gatsbyImageData(width: 500, placeholder: NONE)
          }
        }
      }
      background {
        alternativeText
        localFile {
          childImageSharp {
            gatsbyImageData(placeholder: BLURRED)
          }
        }
      }
    }
  }
`;
