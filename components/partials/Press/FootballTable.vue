<template>
  <section class="about-table" v-if="footballTableData">
    <div class="container">
      <div class="about-table__inner">
        <p class="title" v-if="footballTableData && footballTableData.title">
          {{ footballTableData.title }}
        </p>
        <div
          class="about-table__body"
          style="margin-bottom: 15px"
          v-if="footballTableData && footballTableData.groups"
          v-for="(table, idx) in footballTableData.groups"
          :key="idx"
        >
          <h2 style="margin-top: 15px" v-if="table && table.title">
            {{ table.title }}
          </h2>
          <table>
            <thead>
              <th>Команды</th>
              <th v-for="n in getMaxTableLength(table)" :key="n">
                {{ n }}
              </th>
              <th>O</th>
              <th>
                <img
                  style="width: 8px; height: 18px"
                  src="../../../images/arrow-up.svg"
                  alt=""
                />
              </th>
              <th>
                <img
                  style="width: 8px; height: 18px"
                  src="../../../images/arrow-down-2.svg"
                  alt=""
                />
              </th>
              <th>Забитые голы</th>
              <th>Пропущенные голы</th>
              <th>Очки</th>
              <th>Место</th>
            </thead>
            <tr v-for="(item, i) in table.teams" :key="i">
              <td>{{ item.title ?? "" }}</td>
              <td v-for="(num, n) in item.table" :key="n">
                <span v-if="num === null">
                  <img
                    style="width: 20px; height: 20px"
                    src="../../../images/ball.svg"
                    alt=""
                  />
                </span>
                <span v-else>{{ num }}</span>
              </td>
              <td>{{ item.games_played }}</td>
              <td>{{ item.games_won }}</td>
              <td>{{ item.games_lost }}</td>
              <td>{{ item.scored_goals }}</td>
              <td>{{ item.missed_goals }}</td>
              <td>{{ item.points }}</td>
              <td>{{ item.place }}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { computed, useStore, onMounted } from "@nuxtjs/composition-api";

export default {
  setup() {
    const store = useStore();
    const footballTableData = computed(
      () => store.state.press.footballTable.data?.tournament
    );

    const getMaxTableLength = (event) => {
      let maxLength = 0;
      if (event && event.teams) {
        console.log(event.teams);
        if (event.teams && event.teams[0] && event.teams[0].table) {
          console.log(event.teams[0].table);
          console.log();
          return event.teams[0].table.length;
        }
      }
    };

    onMounted(async () => {
      await store.dispatch("press/fetchFootbalTableData");
    });

    return {
      store,
      footballTableData,
      getMaxTableLength,
    };
  },
};
</script>

<style scoped></style>
