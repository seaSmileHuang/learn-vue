<template>
  <el-select ref="select" :value="selectedValue" :multiple="true" placeholder="请选择" :disabled="disabled" :filterable="filterable"
   :filter-method="filterMethod" @visible-change="visibleChange" @remove-tag="handleRemoveTag">
    <el-option v-for="item in optionsData" :label="item.label" :value="item.value" :key="'option_' + item.value" hidden class="tree-select__option" />

    <el-tree ref="tree"  :node-key="nodeKey" :data="data" :props="defualtProps" :default-checked-keys="selectedValue"
      @node-click="handleNodeClick" :show-checkbox="true" :filter-node-method="filterNode" :highlight-current="true"
      :lazy="lazy" :load="loadNode" :check-strictly="checkStrictly"
    @check="check" :class="[isOnlyLeafCheckbox ? 'only-leaf-checkbox-tree' :'']"></el-tree>

  </el-select>
</template>

<script>
export default {
  model: {
    value: 'value',
    event: 'change'
  },
  name: 'TreeSelect',
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: [String, Number, Array],
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
    },
    checkStrictly: {
      type: Boolean,
      default: false
    },
    /** 只有叶子节点才有chekbox */
    isOnlyLeafCheckbox: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
    }
  },
  computed: {
    selectedValue () {
      const val = this.value || []
      return Array.isArray(val) ? val : [val]
    },
    optionsData () {
      if (!this.selectedValue || !this.selectedValue.length) {
        return [{
          label: '',
          value: ''
        }]
      }
      const options = this.treeToArr(this.data)
      return this.selectedValue.map((val) => ({
        label: options.find((d) => d.value === val)?.[this.defualtProps.label],
        value: val
      }))
    }
  },
  watch: {
  },
  methods: {
    check (node, data) {
      console.log('datacheckChange', data)
      const values = data.checkedNodes.map((node) => node[this.nodeKey]) || []
      if (!this.multiple) {
        // 单选
        const curValue = node[this.nodeKey]
        if (values.includes(curValue)) {
          this.$emit('change', [curValue])
        } else {
          this.$emit('change', [])
        }
      } else {
        this.$emit('change', values)
      }
    },
    handleNodeClick (data) {
      if (this.multiple) return
      this.$emit('change', data[this.nodeKey])
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
        // ? 为什么这样做不行么
      }
    },
    handleRemoveTag (value) {
      console.log('removeTag')
      const nodes = this.$refs.tree.getCheckedNodes()
      const key = this.nodeKey
      const values = nodes.filter((node) => node[key] !== value).map((item) => item[key])
      this.$emit('change', values)
    },
    treeToArr (data) {
      const result = []
      const key = this.nodeKey
      const { label, children } = this.defualtProps
      data.forEach(item => {
        const loop = data => {
          result.push({
            id: data[key],
            label: data[label],
            value: data[key]
          })
          const child = data[children]
          if (child) {
            for (let i = 0; i < child.length; i++) {
              loop(child[i])
            }
          }
        }
        loop(item)
      })
      return result
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
.only-leaf-checkbox-tree {
  ::v-deep .el-tree-node__expand-icon+.el-checkbox {
    display: none;
  }
  ::v-deep .is-leaf.el-tree-node__expand-icon+.el-checkbox {
    display: inline-block;
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
