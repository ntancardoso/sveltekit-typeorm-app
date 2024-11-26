<script>
	let { children } = $props();
</script>

<nav>
	<a href="/">Home</a>
	<a href="/users">Users</a>
    <a href="/groups">Groups</a>
</nav>

{@render children()}
