import React, { ReactElement } from "react";
import { mod, randomInt } from "mathjs";

// Todo: transition 추가?
export type SwitchDataElementInput = {
  content: ReactElement;
  uptime?: number;
  // transitionDuration?: number;
};

type SwitchDataElement = {
  content: ReactElement;
  uptime: number;
  transitionDuration: number; // Todo: 사용?
};

type Props = {
  switchData: SwitchDataElementInput[];
  startIndex?: number | "random";
} & React.HTMLAttributes<HTMLDivElement>;

type State = {
  switchIndex: number;
  previousIndex: number | undefined;
};

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default class Cycler extends React.Component<Props, State> {
  private startIndex: number;
  private timeoutId: NodeJS.Timeout | undefined;

  public state: State = {
    switchIndex: 0,
    previousIndex: 0,
  };

  private readonly defaultSwitchDataElement = {
    uptime: 2,
    transitionDuration: 0,
    waitForLoad: undefined,
  };

  public constructor(props: Props) {
    super(props);

    const { startIndex, switchData } = this.props;

    const i: number = (() => {
      const i = startIndex;
      switch (i) {
        case undefined:
          return 0;
        case "random":
          return randomInt(switchData.length);
        default:
          return i;
      }
    })();

    if (!Number.isInteger(i)) {
      throw new Error("Start index should be an integer");
    }
    if (!(i >= 0)) {
      throw new Error("Start index should be positive");
    }

    this.startIndex = i;
    this.state.switchIndex = i - 1;
  }

  public componentDidMount() {
    this.runCycle(this.startIndex);
  }

  public componentWillUnmount() {
    clearTimeout(this.timeoutId);
  }

  private async runCycle(startIndex: number) {
    clearTimeout(this.timeoutId);
    const prevIndex = this.state.switchIndex;
    const i = startIndex % this.props.switchData.length;
    const element = this.getElement(i);

    this.setState({
      switchIndex: i,
      previousIndex: prevIndex,
    });

    await sleep(100);

    this.setState({
      previousIndex: undefined,
    });

    this.timeoutId = setTimeout(async () => {
      await this.runCycle(i + 1);
    }, (element.uptime + element.transitionDuration) * 1000);
  }

  private getElement(index: number): SwitchDataElement {
    const data = this.props.switchData;
    const i = mod(index, data.length);
    const element = data[i];

    return {
      ...this.defaultSwitchDataElement,
      ...element,
    };
  }

  public render() {
    const { startIndex, switchData, ...rest } = this.props;
    const i = this.state.switchIndex;
    if (i === undefined) {
      return <div {...rest} />;
    }

    const currentContentVisible = this.state.previousIndex === undefined;
    const currContent = this.getElement(i).content;
    const editedCurrContent = React.cloneElement(currContent, {
      className: `${currContent.props.className ?? ""} ${
        currentContentVisible ? "visible" : "hidden"
      }`,
    });

    return (
      <div {...rest}>
        {editedCurrContent}
        {this.state.previousIndex !== undefined
          ? this.getElement(this.state.previousIndex).content
          : ""}
      </div>
    );
  }
}
