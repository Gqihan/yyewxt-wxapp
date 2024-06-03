const herbsData = require('../../asset/zhongyao_medical_data.js').herbsData;

Page({
  data: {
    searchQuery: '',
    currentPage: 0,
    pageSize: 10,
    herbs: [],
    paginatedHerbs: [],
    totalPages: 1,
    defaultImage: 'https://your-server.com/path/to/default-image.jpg', // 默认图片地址
    canLoadMore: false // 控制下一页按钮是否显示
  },
  onLoad: function () {
    const processedHerbs = herbsData.map(herb => {
      // 处理别名，只显示一到两个别名
      if (herb.aliases) {
        const aliasesArray = herb.aliases.split(',');
        herb.displayAliases = aliasesArray.slice(0, 2).join(', ');
      } else {
        herb.displayAliases = ''; // 确保别名为空时有一个默认值
      }
      return herb;
    });
    this.setData({ herbs: processedHerbs }, this.updatePaginatedHerbs);
    console.log('Herbs data loaded:', processedHerbs);
  },
  onImageError: function (e) {
    const index = e.currentTarget.dataset.index;
    const herb = this.data.paginatedHerbs[index];
    herb.image = this.data.defaultImage;
    this.setData({
      [`paginatedHerbs[${index}]`]: herb
    });
  },
  updatePaginatedHerbs: function () {
    const filteredHerbs = this.getFilteredHerbs();
    const startIndex = this.data.currentPage * this.data.pageSize;
    const paginatedHerbs = filteredHerbs.slice(startIndex, startIndex + this.data.pageSize);
    this.setData({ 
      paginatedHerbs: paginatedHerbs,
      totalPages: Math.ceil(filteredHerbs.length / this.data.pageSize),
      canLoadMore: this.data.currentPage < Math.ceil(filteredHerbs.length / this.data.pageSize) - 1
    });
    console.log('Paginated herbs updated:', paginatedHerbs);
  },
  getFilteredHerbs: function () {
    const searchQuery = this.data.searchQuery.toLowerCase();
    return this.data.herbs
      .map(function(herb) {
        const titleWeight = herb.title.toLowerCase().includes(searchQuery) ? 1 : 0;
        const aliasesWeight = herb.aliases && herb.aliases.toLowerCase().includes(searchQuery) ? 0.9 : 0;
        const effectsWeight = herb.effects && herb.effects.toLowerCase().includes(searchQuery) ? 0.8 : 0;
        const toxicityWeight = herb.toxicity && herb.toxicity.toLowerCase().includes(searchQuery) ? 0.7 : 0;
        const propertiesFlavorsWeight = herb.properties_and_flavors && herb.properties_and_flavors.toLowerCase().includes(searchQuery) ? 0.6 : 0;
        const dosageWeight = herb.dosage && herb.dosage.toLowerCase().includes(searchQuery) ? 0.5 : 0;
        herb.weight = titleWeight + aliasesWeight + effectsWeight + toxicityWeight + propertiesFlavorsWeight + dosageWeight;
        return herb;
      })
      .filter(function(herb) {
        return herb.weight > 0;
      })
      .sort(function(a, b) {
        return b.weight - a.weight;
      });
  },
  onInput: function (e) {
    this.setData({ searchQuery: e.detail.value });
  },
  search: function () {
    this.setData({ currentPage: 0 }, this.updatePaginatedHerbs);
  },
  loadMore: function () {
    // 仅当滑动到底部时显示下一页按钮
    this.setData({ canLoadMore: true });
  },
  nextPage: function () {
    if (this.data.canLoadMore) {
      if (this.data.currentPage < this.data.totalPages - 1) {
        this.setData({ currentPage: this.data.currentPage + 1 }, this.updatePaginatedHerbs);
      }
      this.setData({ canLoadMore: false });
    }
  },
  previousPage: function () {
    if (this.data.currentPage > 0) {
      this.setData({ currentPage: this.data.currentPage - 1 }, this.updatePaginatedHerbs);
    }
  }
});
