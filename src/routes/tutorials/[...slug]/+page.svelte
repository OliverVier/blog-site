<script lang="ts">
export let data

</script>

<link rel="stylesheet" href="/node_modules/highlight.js/styles/github.css">

<div class="tutorial-content">
	{#if !data.content}
		Page not found
	{:else}
		{@html data.content}
	{/if}
</div>

<style>
	
</style>