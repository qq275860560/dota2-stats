import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";

import PagingTable from "../../paging-table/index.vue";

describe("PagingTable", () => {
  it("renders properly", () => {
    const wrapper = mount(PagingTable, { props: { showPagination: false } });
    expect(wrapper.html().indexOf("el-pagination")).toBe(-1);
    expect(wrapper.html().includes("el-table")).toBeTruthy();
  });
});
