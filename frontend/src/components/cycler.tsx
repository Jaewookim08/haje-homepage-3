import React, { ReactNode } from "react";
import { mod, randomInt } from "mathjs";

// Todo: transition 추가?
type SwitchDataElementInput = {
  content: ReactNode;
  uptime?: number;
  // transitionDuration?: number;
};

type SwitchDataElement = {
  content: ReactNode;
  uptime: number;
  transitionDuration: number;
};

type Props = {
  switchData: SwitchDataElementInput[];
  startIndex?: number | "random";
} & React.HTMLAttributes<HTMLDivElement>;

type State = {
  switchIndex: number;
};

// Todo: 로딩될 때까지 전 컴포넌트로 가리기 (하얀색 flicker 방지)
export default class Cycler extends React.Component<Props, State> {
  public state: State = {
    switchIndex: 0,
  };

  private readonly defaultSwitchDataElement = {
    uptime: 2,
    transitionDuration: 0,
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

  private runCycleFromIndex(index: number) {
    clearTimeout(this.timeoutId);
    const i = index % this.props.switchData.length;
    const element = this.getElement(i);

    this.setState({
      switchIndex: i,
    });

    this.timeoutId = setTimeout(() => {
      this.runCycleFromIndex(i + 1);
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

    return <div {...rest}>{this.getElement(i).content}</div>;
  }
}
