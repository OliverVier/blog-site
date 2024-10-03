<script lang="ts">
export let data

</script>

<link rel="stylesheet" href="/node_modules/highlight.js/styles/github.css">

<div class="tutorial-content">
	{#if !data.content}
		<title>Site not found</title>
		Page not found
	{:else}
		<title>{data.title}</title>
		{@html data.content}
	{/if}
</div>

<style>
	
</style>