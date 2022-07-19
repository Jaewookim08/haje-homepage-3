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
              "relative z-30 min-h-screen w-full p-4 md:py-8 md:px-4 lg:py-12 lg:px-8 xl:py-16 xl:px-8"
            }
          >
            <Header
              description={page.description}
              logo_image={page.logo.localFile}
              logo_alt={page.logo.alternativeText}
            />
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
