import { Button } from "@/components/ui/button";
import * as RadioButtonGroup from "@/components/ui/radio-button-group";
import { Slider } from "@/components/ui/slider";
import * as Tabs from "@/components/ui/tabs";
import { css } from "styled-system/css";
import { Container } from "styled-system/jsx";

const testCSS = css({ maxW: "2xl", fontWeight: "bold", color: "black.a10" });

export const App = () => {
  return (
    <>
      <div className={testCSS}>AAA</div>
      <div
        className={css({
          fontSize: "2xl",
          fontWeight: "bold",
          color: "black.a10",
        })}
      >
        AAA
      </div>
      <Container py={{ base: "12", md: "16" }} maxW="7xl" color="black.a10">
        <Tabs.Root defaultValue="button">
          <Tabs.List>
            <Tabs.Trigger value="button">Button</Tabs.Trigger>
            <Tabs.Trigger value="radio">Radio Group</Tabs.Trigger>
            <Tabs.Trigger value="slider">Slider</Tabs.Trigger>
            <Tabs.Indicator />
          </Tabs.List>
          <Tabs.Content value="button">
            <Button size="md">Hello Park UI</Button>
          </Tabs.Content>
          <Tabs.Content value="radio">
            <RadioButtonGroup.Root defaultValue="react">
              {/*
            {[
              { value: 'S' },
              { value: 'M' },
              { value: 'L', disabled: true },
              { value: 'XL' },
            ].map((option, id) => (
              <RadioButtonGroup.Item
                key={id}
                value={option.value}
                disabled={option.disabled}
              >
                <RadioButtonGroup.ItemControl />
                <RadioButtonGroup.Label>{option.value}</RadioButtonGroup.Label>
              </RadioButtonGroup.Item>
            ))}
            */}
            </RadioButtonGroup.Root>
          </Tabs.Content>
          <Tabs.Content value="slider">
            <Slider
              min={0}
              max={100}
              defaultValue={[33]}
              marks={[
                { value: 25, label: "25" },
                { value: 50, label: "50" },
                { value: 75, label: "75" },
              ]}
            />
          </Tabs.Content>
        </Tabs.Root>
      </Container>
    </>
  );
};
