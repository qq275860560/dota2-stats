import { describe, it, expect } from "vitest";
import { shallowMount } from "@vue/test-utils";

import PieChart from "../../pie-chart/index.vue";

describe("PieChart", () => {
  it("props test", () => {
    const wrapper = shallowMount(PieChart, {
      props: {
        width: 50,
        height: 40,
        padding: 10,
        data: [],
      },
    });
    expect(wrapper.props().width).toBe(50);
    expect(wrapper.props().height).toBe(40);
    expect(wrapper.props().padding).toBe(10);
  });
});
