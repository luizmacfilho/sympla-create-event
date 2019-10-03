<template>
  <div :class="['event-list', {
    'event-list--no-event': !events.length,
  }]"
    >
    <PageBar>
      <span class="page-bar__title">Meus eventos</span>
      <AddEventBtn label="Criar novo evento" color="#ff880e" />
    </PageBar>

    <div class="event-list__message" v-if="!events.length">
      <img src="../assets/empty-eventos.svg"/>
      <div>Você ainda não possui eventos criados</div>
      <AddEventBtn label="Criar novo evento" color="#ff880e" />
    </div>

    <div v-else class="event-list__events">
      <CardEvent>
        <span class="event-list__events__title">lista de eventos</span>

        <table class="event-list__events__table">
          <thead>
            <th>
              <td>Evento</td>
            </th>
            <th>
              <td>Quando</td>
            </th>
            <th>
              <td>Onde</td>
            </th>
            <th class="event-list__events__table__head-amount">
              <td>Ingressos</td>
            </th>
          </thead>
          <tbody>
            <tr v-for="(event, index) in events" :key="index" @click="editEvent(event.id)">
              <td>{{event.name}}</td>
              <td>{{event.startDate}}</td>
              <td>{{event.name}}</td>
              <td class="event-list__events__table__value-amount">
                <div class="value-amount">
                  <span>0</span>
                  <div class="value-amount__sold">

                  </div>
                  <div class="value-amount__original">

                  </div>
                  <span>{{event.ticketAmount}}</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </CardEvent>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { instance } from '@/app/Application';
import PageBar from '@/components/PageBar.vue';
import CardEvent from '@/components/CardEvent.vue';
import EventStorageInstance from '@/storage/EventStorage';

@Component({
  components: {
    PageBar, CardEvent,
  }
})
export default class EventList extends Vue {

  public events: any[] = [];

  constructor() {
    super();
    instance.headerButtonName = 'AddEventBtn';
    this.events = EventStorageInstance.events;
  }

  public editEvent(id: number) {
    this.$router.push(`/events/${id}`);
  }
}
</script>

<style lang="scss">
.event-list {
  &--no-event {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .event-list__message {
    margin: auto;
    text-align: center;

    div {
      margin: 12px 0 20px;
      font-size: 14px;
      color: $steel;
    }
  }

  &__events {
    padding: 24px 0;

    &__title {
      font-size: 14px;
      font-weight: bold;
      color: $quartz;
      text-transform: uppercase;
      margin-bottom: 20px;
      display: block;
    }

    &__table {
      width: 100%;
      border-collapse: collapse;

      thead {
        border: 1px solid $powder-blue;
        background-color: rgba(214, 216, 219, 0.1);

        th {
          font-size: 12px;
          font-weight: bold;
          color: $quartz;
          text-transform: uppercase;
          height: 36px;
        }

      }

      tbody {
        tr {
          cursor: pointer;
          height: 48px;
          font-size: 12px;
          color: $quartz;
          border-bottom: solid 1px rgba(214, 216, 219, 0.5);
        }
      }

      td {
        padding-left: 14px;
      }

      &__value-amount {
        width: 360px;
      }

      &__value-amount {

        .value-amount {
          display: flex;
          width: 204px;
          height: 24px;
          position: relative;
          justify-content: space-between;
          align-items: center;
          padding: 0 5px;

          span {
            z-index: 5;
          }

          &__sold {
            @extend .absolute-full-space;
            width: 50px;
            background: #2ac8bc;
            border-radius: 6px 0 0 6px;
            z-index: 3;
          }

          &__original {
            @extend .absolute-full-space;
            width: 100%;
            background: #d6d8db;
            border-radius: 6px;
            z-index: 1;
            opacity: 0.3;
          }
        }
      }
    }
  }
}

.absolute-full-space {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}
</style>