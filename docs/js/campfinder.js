
const app = Vue.createApp({
    data(){
        return {
            logoShow: true,    // ロゴの透明度初期値
            splashShow: false,  // ローディングエリアの透明度初期値
            responsiveImage: [/* 画像の設定 */],
            arr: [],
            text: [],
            itemList: [
                { 
                    id: 'dm',
                    title: 'Development motivation',
                    subtitle: '開発動機について',
                    description: '開発動機は北海道をその日任せで自転車旅行している時に、最寄りのキャンプ場・温泉・コンビニの情報を求めたのですが、検索が煩雑な上に情報の内容も鮮度も劣り、苦労したこと。自転車仲間も同じ不便さを嘆いていたことから、これを解決できるサイトを作ろうと思いました。',
                    isbgappear:false,
                    isbgLRextend:false,
                    isbgRLextend:false,
                    isMore: false
                },
                { 
                    id:'feature',
                    title:'Feature',
                    subtitle:'サイトの特徴',
                    description:'各施設の” Description”の表記で、数個から数十個あるGoogle 評価コメントを”Chat GPT” に読み込ませ、要約させている点。これにより情報の客観性と鮮度を自動的に得ています。要約時には悪意ある評価や過大な広告的な書き込みは無視されるよう ”Chat GPT” に指示しています。',
                    isbgappear:false,
                    isbgLRextend:false, 
                    isbgRLextend:false,
                    isMore: false
                },
                { 
                    id:'fno',
                    title:'From now on',
                    subtitle:'今後の展開',
                    description: '2020年コロナ直前にニュージーランドを自転車でキャンプ旅した時には、現地の人にとても助けられました。恩返しと言うほどではないのですが、海外の旅行者に日本のキャンプ旅を楽しんでもらえるよう、各国語対応の自動翻訳を実装し全都道府県対応を施したいと考えています。',
                    isbgappear:false,
                    isbgLRextend:false,
                    isbgRLextend:false,
                    isMore: false
                },
            ],
            //#header要素のクラス名付与
            isDownMove:false,
            isUpMove: false,
            isbgappear: false,
            isbgRLextend: false,
            isstartwd: false
        }
    },
    methods: {
        fadeOutLogo() {
            setTimeout(() => {
                this.logoShow = false  // ロゴの透明度を0に設定
            }, 1200);
        },
        fadeInSplash() {
            setTimeout(() => {
                this.splashShow = true
            }, 2000);
        },
        fadeOutSplash() {
            setTimeout(() => {
                this.splashShow = false
                this.runAfterFadeOut();  // フェードアウト後の処理を実行
            }, 2800);
        },
        runAfterFadeOut() {
            this.$nextTick(() => {
                // DOMの更新後に実行したい処理を記述する
                document.body.classList.add('appear'); //フェードアウト後bodyにappearクラス付与 
                this.FixedAnime();// 機能編 5-1-6 スクロール途中から上部固定
                this.TypingInit();
                setTimeout(() => {
                    for(let i=0;i < 2;i++){
                        this.arr[i].start();//配列で登録テキストのアニメーションをおこなう
                        this.arr[i].duration = 800;//テキストが最終変化するまでの時間※規定値600
                        this.text[i].classList.add("endAnime");//１度アニメーションした場合はendAnimeクラスを追加
                    }
                },2000)
            });
        },
        updateResponsiveImage() {
            const windowWidth = window.innerWidth || document.documentElement.clientWidth || 0;
      
            if (windowWidth > 768) {
              this.responsiveImage = [
                { src: './img/campfinder.png' },
                { src: './img/campfinder2.png' },
                { src: './img/campfinder3.png' }
              ];
            } else {
              this.responsiveImage = [
                { src: './img/campfinder.png' },
                { src: './img/campfinder2.png' },
                { src: './img/campfinder3.png' }
              ];
            }
        },
        //スクロール途中からヘッダーを出現させるための設定を関数でまとめる
        FixedAnime() {
            let elemTop = document.getElementById('service').offsetTop; // #serviceの位置までの上端の距離
            let scroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

            if(scroll <= 20){//上から20pxスクロールされたら
                this.isDownMove = true
            } else if (scroll >= elemTop){
                this.isDownMove = true
                this.isUpMove = false
            }else{
                if(this.isDownMove){//すでに#headerにDownMoveというクラス名がついていたら
                    this.isDownMove = false
                    this.isUpMove = true
                }
            }
        },
        // 動きのきっかけの起点となるアニメーションの名前を定義
        fadeAnime(){
            const windowHeight = window.innerHeight;
            const scroll = window.pageYOffset || document.documentElement.scrollTop;
            this.$nextTick(() => {
                this.itemList.forEach((item, index) => {
                    const elem = this.$refs.sections[index];
                    if (elem) {
                        const elemPos = elem.offsetTop + 950;
                        item.isbgLRextend = scroll >= elemPos - windowHeight;
                        item.isbgappear = scroll >= elemPos - windowHeight;
                        this.isbgappear = true
                        this.isbgRLextend = true
                        this.isstartwd = scroll >= elemPos - windowHeight;
                        if(this.isstartwd){
                            if(!this.text[2].classList.contains("endAnime")){
                                this.arr[2].start();//配列で登録テキストのアニメーションをおこなう
                                this.arr[2].duration = 800;//テキストが最終変化するまでの時間※規定値600
                                this.text[2].classList.add("endAnime");//１度アニメーションした場合はendAnimeクラスを追加
                            }
                        }else{
                            this.text[2].classList.remove("endAnime"); //範囲外にスクロールした場合はendAnimeのクラスを削除
                        }
                    }
                });
                this.imgList.forEach((item, index) => {
                    const elem = this.$refs.gallery[index];
                    if (elem) {
                        const elemPos = elem.offsetTop - 50;
                        item.isbgLRextend = scroll >= elemPos - windowHeight;
                        item.isbgappear = scroll >= elemPos - windowHeight;
                    }
                });
            })
        },
        TypingInit() {
            const self = this
            $('.js_typing').each(function (i) { //js_typingクラスを全て処理をおこなう
                self.arr[i] = new ShuffleText(this);//動作させるテキストを配列に格納
                self.text[i] = this
            });
        },
        handleScroll() {
            this.FixedAnime(); // 機能編 5-1-6 スクロール途中から上部固定
            this.fadeAnime(); // 印象編 4 最低限おぼえておきたい動きの関数を呼ぶ
        }
    },
    computed: {
    },
    watch: {
        responsiveImage (newValue,oldValue) {
            // vegasスライダーを無効化
            if($('#slider').data('vegas')){
                $('#slider').vegas('destroy');
            }
            $('#slider').vegas({
                overlay: false,
                transition: 'fade2',
                transitionDuration: 1500,
                delay: 2500,
                animationDuration: 1000,
                animation: 'random',
                slides: newValue,
                timer: false
            });
        }
    },
    created(){
    },
    mounted() {
        this.updateResponsiveImage(); // 初期化時に responsiveImage を更新
        window.addEventListener('resize', this.updateResponsiveImage);// ウィンドウのリサイズ時に responsiveImage を更新

        // イベントハンドラの登録
        window.addEventListener('scroll', this.handleScroll); // スクロールイベントのリスナーを追加

        this.fadeOutLogo()
        this.fadeInSplash()
        this.fadeOutSplash()
        /*
        //htmlに直接定義すべき
        $(".g-nav-openbtn").click(function () {//ボタンがクリックされたら
            $(this).toggleClass('active');//ボタン自身に activeクラスを付与し
            $("#g-nav").toggleClass('panelactive');//ナビゲーションにpanelactiveクラスを付与
        });
        $("#g-nav a").click(function () {//ナビゲーションのリンクがクリックされたら
            $(".g-nav-openbtn").removeClass('active');//ボタンの activeクラスを除去し
            $("#g-nav").removeClass('panelactive');//ナビゲーションのpanelactiveクラスも除去
        });
        //タブをクリックしたら
        $('.tab a').on('click', function() {
            var idName = $(this).attr('href'); //タブ内のリンク名を取得	
            GethashID (idName);//設定したタブの読み込みと
            return false;//aタグを無効にする
        });
        // 上記の動きをページが読み込まれたらすぐに動かす
        $(window).on('load', function () {
            $('.tab li:first-of-type').addClass("active"); //最初のliにactiveクラスを追加
            $('.area:first-of-type').addClass("is-active"); //最初の.areaにis-activeクラスを追加
            var hashName = location.hash; //リンク元の指定されたURLのハッシュタグを取得
            GethashID (hashName);//設定したタブの読み込み
        });
        //タブをクリックしたら
        $('.tab a').on('click', function() {
            var idName = $(this).attr('href'); //タブ内のリンク名を取得	
            GethashID (idName);//設定したタブの読み込みと
            return false;//aタグを無効にする
        });
        //開くボタンを押した時には
        $(".open-btn").click(function () {
            $("#search-wrap").addClass('panelactive');//#search-wrapへpanelactiveクラスを付与
            $('#search-text').focus();//テキスト入力のinputにフォーカス
        });
        //閉じるボタンを押した時には
        $(".close-btn").click(function () {
            $("#search-wrap").removeClass('panelactive');//#search-wrapからpanelactiveクラスを除去
        });*/
    },
    beforeUnmount() {
        //イベントハンドラの解除
        window.removeEventListener('resize', this.updateResponsiveImage);// リサイズイベントのリスナーを削除
        window.removeEventListener('scroll', this.handleScroll); // スクロールイベントのリスナーを削除
    }
})

// インスタンスをグローバルに登録
window.app = app;
const vm = app.mount('#app');