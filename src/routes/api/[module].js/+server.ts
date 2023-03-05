import { rollup } from "rollup";
import resolve from "@rollup/plugin-node-resolve";
import { compile } from "svelte/compiler";
import alias from "@rollup/plugin-alias";
import tailwind from "rollup-plugin-tailwind";
// compile svelte files
export async function GET({ params, fetch, url }) {
  const module = params.module.toLowerCase();
  const isSSR = url.searchParams.has("ssr");
  let input = `@cms/${module}.svelte`;
  const output = await rollup({
    input,
    plugins: [
      alias({
        entries: [{ find: "@src", replacement: "./src" }],
      }),
      // tailwind(),
      {
        name: "resolve_svelte",
        resolveId: (name) => {
          if (!name.startsWith("@cms")) return null;
          return name;
        },
        async load(id) {
          if (!id.startsWith("@cms")) return null;
          id = id.replace("@cms/", "");
          const result = await fetch(id).then((res) => res.text());
          return result;
        },
        async transform(file, id) {
          if (!id.startsWith("@cms") && !id.endsWith(".svelte")) return;
          const compiled = compile(file, {
            generate: isSSR ? "ssr" : "dom",
            hydratable: true,
          });
          const result = compiled.js;
          return result;
        },
      },
      resolve(),
    ],
  });
  const output2 = await output.generate({ name: "test", format: "esm" });
  const code = output2.output[0].code;
  return new Response(code, {
    headers: {
      "Content-Type": "text/javascript",
    },
  });
}
