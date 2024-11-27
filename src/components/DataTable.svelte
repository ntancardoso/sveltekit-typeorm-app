<script>
    import Header from './Header.svelte'
    import Table from './Table.svelte'

    export let entities;
    export let columns;
    export let classNames = '';
</script>

<Header />
<Table entities={entities} columns={columns} classNames={classNames} />