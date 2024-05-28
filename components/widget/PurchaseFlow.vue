<template>
    <section v-if="widget.steps.length">
        <h2 v-if="widget.mainTitle" class="h2 mb-0 text-center">{{ widget.mainTitle }}</h2>
        <div class="w-full">
            <div class="w-full">
                <section class="w-full mb-5 flex flex-wrap justify-center gap-8 md:gap-y-24 md:gap-x-8 lg:gap-x-24 2xl:gap-x-52 relative">
                    <img :src="widget.mainSvgSrc"
                         class="absolute md:top-[12.5rem] lg:top-[10.5rem] 2xl:top-52 h-auto max-w-[1090px] hidden md:block w-[85%] xl:w-[90%] 2xl:w-full"
                         :alt="widget.mainSvgAlt" />

                    <div class="flow-card">
                        <img :src="widget.steps[0].stepIcon" :alt="widget.steps[0].stepIconAlt" />
                        <p class="flow-card-body">{{ widget.steps[0].description }}</p>
                    </div>
                    <div class="flow-card md:-order-1 md:w-[40%] md:flex-col-reverse relative md:left-[3.5rem] lg:left-[6.5rem] xl:left-[5.5rem] 2xl:left-[7rem] md:top-12">
                        <img :src="widget.steps[1].stepIcon" :alt="widget.steps[1].stepIconAlt" />
                        <p class="flow-card-body">{{ widget.steps[1].description }}</p>
                    </div>
                    <div class="flow-card">
                        <img :src="widget.steps[2].stepIcon" :alt="widget.steps[2].stepIconAlt" />
                        <p class="flow-card-body">{{ widget.steps[2].description }}</p>
                    </div>
                    <div class="flow-card md:-order-1 md:w-[40%] md:flex-col-reverse relative md:right-[3.5rem] lg:right-[6.5rem] xl:right-[5.5rem] 2xl:right-[7rem] md:top-12">
                        <img :src="widget.steps[3].stepIcon" :alt="widget.steps[3].stepIconAlt" />
                        <p class="flow-card-body">{{ widget.steps[3].description }}</p>
                    </div>
                    <div class="flow-card">
                        <img :src="widget.steps[4].stepIcon" :alt="widget.steps[4].stepIconAlt" />
                        <p class="flow-card-body">{{ widget.steps[4].description }}</p>
                    </div>
                </section>
            </div>
            <NuxtLink :to="{path: '/', hash: '#' + widget.buttonUrl}"
                      class="btn primary-btn w-fit mx-auto"
                      :title="widget.buttonText">
                <span>{{ widget.buttonText }}</span>
            </NuxtLink>
        </div>
    </section>
</template>

<script setup lang="ts">
    import type { FlowContent } from "~/types/types";

    const props = defineProps({
        widget: {
            type: Object as PropType<FlowContent>,
            required: true,
        }
    });
</script>
