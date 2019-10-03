<template>
  <div class="event">
    <PageBar>
      <span class="page-bar__title">Criar evento</span>
      <PublishEventBtn @click="publishEvent($refs.form)"/>
    </PageBar>

    <v-form ref="form">
      <v-container class="event__container px-6 py-6">
        <Card
          minHeight="252"
          label="1. Qual é o nome do evento?"
          description="Adicione também uma imagem de divulgação com as principais informações do evento!">
          <div class="event__input">
            <v-text-field
              validate-on-blur
              v-model="event.name"
              class="custom-input"
              label="Nome do evento"
              :maxlength="nameMaxLength"
              :rules="rules.name"
              >
            </v-text-field>
            <span class="event__input__hint">
              {{ nameCharacterLeft }} caracteres restantes
            </span>
          </div>
        </Card>

        <Card
          minHeight="252"
          label="2. Quando o evento vai acontecer?"
          description="Informe ao público a data de realização do seu evento.">
          <v-row class="event__date">
            <v-col cols="12" sm="6" md="4">
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
            </v-col>

            <v-col cols="12" sm="6" md="4">
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
            </v-col>

            <v-spacer class="event__spacer" />

            <v-col cols="12" sm="6" md="4">
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
            </v-col>

            <v-col cols="12" sm="6" md="4">
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
            </v-col>
          </v-row>
        </Card>

        <Card
          label="3. Ingressos"
          minHeight="226">
          <v-row>
            <v-col class="py-0" cols="12" sm="9" md="6">
              <div class="event__input">
                <v-text-field
                  validate-on-blur
                  v-model="event.ticketName"
                  class="custom-input"
                  :maxlength="ticketNameMaxLength"
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

            <v-col class="py-0" cols="12" sm="3" md="2">
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

            <v-col class="py-0" cols="12" sm="4" md="2">
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

            <v-col class="py-0 d-flex" cols="12" sm="6" md="2">
              <v-checkbox
                v-model="event.ticketFree"
                :ripple="false"
                class="custom-checkbox my-auto pt-4"
                hide-details
                color="primary"
                label="Ingresso gratuito"
              ></v-checkbox>
            </v-col>
          </v-row>
        </Card>

        <PublishEventBtn @click="publishEvent($refs.form)"/>
      </v-container>
    </v-form>
  </div>
</template>

<script lang="ts">
type IRule = (value: any) => boolean|string;

import Vue from 'vue';
import moment from 'moment';
import PageBar from '@/components/PageBar.vue';
import Card from '@/components/Card.vue';
import EventStorageInstance, { IEvent } from '@/storage/EventStorage';
import PublishEventBtn from '@/components/PublishEventBtn.vue';
import { Component } from 'vue-property-decorator';
import instance from '@/app/Application';

@Component({
  components: {
    PublishEventBtn, Card, PageBar,
  },
})
export default class Event extends Vue {

  /**
   * Generic required rule, that validates empty string and null or undefined
   */
  public requiredRule: IRule[] = [(value: string) => !!value || typeof value === 'number' || 'Campo obrigatório'];

  /**
   * Inputs rules
   */
  public rules: { [key: string]: IRule[] } = {
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
        const isValid = moment(value, 'DD/MM/YYYY').isSameOrAfter(startDate);
        return !this.event.startDate || isValid || 'Insira uma data posterior a de início do evento';
      },
    ]),
    endTime: this.requiredRule.concat([
      (value: string) => moment(value, 'HH:mm', true).isValid() || 'Hora inválida',
      (value: string) => {
        const startTime = moment(this.event.startTime, 'HH:mm');
        const isValid = moment(value, 'HH:mm').isSameOrAfter(startTime);
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

  /**
   * Form value
   */
  public event: IEvent = {
    id: 0,
    name: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    ticketName: '',
    ticketAmount: '',
    ticketPrice: '',
    ticketFree: false,
    ticketSold: 0,
  };

  /**
   * Event name input max length value
   */
  public nameMaxLength: number = 100;

  /**
   * Ticket name input max length value
   */
  public ticketNameMaxLength: number = 45;

  public created() {
    const id = this.$router.currentRoute.params.id;
    if (id) {
      try {
        this.setEvent(+id);
      } catch (e) {
        this.$router.replace('/not-found');
      }
    }
    instance.headerButtonName = 'EventsBtn';
  }

  /**
   * Remaining event name input chacacteres
   */
  get nameCharacterLeft() {
    return this.nameMaxLength - this.event.name.length;
  }

  /**
   * Remaining ticket name input chacacteres
   */
  get ticketNameCharacterLeft() {
    return this.ticketNameMaxLength - this.event.ticketName.length;
  }

  /**
   * Saves the new or edited event
   */
  public publishEvent(form: { validate: () => boolean }) {
    if (form.validate()) {
      if (this.event.ticketFree) {
        this.event.ticketPrice = '';
      }
      EventStorageInstance.save(this.event);
      instance.toastMessage = `Evento ${this.event.id ? 'editado' : 'criado'} com sucesso`;
      instance.showToast = true;
      this.$router.push('/events');
    }
  }

  /**
   * Sets event property with event to edit
   */
  private setEvent(id: number) {
    const event: any = EventStorageInstance.getEventById(+id);
    Object.keys(event).forEach((key) => {
      (this.event as any)[key] = event[key];
    });
  }
}
</script>

<style lang="scss">
.event {

  &__container {
    max-width: 1158px;
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

    > div {
      margin-right: 24px;
      max-width: 189px;
      padding: 0;

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

@media screen and (max-width: 1024px) {
  .event {
    &__spacer {
      display: none;
    }

    &__date {
      margin-left: -12px;
      margin-right: -12px;

      > div {
        padding: 0 12px;
        max-width: unset;
        margin-right: 0;
      }
    }
  }
}
</style>