<script lang="ts" setup>
import { reactive, useAttrs } from "vue";
import type { PagingParam } from "@/components/paging-table/tableTypes";

type Props = {
  data?: [];
  pageSize?: number;
  pageNum?: number;
  tableHeight?: string | number;
  paginationLayout?: string;
  showPagination?: boolean;
};
const props = withDefaults(defineProps<Props>(), {
  data: () => [],
  pageSize: 10,
  pageNum: 1,
  paginationLayout: "slot, total, prev, pager, next, jumper",
  showPagination: true,
});

const attrs = useAttrs();

const emit = defineEmits<{
  (e: "paging-change", value: any): void;
}>();

let query = reactive({
  pageNumber: props.pageNum,
  pageSize: props.pageSize,
});

let tableData = reactive({
  list: [],
  total: 0,
});

refresh();

function onCurrentChange() {
  emit("paging-change", {
    pageNum: query.pageNumber,
    pageSize: query.pageSize,
    callback(result: { list: []; total: number }) {
      if ("list" in result && "total" in result) {
        tableData.list = result.list;
        tableData.total = result.total;

        Promise.resolve();
      } else {
        tableData = {
          list: [],
          total: 0,
        };
      }
    },
  } as PagingParam);
}

function refresh() {
  query.pageNumber = 1;
  onCurrentChange();
}

defineExpose({
  refresh,
});
</script>

<template>
  <div class="paging-table">
    <el-table v-bind="attrs" :data="tableData.list" empty-text="No Data">
      <slot></slot>
    </el-table>

    <el-pagination
      v-if="showPagination"
      @current-change="onCurrentChange"
      :layout="paginationLayout"
      v-model:current-page="query.pageNumber"
      :page-size="query.pageSize"
      :total="tableData.total"
    >
    </el-pagination>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-pagination) {
  justify-content: center;
  padding-top: 15px;
  padding-bottom: 15px;
}
</style>
