<template>
  <div :id="containerId" class="pie-chart"></div>
</template>
<script lang="ts" setup>
import { select, pie, arc } from "d3";
import type { PieArcDatum } from "d3-shape";
import { onMounted } from "vue";
import type { PieData } from "@/types/d3";

type Props = {
  containerId?: string;
  data: Array<PieData>;
  width: number;
  height: number;
  padding: number;
  showInnerText?: boolean;
  colors?: string[];
};
const props = withDefaults(defineProps<Props>(), {
  containerId: "pie-chart-container",
  data: () => [] as Array<PieData>,
  width: 80,
  height: 80,
  padding: 0,
  showInnerText: false,
  colors: () => ["#FF2D2D", "#808080"],
});

onMounted(() => {
  // tooltip for the pie chart, need to append it to the body
  var tooltip = select("body")
    .append("div")
    .attr("class", "tooltip")
    .attr("opacity", 0.0);

  function getColor(i: number) {
    let palette = props.colors;
    return palette[i % palette.length];
  }

  let pieGenerator = pie<PieData>().value((d) => d.value as number);
  let pieData = pieGenerator(props.data);
  let svgMap = select(`#${props.containerId}`)
    .append("svg")
    .attr("width", props.width)
    .attr("height", props.height)
    .attr("class", "pie");

  //定义弧形生成器
  var innerRadius = 0;
  var outerRadius = props.width / 2 - props.padding;
  var arc_generator = arc<PieArcDatum<PieData>>()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius);

  var groups = svgMap
    .selectAll("g")
    .data(pieData)
    .enter()
    .append("g")
    .attr(
      "transform",
      "translate(" + props.width / 2 + "," + props.height / 2 + ")"
    );

  groups
    .append("path")
    .attr("fill", function (d, i) {
      return getColor(i);
    })
    .attr("d", function (d) {
      return arc_generator(d); //使用弧生成器获取路径
    })
    .on("mousemove", function (d, i) {
      //get mouse position
      let p: [number, number] = [d.pageX, d.pageY];

      select(this).attr("stroke", "#fff").attr("stroke-width", "1px");

      select(this)
        .transition()
        .duration(300)
        // .ease("elastic")
        .attr("transform", function (d) {
          var dist = 1;
          d.midAngle = (d.endAngle - d.startAngle) / 2 + d.startAngle;
          var x = Math.sin(d.midAngle) * dist;
          var y = Math.cos(d.midAngle) * dist;
          return "translate(" + x + "," + y + ")";
        });

      tooltip
        .html(i.data.name + "," + i.data.value)
        .style("left", p[0] - 40 + "px")
        .style("top", p[1] - 70 + "px")
        .attr("text-anchor", "middle")
        .style("opacity", 1.0);
    })
    .on("mouseout", function (d) {
      select(this).attr("stroke", "none").style("filter", "none");
      select(this)
        .transition()
        .duration(300)
        .attr("transform", "translate(0,0)");

      tooltip.style("opacity", 0.0);
    });

  //Add text
  if (props.showInnerText) {
    groups
      .append("text")
      .attr("transform", function (d) {
        //set the text position to center
        return "translate(" + arc_generator.centroid(d) + ")";
      })
      .attr("text-anchor", "middle")
      .text(function (d) {
        return d.data.value;
      })
      .style("fill", "#fff")
      .style("font-size", "14px")
      .style("font-family", "Arial");
  }
});
</script>
<style scoped lang="scss">
.pie-chart {
  animation: fadeIn 1s;
}
</style>
