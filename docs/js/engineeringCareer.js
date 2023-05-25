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
                    id: 'web',
                    title: 'WEB',
                    subtitle: 'web開発',
                    description: 'バックエンドにdjangoを使った開発を主にしています。作ったものとしては、gpxファイルの結合、間引きを自動化するサイト、北海道のキャンプ場・温泉の情報サイトです。',
                    isbgappear:false,
                    isbgLRextend:false,
                    isbgRLextend:false,
                    isMore: false
                },
                { 
                    id:'automation',
                    title:'Automation',
                    subtitle:'作業の自動化',
                    description:'pythonを使った自動化の経験があります。大学のアンケートや提出課題をpythonによって、自動化させることで非常に効率よく物事を進められるようになりました。',
                    isbgappear:false,
                    isbgLRextend:false, 
                    isbgRLextend:false,
                    isMore: false
                },
                { 
                    id:'scraping',
                    title:'Scraping',
                    subtitle:'データ収集',
                    description: 'pythonのbeautifulsoupなどを使ったwebやexelのスクレイピング経験があります。CampFinderではキャンプ場・温泉の大量のデータをスクレイピングしました。',
                    isbgappear:false,
                    isbgLRextend:false,
                    isbgRLextend:false,
                    isMore: false
                },
                { 
                    id:'machinelearning',
                    title:'Machine Learning',
                    subtitle:'機械学習を用いて',
                    description:'pythonを使って機械学習を勉強しています。今後は自然言語処理の勉強をし、会話のような言い回しも検索可能な検索システムをCampFinderに取り入れていきたいです。',
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
                { src: './img/pythonlogo.png' },
                { src: './img/djangologo.png' },
                { src: './img/ailogo.png' }
              ];
            } else {
              this.responsiveImage = [
                { src: './img/pythonlogo.png' },
                { src: './img/djangologo.png' },
                { src: './img/ailogo.png' }
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