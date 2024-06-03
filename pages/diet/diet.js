Page({
  data: {
    recommendations: [
      { title: '合理膳食  吃出健康（健康焦点）', image: '/asset/images/文章1.jpg', link: 'http://health.people.com.cn/n1/2022/0520/c14739-32425705.html' },
      { title: '央视315晚会系列分析：食品安全类话题的曝光内容演变', image: '/asset/images/文章2.png', link: 'https://www.thepaper.cn/newsDetail_forward_26675300' },
      { title: '“反式脂肪”引热议，益得来“菊芋+”能否扭转食品安全大环境？', image: '/asset/images/文章3.webp', link: 'https://www.sohu.com/a/781865235_120541367' },
        { title: '“路边摊”撑起城市烟火气——深圳街市消费调查', image: '/asset/images/文章4.jpg', link: 'https://www.cfsn.cn/news/detail/22/248014.html' },
        { title: '《我的阿勒泰》与令人心动的地标产品“大果沙棘”', image: '/asset/images/文章5.jpg', link: 'https://www.cfsn.cn/news/detail/181/248104.html' },
        { title: '网络订餐安全监管引发关注 外卖如何做到方便又放心？', image:'/asset/images/文章6.jpg', link: 'https://www.cfsn.cn/news/detail/748/248199.html' },
        { title: '稻虾共生 江西彭泽17.2万亩小龙虾丰产增收', image: '/asset/images/文章7.jpg', link: 'https://www.cfsn.cn/news/detail/30/248078.html' },
        { title: '这些“养胃”谣言迟早把你胃养废！', image:'/asset/images/文章8.jpg', link: 'https://www.cfsn.cn/news/detail/20/115052.html' },
        { title: '痛风不能吃豆腐？乳腺炎不能喝豆浆？', image: '/asset/images/文章9.png', link: 'https://www.cfsn.cn/news/detail/20/246919.html' }
      ],
      selectedRecipe: null,
      recipes: {
        breakfast: {
          name: '健康早餐',
          description: '营养丰富的早餐食谱',
          video: 'https://qihan-1-1326979169.cos.ap-beijing.myqcloud.com/1.%E3%80%8C%E5%8E%A8%E5%A8%98%E7%89%A9%E8%AF%AD%E3%80%8D%E8%BF%994%E6%AC%BE%E6%97%A9%E9%A4%90%E8%AE%A9%E4%BD%A0%E6%B2%A1%E7%90%86%E7%94%B1%E8%B5%96%E5%BA%8A%EF%BC%8C%E8%B5%96%E5%BA%8A%E7%AE%97%E6%88%91%E8%BE%93%EF%BC%81%28Av15985340%2CP1%29.mp4'
        },
        lunch: {
          name: '营养午餐',
          description: '适合减脂的午餐食谱',
          video: 'https://qihan-1-1326979169.cos.ap-beijing.myqcloud.com/%E3%80%904%E4%B8%AA%E6%9C%88%E7%98%A630%E6%96%A4%E3%80%91%E4%B8%80%E5%91%A8%E9%AB%98%E6%95%88%E5%87%8F%E8%84%82%E5%8D%88%E9%A4%90%EF%BC%8C%E5%AE%B6%E5%B8%B8%E8%8F%9C%E8%BF%99%E4%B9%88%E5%81%9A%E5%88%B7%E8%84%82%E6%9D%A0%E6%9D%A0%E5%93%92%EF%BC%81%20-%201.%E3%80%904%E4%B8%AA%E6%9C%88%E7%98%A630%E6%96%A4%E3%80%91%E4%B8%80%E5%91%A8%E9%AB%98%E6%95%88%E5%87%8F%E8%84%82%E5%8D%88%E9%A4%90%EF%BC%8C%E5%AE%B6%E5%B8%B8%E8%8F%9C%E8%BF%99%E4%B9%88%E5%81%9A%E5%88%B7%E8%84%82%E6%9D%A0%E6%9D%A0%E5%93%92%EF%BC%81%28Av716659566%2CP1%29.mp4'
        },
        dinner: {
          name: '美味晚餐',
          description: '丰富多样的晚餐食谱',
          video: 'https://qihan-1-1326979169.cos.ap-beijing.myqcloud.com/Nam%20Vlog%E4%B8%A8%E4%B8%80%E5%91%A8%E6%99%9A%E9%A4%90%E5%90%83%E4%BB%80%E4%B9%88%C2%B7%E7%94%A8%E3%80%8A%E5%AD%A4%E7%8B%AC%E7%9A%84%E7%BE%8E%E9%A3%9F%E5%AE%B6%E3%80%8B%E5%BC%80%E5%90%AF%E4%B8%80%E5%91%A8%E6%99%9A%E9%A4%90%E9%A3%9F%E8%B0%B1%C2%B7%E5%92%96%E5%96%B1%E9%B8%A1%E8%82%89%E9%A5%AD%C2%B7%E4%B8%A4%E7%A7%8D%E6%84%8F%E9%9D%A2%E5%81%9A%E6%B3%95%C2%B7%E6%89%93%E6%8A%9B%20-%201.Nam%20Vlog%E4%B8%A8%E4%B8%80%E5%91%A8%E6%99%9A%E9%A4%90%E5%90%83%E4%BB%80%E4%B9%88%C2%B7%E7%94%A8%E3%80%8A%E5%AD%A4%E7%8B%AC%E7%9A%84%E7%BE%8E%E9%A3%9F%E5%AE%B6%E3%80%8B%E5%BC%80%E5%90%AF%E4%B8%80%E5%91%A8%E6%99%9A%E9%A4%90%E9%A3%9F%E8%B0%B1%C2%B7%E5%92%96%E5%96%B1%E9%B8%A1%28Av559387114%2CP1%29.mp4'
        }
      },
    
    dailyQuiz: {
      text: '以下哪种食物含有较高的维生素C？',
      options: ['苹果', '橙子', '香蕉'],
      correctAnswer: '橙子',
      explanation: '橙子是维生素C含量较高的水果。'
    },
    userAnswer: '',
    showAnswerPopup: false,
    correctAnswer: '',
    explanation: '',
    communityPosts: [
      { id: 1, title: '我的健康饮食经验', content: '分享我的健康饮食习惯...' },
      { id: 2, title: '减肥心得', content: '通过健康饮食成功减肥的经历...' }
    ],
    newPostContent: '',
    showTip: true,
    dailyTip: '每天多喝水，保持身体水分充足。',
    isMusicPlaying: false
  },
  onReady() {
    this.autoScroll();
    const music = wx.createInnerAudioContext();
    music.src = '/asset/music/background-music.mp3';
    music.loop = true;
    music.play();
    this.setData({
      isMusicPlaying: true
    });
    this.backgroundMusic = music;
  },
  onUnload() {
    if (this.scrollInterval) {
      clearInterval(this.scrollInterval);
    }
    if (this.backgroundMusic) {
      this.backgroundMusic.pause();
    }
  },
  totalPages() {
    return Math.ceil(this.data.recommendations.length / this.data.itemsPerPage);
  },
  displayedRecommendations() {
    const startIndex = (this.data.currentPage - 1) * this.data.itemsPerPage;
    const endIndex = this.data.currentPage * this.data.itemsPerPage;
    return this.data.recommendations.slice(startIndex, endIndex);
  },
  nextPage() {
    if (this.data.currentPage < this.totalPages()) {
      this.setData({
        currentPage: this.data.currentPage + 1
      });
    } else {
      this.setData({
        currentPage: 1
      });
    }
  },
  previousPage() {
    if (this.data.currentPage > 1) {
      this.setData({
        currentPage: this.data.currentPage - 1
      });
    } else {
      this.setData({
        currentPage: this.totalPages()
      });
    }
  },
  submitDailyQuiz() {
    const { userAnswer, dailyQuiz } = this.data;
    const isCorrect = userAnswer === dailyQuiz.correctAnswer;
    this.setData({
      answerResult: isCorrect ? '正确' : '错误',
      correctAnswer: dailyQuiz.correctAnswer,
      explanation: dailyQuiz.explanation,
      showAnswerPopup: true,
      hasAnswered: true
    });
  },
  closeAnswerPopup() {
    this.setData({
      showAnswerPopup: false
    });
  },
  submitPost() {
    if (this.data.newPostContent) {
      const newPost = {
        id: this.data.communityPosts.length + 1,
        title: '用户发布',
        content: this.data.newPostContent
      };
      this.setData({
        communityPosts: [...this.data.communityPosts, newPost],
        newPostContent: ''
      });
    }
  },
  closeTip() {
    this.setData({
      showTip: false
    });
  },
  toggleMusic() {
    if (this.data.isMusicPlaying) {
      this.backgroundMusic.pause();
    } else {
      this.backgroundMusic.play();
    }
    this.setData({
      isMusicPlaying: !this.data.isMusicPlaying
    });
  },
  openLink(e) {
    const link = e.currentTarget.dataset.link;
    wx.navigateTo({
      url: '/pages/webview/webview?link=' + encodeURIComponent(link)
    });
  },
  goToPage(e) {
    const page = e.currentTarget.dataset.page;
    this.setData({
      currentPage: page
    });
  },
  updateNewPostContent(e) {
    this.setData({
      newPostContent: e.detail.value
    });
  },
  autoScroll() {
    this.scrollInterval = setInterval(() => {
      this.nextPage();
    }, 5000); // 每 5 秒滚动一次
  },
  selectRecipe(e) {
    const type = e.currentTarget.dataset.type;
    this.setData({
      selectedRecipe: this.data.recipes[type]
    });
  },
  onReachBottom: function () {
    this.loadMoreContent();
  }
});