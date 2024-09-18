<script lang="ts">
    import { page } from '$app/stores';
</script>

{#if $page.status = 404}
    <h1>This is not the page you were looking for</h1>
{/if}

{#if $page.status >= 500}
    <h1>Unexpected server error</h1>
{/if}