<template>
    <div id="header-desktop" class="fixed bottom-6 z-50 border border-solid border-black/5 flex w-full max-w-[480px] left-1/2 -translate-x-1/2 rounded-full bg-white/20 items-center backdrop-blur-lg">
        <div class="px-5 relative py-5">
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