<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";

import type { Ref } from "vue";
import type { Hero, Sorting, Order } from "@/views/heroes/heroTypes";
import type { PagingParam } from "@/components/paging-table/tableTypes";

import PagingTable from "@/components/paging-table/index.vue";
import { useHeroStore } from "@/store/hero";
import useHeroesEffect from "@/views/heroes/useHeroes";

const router = useRouter();
const heroStore = useHeroStore();
const tableRef: Ref<any> = ref(null);
const pageSize: number = 5;

let sorting: Sorting = reactive({
  field: "",
  fieldValueType: "",
  order: null,
});

const { getHeroesList } = useHeroesEffect();

function onPagingChange(_paging: PagingParam) {
  getHeroesList(_paging, sorting).then((res) => {
    _paging.callback(res);
  });
}

function onSortChange({ prop, order }: { prop: string; order: Order }) {
  if (order === null) {
    sorting = { field: "", fieldValueType: "", order: null };
  } else {
    sorting = {
      field: prop,
      fieldValueType: "",
      order: order,
    };

    if (prop === "localized_name") {
      sorting.fieldValueType = "string";
    }
  }
  tableRef.value.refresh();
}

function handleLinkClick(row: Hero) {
  router.push({
    path: `hero-players-rank/${row.id}`,
  });
  heroStore.updateSelectedHero(row);
}
</script>

<template>
  <div class="heroes">
    <div class="main-title">Top ten hero win rates</div>

    <div class="table-wrap">
      <paging-table
        ref="tableRef"
        class="table-height-full"
        :page-size="pageSize"
        @paging-change="onPagingChange"
        @sort-change="onSortChange"
      >
        <el-table-column label="Hero Image" width="180">
          <template #default="{ row }">
            <el-image class="img" :src="row.img" object-fit="cover"> </el-image>
          </template>
        </el-table-column>
        <el-table-column
          label="Hero Name"
          min-width="130"
          prop="localized_name"
          sortable
        >
          <template #default="{ row }">
            <el-link type="primary" @click="handleLinkClick(row)">
              {{ row.localized_name }}
            </el-link>
          </template>
        </el-table-column>
        <el-table-column
          label="Pro Win Rate"
          min-width="120"
          prop="proWinRate"
        />
        <el-table-column
          label="Pro Pick Count"
          min-width="120"
          prop="pro_pick"
        />
        <el-table-column label="Pro Ban Count" min-width="120" prop="pro_ban" />
      </paging-table>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/style/variable.scss";
.heroes {
  display: flex;
  flex-direction: column;
  height: 100%;
  .table-wrap {
    margin-bottom: 30px;
    flex: 1;
    overflow-y: hidden;
    background-color: $content-bgColor;
    opacity: 0.9;

    .img {
      width: 128px;
      height: 72px;
      border-radius: 4px;
      animation: fadeIn 2s;
    }
  }
}

:deep(.el-table) {
  .el-table__header {
    background-image: linear-gradient(to right, #141414, grey);
    .el-table__cell {
      background-color: transparent;
      text-transform: uppercase;
      color: rgba(255, 255, 255, 0.9);
      font-weight: 600;
    }
  }
  .el-table__body {
    .cell,
    .el-link__inner {
      font-weight: bold;
    }
  }
}
</style>
