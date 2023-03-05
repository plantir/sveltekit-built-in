<script>
  import { onMount, tick } from "svelte/internal";
  export let data;
  import "yesvelte/css/tabler.css";
  let element;
  onMount(async () => {
    // render component as csr

    const component = await import(/* @vite-ignore */ `/api/${data.name}.js`);
    element.innerHTML = "";

    await tick();
    new component.default({
      target: element,
      props: data.props,
    });
  });
</script>

<div>{data.owner}</div>
<div bind:this={element}>
  {@html data.html}
</div>
