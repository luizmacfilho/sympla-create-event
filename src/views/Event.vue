<template>
  <v-form>
    <v-container class="event px-0 py-6">
      <CardEvent
        label="1. Qual é o nome do evento?"
        description="Adicione também uma imagem de divulgação com as principais informações do evento!">
        <div class="event__input">
          <v-text-field
            class="custom-input"
            maxlength="100"
            label="Nome do evento">
          </v-text-field>
          <span class="event__input__hint">100 caracteres restantes</span>
        </div>
      </CardEvent>

      <CardEvent
        label="2. Quando o evento vai acontecer"
        description="Informe ao público a data de realização do seu evento.">
      </CardEvent>

      <CardEvent
        label="3. Ingressos"
        height="226">
      </CardEvent>

      <PublishEventBtn />
    </v-container>
  </v-form>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import PublishEventBtn from '@/components/PublishEventBtn.vue';
import CardEvent from '@/components/CardEvent.vue';

@Component({
  components: {
    PublishEventBtn, CardEvent,
  },
})
export default class Event extends Vue {

  public events: any[] = [];
}
</script>

<style lang="scss">
.event {
  max-width: 1110px;
  text-align: right;

  &__input {
    position: relative;

    &__hint {
      height: 18px;
      font-size: 12px;
      line-height: 1.5;
      text-align: right;
      position: absolute;
      right: 0;
      bottom: 0;
      color: #a8a9af;
    }
  }

  .custom-input {
    margin-top: 24px;
    padding-top: 20px;

    .v-input__slot {
      border: 1px solid #85858f;
      border-radius: 3px;

      &:before, &:after {
        border: none;
      }

      label {
        transform: none;
        top: -20px;
        height: 20px;
        font-size: 14px;
        font-weight: 600;
        line-height: 1;
        color: #50525f !important;
        caret-color: #50525f !important;

        &:after {
          content: "*";
          width: 8px;
          margin: auto 4px;
          line-height: 1;
          height: 8px;
          font-size: 12px;
          color: #ff2948;
        }
      }

      input {
        max-height: 40px;
        padding: 9px 12px 10px;
      }
    }
  }
}
</style>