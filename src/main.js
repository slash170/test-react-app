/* @flow */
// 初期状態の設定とreducerを作成する部分
const initialFruit = {
  name: "りんご",
  price: 300,
  count: 0
};
const fruit = function (state, action) {
  if (!state) {
    // state が初期化されていない場合は、initialFruitを最初の状態として初期化する
    state = initialFruit;
    return state;
  }

  switch (action.type) {
  // 2. store.dispatchで伝搬されたactionはこのswitch節に入ってくる
  // typeプロパティの値別に判定を行う
  case "INCREMENT":
    // typeプロパティが"INCREMENT"ならcountを1増やす
    return {
      name: "りんご",
      price: 300,
      count: state.count + 1
    };
  case "DECREMENT":
    // typeプロパティが"DECREMENT"ならcountを1減らす
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
const store = Redux.createStore(fruit);

// Viewの部分
const Counter = React.createClass({
  handlePlus: function () {
    // 1. 用意したactionをreducerに伝搬
    const incrementAction = {type: "INCREMENT"};
    store.dispatch(incrementAction);
  },
  handleMinus: function () {
    // 1. 用意したactionをreducerに伝搬
    const decrementAction = {type: "DECREMENT"};
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
const mapStateToProps = function (state) {
  return {
    // stateのnameプロパティをCounterコンポーネントのthis.props.nameにセットする
    name: state.name,
    // stateのpriceプロパティをCounterコンポーネントのthis.props.priceにセットする
    price: state.price,
    // stateのcountプロパティをCounterコンポーネントのthis.props.countにセットする
    count: state.count
  };
};
const connect = ReactRedux.connect;
const CounterContainer = connect(mapStateToProps)(Counter);

const Provider = ReactRedux.Provider;
const counters = (
  <Provider store={store}>
    <CounterContainer />
  </Provider>
);

const content = document.getElementById("content");
ReactDOM.render(counters, content);
