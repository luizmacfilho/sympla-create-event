<template>
  <div>
    <PageBar>
      <span class="page-bar__title">Criar evento</span>
      <AddEventBtn label="Criar novo evento" color="#ff880e" />
    </PageBar>
    <v-container>
      <h1>EventList</h1>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { instance } from '@/app/Application';
import PageBar from '@/components/PageBar.vue';

@Component({
  components: {
    PageBar,
  }
})
export default class EventList extends Vue {

  constructor() {
    super();
    instance.headerButtonName = 'AddEventBtn';
  }
}
</script>
