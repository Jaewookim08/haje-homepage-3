import React, { ReactElement } from "react";
import { mod, randomInt } from "mathjs";

// Todo: transition 추가?
export type SwitchDataElementInput = {
  content: ReactElement;
  uptime?: number;
  playElement?: () => Promise<void>;
  // transitionDuration?: number;
};

type SwitchDataElement = {
  content: ReactElement;
  uptime: number;
  playElement: (() => Promise<void>) | undefined;
  transitionDuration: number; // Todo: 사용?
};

type Props = {
  switchData: SwitchDataElementInput[];
  startIndex?: number | "random";
} & React.HTMLAttributes<HTMLDivElement>;

type State = {
  switchIndex: number;
  previousElement: ReactElement | undefined;
};

export default class Cycler extends React.Component<Props, State> {
  public state: State = {
    switchIndex: 0,
    previousElement: undefined,
  };

  private readonly defaultSwitchDataElement = {
    uptime: 2,
    transitionDuration: 0,
    playElement: undefined,
  };

  private timeoutId: NodeJS.Timeout | undefined;

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

    this.state.switchIndex = i;
  }

  public componentDidMount() {
    this.runCycleFromIndex(this.state.switchIndex);
  }

  public componentWillUnmount() {
    clearTimeout(this.timeoutId);
  }

  private async runCycleFromIndex(index: number) {
    clearTimeout(this.timeoutId);
    const prevIndex = this.state.switchIndex;
    const i = index % this.props.switchData.length;
    const element = this.getElement(i);

    this.setState({
      switchIndex: i,
      previousElement: this.getElement(prevIndex).content,
    });

    if (element.playElement) {
      await element.playElement();
    }
    this.setState({
      previousElement: undefined,
    });

    this.timeoutId = setTimeout(async () => {
      await this.runCycleFromIndex(i + 1);
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

    const currentContentVisible = this.state.previousElement === undefined;
    const currContent = this.getElement(i).content;
    const editedCurrContent = React.cloneElement(currContent, {
      className: `${currContent.props.className ?? ""} ${
        currentContentVisible ? "visible" : "hidden"
      }`,
    });

    return (
      <div {...rest}>
        {editedCurrContent}
        {this.state.previousElement}
      </div>
    );
  }
}
