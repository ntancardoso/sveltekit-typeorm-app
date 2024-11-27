<script>
    export let entities;
    export let columns;
    export let classNames = '';
</script>
  
{#if entities.length}
    <table class={classNames}>
        <thead>
        <tr>
            {#each columns as column}
            <th>
                {column.name}
            </th>
            {/each}
        </tr>
        </thead>
        <tbody>
        {#each entities as entity}
            <tr>
                {#each columns as column}
                    <td>
                        {entity[column.key]}
                    </td>
                {/each}
            </tr>
        {/each}
        </tbody>
    </table>
{:else}
    <h1>No result 🙁</h1>
{/if}

<style>
table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
    font-size: 1em;
    font-family: Arial, sans-serif;
}

th, td {
    padding: 12px 15px;
    text-align: left;
    border: 1px solid #ddd;
}

th {
    background-color: #4CAF50;
    color: white;
}

tr:nth-child(even) {
    background-color: #f2f2f2;
}

tr:hover {
    background-color: #ddd;
}
</style>