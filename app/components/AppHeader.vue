<template>
    <div id="header-desktop" class="hidden bg-transparent lg:flex w-full items-center">
        <div class="div--container relative py-5">
            <div class="grid grid-cols-12 gap-5">
                <div class="col-span-4 self-center flex items-center gap-16">
                    <NuxtLink to="/" class="block w-full max-w-[180px]">Logo</NuxtLink>
                </div>
                <div class="col-span-8 self-center justify-end flex items-center h-full gap-4">
                    <AppNav />
                </div>
            </div>
        </div>
    </div>
</template>