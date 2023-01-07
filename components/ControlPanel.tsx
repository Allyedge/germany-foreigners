import { useStyletron } from "baseui";
import { RadioGroup, Radio, ALIGN } from "baseui/radio";
import { Dispatch, SetStateAction } from "react";

interface ControlPanelProps {
  value: string;
  setData: Dispatch<SetStateAction<string>>;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  value,
  setData,
}) => {
  const [css] = useStyletron();

  return (
    <div
      className={css({
        position: "absolute",
        top: "0",
        zIndex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.9)",
        borderRadius: "8px",
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "2%",
      })}
    >
      <h1
        className={css({
          color: "rgba(255, 153, 102, 255)",
          fontSize: "24px",
          fontWeight: "500",
        })}
      >
        Choose a year
      </h1>

      <RadioGroup
        value={value}
        onChange={(e) => setData(e.currentTarget.value)}
        name="date"
        align={ALIGN.vertical}
      >
        <Radio value="2020">2020</Radio>
        <Radio value="2010">2010</Radio>
        <Radio value="2000">2000</Radio>
      </RadioGroup>
    </div>
  );
};
