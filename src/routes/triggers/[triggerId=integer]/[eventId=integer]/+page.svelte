<script lang="ts">
    import type { PageData } from './$types';
    import {
        Table,
        TableHead,
        TableHeadCell,
        TableBody,
        TableBodyRow,
        TableBodyCell
    } from 'flowbite-svelte';

    export let data: PageData;

</script>

<Table divClass="relative overflow-x-auto rounded-md mt-5" hoverable={true}>
    <TableHead>
        <TableHeadCell>Property</TableHeadCell>
        <TableHeadCell>Type</TableHeadCell>
        <TableHeadCell>Nullable</TableHeadCell>
        <TableHeadCell>Description</TableHeadCell>
    </TableHead>
    <TableBody>
        {#each data.eventDetails.properties as property}
            <TableBodyRow>
                <TableBodyCell>{property.name}</TableBodyCell>
                <TableBodyCell>{property.type}</TableBodyCell>
                <TableBodyCell>{property.isNullable ? 'Yes' : 'No'}</TableBodyCell>
                <TableBodyCell>{property.description ?? '-'}</TableBodyCell>
            </TableBodyRow>
        {/each}
    </TableBody>
</Table>