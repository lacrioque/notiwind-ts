<script lang="ts">
import { defineComponent, h } from "vue";

export default defineComponent({
  provide() {
    return {
      ["context"]: { group: this.group, position: this.position },
    };
  },
  props: {
    group: {
      type: String,
      default: "",
    },
    position: {
      type: String,
      default: "top",
      validator: (val: string) => ["top", "bottom"].includes(val),
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(props: { group: string; position: string }, { slots }: any) {
    
    if(slots.default) {
      return () => h("div", slots.default({group: props.group}));
    }

    return () => h("span", {title: "Somethign went wrong"});
  },
});
</script>
