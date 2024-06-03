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
    medicineImageUrl: '',
    diseaseImageUrl: '',
    medicineImageLink: '',
    diseaseImageLink: '',
    medicineImageLoadError: false,
    diseaseImageLoadError: false,
    isMedicineQuery: false  // 用于标记当前查询类型
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
        this.searchDisease();
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

      this.setData({ isMedicineQuery: true });

      wx.request({
        url: 'http://127.0.0.1:5000/medicine_data',
        method: 'GET',
        data: { name: query },
        success: (res) => {
          if (res.data.error) {
            this.setData({ error: res.data.error, result: null, medicineImageUrl: '', medicineImageLink: '' });
          } else {
            this.setData({
              result: res.data,
              error: null,
              medicineImageUrl: res.data.image_url,
              medicineImageLink: res.data.image_url,
              medicineImageLoadError: false
            });
          }
        },
        fail: () => {
          this.setData({ error: '无法连接到服务器', result: null, medicineImageUrl: '', medicineImageLink: '' });
        }
      });
    },

    searchDisease() {
      const { query } = this.data;
      if (!query) {
        this.setData({ error: '请输入疾病名称' });
        return;
      }

      this.setData({ isMedicineQuery: false });

      wx.request({
        url: 'http://127.0.0.1:5001/disease_data',
        method: 'GET',
        data: { name: query },
        success: (res) => {
          if (res.data.error) {
            this.setData({ error: res.data.error, result: null, diseaseImageUrl: '', diseaseImageLink: '' });
          } else {
            this.setData({
              result: res.data,
              error: null,
              diseaseImageUrl: res.data.image_url,
              diseaseImageLink: res.data.image_url,
              diseaseImageLoadError: false
            });
          }
        },
        fail: () => {
          this.setData({ error: '无法连接到服务器', result: null, diseaseImageUrl: '', diseaseImageLink: '' });
        }
      });
    },

    copyLink(e) {
      const { url } = e.currentTarget.dataset;
      wx.setClipboardData({
        data: url,
        success: function () {
          wx.showToast({
            title: '已复制链接',
            icon: 'success',
            duration: 2000
          });
        },
        fail: function () {
          wx.showToast({
            title: '复制失败',
            icon: 'none',
            duration: 2000
          });
        }
      });
    },

    copyFullText() {
      const { result } = this.data;
      let text = '';
      for (let key in result) {
        if (key !== 'image') {
          text += `${key}: ${result[key]}\n`;
        }
      }
      wx.setClipboardData({
        data: text,
        success: function () {
          wx.showToast({
            title: '已复制全文',
            icon: 'success',
            duration: 2000
          });
        },
        fail: function () {
          wx.showToast({
            title: '复制失败',
            icon: 'none',
            duration: 2000
          });
        }
      });
    },

    onImageLoadError(e) {
      const { type } = e.currentTarget.dataset;
      if (type === 'medicine') {
        this.setData({ medicineImageLoadError: true });
      } else if (type === 'disease') {
        this.setData({ diseaseImageLoadError: true });
      }
    },

    saveImage(e) {
      const { url } = e.currentTarget.dataset;
      wx.downloadFile({
        url: url,
        success: function (res) {
          if (res.statusCode === 200) {
            wx.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
              success: function () {
                wx.showToast({
                  title: '图片保存成功',
                  icon: 'success',
                  duration: 2000
                });
              },
              fail: function () {
                wx.showToast({
                  title: '图片保存失败',
                  icon: 'none',
                  duration: 2000
                });
              }
            });
          }
        },
        fail: function () {
          wx.showToast({
            title: '下载图片失败',
            icon: 'none',
            duration: 2000
          });
        }
      });
    }
  }
});
