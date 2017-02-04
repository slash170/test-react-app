/* @flow */
// 初期状態の設定とreducerを作成する部分
var initialFruit = {
    name: "りんご",
    price: 300,
    count: 0
};
var fruit = function (state, action) {
    if (!state) {
        // state が初期化されていない場合は、initialFruitを最初の状態として初期化する
        state = initialFruit;
        return state;
    }

    switch (action.type) {
        // 2. store.dispatchで伝搬されたactionはこのswitch節に入ってくる
        // typeプロパティの値別に判定を行う
        case 'INCREMENT':
            // typeプロパティが'INCREMENT'ならcountを1増やす
            return {
                name: "りんご",
                price: 300,
                count: state.count + 1
            };
        case 'DECREMENT':
            // typeプロパティが'DECREMENT'ならcountを1減らす
            return {
                name: "りんご",
                price: 300,
                count: state.count - 1
            };
        default:
            return state;
    }
};
// storeの生成はRedux.createStoreが勝手にやってくれる
var store = Redux.createStore(fruit);

// Viewの部分
var Counter = React.createClass({
    handlePlus: function () {
        // 1. 用意したactionをreducerに伝搬
        var incrementAction = {type: "INCREMENT"};
        store.dispatch(incrementAction);
    },
    handleMinus: function () {
        // 1. 用意したactionをreducerに伝搬
        var decrementAction = {type: "DECREMENT"};
        store.dispatch(decrementAction);
    },
    render: function() {
        return (
            <div>
                <h3>{this.props.name}の個数</h3>
                <button onClick={this.handlePlus}>プラス!</button>
                <div>{this.props.count}個</div>
                <div>{this.props.count * this.props.price}円</div>
                <button onClick={this.handleMinus}>マイナス</button>
            </div>
        );
    }
});

// ViewとStoreで管理しているstateの糊付けを行う部分
var mapStateToProps = function (state) {
    return {
        // stateのnameプロパティをCounterコンポーネントのthis.props.nameにセットする
        name: state.name,
        // stateのpriceプロパティをCounterコンポーネントのthis.props.priceにセットする
        price: state.price,
        // stateのcountプロパティをCounterコンポーネントのthis.props.countにセットする
        count: state.count
    };
};
var connect = ReactRedux.connect;
var CounterContainer = connect(mapStateToProps)(Counter);

var Provider = ReactRedux.Provider;
var counters = (
    <Provider store={store}>
        <CounterContainer />
    </Provider>
);

var content = document.getElementById('content');
ReactDOM.render(counters, content);
