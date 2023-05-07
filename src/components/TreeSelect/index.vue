<template>
  <el-select ref="select" :value="value" placeholder="请选择" :disabled="disabled" :filterable="filterable" :filter-method="filterMethod" @visible-change="visibleChange">
    <el-option :label="optionData.label" :value="optionData.value" class="tree-select__option" >
      <el-tree ref="tree" :node-key="nodeKey" :data="data" :props="defualtProps"
      @node-click="handleNodeClick" :show-checkbox="multiple" :filter-node-method="filterNode" :highlight-current="true"
      :lazy="lazy" :load="loadNode"
    @check-change="checkChange"></el-tree>
    </el-option>

  </el-select>
</template>

<script>
export default {
  name: 'TreeSelect',
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: [String, Number],
      default: ''
    },
    data: {
      type: Array,
      default: () => []
    },
    nodeKey: {
      type: [String, Number],
      default: 'id'
    },
    defualtProps: {
      type: Object,
      default: () => ({
        children: 'children',
        label: 'label',
        isLeaf: 'isLeaf',
        disabled: 'disabled'
      })
    },
    multiple: {
      type: Boolean,
      default: false
    },
    filterable: {
      type: Boolean,
      default: false
    },
    lazy: {
      type: Boolean,
      default: false
    },
    loadNode: {
      type: Function
    }
  },
  data () {
    return {
      optionData: {
        label: '',
        value: ''
      }
    }
  },
  watch: {
    value: {
      immediate: true,
      handler (curVal, preVal) {
        this.$nextTick(() => {
          if (!curVal) { return }
          if (this.multiple) {
            const vals = curVal.split(',')
            this.$refs.tree.setCheckedKeys(vals)
            const nodes = this.$refs.tree.getCheckedNodes()
            this.optionData.label = nodes.map((item) => item[this.defualtProps.label]).join(',')
            this.optionData.value = curVal
          } else {
            this.$refs.tree.setCurrentKey(curVal)
            const node = this.$refs.tree.getCurrentNode()
            console.log('node', node)
            this.optionData.value = curVal
            this.optionData.label = node[this.defualtProps.label]
          }
        })
      }
    }
  },
  methods: {
    checkChange (data) {
      console.log('datacheckChange', data)
      const nodes = this.$refs.tree.getCheckedNodes()
      const value = nodes.map((item) => item[this.nodeKey]).join(',')
      this.$emit('input', value)
    },
    handleNodeClick (data) {
      if (this.multiple) return
      this.$emit('input', data[this.nodeKey])
      this.$refs.select.visible = false
    },
    filterNode (value, data) {
      if (!value) return true
      const label = this.defualtProps.label || 'name'
      return data[label].indexOf(value) !== -1
    },
    filterMethod (val) {
      this.$refs.tree.filter(val)
    },
    visibleChange (flag) {
      if (flag) {
        // 下拉框出现时
        const tree = this.$refs.tree
        let selectDom = null
        if (this.multiple) {
          selectDom = tree.$el.querySelector('.el-tree-node.is-checked')
        } else {
          selectDom = tree.$el.querySelector('.is-current')
        }
        setTimeout(() => {
          this.$refs.select.scrollToOption({ $el: selectDom })
        }, 0)
        // this.$nextTick(() => {
        //   this.$refs.select.scrollToOption({ $el: selectDom })
        // })
        // ? 为什么这样做不行么
      }
    }
  }
}
</script>
<style scoped lang="less">
.tree-select__option {
  &.el-select-dropdown__item {
    height: auto;
    line-height: 1;
    padding: 0;
    background-color: #fff;
  }
}
</style>
<!-- <template>
  <el-select
    :title="multiple? optionData.name : ''"
    ref="select"
    :value="value"
    placeholder="请选择"
    size="mini"
    clearable
    :disabled="disabled"
    :filterable="filterable"
    :filter-method="filterMethod"
    style="width: 100%;"
    @clear="clear"
    @visible-change="visibleChange"
  >
    <el-option
      ref="option"
      class="tree-select__option"
      :value="optionData.id"
      :label="optionData.name"
    >
      <el-tree
        ref="tree"
        class="tree-select__tree"
        :class="`tree-select__tree--${multiple ? 'checked' : 'radio'}`"
        :node-key="nodeKey"
        :data="data"
        :props="props"
        :default-expanded-keys="[value]"
        :show-checkbox="multiple"
        :highlight-current="!multiple"
        :expand-on-click-node="multiple"
        :filter-node-method="filterNode"
        @node-click="handleNodeClick"
        @check-change="handleCheckChange"
      ></el-tree>
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: 'TreeSelect',
  props: {
    // v-model绑定
    value: {
      type: [String, Number],
      default: ''
    },
    multiple: {
      type: Boolean,
      default: false
    },
    // 树形的数据
    data: {
      type: Array,
      default: function () {
        return []
      }
    },
    // 每个树节点用来作为唯一标识的属性
    nodeKey: {
      type: [String, Number],
      default: 'id'
    },
    filterable: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    // tree的props配置
    props: {
      type: Object,
      default: function () {
        return {
          label: 'label',
          children: 'children'
        }
      }
    }
  },
  data () {
    return {
      optionData: {
        id: '',
        name: ''
      },
      filterFlag: false
    }
  },
  watch: {
    value: {
      handler (val) {
        if (!this.isEmpty(this.data)) {
          this.init(val)
        }
      },
      immediate: true
    },
    data: function (val) {
      if (!this.isEmpty(val)) {
        this.init(this.value)
      }
    }
  },
  created () {},
  methods: {
    // 是否为空
    isEmpty (val) {
      for (const key in val) {
        return false
      }
      return true
    },
    handleNodeClick (data) {
      if (this.multiple) {
        return
      }
      this.$emit('input', data[this.nodeKey])
      this.$refs.select.visible = false
    },
    handleCheckChange () {
      const nodes = this.$refs.tree.getCheckedNodes()
      const value = nodes.map((item) => item[this.nodeKey]).join(',')
      this.$emit('input', value)
    },
    init (val) {
      // 多选
      if (this.multiple) {
        const arr = val.toString().split(',')
        this.$nextTick(() => {
          this.$refs.tree.setCheckedKeys(arr)
          const nodes = this.$refs.tree.getCheckedNodes()
          this.optionData.id = val
          this.optionData.name = nodes
            .map((item) => item[this.props.label])
            .join(',')
        })
      }
      // 单选
      else {
        val = val === '' ? null : val
        this.$nextTick(() => {
          this.$refs.tree.setCurrentKey(val)
          if (val === null) {
            return
          }
          const label = this.props.label || 'name'
          const node = this.$refs.tree.getNode(val)
          this.optionData.id = val
          this.optionData[label] = node.label
        })
      }
    },
    visibleChange (e) {
      if (e) {
        const tree = this.$refs.tree
        this.filterFlag && tree.filter('')
        this.filterFlag = false
        let selectDom = null
        if (this.multiple) {
          selectDom = tree.$el.querySelector('.el-tree-node.is-checked')
        } else {
          selectDom = tree.$el.querySelector('.is-current')
        }
        setTimeout(() => {
          this.$refs.select.scrollToOption({ $el: selectDom })
        }, 0)
      }
    },
    clear () {
      this.$emit('input', '')
    },
    filterMethod (val) {
      this.filterFlag = true
      this.$refs.tree.filter(val)
    },
    filterNode (value, data) {
      if (!value) return true
      const label = this.props.label || 'name'
      return data[label].indexOf(value) !== -1
    }
  }
}
</script>

<style lang="less" scoped>
.tree-select__option {
  &.el-select-dropdown__item {
    height: auto;
    line-height: 1;
    padding: 0;
    background-color: #fff;
  }
}

.tree-select__tree {
  padding: 4px 20px;
  font-weight: 400;
  &.tree-select__tree--radio {
    .el-tree-node.is-current > .el-tree-node__content {
      color: red;
      font-weight: 700;
    }
  }
}
</style> -->
