import React from "react";
import Header from "../components/mainpage-center-header";
import Seo from "../components/seo";
import { graphql } from "gatsby";
import {
  StrapiImageQuery,
  StrapiMediaQuery,
} from "../helpers/strapi-media-queries";
import { BgImage } from "gbimage-bridge";
import { getImage } from "gatsby-plugin-image";
import Cycler from "../components/cycler";

type Props = {
  data: {
    strapiFrontPage: {
      description: string;
      logo: StrapiImageQuery;
      background: StrapiImageQuery;
      backgroundCycle: {
        uptime: number;
        content: StrapiMediaQuery;
      }[];
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

  private static getBackgroundMediaRenderer(
    index: number,
    {
      uptime,
      content,
    }: {
      uptime: number;
      content: StrapiMediaQuery;
    }
  ) {
    const isVideo = content.mime.startsWith("video");

    const contentRenderer = isVideo ? (
      <video
        key={index}
        className={`fixed left-0 top-0 z-10 h-screen w-full object-cover`}
        autoPlay
        muted
        loop={false}
      >
        <source src={content.localFile.url} type={content.mime} />
        Failed to load video.
      </video>
    ) : (
      <BgImage
        key={index}
        image={getImage(content.localFile)}
        keepStatic
        // @ts-ignore
        style={{
          position: "fixed",
        }}
        fadeIn={false}
        critical={true}
        className={`left-0 top-0 z-10 h-screen w-full bg-cover bg-center`}
      />
    );

    return {
      uptime,
      content: contentRenderer,
    };
  }

  render() {
    const seo = {}; // Todo: seo
    const page = this.props.data.strapiFrontPage;

    const backgroundsData = page.backgroundCycle.map((backgroundData, i) =>
      FrontPage.getBackgroundMediaRenderer(i, backgroundData)
    );

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
          <Cycler switchData={backgroundsData} />

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
      backgroundCycle {
        __typename
        ... on STRAPI__COMPONENT_FRONT_PAGE_BACKGROUND_CYCLE_COMPONENT {
          uptime
          content {
            mime
            alternativeText
            localFile {
              childImageSharp {
                gatsbyImageData(placeholder: NONE)
              }
              url
            }
          }
        }
      }
    }
  }
`;
