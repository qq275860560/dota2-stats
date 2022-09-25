<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { Flag, UserFilled } from "@element-plus/icons-vue";
import PieChart from "@/components/pie-chart/index.vue";
import usePlayers from "./usePlayers";

const route = useRoute();
const {
  players,
  getTopTenPlayersOfHero,
  getSelectedHero,
  selectedHero,
  loading,
} = usePlayers();

const tableRef = ref(null);

watchEffect(() => {
  const heroId = route.params.id;
  if (heroId !== null && heroId !== undefined) {
    getTopTenPlayersOfHero(+route.params.id);
  }
});

watchEffect(() => {
  const heroId = route.params.id;
  if (heroId !== null && heroId !== undefined) {
    getSelectedHero(+route.params.id);
  }
});
</script>

<template>
  <div class="players">
    <div class="main-title">Top Ten Players</div>
    <div class="players-wrap content-dark-bg">
      <div class="hero-intro" v-if="selectedHero">
        <div class="hero-name">{{ selectedHero.localized_name }}</div>
        <el-image class="hero-img" :src="selectedHero.img" object-fit="cover">
        </el-image>
        <div class="hero-desc">
          <div>
            <div class="label">
              <el-icon><Flag /></el-icon>
              Pro Win Rate
            </div>
            <div class="desc">{{ selectedHero.proWinRate }}</div>
          </div>
          <div class="hero-role">
            <span class="label"
              ><el-icon><UserFilled /></el-icon>
              Roles:
            </span>
            <div class="desc">
              {{ (selectedHero.roles || []).join(" , ") }}
            </div>
          </div>
        </div>
      </div>
      <div class="players-table table-height-full">
        <el-table ref="tableRef" :data="players" v-loading="loading">
          <el-table-column label="Rank" min-width="40">
            <template #default="{ $index }">{{ $index + 1 }}</template>
          </el-table-column>
          <el-table-column label="Player Name" min-width="130">
            <template #default="{ row }">
              <div class="player-info">
                <el-image class="avatar" :src="row.avatar" object-fit="cover">
                </el-image>
                <span>{{ row.personaname }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="Game result in past 20 games"
            min-width="150"
            prop="radiantWinNum"
          >
            <template #default="{ row, $index }">
              <PieChart
                :container-id="'pie-chart-container' + $index"
                :data="row.radiantWinChartData"
                :padding="3"
                :show-inner-text="false"
                :width="50"
                :height="50"
              ></PieChart>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/style/variable.scss";
.players {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}
.players-wrap {
  flex: 1;
  display: flex;
  margin-bottom: 30px;
  overflow: hidden;
  background-color: $content-bgColor;
  opacity: 0.9;
  .players-table {
    flex: 1;
    overflow: hidden;
    .player-info {
      display: flex;
      align-items: center;
      .avatar {
        flex: 0 0 40px;
        margin-right: 5px;
        width: 40px;
        height: 40px;
        animation: fadeIn 500ms;
      }
    }
  }
}
.hero-intro {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  width: 400px;
  overflow: hidden;
  .hero-name {
    margin-bottom: 15px;
    font-size: 30px;
    font-weight: bold;
    opacity: 0.9;
  }
  .hero-img {
    height: 200px;
    border-radius: 10px;
    border: 1px solid rgba(0, 0, 0, 0.3);
    box-shadow: rgb(0 0 0 / 30%) 0px 12px 32px;
  }
  .hero-desc {
    margin-top: 20px;
    width: 100%;
    text-transform: uppercase;
    text-align: center;
    .label {
      color: rgba(255, 255, 255, 0.6);
      .el-icon {
        position: relative;
        top: 2px;
        margin-right: 5px;
      }
    }
    .desc {
      font-weight: 600;
      color: #66bbff;
      opacity: 0.7;
    }

    .hero-role {
      margin-top: 20px;
    }
    .role {
      display: inline-block;
      margin-right: 15px;
    }
  }
  @media (max-width: 768px) {
    width: 300px;
    .hero-img {
      height: 150px;
    }
  }
}

:deep(.el-table) {
  .el-table__header {
    background-image: linear-gradient(to right, rgb(88, 86, 86), #141414);
    .el-table__cell {
      background-color: transparent;
      text-transform: uppercase;
      color: rgba(255, 255, 255, 0.9);
      font-weight: 600;
    }
  }
}
</style>
