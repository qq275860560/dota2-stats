import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";

import NavBar from "../../nav-bar/index.vue";
import { routes } from "@/router/index";
import type { RouteConfig } from "@/router/index";

describe("NavBar", () => {
  it("renders properly", () => {
    const wrapper = mount(NavBar);
    const menuList: RouteConfig[] = routes.filter((i) => i.isMenu);
    let text = menuList.length ? menuList[0].title : "";
    expect(wrapper.text()).toContain(text);
  });
});
