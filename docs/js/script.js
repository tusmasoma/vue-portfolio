import { createApp } from 'vue';

const app = createApp({
    data(){
        return {
            logoShow: true,    // ロゴの透明度初期値
            splashShow: false,  // ローディングエリアの透明度初期値
            responsiveImage: [/* 画像の設定 */],
            arr: [],
            text: [],
            itemList: [
                { 
                    id:'my_career',
                    title:'自己紹介',
                    subtitle:'私について',
                    description:'初めまして、木村颯馬です。現在、東京理科大学の大学院にて数学と情報学を絡めた研究をしております。プログラミングは大学三年生のころに始め、web開発、自動化、機械学習などを独学で勉強しました。また、大学時代に日本やニュージーランドを旅した経験とプログラミングを使って、北海道最大級のキャンプ場・温泉の情報サイト「CampFinder」を作成しました。',
                    isbgappear:false,
                    isbgLRextend:false,
                    isbgRLextend:false,
                    isMore: false,
                    url: '#'
                },
                { 
                    id:'now',
                    title:'Now',
                    subtitle:'大学院にて',
                    description:'現在、東京理科大学総域理工学研究科にて、主に情報幾何学について勉強しています。情報幾何学は、確率分布を要素とする統計的モデルに関する微分幾何学を使って研究します。この学問は機械学習などに応用できるため、情報幾何を使って機械学習を研究することを私の大学院でのテーマとしております。',
                    isbgappear:false,
                    isbgLRextend:false, 
                    isbgRLextend:false,
                    isMore: false,
                    url: '#'
                },
                { 
                    id:'engineering_career',
                    title:'Engineering Career',
                    subtitle:'私のプログラマーとしての経歴',
                    description: 'プログラミングは大学三年生のころに始め、web開発、自動化、機械学習などを独学で勉強しました。pythonが得意です。',
                    isbgappear:false,
                    isbgLRextend:false,
                    isbgRLextend:false,
                    isMore: true,
                    url: './engineeringCareer.html'
                },
                { 
                    id:'portfolio',
                    title:'Portfolio',
                    subtitle:'ポートフォリオについて',
                    description:'大学時代に日本やニュージーランドを旅した経験とプログラミングを使って、北海道最大級のキャンプ場・温泉の情報サイト「CampFinder」を作成しました。',
                    isbgappear:false,
                    isbgLRextend:false, 
                    isbgRLextend:false,
                    isMore: true,
                    url: './campfinder.html'
                },
            ],
            imgList: [
                { img1: 'img/gal_01.jpeg', img2: 'img/gal_01.jpeg', title:'鹿児島の美しい夕陽と海の前でキャンプ', isbgappear: false, isbgLRextend: false},
                { img1: 'img/gal_02.jpeg', img2: 'img/gal_02.jpeg', title:'大学一年の頃にニュージーランドを横断！', isbgappear: false, isbgLRextend: false},
                { img1: 'img/gal_03.jpeg', img2: 'img/gal_03.jpeg', title:'テカポ湖にて', isbgappear: false, isbgLRextend: false},
                { img1: 'img/gal_04.jpeg', img2: 'img/gal_04.jpeg', title:'大学院では、情報幾何学を勉強しています。', isbgappear: false, isbgLRextend: false},
                { img1: 'img/gal_05.jpeg', img2: 'img/gal_05.jpeg', title:'実家の猫です。猫が大好き！', isbgappear: false, isbgLRextend: false},
                { img1: 'img/gal_06.jpeg', img2: 'img/gal_06.jpeg', title:'ラーメンは毎日食べたいくらい好きです。', isbgappear: false, isbgLRextend: false},
                { img1: 'img/gal_07.jpeg', img2: 'img/gal_07.jpeg', title:'大学二年の春休みを使って、東京から鹿児島までチャリ旅', isbgappear: false, isbgLRextend: false},
                { img1: 'img/gal_08.png', img2: 'img/gal_08.png', title:'プログラミングが大好きです！', isbgappear: false, isbgLRextend: false},
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
                { src: './img/IMG_8241.jpeg' },
                { src: './img/IMG_4640.jpeg' },
                { src: './img/IMG_4747.jpeg' }
              ];
            } else {
              this.responsiveImage = [
                { src: './img/IMG_8241_sp.jpeg' },
                { src: './img/IMG_4640_sp.jpeg' },
                { src: './img/IMG_4747_sp.jpeg' }
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