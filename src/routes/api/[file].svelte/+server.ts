// Get Content of svelte file
export async function GET({ params }) {
  if (params.file.toLowerCase() === "blog") {
    return new Response(
      `<script>
      import {onMount} from 'svelte'
      import  Button  from 'yesvelte/button/Button.svelte'
      import  AppButton  from '@src/components/Button.svelte'
      export let blogs = []
      const onClick = ()=>{
        alert("title")
      }
      // onMount(async() => {
      //    blogs = await fetch('/blogs').then(res => res.json())
      // })

</script>
<div>
    BLOG component  Armin
    <div>
      <AppButton></AppButton>
    </div>
    <div class="p-12">
      <Button on:click={onClick}>Hi Button</Button>
    </div>
</div>`
    );
  }

  if (params.file.toLowerCase() === "blogitem") {
    return new Response(
      `<script> 
      export let blog = {}
      const onClick = (title)=>{
        alert(title)
      }
      </script>
<div>
    BLOG item: {blog.title} - {blog.description}
    <a on:click={onClick(blog.title)} >click me</a>
</div>`
    );
  }
  if (params.file.toLowerCase() === "blogitempage") {
    return new Response(
      `<script> export let blog = {}</script>
<div>
    BLOG item page: {blog.id} - {blog.title} - {blog.description}
    <button on:click={window.location.href="/blog"}>Back</button>
</div>`
    );
  }

  return new Response(
    `<h1>DEFAULT PAGES <br/> <a href='/blog'>BLOG</a><button >CLICK</button></h1>`
  );
}
