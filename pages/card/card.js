Component({
  properties: {
    query: {
      type: String,
      value: ''
    }
  },
  data: {
    result: null,
    error: null,
    imageUrl: ''  // 用于存储Base64编码的图片数据
  },
  methods: {
    onInputChange(e) {
      this.setData({
        query: e.detail.value
      });
    },

    onSend() {
      if (this.data.query) {
        this.searchMedicine();
      } else {
        this.setData({ error: '请输入中药或疾病名称' });
      }
    },

    searchMedicine() {
      const { query } = this.data;
      if (!query) {
        this.setData({ error: '请输入中药名称' });
        return;
      }

      wx.request({
        url: 'http://127.0.0.1:5000/medicine_data',  // 确保使用正确的本地 Flask 服务器地址
        method: 'GET',
        data: { name: query },
        success: (res) => {
          if (res.data.error) {
            this.setData({ error: res.data.error, result: null, imageUrl: '' });
          } else {
            this.setData({ result: res.data, error: null, imageUrl: 'data:image/png;base64,' + res.data.image_base64 });
          }
        },
        fail: () => {
          this.setData({ error: '无法连接到服务器', result: null, imageUrl: '' });
        }
      });
    },

    searchDisease() {
      const { query } = this.data;
      if (!query) {
        this.setData({ error: '请输入疾病名称' });
        return;
      }

      wx.request({
        url: 'http://127.0.0.1:5000/disease_data',  // 确保使用正确的本地 Flask 服务器地址
        method: 'GET',
        data: { name: query },
        success: (res) => {
          if (res.data.error) {
            this.setData({ error: res.data.error, result: null, imageUrl: '' });
          } else {
            this.setData({ result: res.data, error: null, imageUrl: 'data:image/png;base64,' + res.data.image_base64 });
          }
        },
        fail: () => {
          this.setData({ error: '无法连接到服务器', result: null, imageUrl: '' });
        }
      });
    }
  }
});
