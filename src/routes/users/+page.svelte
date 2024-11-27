<script>
	import DataTable from '../../components/DataTable.svelte';

	let { data } = $props();
	let columns = [
		{ name: 'Username', key: 'username' },
		{ name: 'FirstName', key: 'firstName' },
		{ name: 'LastName', key: 'lastName' },
		{ name: 'Email', key: 'email' },
		{ name: 'Created On', key: 'createdOn' }
	]
</script>

<h1>Users</h1>

<DataTable entities={data.users} columns={columns} classNames = 'test'/>

<style>
:global(table.test > thead > tr > th) {
    background-color: blue !important;
    color: white;
}
</style>