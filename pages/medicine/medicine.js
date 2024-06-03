Page({
  data: {
    ip: '10.21.148.213',
    port: '8088',
    text: '',
    chatList: [{
      text: '您好，我是Tom~请问有什么可以帮到您吗？',
      prop: true
    }]
  },

  onInputChange(e) {
    this.setData({
      text: e.detail.value
    });
  },

  sendMessage() {
    const { text, chatList } = this.data;

    if (text.trim() === '') {
      return;
    }

    const data = {
      text: text,
      prop: false
    };

    this.setData({
      chatList: [...chatList, data],
      text: ''
    });

    const url = `http://${this.data.ip}:${this.data.port}/qa`;
    const postData = {
      sent: data.text
    };

    wx.request({
      url: url,
      method: 'POST',
      data: JSON.stringify(postData),
      header: {
        'Content-Type': 'application/json'
      },
      success: (res) => {
        const response = {
          text: res.data.text,
          prop: true
        };

        this.setData({
          chatList: [...this.data.chatList, response]
        });
      },
      fail: (error) => {
        console.error('Failed to send message:', error);
      }
    });
  },

  handleHotQuestion(e) {
    const question = e.currentTarget.dataset.question;
    this.setData({
      text: question
    });
    this.sendMessage();
  },

  scrollToBottom() {
    this.setData({
      toView: `item${this.data.chatList.length - 1}`
    });
  }
});
