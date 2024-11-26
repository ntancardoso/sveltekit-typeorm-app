<script>
	let { data } = $props();
</script>

<h1>Groups</h1>
<a href="/groups/new">new</a>
  

<ul>
	{#each data.groups as { id, groupName }}
		<li><a href="/group/{id}">{groupName}</a></li>
	{/each}
</ul>