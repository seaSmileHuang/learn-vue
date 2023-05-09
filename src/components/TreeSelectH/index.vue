<template>
  <el-select :value="value" :multiple="multiple" :filterable="filterable" :filter-method="filterMethod" v-bind="$attrs" v-on="$listeners">
    <el-option v-for="option in options" :key="'option_' + option.id" :label="option.label" :value="option.value" hidden class="tree-select__option"></el-option>
    <el-tree
      ref="treeRef"
      :data="data"
      :node-key="nodeKey"
      :props="defaultProps"
      show-checkbox
      check-strictly
      @node-expand="nodeExpand"
      @check="handleCheck"
      :default-checked-keys="defaultCheckedKeys">
    </el-tree>
  </el-select>
</template>

<script>
export default {
  model: {
    event: 'change'
  },
  name: 'TreeSelect',
  props: {
    filterable: {
      type: Boolean,
      default: true
    },
    nodeKey: {
      type: String,
      default: 'id'
    },
    multiple: {
      type: Boolean,
      default: false
    },
    value: {
      type: [Number, String, Array],
      default: ''
    },
    data: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    filterMethod (val) {
      // todo 调用外界方法 （返回promise  tree loading）
      console.log('filterMethod', val)
    },
    fetchTreeData () {
      console.log('fetchTreeData')
      return Promise.resolve([
        {
          id: 'xxx',
          label: 'lazy'
        }
      ])
    },
    nodeExpand (data, node, vueComponent) {
      // 设置图标为收缩图标，等加载数据后再展开，达到与el-tree默认懒加载同样的效果
      node.expanded = false
      if (!node.loaded) { // 当没有加载过的节点才会请求数据
        node.loading = true
        this.fetchTreeData({ type: 'load', id: data.id }).then(res => {
          node.loaded = true
          node.loading = false
          node.expanded = true
          if (res && res.length) {
            // 更新当前节点的子节点
            this.$refs.treeRef.updateKeyChildren(data.id, res)
          } else {
            node.isLeaf = true
          }
        })
      } else {
        node.expanded = true
      }
    },
    handleCheck (node, data) {
      console.log('handleCheck', node, data)
      const checkedKeys = data.checkedKeys
      let result = checkedKeys || []
      if (!this.multiple) {
        result = ''
        const currentKey = node[this.nodeKey]
        if (checkedKeys.includes(currentKey)) {
          result = currentKey
        }
        this.$refs.treeRef.setCheckedKeys([result], true)
      } else {
        this.$refs.treeRef.setCheckedKeys(result, true)
      }
      this.$emit('change', result)
    },

    treeToArr (data) {
      const result = []
      data.forEach(item => {
        const loop = data => {
          result.push({
            id: data.id,
            label: data.label,
            value: data.id
          })
          const child = data.children
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
  },
  computed: {
    defaultCheckedKeys () {
      let result = this.value || []
      if (!this.multiple) {
        result = [this.value]
      }
      return result
    },

    options () {
      return this.treeToArr(this.data)
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
</style>

<!-- <style lang="less">
.el-tree-node{
.is-leaf + .el-checkbox .el-checkbox__inner{
  display: inline-block;
}
.el-checkbox .el-checkbox__inner{
  display: none;
}
}
</style> -->
