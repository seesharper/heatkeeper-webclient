<script>
	import { baseUrl } from '$lib/environment';
	import '../app.postcss';
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
</script>

<div class="p-8">
	<Navbar let:hidden let:toggle>
		<NavBrand href="/">
			<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
				>HeatKeeper</span
			>
		</NavBrand>
		<NavHamburger on:click={toggle} />
		<NavUl {hidden} on:click={toggle}>
			<NavLi href={baseUrl}>Home</NavLi>
			<NavLi href="/about">About</NavLi>
			<NavLi href="/locations">Configuration</NavLi>
			<NavLi href="/users">Users</NavLi>
			<NavLi href="/sensors/deadsensors">Dead Sensors</NavLi>
			<NavLi href="/login">Login</NavLi>
		</NavUl>
	</Navbar>
</div>
<div class="ml-10 mr-10 mb-10">
	<slot />
</div>
