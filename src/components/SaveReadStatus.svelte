<script>
  import { onMount } from "svelte";
  onMount(async () => {
    const pageURL = window.location.pathname;
    const readItemData = window.localStorage.getItem("readItemList") || "[]";
    const readItemList = JSON.parse(readItemData);
    if (!readItemList.includes(pageURL)) readItemList.push(pageURL);
    window.localStorage.setItem("readItemList", JSON.stringify(readItemList));
  });
</script>
