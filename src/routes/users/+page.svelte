<script>
	let { data } = $props();
</script>

<h1>Users</h1>

<ul>
	{#each data.users as { id, username }}
		<li><a href="/user/{id}">{username}</a></li>
	{/each}
</ul>