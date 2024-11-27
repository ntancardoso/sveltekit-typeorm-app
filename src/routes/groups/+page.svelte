<script>
	import DataTable from '../../components/DataTable.svelte';

	let { data } = $props();

	let columns = [
		{ name: 'Name', key: 'groupName' },
		{ name: 'Created On', key: 'createdOn' }
	]
</script>

<h1>Groups</h1>
<a href="/groups/new">new</a>
  

<DataTable entities={data.groups} columns={columns} />