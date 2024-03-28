<script>
  import { onMount } from "svelte";

  let pagefind;
  let searchResult = null;

  onMount(async () => {
    pagefind = await import(/* @vite-ignore */ new URL("/pagefind/pagefind.js", import.meta.url).href);
    pagefind.init();
  });

  const onSubmitSearch = async (event) => {
    const search = event.target.search.value;
    const response = await pagefind.search(search);
    searchResult = await Promise.all(response.results.slice(0, 10).map((r) => r.data()));
  };

  const onResetSearch = () => {
    searchResult = null;
  };
</script>

<div class="siteSearch">
  <form on:submit|preventDefault={onSubmitSearch} on:reset={onResetSearch}>
    <input class="siteSearch_input" type="text" id="search" name="search" />
    <button type="submit">サイト内検索</button>
    <button type="reset">リセット</button>
  </form>
  {#if searchResult}
    <div class="searchResult">
      <ul class="searchResult_body">
        {#each searchResult as result}
          <li class="searchResult_item">
            <a href={result.url}>{result.meta.title}</a>
            <!-- eslint-disable-next-line svelte/no-at-html-tags // resultに含まれるHTMLは安全なのでそのままレンダリングする -->
            <p class="searchResult_excerpt">{@html result.excerpt}</p>
          </li>
        {/each}
      </ul>
      {#if searchResult.length === 0}
        <p>該当する検索結果がありません</p>
      {/if}
    </div>
  {/if}
</div>

<style>
  .siteSearch {
    position: relative;
  }

  .siteSearch_input {
    width: 150px;
    font-size: 16px;
    padding: 5px;
  }

  .searchResult {
    position: absolute;
    width: 100%;
    height: 400px;
    max-width: 400px;
    max-height: 80vh;
    padding: 10px;
    background: #fff;
    border: 1px solid #ccc;
    box-sizing: border-box;
    overflow-y: auto;
  }

  .searchResult_body {
    list-style: none;
    padding: 0;
  }

  .searchResult_item {
    margin-block: 10px;
  }

  .searchResult_excerpt {
    margin-block: 5px;
    font-size: 12px;
  }
</style>
