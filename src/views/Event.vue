<template>
  <div class="event">
    <PageBar>
      <span class="page-bar__title">Criar evento</span>
      <PublishEventBtn @click="publishEvent($refs.form)"/>
    </PageBar>

    <v-form ref="form">
      <v-container class="event__container px-0 py-6">
        <CardEvent
          height="252"
          label="1. Qual é o nome do evento?"
          description="Adicione também uma imagem de divulgação com as principais informações do evento!">
          <div class="event__input">
            <v-text-field
              validate-on-blur
              v-model="event.name"
              class="custom-input"
              maxlength="100"
              label="Nome do evento"
              :rules="rules.name"
              >
            </v-text-field>
            <span class="event__input__hint">
              {{ nameCharacterLeft }} caracteres restantes
            </span>
          </div>
        </CardEvent>

        <CardEvent
          height="252"
          label="2. Quando o evento vai acontecer?"
          description="Informe ao público a data de realização do seu evento.">
          <v-row class="event__date">
            <v-text-field
              validate-on-blur
              v-model="event.startDate"
              class="custom-input custom-prepend-icon"
              placeholder="DD/MM/AAAA"
              v-mask="'##/##/####'"
              prepend-inner-icon="$vuetify.icons.schedule"
              label="Data de início"
              :rules="rules.startDate"
              >
            </v-text-field>

            <v-text-field
              validate-on-blur
              v-model="event.startTime"
              class="custom-input custom-prepend-icon"
              persistent-hint
              hint="Horário de Brasília"
              placeholder="11:00"
              v-mask="'##:##'"
              prepend-inner-icon="$vuetify.icons.clock"
              label="Hora de início"
              :rules="rules.startTime"
              >
            </v-text-field>

            <v-spacer />

            <v-text-field
              validate-on-blur
              v-model="event.endDate"
              class="custom-input custom-prepend-icon"
              placeholder="DD/MM/AAAA"
              v-mask="'##/##/####'"
              prepend-inner-icon="$vuetify.icons.schedule"
              label="Data de término"
              :rules="rules.endDate"
              >
            </v-text-field>

            <v-text-field
              validate-on-blur
              v-model="event.endTime"
              class="custom-input custom-prepend-icon"
              persistent-hint
              hint="Horário de Brasília"
              placeholder="11:00"
              v-mask="'##:##'"
              prepend-inner-icon="$vuetify.icons.clock"
              label="Hora de término"
              :rules="rules.endTime"
              >
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
                  validate-on-blur
                  v-model="event.ticketName"
                  class="custom-input"
                  maxlength="45"
                  placeholder="Ex.: Ingresso único, Meia-Entrada, VIP, etc..."
                  label="Nome do ingresso"
                  :rules="rules.ticketName"
                  >
                </v-text-field>
                <span class="event__input__hint">
                  {{ ticketNameCharacterLeft }} caracteres restantes
                </span>
              </div>
            </v-col>

            <v-col cols="2">
              <v-text-field
                validate-on-blur
                v-model="event.ticketAmount"
                class="custom-input"
                placeholder="Ex.: 100"
                label="Quantidade"
                type="number"
                :rules="rules.ticketAmount"
                >
              </v-text-field>
            </v-col>

            <v-col cols="2">
              <v-text-field
                validate-on-blur
                v-model="event.ticketPrice"
                class="custom-input"
                maxlength="100"
                placeholder="R$"
                label="Preço do ingresso"
                :rules="rules.ticketPrice"
                >
              </v-text-field>
            </v-col>

            <v-col cols="2" class="d-flex">
              <v-checkbox
                v-model="event.ticketFree"
                :ripple="false"
                class="custom-checkbox ma-auto pt-4"
                hide-details
                color="primary"
                label="Ingresso gratuito"
              ></v-checkbox>
            </v-col>
          </v-row>
        </CardEvent>

        <PublishEventBtn @click="publishEvent($refs.form)"/>
      </v-container>
    </v-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import moment from 'moment';
import PageBar from '@/components/PageBar.vue';
import CardEvent from '@/components/CardEvent.vue';
import EventStorageInstance from '@/storage/EventStorage';
import PublishEventBtn from '@/components/PublishEventBtn.vue';
import { Component } from 'vue-property-decorator';
import { instance } from '@/app/Application';

@Component({
  components: {
    PublishEventBtn, CardEvent, PageBar,
  },
})
export default class Event extends Vue {

  public requiredRule: any[] = [(value: string) => !!value || 'Campo obrigatório'];
  public rules: any = {
    name: this.requiredRule,
    startDate: this.requiredRule.concat([
      (value: string) => moment(value, 'DD/MM/YYYY', true).isValid() || 'Data inválida',
      (value: string) => moment(value, 'DD/MM/YYYY').isSameOrAfter(moment()) || 'Não são permitidas datas no passado',
    ]),
    startTime: this.requiredRule.concat([
      (value: string) => moment(value, 'HH:mm', true).isValid() || 'Hora inválida',
    ]),
    endDate: this.requiredRule.concat([
      (value: string) => moment(value, 'DD/MM/YYYY', true).isValid() || 'Data inválida',
      (value: string) => {
        const startDate = moment(this.event.startDate, 'DD/MM/YYYY');
        const isValid = moment(value, 'DD/MM/YYYY').isSameOrAfter(startDate)
        return !this.event.startDate || isValid || 'Insira uma data posterior a de início do evento';
      },
    ]),
    endTime: this.requiredRule.concat([
      (value: string) => moment(value, 'HH:mm', true).isValid() || 'Hora inválida',
      (value: string) => {
        const startTime = moment(this.event.startTime, 'HH:mm');
        const isValid = moment(value, 'HH:mm').isSameOrAfter(startTime)
        return this.event.startDate !== this.event.endDate
          || !this.event.startTime || isValid || 'Insira uma hora posterior a de início do evento';
      },
    ]),
    ticketName: this.requiredRule,
    ticketAmount: this.requiredRule.concat([
      (value: number) => value > 0 || 'Quantidade inválida',
    ]),
    ticketPrice: [(value: string) => this.event.ticketFree || !!value || 'Campo obrigatório'],
  };
  public event: any = {
    name: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    ticketName: '',
    ticketAmount: undefined,
    ticketPrice: undefined,
    ticketFree: false,
  };

  public created() {
    const id = this.$router.currentRoute.params.id;
    instance.headerButtonName = 'EventsBtn';
    if (id) {
      const event = EventStorageInstance.getEventById(+id);
      for (const key in event) {
        this.event[key] = event[key];
      }
    }
  }

  get nameCharacterLeft() {
    return 100 - this.event.name.length;
  }

  get ticketNameCharacterLeft() {
    return 45 - this.event.ticketName.length;
  }

  public publishEvent(form: any) {
    if (form.validate()) {
      EventStorageInstance.save(this.event, !this.event.id);
      const text = this.event.id ? 'editado' : 'criado';
      this.$router.push('/events');
      instance.toastMessage = `Evento ${text} com sucesso`;
      instance.showToast = true;
    }
  }
}
</script>

<style lang="scss">
.event {

  &__container {
    max-width: 1110px;
    text-align: right;
  }

  &__input {
    position: relative;

    &__hint {
      font-size: 12px;
      line-height: 1;
      text-align: right;
      position: absolute;
      right: 0;
      bottom: 0;
      color: $dark-gray;
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

  .custom-checkbox {
    label {
      font-size: 14px;
      color: $input-label-color;
    }
  }
}
</style>