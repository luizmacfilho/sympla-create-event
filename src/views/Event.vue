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
        <v-row class="event__date">
          <v-text-field
            class="custom-input"
            placeholder="DD/MM/AAAA"
            v-mask="'##/##/####'"
            label="Data de início">
          </v-text-field>

          <v-text-field
            class="custom-input"
            persistent-hint
            hint="Horário de Brasília"
            placeholder="11:00"
            v-mask="'##:##'"
            label="Hora de início">
          </v-text-field>

          <v-spacer />

          <v-text-field
            class="custom-input"
            placeholder="DD/MM/AAAA"
            v-mask="'##/##/####'"
            label="Data de término">
          </v-text-field>

          <v-text-field
            class="custom-input"
            persistent-hint
            hint="Horário de Brasília"
            placeholder="11:00"
            v-mask="'##:##'"
            label="Hora de término">
          </v-text-field>
        </v-row>
      </CardEvent>

      <CardEvent
        label="3. Ingressos"
        height="226">
        <v-row>
          <v-col cols="6">
            <div class="event__input">
              <v-text-field
                class="custom-input"
                maxlength="100"
                placeholder="Ex.: Ingresso único, Meia-Entrada, VIP, etc..."
                label="Nome do ingresso">
              </v-text-field>
              <span class="event__input__hint">45 caracteres restantes</span>
            </div>
          </v-col>

          <v-col cols="2">
            <v-text-field
              class="custom-input"
              placeholder="Ex.: 100"
              label="Quantidade">
            </v-text-field>
          </v-col>

          <v-col cols="2">
            <v-text-field
              class="custom-input"
              maxlength="100"
              placeholder="R$"
              label="Preço do ingresso">
            </v-text-field>
          </v-col>

          <v-col cols="2" class="d-flex">
            <v-checkbox
              class="custom-checkbox"
              hide-details
              color="primary"
              label="Ingresso gratuito"
            ></v-checkbox>
          </v-col>
        </v-row>
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
      font-size: 12px;
      line-height: 1;
      text-align: right;
      position: absolute;
      right: 0;
      bottom: 0;
      color: #a8a9af;
    }
  }

  &__date {
    margin-left: 0;
    margin-right: 0;

    > div.custom-input {
      margin-right: 24px;
      max-width: 189px;

      &:last-child {
        margin-right: 0;
      }
    }
  }

  .custom-input {
    margin-top: 24px;
    padding-top: 20px;

    .v-input__slot {
      border: 1px solid #85858f;
      border-radius: 3px;
      margin-bottom: 4px;

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
        font-size: 14px;
        color: #494b57;
      }
    }
  }

  .custom-checkbox {
    margin: auto;
    padding-top: 16px;

    label {
      font-size: 14px;
      color: #50525f;
    }
  }
}
</style>