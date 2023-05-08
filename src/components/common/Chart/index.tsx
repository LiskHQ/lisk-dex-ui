import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { useTheme } from "@mui/styles";
import { ChartStyle } from "./index.style";

interface DataPoint {
  x: number;
  y: number;
}

interface Props {
  className?: string,
  data: DataPoint[];
}

export const Chart: React.FC<Props> = ({ className, data }) => {
  const theme = useTheme();

  const svgRef = useRef<SVGSVGElement>(null);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    if (svgRef.current) {
      setWidth(svgRef.current.getBoundingClientRect().width);
      setHeight(svgRef.current.getBoundingClientRect().height);
    }
    // Set up scales
    const xScale = d3
      .scaleLinear()
      .domain(d3.extent(data, (d) => d.x) as [number, number])
      .range([0, width]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.y) as number])
      .range([height + 20, 20]);

    // Set up area generator
    const area = d3
      .area<DataPoint>()
      .x((d) => xScale(d.x))
      .y0(yScale(0))
      .y1((d) => yScale(d.y));

    // Draw area path
    svg
      .append("path")
      .datum(data)
      .attr("d", area)
      .attr("fill", theme.lightcurve[0]);
  }, [data, height, width]);

  return (
    <ChartStyle className={className}>
      <svg ref={svgRef}>
        <g></g>
      </svg>
    </ChartStyle>
  );
};
