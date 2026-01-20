<!-- 
  LAYOUTS: Define page layouts with common elements
  default.vue = default layout for all pages
  Use <slot /> to render page content
-->
<template>
    <section>
        <div class="kenhehe-container">
            <div class="kenhehe-side-nav"></div>
        </div>
        <div class="kenhehe-container">
            <header>
            <h1>My Website Header</h1>
            </header>
            
            <main>
            <slot />
            </main>
            
            <footer>
                <h1>My Website Footer</h1>
            </footer>
        </div>
    </section>
</template>