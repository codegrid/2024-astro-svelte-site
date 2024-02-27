<script>
  import { onMount } from "svelte";
  const basePath = import.meta.env.BASE_URL;
  export let slug = "";
  export let title = "";
  let isRead = false;
  onMount(() => {
    const readItemData = window.localStorage.getItem("readItemList") || "[]";
    const readItemList = JSON.parse(readItemData);

    isRead = readItemList.includes(`${basePath}news/${slug}/`);
  });
</script>

<li class="newsList_item">
  <a href={`${basePath}news/${slug}/`} class={isRead ? "--read" : ""}>
    {title}
    {#if isRead}
      <span class="newsList_item_read"> ✅ </span>
    {/if}
  </a>
</li>

<style>
  .newsList_item {
    margin-block: 15px;
  }
  .--read {
    color: #777;
  }
  .newsList_item_read {
    display: inline-block;
    margin-left: 5px;
  }
</style>
