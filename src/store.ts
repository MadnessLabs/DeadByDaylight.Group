import { createStore } from "@stencil/store";

const { state, onChange } = createStore({
  session: null,
  profile: null,
} as GlobalState);

onChange("profile", (value) => {
  console.log(value);
});

export default state;
